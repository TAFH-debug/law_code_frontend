export type SiteConfig = typeof siteConfig;

export const sitePages = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Archive",
    href: "/docs",
  },
  {
    label: "Training",
    href: "/pricing",
  },
  {
    label: "Bot",
    href: "/bot",
  },
  {
    label: "Simulation",
    href: "/simulation",
  },
]

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: sitePages,
  navMenuItems: sitePages,
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "/docs",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
