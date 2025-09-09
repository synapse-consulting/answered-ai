const baseUrl =
    document
        .querySelector('meta[name="app-url"]')
        ?.getAttribute("content") || "";

export async function apiClient<T>(endPoint:string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${baseUrl}${endPoint}`,{
        headers:{
            "Content-Type": "application/json",
        },
        ...options,
    });
    if(!res.ok){
        throw new Error(`Error: ${res.status}`);
    }    
    return res.json();
}