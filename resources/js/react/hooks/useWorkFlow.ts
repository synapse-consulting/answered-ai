import { getWorkFlowByID, updateWorkFlow, getAllWorkflow } from "../api/workflow"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface WorkflowResponse {
  Workflow: {
    id: number;
    company_id: number;
    name: string;
    description: string;
    executable_flow: {
      nodes: any[];
      edges: any[];
    };
  };
}


interface Workflow  {
  id: number;
  name: string;
};

export const useWorkflow = (id: string) => {
    return useQuery<WorkflowResponse>({
        queryKey: ["workflow", id],
        queryFn: () => getWorkFlowByID(id),
        enabled: !!id,

    })
}

export const useAllWorkflows = () => {
  return useQuery<Workflow[]>({
    queryKey: ['workflows'],
    queryFn: () => getAllWorkflow(),
  })
}

export function useUpdateWorkflow(id: string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {
            name: string;
            description: string;
            executable_flow: any;
        }) => updateWorkFlow(id, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["workflow", id]})
            }
        })
}
