"use client"
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useState } from "react";

export default function Page() {
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
    }
    
    return (
        <div className="flex items-center justify-center h-full m-auto">
            <div className="rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <Input label="Username" type="username" className="my-2" onChange={(e) => setUsername(e.target.value)}/>
                <Input label="Password" type="password" className="my-2" onChange={(e) => setPassword(e.target.value)}/>
                <Button className="my-2 w-full" color="primary" onPress={onClick}>Login</Button>
                <p className="text-sm my-2">
                    Don&apos;t have an account? <a href="/signup" className="text-primary">Sign up</a>
                </p>
            </div>
        </div>
    )
}