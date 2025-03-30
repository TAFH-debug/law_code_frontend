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
import { axiosInstance } from "@/lib/axios";

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
    description: 'Привет это тестовое задание. Найди флаг в логах системы. Напиши help для получения списка команд.',
    files: [
        {   name: 'linux1.logs', 
            content: 
            'Mar 30 14:25:17 server01 sshd[25437]: Accepted publickey for admin from 192.168.1.105 port 59022 ssh2: RSA SHA256:k8HU7JyI8h4jf5K+fzjL0/SnJLa+dTa+K2EhQzyElnQ \n \
Mar 30 14:25:17 server01 systemd-logind[684]: New session 294 of user admin.\n \
Mar 30 14:27:32 server01 kernel: [4231152.152531] CPU2: Core temperature above threshold, cpu clock throttled (total events = 1) \n \
Mar 30 14:30:05 server01 nginx[1234]: 192.168.0.14 - - [30/Mar/2025:14:30:05 +0000] "GET /api/v1/status HTTP/1.1" 200 1024 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" \n \
Mar 30 14:32:18 server01 cron[8642]: (root) CMD (/usr/local/bin/backup.sh) \n \
Mar 30 14:35:01 server01 systemd[1]: Starting Daily apt upgrade and clean activities... \n \
Mar 30 14:35:07 server01 sudo[29578]: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/systemctl restart postgresql' }, 
        { name: 'linux2.logs', content: 'flag{example_flag}' },
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
                result = 'Доступные команды: \n \
                help - показать список команд \n \
                task - показать описание задачи \n \
                files - показать файлы \n \
                cat <имя_файла> - показать содержимое файла \n \
                flag <флаг> - проверить флаг \n \ ';
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
                axiosInstance.put("/users/me?score=100");
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
                        <div key={index} className='text-md text-wrap'>
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