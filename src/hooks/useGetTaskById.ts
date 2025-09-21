import { TTask } from "@customtypes/index";
import api from "@services/axios-global";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";

const fetchTaskById = async (id: number): Promise<TTask> => {
  const response = await api.get<TTask>(`/tasks/${id}`);
  return response.data;
};

const useGetTaskById = (
  taskId: number | null,
  paramType: "paginate" | "search",
  paramKey: string
): UseQueryResult<TTask, Error> => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskById(taskId!),
    enabled: taskId !== null,

    initialData: () => {
      if (!taskId) return undefined;

      let cachedTasks: { data: TTask[] } | undefined;

      if (paramType === "paginate") {
        cachedTasks = queryClient.getQueryData<{ data: TTask[] }>([
          "tasks",
          "All", // or specific status filter if you had it
          Number(paramKey), // page number
        ]);
      } else if (paramType === "search") {
        cachedTasks = queryClient.getQueryData<{ data: TTask[] }>([
          "tasks",
          "search",
          { q: paramKey },
        ]);
      }

      return cachedTasks?.data.find((t) => t.id === taskId);
    },
  });
};

export default useGetTaskById;