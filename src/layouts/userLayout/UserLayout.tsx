import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { User, LogOut, ListTodo } from 'lucide-react'; 

import './styles.module.css';
import { DashboardNavbar } from "@components/common";

const UserLayout = () => {
  return (
    <>
      <DashboardNavbar />

      <div style={{ paddingTop: '58px', minHeight: "100vh" }}>
        <Row className="flex-nowrap">
          <Col 
            md={2}
            className="d-flex flex-column p-3"
            style={{ 
              backgroundColor: "#f8f9fa",
              position: "fixed",  
              top: "58px",        
              bottom: 0,          
              zIndex: 1000        
            }}
          >
            <nav className="sidebar-nav flex-grow-1">
              <ListGroup>
                <ListGroupItem as={NavLink} to="/" end>
                  <User size={20} /> Profile
                </ListGroupItem>
                <ListGroupItem as={NavLink} to="/tasks">
                  <ListTodo size={20} /> Tasks
                </ListGroupItem>
              </ListGroup>
            </nav>

            <div className="sidebar-footer mt-auto">
              <ListGroup>
                <ListGroupItem as={NavLink} to="/logout">
                  <LogOut size={20} /> Logout
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col
            md={10} 
            className="p-4"
            style={{ 
              overflowY: 'auto',
              marginLeft: "16.666667%",
            }}
          >
            <main className="flex-grow-1">
              <Outlet />
            </main>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserLayout;