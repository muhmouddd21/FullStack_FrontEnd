import { Col, Container, Row,Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SubmitHandler,useForm } from 'react-hook-form';
import { signUpSchema, signUpType } from '@validations/signUpSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '@components/forms/Input/Input';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { useNavigate } from 'react-router-dom';
import ActAuthRegister from '@store/Auth/Actions/ActAuthRegister';
import { toast } from 'react-toastify';



export default function Register() {
  const dispatch = useAppDispatch();
  const {loading,error}=useAppSelector(state=> state.Authslice)
  const navigate = useNavigate();

      const {
        register,
        handleSubmit,
        formState: { errors },

      } = useForm<signUpType>({
        mode:"onBlur",
        resolver:zodResolver(signUpSchema)
      });

    
const submitForm:SubmitHandler<signUpType> =(data) =>{
    const { username, email, password } = data;
    dispatch(ActAuthRegister({ username, email, password}))
    .unwrap()
    .then(()=>{
      toast("Your account has been created successfully",{
        position:"top-right",
        theme:"dark",

      })
      navigate("/login");
    })
  
}



  return (
 <Container
    fluid
    className="d-flex justify-content-center align-items-center vh-100"
  >
    <Row className="w-100">
      <Col md={{ span: 4, offset: 4 }}>
        <div className="p-4 shadow-lg rounded bg-white">
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Username"
              name="username"
              register={register}
              error={
                errors.username?.message
              }
            />

            <Input
              label="Email Address"
              name="email"
              register={register}
              error={
                errors.email?.message
              }
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
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
        </div>
      </Col>
    </Row>
  </Container>

   
    
     

  )
}