"use client";

import { useState } from "react";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@heroui/button";

export const Hero = () => {

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
      <div className="inline-block max-w-xxl text-center justify-center">
        <span className={title()}>Интерактивная платформа для обучения полицейских:&nbsp;</span>
        <br />
        <span className={title({ color: "blue" })}>реальные сценарии&nbsp;</span>
        <span className={title()}>—&nbsp;</span>
        <span className={title({ color: "red" })}>реальные навыки&nbsp;</span>
        <br />

      </div>

      <div className="inline-block max-w-xl text-center justify-center">
        <div className={subtitle({ class: "mt-4" })}>
          Виртуальная среда для отработки решений в стрессовых ситуациях и повышения эффективности действий на месте происшествия.
        </div>
      </div>

      <div className="flex gap-3">
        <Link className={buttonStyles({ color: "primary", radius: "lg", variant: "shadow" }) + " text-secondary-foreground"}
          href="/profile"
        >
          Начать
        </Link>
        <Button className={buttonStyles({ color: "secondary", radius: "lg", variant: "shadow" })}
                onPress={() => document.getElementById('scroll')?.scrollIntoView({ behavior: 'smooth' })}>
          Узнать больше
        </Button>
      </div>
      <div></div>
    </section>
  );
};
