import { getTasksResponse, TTask } from "@customtypes/index";
import api from "@services/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const addTask = async (newTask: Omit<TTask, "id">): Promise<TTask> => {
  const { data } = await api.post<TTask>(`/tasks`, newTask);
  return data;
};

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TTask, Error, Omit<TTask, "id">>({
    mutationFn: addTask,

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const optimisticTask: TTask = {
        id: Date.now(),
        ...newTask,
      };

      const updateCache = (status: string) => {
        queryClient.setQueryData<getTasksResponse>(
          ["tasks", status, 1],
          (old) => {
            if (!old) { // if this is the only one be added
              return {
                data: [optimisticTask],
                total: 1,
                page: 1,
                limit: 10,
              };
            }
            return {
              ...old,
              data: [optimisticTask, ...old.data],
              total: old.total + 1,
            };
          }
        );
      };

      // update "All"
      updateCache("All");

      updateCache(optimisticTask.status);

      return { optimisticTask };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });
    },
  });
};

export default useAddTask;