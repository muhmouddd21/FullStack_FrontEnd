export type TLoading ="idle" | "pending" | "succeeded" | "failed"

export type TStatusType = "All"|"Completed" | "Pending" | "In progress";
export interface TTask {
  user_id: number;
  id: number;
  title: string;
  description:string;
  status:TStatusType;
  
}
export interface getTasksResponse{
  total:number,
  page:number,
  limit:number,
  data:TTask[]
}

export interface ColumnDefinition<T> {
  header: string;
  cell: (row: T) => React.ReactNode;
  width?: string;
}
export type TUser={
  id:number,
  email:string,
  username:string
}
