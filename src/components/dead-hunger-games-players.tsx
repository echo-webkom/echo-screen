import { useHungerGames } from "../hooks/use-hunger-games";
import { urlFor } from "../lib/sanity";

export default function DeadHungerGamesPlayers() {
  const { data } = useHungerGames();

  const players = data?.all;

  if (players === undefined || players.length === 0) {
    return (
      <h1 className="text-6xl top-1/3 absolute text-center text-red-600 font-semibold ">
        Ingen spillere i Nerd Assassins har dødd enda!
      </h1>
    );
  }

  return (
    <div>
      <h1 className="text-center text-6xl pt-8 font-semibold text-red-600">
        Disse har blitt eliminert fra Nerd Assassins:
      </h1>
      <div className="flex flex-wrap gap-4 pt-8 justify-center">
        {players.map((player) => {
          return (
            <div key={player._id}>
              {player.profile.picture && (
                <div>
                  <div className="-translate-x-2">
                    <div className="absolute rotate-45 translate-y-14 bg-red-600 h-[4px] w-32"></div>
                    <div className="absolute -rotate-45 translate-y-14 bg-red-600 h-[4px] w-32"></div>
                  </div>
                  <img
                    className="border-4 border-red-600 rounded-full h-28 w-28"
                    src={urlFor(player.profile.picture).width(300).height(300).url()}
                    alt={player.profile.name}
                  />
                  <p className="text-center text-red-600 font-semibold">
                    {player.profile.name.split(" ")[0]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
