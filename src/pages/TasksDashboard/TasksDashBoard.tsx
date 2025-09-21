import SearchQuery from "@components/dashboard/searchquery/SearchQuery";
import TaskListFilter from "@components/dashboard/taskListFilter/TaskListFilter";
import TasksList from "@components/dashboard/tasksList/TasksList";
import AddTaskModal from "@components/modals/AddTaskModal";
import { TStatusType } from "@customtypes/index";
import { useAppSelector } from "@store/hooks"
import { useState } from "react";
import {   Button, Col, Container, Row  } from "react-bootstrap"

const TasksDashBoard = () => {

  const [statusFilter,setStatuFilter]=useState<TStatusType>("All")
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const {user}=useAppSelector(state => state.Authslice)

      if (!user) {
      return <div className="text-center p-5">Please log in to view your profile.</div>;
    }
  // Functions to open and close the modal
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  return (
    <>

    <Container fluid="lg" className="my-4">
      <Row>
        {/* Left Section */}
        <Col xs={12} md={9} className="mb-4 mb-md-0">
          <TasksList statusFilter={statusFilter} searchQuery={searchQuery} />
        </Col>

        {/* Right Sidebar */}
        <Col xs={12} md={3}>
          <div className="d-grid gap-2 mb-4">
            <Button variant="primary" size="lg" onClick={handleShowAddModal}>
              + Add New Task
            </Button>
          </div>
          <SearchQuery searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {searchQuery.length === 0 && (
            <TaskListFilter
              statusFilter={statusFilter}
              setStatuFilter={setStatuFilter}
            />
          )}
        </Col>
      </Row>
    </Container>
    <AddTaskModal show={showAddModal} handleClose={handleCloseAddModal} />
    
    </>
  )
}

export default TasksDashBoard
