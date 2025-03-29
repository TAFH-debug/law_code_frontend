"use client";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { AnimatedCircularProgressBarLarge } from "@/components/magicui/animated-circular-progress-bar-large";

interface UserData {
  username: string;
  score: number;
  passed_simulation_ids: string;
  passed_cyber_simulation_ids: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);

  let [leaderboard, setLeaderboard] = useState<UserData[]>([]);

  useEffect(() => {
    axiosInstance.get("/users/me").then((res) => {
      setUser(res.data);
    });

    axiosInstance.get("/users/leaders").then((res) => {
      console.log(res.data);
      setLeaderboard(res.data);
    });
  }, []);

  if (user === null) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Привет, {user.username}!</h1>

      <div className="flex flex-col w-4/5 max-w-5xl border border-gray-700 rounded-3xl p-6 shadow-lg">
        <div className="flex">
          <div className="w-2/3 p-4">
            <p><strong>Имя пользователя:</strong> {user.username}</p>
            <p><strong>Количество пройденных симуляций:</strong> {user.passed_simulation_ids.length}</p>
            <p><strong>Количество очков:</strong> <NumberTicker value={user.score} /></p>
          </div>

          <div className="flex flex-col mb-6 items-center">
            <p className="text-lg font-semibold mb-2">Завершенные задачи</p>
            <AnimatedCircularProgressBarLarge
              max={100}
              min={0}
              value={user.score % 100}
              gaugePrimaryColor={user.passed_simulation_ids.length > 50 ? "#6ce223" : "#e22323"}
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
            />
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h2 className="text-xl font-bold mb-2 text-center">Лидеры</h2>
          <ul className="divide-y divide-gray-600">
            {leaderboard.map((player, index) => (
              <li key={index} className="py-2 flex justify-between px-4">
                <span className="font-medium">#{index + 1} {player.username}</span>
                <span className="text-green-400"><NumberTicker value={player.score} /> pts</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
