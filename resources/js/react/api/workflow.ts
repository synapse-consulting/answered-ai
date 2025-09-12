import { apiClient } from "./client";

export const getWorkFlowByID = (id: string) =>  {
     return apiClient<{Workflow: {id:number, name: string, description: string, company_id: number, executable_flow: {nodes: any[]; edges: any[]}}}>(`/api/workflow/${id}`)
}

export const getAllWorkflow = async () => {
  const res = await apiClient<{ workflows: { id: number; name: string }[] }>(
    `/workflows`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  // pick only workflows with id + name
  return res.workflows.map((w) => ({
    id: w.id,
    name: w.name,
  }));
};


export const updateWorkFlow = (
     id: string,
     data: {name: string; description: string; executable_flow: any}
) => 
     apiClient(`/api/workflow/${id}`,{
          method: "PUT",
          body: JSON.stringify(data),
     });