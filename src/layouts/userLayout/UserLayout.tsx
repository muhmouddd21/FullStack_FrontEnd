import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { User, LogOut, ListTodo, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './styles.module.css';
import { DashboardNavbar } from "@components/common";

const UserLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Bootstrap md breakpoint
      if (window.innerWidth >= 768) {
        setSidebarOpen(false); // Close mobile sidebar on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking on a nav item (mobile only)
  const handleNavClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <DashboardNavbar />
      
      {/* Mobile Burger Menu Button */}
      {isMobile && (
        <button
          className="burger-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'fixed',
            top: '70px',
            left: '15px',
            zIndex: 1100,
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1050
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div style={{ paddingTop: '58px', minHeight: "100vh" }}>
        <Row className="flex-nowrap">
          {/* Sidebar */}
          <Col
            md={2}
            className="d-flex flex-column p-3"
            style={{
              backgroundColor: "#f8f9fa",
              position: "fixed",
              top: "58px",
              bottom: 0,
              zIndex: 1060,
              transform: isMobile 
                ? `translateX(${sidebarOpen ? '0' : '-100%'})` 
                : 'translateX(0)',
              transition: 'transform 0.3s ease-in-out',
              width: isMobile ? '280px' : '16.666667%',
              left: 0
            }}
          >
            <nav className="sidebar-nav flex-grow-1">
              <ListGroup>
                <ListGroupItem 
                  as={NavLink} 
                  to="/" 
                  end
                  onClick={handleNavClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                    borderRadius: '6px',
                    marginBottom: '4px'
                  }}
                >
                  <User size={20} /> Profile
                </ListGroupItem>
                <ListGroupItem 
                  as={NavLink} 
                  to="/tasks"
                  onClick={handleNavClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                    borderRadius: '6px',
                    marginBottom: '4px'
                  }}
                >
                  <ListTodo size={20} /> Tasks
                </ListGroupItem>
              </ListGroup>
            </nav>
            <div className="sidebar-footer mt-auto">
              <ListGroup>
                <ListGroupItem 
                  as={NavLink} 
                  to="/logout"
                  onClick={handleNavClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  <LogOut size={20} /> Logout
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          {/* Main Content */}
          <Col
            md={10}
            className="p-4"
            style={{
              overflowY: 'auto',
              marginLeft: isMobile ? '0' : "16.666667%",
              paddingLeft: isMobile ? '15px' : '24px',
              paddingRight: isMobile ? '15px' : '24px',
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