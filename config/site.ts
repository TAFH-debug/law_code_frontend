export type SiteConfig = typeof siteConfig;

export const sitePages = [
  {
    label: "Домашняя страница",
    href: "/",
  },
  {
    label: "Архив",
    href: "/docs",
  }
];

const trainingPages = [
  {
    label: "Кибер симуляции",
    href: "/cyber_simulation"
  },
  {
    label: "Симуляции переговоров",
    href: "/simulation"
  },
  {
    label: "Бот помощник",
    href: "/bot"
  },
  {
    label: "Анализ",
    href: "/analysis"
  }
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
