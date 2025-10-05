// Tool configuration mapping tool names to their local icon paths
const TOOL_MAPPING: Record<string, string> = {
  'Svelte': '/icons/tools/svelte.svg',
  'Tailwind CSS': '/icons/tools/tailwind-css.svg',
  'TypeScript': '/icons/tools/typescript.svg',
  'Vite': '/icons/tools/vite.svg',
  'Node.js': '/icons/tools/nodejs.svg',
  'After Effects': '/icons/tools/after-effects.svg',
  'Premiere': '/icons/tools/premiere.svg',
  'DaVinci Resolve': '/icons/tools/animate.svg',
  'Audition': '/icons/tools/adobe.svg',
  'Ableton Live': '/icons/tools/animate.svg',
  'Izotope RX': '/icons/RX11.png',
  'Illustrator': '/icons/tools/illustrator.svg',
  'Photoshop': '/icons/tools/photoshop.svg'
};

export interface Tool {
  name: string;
  slug: string;
  iconUrl: string;
  category: 'design' | 'development' | 'motion' | 'audio' | 'other';
}

/**
 * Get the local icon path for a given tool name (supports SVG, PNG, etc.)
 */
export function getToolIconUrl(toolName: string): string {
  return TOOL_MAPPING[toolName] || '/icons/default.svg';
}

/**
 * Get all tools used in the project
 */
export function getProjectTools(): string[] {
  return Object.keys(TOOL_MAPPING);
}

/**
 * Create a tool object with icon URL and category
 */
function createTool(name: string, category: Tool['category']): Tool {
  return {
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    iconUrl: getToolIconUrl(name),
    category
  };
}

/**
 * Get all available tools with their icons and categories
 */
export function getAllTools(): Tool[] {
  return [
    // Development Tools
    createTool('Svelte', 'development'),
    createTool('Tailwind CSS', 'development'),
    createTool('TypeScript', 'development'),
    createTool('Vite', 'development'),
    createTool('Node.js', 'development'),

    // Motion Graphics Tools
    createTool('After Effects', 'motion'),
    createTool('Premiere', 'motion'),
    createTool('DaVinci Resolve', 'motion'),
    createTool('Cinema 4D', 'motion'),

    // Design Tools
    createTool('Illustrator', 'design'),
    createTool('Photoshop', 'design'),

    // Audio Tools
    createTool('Audition', 'audio'),
    createTool('Ableton Live', 'audio'),
    createTool('Izotope RX', 'audio')
  ];
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: Tool['category']): Tool[] {
  return getAllTools().filter(tool => tool.category === category);
}
