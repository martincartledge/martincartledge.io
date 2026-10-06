import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://www.martincartledge.io/",
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
    name: "Mail",
    href: "mailto:martin@hey.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
