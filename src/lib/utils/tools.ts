// Tool configuration mapping tool names to their SVGL.app identifiers
const TOOL_MAPPING: Record<string, string> = {
  // Adobe Tools
  'Adobe After Effects': 'aftereffects',
  'Adobe Premiere': 'premiere',
  'Adobe Photoshop': 'photoshop',
  'Adobe Illustrator': 'illustrator',
  'Adobe Audition': 'audition',

  // 3D & Motion
  'Cinema 4D': 'cinema4d',
  'Blender': 'blender',

  // Audio
  'Ableton Live': 'ableton',
  'iZotope RX': 'izotope',

  // Web Development
  'React': 'react',
  'Svelte': 'svelte',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Node.js': 'nodejs',
  'HTML': 'html5',
  'CSS': 'css3',
  'Sass': 'sass',
  'Tailwind CSS': 'tailwindcss',
  'Bootstrap': 'bootstrap',

  // Design
  'Figma': 'figma',
  'Sketch': 'sketch',

  // Cloud & Hosting
  'Netlify': 'netlify',
  'Vercel': 'vercel',
  'Firebase': 'firebase',

  // Other Tools
  'VS Code': 'vscode',
  'Git': 'git',
  'GitHub': 'github',
  'Docker': 'docker'
};

export interface Tool {
  name: string;
  slug: string;
  iconUrl: string;
  category: 'design' | 'development' | 'motion' | 'audio' | 'other';
}

/**
 * Get the SVG icon URL from SVGL.app for a given tool name
 */
export function getToolIconUrl(toolName: string): string {
  const slug = TOOL_MAPPING[toolName] || toolName.toLowerCase().replace(/\s+/g, '');
  return `https://svgl.app/${slug}.svg`;
}

/**
 * Fetch SVG content from SVGL.app
 */
export async function fetchToolIcon(toolName: string): Promise<string> {
  const iconUrl = getToolIconUrl(toolName);

  try {
    const response = await fetch(iconUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch icon: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.warn(`Failed to fetch icon for ${toolName}:`, error);
    // Return a fallback SVG
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
      <text x="12" y="16" text-anchor="middle" font-size="8" fill="currentColor">?</text>
    </svg>`;
  }
}

/**
 * Create a tool object with icon URL
 */
export function createTool(name: string, category: Tool['category']): Tool {
  return {
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    iconUrl: getToolIconUrl(name),
    category
  };
}

/**
 * Get all available tools with their icons
 */
export function getAllTools(): Tool[] {
  return [
    // Motion Graphics Tools
    createTool('Adobe After Effects', 'motion'),
    createTool('Cinema 4D', 'motion'),
    createTool('Blender', 'motion'),
    createTool('Adobe Premiere', 'motion'),

    // Design Tools
    createTool('Adobe Photoshop', 'design'),
    createTool('Adobe Illustrator', 'design'),
    createTool('Figma', 'design'),

    // Development Tools
    createTool('React', 'development'),
    createTool('Svelte', 'development'),
    createTool('JavaScript', 'development'),
    createTool('TypeScript', 'development'),
    createTool('HTML', 'development'),
    createTool('CSS', 'development'),
    createTool('Sass', 'development'),
    createTool('Tailwind CSS', 'development'),
    createTool('Node.js', 'development'),

    // Audio Tools
    createTool('Ableton Live', 'audio'),
    createTool('Adobe Audition', 'audio'),

    // Other Tools
    createTool('VS Code', 'other'),
    createTool('Git', 'other'),
    createTool('GitHub', 'other'),
    createTool('Netlify', 'other'),
    createTool('Vercel', 'other')
  ];
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: Tool['category']): Tool[] {
  return getAllTools().filter(tool => tool.category === category);
}

/**
 * Search for a tool by name
 */
export function findTool(toolName: string): Tool | undefined {
  return getAllTools().find(tool =>
    tool.name.toLowerCase().includes(toolName.toLowerCase()) ||
    tool.slug.includes(toolName.toLowerCase())
  );
}

/**
 * Batch fetch multiple tool icons
 */
export async function fetchMultipleToolIcons(toolNames: string[]): Promise<Record<string, string>> {
  const results: Record<string, string> = {};

  const promises = toolNames.map(async (toolName) => {
    try {
      const iconContent = await fetchToolIcon(toolName);
      results[toolName] = iconContent;
    } catch (error) {
      console.warn(`Failed to fetch icon for ${toolName}:`, error);
    }
  });

  await Promise.all(promises);
  return results;
}
