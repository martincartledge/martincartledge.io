import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://martincartledge.io/",
  author: "Martin Cartledge",
  desc: "Personal technical blog",
  title: "Martin Cartledge",
  ogImage: "me.png",
  lightAndDarkMode: true,
  postPerPage: 10,
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
    href: "https://twitter.com/lexingdailylife",
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
];
