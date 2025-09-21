import { getTasksResponse, TTask } from "@customtypes/index";
import api from "@services/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const removeTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

const useRemoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, TTask>({
    mutationFn: (task) => removeTask(task.id),

    onMutate: async (taskToRemove) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const updateCache = (status: string) => {
        queryClient.setQueryData<getTasksResponse>(
          ["tasks", status, 1],
          (old) => {
            if (!old) return old; // nothing to update
            return {
              ...old,
              data: old.data.filter((t) => t.id !== taskToRemove.id),
              total: old.total - 1,
            };
          }
        );
      };

      // remove from "All"
      updateCache("All");

      // remove from its status list (Completed / In Progress / Pending)
      updateCache(taskToRemove.status);

      return { taskToRemove };
    },


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (__, _, ___) => {
      // rollback by invalidating queries
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });
    },
  });
};

export default useRemoveTask;