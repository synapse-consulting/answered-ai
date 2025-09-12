import { apiClient } from "./client";


export const getAllCredentials = async (id: string) => {
    const res = await apiClient<{credentials: {id:number, name:string}[] }>(`/api/credentials?company_id=${id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    return res.credentials;
}