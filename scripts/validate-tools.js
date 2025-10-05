import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract all tools from project markdown files
 */
function extractToolsFromProjects() {
  const contentDir = path.join(__dirname, '../src/content');
  const tools = new Set();
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Look for tools: array in frontmatter
        const toolsMatch = content.match(/^tools:\s*\[(.*?)\]/m);
        if (toolsMatch) {
          const toolsString = toolsMatch[1];
          // Parse the array items, handling quotes and commas
          const toolItems = toolsString
            .split(',')
            .map(tool => tool.trim().replace(/^["']|["']$/g, ''))
            .filter(tool => tool.length > 0);
          
          toolItems.forEach(tool => tools.add(tool));
        }
      }
    }
  }
  
  scanDirectory(contentDir);
  return Array.from(tools);
}

/**
 * Get the current tool mapping from tools.ts
 */
function getCurrentToolMapping() {
  const toolsPath = path.join(__dirname, '../src/lib/utils/tools.ts');
  const content = fs.readFileSync(toolsPath, 'utf8');
  
  // Extract the TOOL_MAPPING object
  const mappingMatch = content.match(/const TOOL_MAPPING: Record<string, string> = \{([\s\S]*?)\};/);
  if (!mappingMatch) {
    throw new Error('Could not find TOOL_MAPPING in tools.ts');
  }
  
  const mappingContent = mappingMatch[1];
  const mapping = {};
  
  // Parse each line of the mapping
  const lines = mappingContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('//')) {
      const match = trimmed.match(/^'([^']+)':\s*'([^']+)',?$/);
      if (match) {
        mapping[match[1]] = match[2];
      }
    }
  }
  
  return mapping;
}

/**
 * Check if an icon file exists
 */
function iconExists(iconPath) {
  const fullPath = path.join(__dirname, '../static', iconPath);
  return fs.existsSync(fullPath);
}

/**
 * Main validation function
 */
function validateTools() {
  console.log('🔍 Scanning project for tools...');
  
  const projectTools = extractToolsFromProjects();
  console.log(`Found ${projectTools.length} tools in project:`, projectTools);
  
  const toolMapping = getCurrentToolMapping();
  console.log(`Found ${Object.keys(toolMapping).length} tools in mapping`);
  
  const errors = [];
  const warnings = [];
  
  // Check each project tool
  for (const tool of projectTools) {
    if (!toolMapping[tool]) {
      errors.push(`❌ Tool "${tool}" is used in project but not mapped in tools.ts`);
    } else {
      const iconPath = toolMapping[tool];
      if (!iconExists(iconPath)) {
        errors.push(`❌ Icon file not found for tool "${tool}": ${iconPath}`);
      } else {
        console.log(`✅ Tool "${tool}" has valid icon: ${iconPath}`);
      }
    }
  }
  
  // Check for unused mappings
  for (const mappedTool of Object.keys(toolMapping)) {
    if (!projectTools.includes(mappedTool)) {
      warnings.push(`⚠️  Tool "${mappedTool}" is mapped but not used in any project`);
    }
  }
  
  // Report results
  if (warnings.length > 0) {
    console.log('\n📋 Warnings:');
    warnings.forEach(warning => console.log(warning));
  }
  
  if (errors.length > 0) {
    console.log('\n❌ Errors found:');
    errors.forEach(error => console.log(error));
    process.exit(1);
  }
  
  console.log('\n✅ All tools validated successfully!');
  console.log(`📊 Summary: ${projectTools.length} tools found, ${Object.keys(toolMapping).length} mapped, all icons present`);
}

// Run validation
validateTools();
