"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useState } from "react";

export default function Page() {

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
    }

    return (
        <div className="flex items-center justify-center h-full m-auto">
            <div className="rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <Input label="Username" type="username" className="m-2" onChange={(e) => setUsername(e.target.value)}/>
                <Input label="Password" type="password" className="m-2" onChange={(e) => setPassword(e.target.value)}/>
                <Input label="Confirm Password" type="password" className="m-2"  onChange={(e) => setConfirmPassword(e.target.value)}/>
                <Button className="m-2 w-full" color="primary" onPress={onClick}>Sign Up</Button>
            </div>
        </div>
    )
}