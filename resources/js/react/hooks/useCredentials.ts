import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllCredentials } from "../api/credential";


interface credentials  {
  id: number;
  name: string;
};

export const useCredential = (id: string) => {
    return useQuery<credentials[]>({
        queryKey: ["credentials", id],
        queryFn: () => getAllCredentials(id),
        enabled: !!id,
    })
}