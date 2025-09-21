import { NavLink, useSearchParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { CheckCircle, XCircle, ArrowLeft, Clock } from "lucide-react";

import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useGetTaskById from "@hooks/useGetTaskById";
import { TTask } from "@customtypes/index";

const TaskDetails = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") as string;
  const paramType = searchParams.get("type") as "paginate" | "search";
  const paramKey = searchParams.get("key") as string;

  const { data: task, isLoading, isError } = useGetTaskById(+id, paramType, paramKey);

  if (isLoading) return <LottieHandler type="loading" message="Loading Task..." />;
  if (isError || !task) return <LottieHandler type="error" message="Could not load task." />;

  const getStatusBadge = (status: TTask["status"]) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <>
            <CheckCircle size={20} className="me-2 text-success" />
            <span className="fw-bold text-success">Completed</span>
          </>
        );
      case "in progress":
        return (
          <>
            <Clock size={20} className="me-2 text-info" />
            <span className="fw-bold text-info">In Progress</span>
          </>
        );
      default:
        return (
          <>
            <XCircle size={20} className="me-2 text-warning" />
            <span className="fw-bold text-warning">Pending</span>
          </>
        );
    }
  };

  return (
    <Container className="my-5" >
      <div className="d-flex align-items-center mb-4">
        <NavLink to="/tasks" className="btn btn-outline-secondary">
          <ArrowLeft size={20} className="me-2" /> Back to List
        </NavLink>
      </div>

      <h1 className="mb-4 text-primary">{task.title}</h1>
        <Card className="shadow-lg border-0">
        <Card.Header className="d-flex align-items-center bg-light">
            {getStatusBadge(task.status)}
        </Card.Header>
        <Card.Body>
            <Card.Text>
            <strong>User ID:</strong> {task.user_id}
            </Card.Text>
            <Card.Text>
            <strong>Task ID:</strong> {task.id}
            </Card.Text>
            {task.description && (
            <Card.Text className="mt-3">
                <strong>Description:</strong>
                <br />
                <span className="text-muted">{task.description}</span>
            </Card.Text>
            )}
        </Card.Body>
        </Card>
    </Container>
  );
};

export default TaskDetails;