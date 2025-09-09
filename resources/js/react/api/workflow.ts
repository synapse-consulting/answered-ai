import { apiClient } from "./client";

export const getWorkFlowByID = (id: string) =>  {
     return apiClient<{Workflow: {id:number, name: string, description: string, executable_flow: {nodes: any[]; edges: any[]}}}>(`/api/workflow/${id}`)
}

export const updateWorkFlow = (
     id: string,
     data: {name: string; description: string; executable_flow: any}
) => 
     apiClient(`/api/workflow/${id}`,{
          method: "PUT",
          body: JSON.stringify(data),
     });