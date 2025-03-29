"use client"
import { axiosInstance } from "@/lib/axios";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onClick = () => {
        if (username.trim() == '' || password.trim() == '') {
            addToast({
                title: 'Ошибка',
                description: "Пожалуйста, заполните все поля",
                color: "danger"
            });
            return;
        }

        axiosInstance.post('/users/login', {
            username,
            password
        }).then((res) => {
            localStorage.setItem('token', res.data.token);
            router.push('/profile');
        })
        .catch((err) => {
            addToast({
                title: 'Ошибка',
                description: "Неверный логин или пароль",
                color: "danger"
            });
        })
    }
    
    return (
        <div className="flex items-center justify-center h-full m-auto">
            <div className="rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center">Логин</h1>
                <Input label="Имя пользователя" type="username" className="my-2" onChange={(e) => setUsername(e.target.value)}/>
                <Input label="Пароль" type="password" className="my-2" onChange={(e) => setPassword(e.target.value)}/>
                <Button className="my-2 w-full" color="primary" onPress={onClick}>Login</Button>
                <p className="text-sm my-2">
                    Нету аккаунта? <a href="/signup" className="text-primary">Зарегестрироватся</a>
                </p>
            </div>
        </div>
    )
}