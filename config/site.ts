export type SiteConfig = typeof siteConfig;

export const sitePages = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Archive",
    href: "/docs",
  }
];

const trainingPages = [
  {
    label: "Cyber simulations",
    href: "/cyber_simulation"
  },
  {
    label: "Simulations",
    href: "/simulation"
  },
  {
    label: "Bot",
    href: "/bot"
  },
];

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: sitePages,
  trainingItems: trainingPages,
  navMenuItems: sitePages.concat(trainingPages),
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "/docs",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
