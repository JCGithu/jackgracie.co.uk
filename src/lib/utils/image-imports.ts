import type { Picture } from 'vite-imagetools';

const imageModules: Record<string, { default: Picture; }> = import.meta.glob('/src/images/**/*.{jpg,jpeg,png,gif,webp,svg}', {
  eager: true,
  query: { enhanced: true }
});

export const imageMap = new Map<string, Picture>();

for (const [path, module] of Object.entries(imageModules)) {
  const imagePath = path.replace('/src', '');
  let image = module.default;
  imageMap.set(imagePath, image);
}

export function getEnhancedImage(path: string): Picture {
  return imageMap.get(path)!;
}

export function hasEnhancedImage(path: string): boolean {
  return imageMap.has(path);
}

export const availableImagePaths = Array.from(imageMap.keys());
