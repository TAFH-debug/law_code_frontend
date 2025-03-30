"use client";
import { Terminal } from "@/components/magicui/terminal";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { addToast } from "@heroui/toast";
import { useEffect, useState } from "react";
import { Source_Code_Pro } from "next/font/google";
import { Card } from "@heroui/card";
import { AnimatedCircularProgressBarLarge } from "@/components/magicui/animated-circular-progress-bar-large";
import { Button } from "@heroui/button";
import Link from "next/link";

interface File {
    name: string;
    content: string;
}

interface Task {
    description: string;
    files: File[];
    flag: string;
}

const exampleTask: Task = {
    description: 'Привет, это тестовое задание.',
    files: [
        { name: 'file1.txt', content: 'Это содержимое файла 1.' },
        { name: 'file2.txt', content: 'Это содержимое файла 2.' },
    ],
    flag: 'flag{example_flag}'
}

const terminalFont = Source_Code_Pro({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-terminal',
});

export default function Page() {
    const [cmd, setCmd] = useState<string>('> ');
    const [task, setTask] = useState<Task | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => {
        setTask(exampleTask);
    }, []);

    function handleCmd() {
        const command = cmd.substring(2).trim();

        let result = '';
        switch (command) {
            case 'help':
                result = 'Доступные команды: help, task, files, cat, flag';
                break;
            case 'task':
                result = task!.description;
                break;
            case 'files':
                result =  task!.files.map(file => file.name).join('\n');
                break;
            case 'cat':
                result = 'Укажите файл для просмотра: cat <имя_файла>';
                break;
            default:
                result = 'Неизвестная команда. Напиши "help" для списка команд.'
        }

        if (command.startsWith('cat ')) {
            const fileName = command.substring(4).trim();
            const file = task!.files.find(f => f.name === fileName);
            if (file) {
                result = file.content;
            }
            else {
                result = `Файл ${fileName} не найден.`;
            }
        }
        else if (command.startsWith('flag')) {
            const flag = command.substring(5).trim();
            if (flag === task!.flag) {
                result = 'Поздравляю! Ты нашел флаг!';
                setScore(100);
                addToast({
                    description: 'Симуляция завершена!',
                    title: 'Успех!',
                    color: 'success',
                })
            }
            else {
                result = 'Неверный флаг.';
            }
        }

        setCmd('> ');
        setMessages((prev) => [...prev, cmd, result]);
    }

    if (task == null) {
        return (
            <Terminal className={"w-full h-[600px] max-w-full max-h-[600px] m-auto overflow-scroll " + terminalFont.className}>
                <TypingAnimation className='text-md text-wrap' duration={50}>
                    Загружаю симуляцию...
                </TypingAnimation>
            </Terminal>
        )
    }

    if (score !== null) {
        return <div className="flex flex-col justify-center items-center h-full">
            <Card className="flex flex-col items-center">
                <h1 className="font-bold text-lg m-5">Ты получил {score} очков за эту миссию.</h1>
                <AnimatedCircularProgressBarLarge 
                    className="m-5"
                    max={100} 
                    value={score} 
                    min={0} 
                    gaugePrimaryColor="#438de1"
                    gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                >
                </AnimatedCircularProgressBarLarge>
                <Button className="m-5" color="primary" as={Link} href="/profile">
                    Продолжить
                </Button>
            </Card>
        </div>
    }

    return (
        <Terminal className={"w-full h-[600px] max-w-full max-h-[600px] m-auto overflow-scroll " + terminalFont.className}>
            <TypingAnimation className='text-md text-wrap max-w-full' duration={50}>
                Привет это тренировочный полигон для противостояния киберпреступлениям.
                Здесь ты можешь попробовать свои силы в защите от киберугроз.
            </TypingAnimation>
            <div>
                Твоя задача: <br/>
                {task.description}
            </div>
            {
                messages.map((msg, index) => {
                    return (
                        <div key={index} className='text-md'>
                            {msg}
                        </div>
                    )
                })
            }
            <input className="outline-none bg-transparent text-md" value={cmd} onChange={(e) => {
                if (!e.target.value.startsWith('> ')) {
                    setCmd('> ');
                    return;
                }
                setCmd(e.target.value);
            }} onKeyDown={(e) => e.key === "Enter" && handleCmd()} />
        </Terminal>
    )
}