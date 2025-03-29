import { NumberTicker } from "@/components/magicui/number-ticker";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";

export default function UserProfile() {
  const user = {
    name: "Ереха",
    surname: "Aboba",
    dateOfBirth: "1111-11-11",
    points: 1700,
    completedTasks: 85 
  };

  let leaderboard = [
    { name: "Talim", points: 1500 },
    { name: "Sanzhar", points: 1400 },
    { name: "Zangar", points: 1300 },
    { name: user.name, points: user.points },
  ];

  leaderboard.sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Привет, {user.name}!</h1>

      <div className="flex flex-col w-4/5 max-w-5xl border border-gray-700 rounded-3xl p-6 shadow-lg">
        
    
        
        <div className="flex">
          <div className="w-2/3 p-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Surname:</strong> {user.surname}</p>
            <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
            <p><strong>Points:</strong> <NumberTicker value={user.points} /></p>
          </div>

          <div className="flex flex-col items-end mb-6">
            <p className="text-lg font-semibold mb-2">Завершенные задачи</p>
            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={40}
              gaugePrimaryColor={user.completedTasks > 50 ? "#6ce223" : "#e22323"}
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
            />
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h2 className="text-xl font-bold mb-2 text-center">Leaderboard</h2>
          <ul className="divide-y divide-gray-600">
            {leaderboard.map((player, index) => (
              <li key={index} className="py-2 flex justify-between px-4">
                <span className="font-medium">#{index + 1} {player.name}</span>
                <span className="text-green-400"><NumberTicker value={player.points} /> pts</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
