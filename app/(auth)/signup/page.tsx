"use client";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onClick = () => {
        if (username.trim() == '' || password.trim() == '' || confirmPassword.trim() == '') {
            addToast({
                title: 'Ошибка',
                description: "Пожалуйста, заполните все поля",
                color: "danger"
            });
            return;
        }

        if (password !== confirmPassword) {
            addToast({
                title: 'Ошибка',
                description: "Пароли не совпадают",
                color: "danger"
            });
            return;
        }

        axiosInstance.post('/users', {
            username,
            password
        })
        .then((res) => {
            router.push('/signin');
        })
        .catch((err) => {
            addToast({
                title: 'Ошибка',
                description: "Пользователь с таким именем уже существует",
                color: "danger"
            });
        })
    }

    return (
        <div className="flex items-center justify-center h-full m-auto">
            <div className="rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center">Регистрация</h1>
                <Input label="Имя пользователя" type="username" className="my-2" onChange={(e) => setUsername(e.target.value)}/>
                <Input label="Пароль" type="password" className="my-2" onChange={(e) => setPassword(e.target.value)}/>
                <Input label="Подтвердите пароль" type="password" className="my-2"  onChange={(e) => setConfirmPassword(e.target.value)}/>
                <Button className="my-2 w-full" color="primary" onPress={onClick}>Зарегестрироватся</Button>
                <p className="text-sm my-2">
                    Уже есть аккаунт? <a href="/signin" className="text-primary">Войти</a>
                </p>
            </div>
        </div>
    )
}