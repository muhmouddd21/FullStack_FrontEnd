export type TLoading ="idle" | "pending" | "succeeded" | "failed"

export type TStatusType = "all"|"Completed" | "Pending";
export interface TTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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
