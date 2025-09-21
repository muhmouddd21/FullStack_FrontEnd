import { getTasksResponse, TTask } from "@customtypes/index";
import api from "@services/axios-global";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const editTask = async (task: TTask): Promise<TTask> => {
  const { data } = await api.put<TTask>(`/tasks/${task.id}`, task);
  return data;
};

const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TTask, Error, TTask>({
    mutationFn: editTask,

    onMutate: async (editedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const updateCache = (status: string) => {
        queryClient.setQueryData<getTasksResponse>(
          ["tasks", status, 1],
          (old) => {
            if (!old) return old;

            return {
              ...old,
              data: old.data.map((task) =>
                task.id === editedTask.id ? { ...task, ...editedTask } : task
              ),
            };
          }
        );
      };

      // update "All"
      updateCache("All");

      // update old status cache (in case it was changed)
      if (editedTask.status) {
        updateCache(editedTask.status);
      }

      // update single-task cache
      queryClient.setQueryData<TTask>(["task", editedTask.id], editedTask);

      return { editedTask };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["task"], exact: false });
    },
  });
};

export default useEditTask;