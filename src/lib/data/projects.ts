export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'motion' | 'video' | 'webdesign';
  accent: string;
  tools: string[];
  client?: string;
  video?: string;
  poster: string;
  image?: string;
  feature: {
    url?: string;
    image?: string;
    embed?: boolean;
    video?: boolean;
  };
  links?: Array<{
    url: string;
    text: string;
  }>;
}

export interface SkillCategory {
  name: string;
  path: string;
  description: string;
  tools: string[];
  banner: Array<{
    url: string;
    position: string;
    fit?: string;
    alt: string;
  }>;
  posts: Project[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Motion Graphics",
    path: "/motion",
    description: "Highlights from my work for brands <br /> such as Headspace, ViewRanger, and Metro.co.uk",
    tools: ["AdobeAE", "AdobePhotoshop", "AdobeIllustrator", "AdobePremiere", "Blender", "C4D"],
    banner: [
      {
        url: "../images/motion_foreground.png",
        position: "bottom",
        alt: "Motion Graphics Foreground"
      },
      { url: "../images/colin.svg", position: "bottom", alt: "Colin!" }
    ],
    posts: [
      {
        slug: "motion-reel-2020",
        title: "Motion Reel 2020",
        subtitle: "Compilation",
        description: "A collection of some of my work over the past 2 years. This includes personal pieces and projects for Metro.co.uk & Headspace.",
        category: "motion",
        accent: "#fbcb71",
        tools: ["AdobeAE", "AdobePhotoshop", "AdobePremiere"],
        video: "/webm/reel.webm",
        poster: "../images/reel.jpg",
        feature: { url: "https://www.youtube.com/embed/ak7QmAedl2k", embed: true }
      },
      {
        slug: "headspace",
        title: "Headspace",
        subtitle: "Guided Meditations",
        description: "A series of looping animations to play alongside guided meditations. Each of the 4 final scenarios were completed between 1-2 working days. A compliation can be seen at the beginning of my reel.",
        category: "motion",
        client: "Metro / Headspace",
        accent: "#97A3E3",
        tools: ["AdobeAE", "AdobePhotoshop", "AdobePremiere"],
        video: "/webm/head4.webm",
        poster: "../images/head4.jpg",
        feature: { url: "/webm/head4.webm", video: true },
        links: [
          { url: "https://www.facebook.com/MetroUK/videos/552370459041373", text: "Watch a full episode here!" }
        ]
      },
      {
        slug: "my-odd-job",
        title: "My Odd Job",
        subtitle: "Series Ident",
        description: "An ident for a series of interviews with people in, well, odd jobs. As the jobs would be in a mixture of industries the choice was to make the ident in a clean semi-industrial style, with the handwritten touch and serif font to add personality.",
        category: "motion",
        client: "Metro.co.uk",
        accent: "#004690",
        tools: ["AdobeAE"],
        video: "/webm/oddjob.webm",
        poster: "../images/oddjob.jpg",
        feature: { url: "/webm/oddjob.webm", video: true }
      },
      {
        slug: "scrapped",
        title: "Scrapped",
        subtitle: "Personal Work",
        description: "Originally was being developed as an intro to a series, but continued once it was scrapped. The girl's animation is mostly frame-by-frame, reconstructed with additional tweening in After Effects.",
        category: "motion",
        accent: "#E04E4E",
        tools: ["AdobeAE", "AdobePhotoshop"],
        video: "/webm/scrapped.webm",
        poster: "../images/girl.jpg",
        feature: { url: "/webm/scrapped.webm", video: true }
      },
      {
        slug: "pond-time",
        title: "Pond Time",
        subtitle: "Personal Work",
        description: "I originally worked on this to try and get a blend between realistic and cartoonish water. This included experimenting with combining grain and gradients, generating random reactive shapes for the as well as displacement tools for ripples.",
        category: "motion",
        accent: "#138A40",
        tools: ["AdobeAE", "AdobePhotoshop"],
        video: "/webm/frog.webm",
        poster: "../images/frog.jpg",
        feature: { url: "/webm/frog.webm", video: true }
      }
    ]
  },
  {
    name: "Video",
    path: "/video",
    description: "Projects I've produced, shot, or edited. <br /> Details are included in the individual project cards.",
    tools: ["AdobeAE", "AdobePremiere", "AdobePhotoshop", "AdobeAudition", "AbletonLive", "IzotopeRX8"],
    banner: [{ url: "../images/videoBanner.jpg", position: "top", fit: "cover", alt: "Video Banner" }],
    posts: [
      {
        slug: "editing-reel-2020",
        title: "Editing Reel 2020",
        subtitle: "Compilation",
        description: "Clips from projects both professional and personal. All footage shot, graded, edited by me.",
        category: "video",
        accent: "#fbcb71",
        tools: ["AdobeAE", "AdobePhotoshop", "AdobePremiere", "AdobeAudition"],
        video: "/webm/reel.webm",
        poster: "../images/reel.jpg",
        feature: { url: "https://www.youtube.com/embed/5T5K7Yu0BLs", embed: true }
      },
      {
        slug: "playlist-picks",
        title: "Playlist Picks",
        subtitle: "Music Interview Series",
        description: "An interview series that involved guests such as Busted, Peter Andre, Steven Yeun, and Zak Able building music playlists. All episodes were shot, edited, and released within the same day. Acted as Producer, Camera operator, editor, graphics, and music",
        category: "video",
        client: "Metro",
        accent: "#CE86E4",
        tools: ["AdobeAE", "AdobePhotoshop", "AdobePremiere", "AdobeAudition", "AbletonLive"],
        video: "/webm/playlist.webm",
        poster: "../images/playlist.png",
        feature: { url: "https://www.youtube.com/embed/XgoxUMr4iz4", embed: true },
        links: [
          {
            url: "https://www.youtube.com/watch?v=XgoxUMr4iz4&list=PLrWDSR5kkgKXZj13otfNCnO3vIp71zjrd&index=4",
            text: "Watch the series here!"
          }
        ]
      },
      {
        slug: "viewranger-stories",
        title: "ViewRanger Stories",
        subtitle: "Mini-Documentary Series",
        description: "A series of 11 mini-documentaries that followed users of the GPS tracking app ViewRanger. After the series I also edited a trailer for the app using the footage collected from the shoots alongside additional graphics.",
        category: "video",
        client: "ViewRanger",
        accent: "#138A40",
        tools: ["AdobeAE", "AdobePremiere", "AdobeAudition", "AbletonLive", "IzotopeRX8"],
        poster: "../images/viewranger.jpg",
        feature: { url: "https://www.youtube.com/embed/Cjf0rb3DTlc", embed: true }
      },
      {
        slug: "deepfakes",
        title: "Deepfakes",
        subtitle: "Journalism Feature",
        description: "A look into Deepfake technology.The piece includes a simple explanation of nerual networks, their applications, and how this has manifested into Deep Fake videos.",
        category: "video",
        client: "Metro.co.uk",
        accent: "#4472CA",
        tools: ["AdobeAE", "AdobePremiere"],
        poster: "../images/deep.jpg",
        feature: { url: "https://www.youtube.com/embed/TFy594yTAns", embed: true }
      }
    ]
  },
  {
    name: "Web Design",
    path: "/webdesign",
    description: "Sites I've built recently. Including this one!",
    tools: ["JS", "Tailwind", "React", "Gatsby", "SASS", "Netlify"],
    banner: [{ url: "../images/Desk.png", position: "center", fit: "cover", alt: "Web Design Banner" }],
    posts: [
      {
        slug: "reel-opinions",
        title: "Reel Opinions",
        subtitle: "Film Review Site",
        description: "I've been working on Reel Opinions with friends since early 2017, posting film reviews and podcasts. It's a great creative outlet to express your opinions, as well as get an excuse to talk about the latest films with people you care about.",
        category: "webdesign",
        accent: "#519872",
        tools: ["JS", "Tailwind", "React", "Gatsby", "Netlify"],
        poster: "../images/roBanner.jpg",
        feature: { image: "../images/roScreenshot.png" },
        links: [
          {
            url: "https://www.reelopinions.com",
            text: "Read some reviews here!"
          }
        ]
      },
      {
        slug: "jackgracie-portfolio",
        title: "JackGracie.co.uk",
        subtitle: "Personal Portfolio",
        description: "All coded by yours truely. Built on a Gatsby structure. The animation on the front page is using Lottie and After Effects",
        category: "webdesign",
        accent: "#FE5F55",
        tools: ["JS", "Tailwind", "React", "Gatsby", "SASS", "Netlify"],
        poster: "../images/portfolio.png",
        feature: { image: "../images/portfolio.png" },
        links: [
          {
            url: "https://jackgracie.co.uk",
            text: "You're already here!"
          }
        ]
      }
    ]
  }
];

export const projects: Project[] = skillCategories.flatMap(category => category.posts);