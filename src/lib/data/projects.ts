export interface Project {
  slug: string;
  title: string;
  category: 'motion' | 'video' | 'webdesign';
  description: string;
  image: string;
  content?: string;
}

export const projects: Project[] = [
  {
    slug: 'headspace',
    title: 'Headspace',
    category: 'motion',
    description: 'Motion graphics project',
    image: '/images/head4.jpg'
  },
  {
    slug: 'motion-reel-2020',
    title: 'Motion Reel 2020',
    category: 'motion',
    description: 'Motion graphics reel',
    image: '/images/motion_background.png'
  },
  {
    slug: 'editing-reel-2020',
    title: 'Editing Reel 2020',
    category: 'video',
    description: 'Video editing reel',
    image: '/images/reel.jpg'
  },
  {
    slug: 'jackgracie-portfolio',
    title: 'Jack Gracie Portfolio',
    category: 'webdesign',
    description: 'Web design portfolio',
    image: '/images/portfolio.png'
  }
];
