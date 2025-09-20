import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Mail, AtSign } from 'lucide-react'; 
import { useAppSelector } from '@store/hooks';

const Profile = () => {
  const {user}=useAppSelector(state => state.Authslice)

  if (!user) {
    return <div className="text-center p-5">Please log in to view your profile.</div>;
  }

  return (
    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>User Profile</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <div className="d-flex align-items-center">
            <AtSign size={18} className="me-2 text-primary" />
            <span className="fw-semibold me-2">Username:</span>
            <span>{user.username} </span>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-flex align-items-center">
            <Mail size={18} className="me-2 text-primary" />
            <span className="fw-semibold me-2">Email:</span>
            <span>{user.email}</span>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Profile;