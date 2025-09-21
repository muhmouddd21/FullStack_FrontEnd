import { getTasksResponse, TStatusType } from "@customtypes/index";
import api from "@services/axios-global";
import { useQuery, UseQueryResult} from "@tanstack/react-query";

const PAGE_LIMIT = 10;


// fn to get tasks according to the filter be setted 
export const getTasks = async (
  selectedStatus: TStatusType,
  paginate: number
): Promise<getTasksResponse> => {
  let url = `/tasks?page=${paginate}&limit=${PAGE_LIMIT}`;

  
  if (selectedStatus !== "All") {
    const status = selectedStatus === "In progress" ? "in progress" : selectedStatus;
    url = `/tasks?status=${encodeURIComponent(status.toLowerCase())}&page=${paginate}&limit=${PAGE_LIMIT}`;
  }

  const response = await api.get<getTasksResponse>(url);
  return response.data;
};

const useGetTasks = (
  selectedStatus: TStatusType,
  paginate: number
): UseQueryResult<getTasksResponse, Error> => {

  
  return useQuery({
    queryKey: ['tasks', selectedStatus, paginate], // Simplified key structure
    queryFn: () => getTasks(selectedStatus, paginate),
    staleTime: 1000 * 10, // 10 seconds (fixed calculation)
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime) garpage collection time
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    refetchOnMount: true,
    enabled: true, // Explicitly enable the query
  });
};

export default useGetTasks;