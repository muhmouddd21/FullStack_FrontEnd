import { Col, Container, Row } from 'react-bootstrap';
import {Button,Form,Alert,Spinner} from 'react-bootstrap';
import { SubmitHandler,useForm } from 'react-hook-form';
import { signInSchema,signInType } from '@validations/signInSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '@components/forms/Input/Input';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect } from 'react';
import { resetUI } from '@store/Auth/AuthSlice';
import ActAuthLogin from '@store/Auth/Actions/ActAuthLogin';
import { toast } from 'react-toastify';






export default function Login() {
  const [searchParams,setSearchParams]=useSearchParams();
  const navigate =useNavigate();
  const dispatch = useAppDispatch();
    const { error, loading, jwt } = useAppSelector((state) => state.Authslice);
      const {
        register,
        handleSubmit,
        formState: { errors },

      } = useForm<signInType>({
        mode:"onBlur",
        resolver:zodResolver(signInSchema)
      });
      const submitForm:SubmitHandler<signInType> =(data) =>{
          if (searchParams.get("message")) {
            setSearchParams("");
          }

        dispatch(ActAuthLogin(data))
        .unwrap().then(()=>{
          toast(`logged in successfully`,{
            theme:"dark"
          })
          navigate('/');
        }); 
          
        }

        useEffect(() => {

        return () => {
          dispatch(resetUI());
        };
      }, [dispatch, ]);

      useEffect(()=>{

        return ()=>{
          dispatch(resetUI());  
        }
      },[dispatch])


    if (jwt) {
      return <Navigate to="/" />;
    }
  return (
    
    <Container
    fluid
    className="d-flex justify-content-center align-items-center vh-100"
  >
    <Row className="w-100">
      <Col md={{ span: 4, offset: 4 }}>
        <div className="p-4 shadow-lg rounded bg-white">
          {searchParams.get("message") === "login_required" && (
            <Alert variant="info">
              You don't authorize to go here, please login first
            </Alert>
          )}

          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}

          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email Address"
              name="email"
              register={register}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
              type="password"
            />

            <Button
              variant="info"
              type="submit"
              className="text-light mt-2"
              style={{ width: "100%" }}
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>

            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
           <div className="mt-3 text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
      </Col>
    </Row>
  </Container>
     

  )
}