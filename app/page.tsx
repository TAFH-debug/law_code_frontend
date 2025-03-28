"use client";
import Block from "@/components/block";
import { Hero } from "@/components/hero";
import {Accordion, AccordionItem} from "@heroui/accordion";
export default function Home() {
  return (
    <div>
      <Hero />
      <div id="scroll" className="flex flex-row gap-20 justify-center items-stretch max-w-8xl mb-10">
        <div className="w-[500px] ">
          <Block BlockTitle="Что делает нашу платформу уникальной?"/>
          <Accordion variant="shadow">
            <AccordionItem key="1" title="Сценарные симуляции">Моделирование реальных ситуаций (захват заложников, киберпреступления, патрулирование).</AccordionItem>
            <AccordionItem key="2" title="Анализ действий">Подробный разбор результатов и персонализованные рекомендации по улучшению.</AccordionItem>
            <AccordionItem key="3" title="Многопользовательский режим">Совместные тренировки и отработка взаимодействия в команде.</AccordionItem>
            <AccordionItem key="4" title="Виртуальная реальность">Глубокое погружение для максимальной реалистичности.</AccordionItem>
            <AccordionItem key="5" title="Теоретический блок">Доступ к справочникам, нормативным актам и учебным материалам.</AccordionItem>
          </Accordion>
        </div>
        <div className="w-[500px] ">
          <Block BlockTitle="Как наша платформа улучшает навыки?"/>
          <Accordion variant="shadow" >
            <AccordionItem key="1" title="Регистрация">Создайте учетную запись и получите доступ к платформе.</AccordionItem>
            <AccordionItem key="2" title="Выбор сценария">Выберите интересующую ситуацию для тренировки (например, патруль, переговоры с преступником и т. д.).</AccordionItem>
            <AccordionItem key="3" title="Выполнение заданий">Выполняйте задания в режиме VR или на обычном компьютере, анализируйте результаты.</AccordionItem>
            <AccordionItem key="4" title="Получение обратной связи">Изучайте отчеты по эффективности, улучшайте навыки.</AccordionItem>
          </Accordion>

        </div>
      </div>
    </div>
  );
}
