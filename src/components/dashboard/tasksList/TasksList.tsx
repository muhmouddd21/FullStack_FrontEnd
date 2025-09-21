import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useGetTasks, { getTasks} from "@hooks/useGetTasks";
import {CustomTable} from "@components/common";
import {   useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";



import { ColumnDefinition,TStatusType, TTask  } from "@customtypes/index";
import useRemoveTask from "@hooks/useRemoveTask";
import EditTodoModal from "@components/modals/EditTaskModal";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "@components/modals/ConfirmDeleteModal";
import useSearch from "@hooks/useSearch";


interface ITodoListProps {
    statusFilter: TStatusType;
    searchQuery: string;
}

const TasksList = ({ statusFilter, searchQuery }: ITodoListProps) => {
    const PAGE_LIMIT = 10; // no of tasks per page
    const [paginate, setPaginate] = useState(1); //paginate is no of page
    const queryClient = useQueryClient();


    const { isLoading, data: tasks, error } = useGetTasks(statusFilter, paginate);
    const { data: searchedTasks } = useSearch(searchQuery);

    // ==============================================================
    // if search is applied i need to get no of tasks after search to use it in pagination
    const isSearchApplied = searchQuery.length > 0;
    const dataToDisplay = isSearchApplied 
    ? searchedTasks?.data ?? [] 
    : tasks?.data ?? [];

    const totalCount = isSearchApplied 
    ? searchedTasks?.total ?? 0 
    : tasks?.total ?? 0;

    // Calculate total pages only after totalCount is available.
    const totalPages = totalCount ? Math.ceil(totalCount / PAGE_LIMIT) : 0;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
  // ###############################################################

  
  //Modals ================================================================
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<TTask | null>(null);



    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<TTask | null>(null);
    const { mutate: removeTodoMutation,isPending: isRemoving } = useRemoveTask();


    const handleShowEditModal = (task: TTask) => {
        setTaskToEdit(task);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setTaskToEdit(null);
        setShowEditModal(false);
    };

    const handleShowConfirmModal =(task:TTask) => {
        setTaskToDelete(task);
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = ()=>{
        setTaskToDelete(null);
        setShowConfirmModal(false);
    };
    
    const handleConfirmDelete = () => {
        if (taskToDelete !== null) {
        removeTodoMutation(taskToDelete, {
            onSuccess: () => {
            handleCloseConfirmModal();
            toast.success("Todo deleted successfully.", {
                theme: "dark"
            });
            },
            onError: () => {
            toast.error("Failed to delete todo.", {
                theme: "dark"
            });
            }
        });
        }
    };

//Modals ##################################################################



// Prefetch next page =======================================================
useEffect(() => {
    const nextPage = paginate + 1;
    const totalPages = totalCount ? Math.ceil(totalCount / 10) : 0;
    if (nextPage > totalPages) return;
    if (searchQuery) return;
    
    queryClient.prefetchQuery({
        queryKey: ["tasks",statusFilter ,nextPage],
        queryFn: () => getTasks(statusFilter, nextPage)
    });
}, [paginate, queryClient, searchQuery, statusFilter, totalCount]);

// Prefetch next page ##################################################
    

  // column definitions =====================================================

  const todoColumns: ColumnDefinition<TTask>[] = [
    {
      header: 'ID',
      width: '10%',
      cell: (task) => (
        <div className="d-flex justify-content-center">
          {task.id}
        </div>
      )
    },
    {
      header: 'Title',
      width: '60%',
      cell: (task) => {
        const linkPath = searchQuery.length === 0
          ? `/task?id=${task.id}&type=paginate&key=${paginate}`
          : `/task?id=${task.id}&type=search&key=${searchQuery}`;
        
        return (
          <div className="text-truncate">
            <Link to={linkPath}>{task.title}</Link>
          </div>
        );
      }
    },
    {
      header: 'Status',
      width: '10%',
      cell: (task) => (
      <div className="d-flex justify-content-center">
        <span
          className={`badge ${
            task.status.toLowerCase() === "completed"
              ? "bg-success"
              : task.status.toLowerCase() === "in progress"
              ? "bg-info"
              : "bg-warning"
          }`}
        >
          {task.status}
        </span>
      </div>

      )
    },
    {
      header: 'Actions',
      width: '20%',
      cell: (task) => (
        <div className="d-flex justify-content-center">
          <Button 
            variant="info" 
            size="sm" 
            onClick={() => handleShowEditModal(task)}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            className="ms-2" 
            onClick={() => handleShowConfirmModal(task)} 
            disabled={isRemoving}
          >
            Remove
          </Button>
        </div>
      )
    }
  ];


  // column definitions #######################################################

    if (isLoading){
        return (
            <div className="d-flex justify-content-center mt-4">
                <LottieHandler type="loading" message="Loading ..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center mt-4">
                <LottieHandler type="error" message={error.message || "An error occurred"} />
            </div>
        );
    }


    return (
        <div className="container mt-2">
            {/* Conditionally render the table or "no results" message */}
            {dataToDisplay && dataToDisplay.length > 0 ? (
                <>
                    <CustomTable data={dataToDisplay} columns={todoColumns} />
                    
                    {searchQuery.length === 0 && totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-3">
                            <ButtonGroup aria-label="Pagination">
                                {pageNumbers.map(page => (
                                    <Button
                                        key={page}
                                        variant={paginate === page ? "primary" : "light"}
                                        onClick={() => setPaginate(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>
                    )}
                </>
            ) : (
                <div className="d-flex justify-content-center mt-4">
                    <LottieHandler type="empty" message="No Results Found" />
                </div>
            )}

            <EditTodoModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                taskToEdit={taskToEdit}
            />
            <ConfirmDeleteModal
                show={showConfirmModal}
                handleClose={handleCloseConfirmModal}
                handleConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this Task?"
            />
        </div>
    );
};

export default TasksList;