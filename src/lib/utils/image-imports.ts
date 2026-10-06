import type { Picture } from 'vite-imagetools';

const imageModules: Record<string, { default: Picture; }> = import.meta.glob('/src/images/**/*.{jpg,jpeg,png,gif,webp,svg}', {
  eager: true,
  query: { enhanced: true, w: '480;768;1080;1366;1920;2560;3840' }
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

/** Smallest WebP variant at least `minWidth` pixels wide, for attributes that only take one URL (e.g. `<video poster>`). */
export function getImageUrlAtWidth(picture: Picture, minWidth: number): string {
  const candidates = (picture.sources.webp ?? '').split(', ').filter(Boolean).map((candidate) => {
    const [url, descriptor] = candidate.split(' ');
    return { url, width: parseInt(descriptor) };
  });
  return (candidates.find((c) => c.width >= minWidth) ?? candidates.at(-1))?.url ?? picture.img.src;
}

export const availableImagePaths = Array.from(imageMap.keys());
