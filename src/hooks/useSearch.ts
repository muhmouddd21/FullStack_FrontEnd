import { getTasksResponse } from "@customtypes/index";
import api from "@services/axios-global";
import { useQuery, UseQueryResult } from "@tanstack/react-query";



const fetchData = async (q: string): Promise<getTasksResponse> => {
  const response = await api.get(`/tasks?q=${q}`);
  return response.data;
};
const useSearch = (q: string): UseQueryResult<getTasksResponse> => {
  return useQuery({
    queryKey: ["tasks", "search", { q}],
    queryFn: () => fetchData(q),
    enabled: q.length > 0,
    refetchInterval: 1000 * 20,
  });
};

export default useSearch;