import type { SocialObjects } from "./types";

export const SITE = {
  website: "martincartledge.io",
  author: "Martin Cartledge",
  desc: "Personal technical blog",
  title: "Martin Cartledge",
  ogImage: "me.png",
  lightAndDarkMode: true,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/martincartledge",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/spindriftboi",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/martincartledge",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:martin@hey.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
];
