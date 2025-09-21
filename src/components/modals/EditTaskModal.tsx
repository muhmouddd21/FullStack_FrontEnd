import { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import useEditTask from "@hooks/useEditTask";
import { TStatusType, TTask } from "@customtypes/index";
import { GenericModal } from "@components/common/index";
import { useAppDispatch } from "@store/hooks";
import { toast } from "react-toastify";

interface IEditTaskModalProps {
  show: boolean;
  handleClose: () => void;
  taskToEdit: TTask | null;
}

const EditTaskModal = ({ show, handleClose, taskToEdit }: IEditTaskModalProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TStatusType>("Pending");
  const { mutate, isPending, isSuccess, isError, error, reset } = useEditTask();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setStatus(taskToEdit.status as TStatusType);
    } else {
      setTitle("");
      setStatus("Pending");
    }
  }, [taskToEdit]);

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!title.trim() || !taskToEdit) return;

    mutate({
      ...taskToEdit,
      title,
      status,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task updated successfully!");
      handleClose();
      reset();
    }
    if (isError) {
      toast.error("Failed to update task.");
    }
  }, [isSuccess, isError, handleClose, reset, dispatch]);

  return (
    <GenericModal show={show} onHide={handleClose} title="Edit Task">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Edit the Task title"
              disabled={isPending}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value as TStatusType)}
            disabled={isPending}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>

        {isError && (
          <Form.Text className="text-danger">
            {error instanceof Error ? error.message : "An unknown error occurred."}
          </Form.Text>
        )}

        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isPending || !title.trim()}
            className="ms-2"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Form>
    </GenericModal>
  );
};

export default EditTaskModal;