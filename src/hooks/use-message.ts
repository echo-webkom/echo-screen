import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../lib/sanity/message";

export function useMessage(){
    return useQuery({
        queryKey: ["use-message"],
        queryFn: fetchMessages
    })
}