import { useQuery } from "@tanstack/react-query";
import { fetchAllHungerGames } from "../lib/sanity/hunger-games";

export function useHungerGames(){
    return useQuery({
        queryKey: ["hungerGames"],
        queryFn: fetchAllHungerGames
    });
}