
import { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { v4 as generateID } from 'uuid';
import bcrypt from 'bcryptjs';
// import FooterContext from '../../contexts/FoooterContext';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import {  Link, useNavigate } from 'react-router';
import type { User, UserContextTypes } from '../../types';
import UserContext from '../../contexts/UsersContext';
// import UsersContext from '../../contexts/UsersContext';

// const Register = styled.div`
//   background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
//   height: max-content;
//   display: flex;
//   justify-content: center;
// `;

// const Container = styled.div`
//   background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
//   border-radius: 24px;
//   box-sizing: border-box;
//   padding: 48px 100px;
//   width:686px;
//   margin: 80px 0;
//   text-align: center;
//   color: white;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
// `;

// const Title = styled.h2`
//   font-size: 24px;
//   font-weight: bold;
// `;

// const AuthButton = styled.button`
//   background: transparent;
//   border: 2px solid rgba(255, 255, 255, 0.2);
//   color: white;
//   padding: 14px 20px;
//   margin: 8px 0;
//   width: 100%;
//   font-size: 16px;
//   border-radius: 9999px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   transition: background 0.2s;
//   &:hover 
//   {
//     background: rgba(255, 255, 255, 0.05);
//   }
// `;

// const StyledMainIconWrapper = styled.div`
//   border: 2px solid rgba(255, 255, 255, 0.2);
//   border-radius: 20px;
//   width: 90px;
//   height: 90px;
//   margin: 0 auto 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: rgba(255, 255, 255, 0.05);
// `;

// const StyledMainIcon = styled(SportsEsportsRoundedIcon)`
//   font-size: 150px;
//   color: white;
// `;

// const FieldWrapper = styled.div`
//   margin-bottom: 12px;
// `;

// const Label = styled.label`
//   font-size: 12px;
//   font-weight: bold;
//   display: block;
//   margin-bottom: 4px;
// `;

// const ErrorText = styled.div`
//   font-size: 12px;
//   color: #92288d;
//   margin-top: 4px;
// `;

// const InfoText = styled.div`
//   font-size: 12px;
//   color: #007185;
//   margin-top: 4px;
//   margin-bottom: 12px;
// `;

// const Divider = styled.hr`
//   width: 100%;
//   border: none;
//   border-top: 1px solid #d5d9d9;
//   margin: 20px 0;
// `;

// const StyledField = styled(Field)`
//   width: 100%;
//   padding: 6px;
//   font-size: 12px;
//   border: 1px solid #a6a6a6;
//   border-radius: 3px;
// `;

// const RegisterPage = () => {

//     // const {setShowFooter } = useContext(FooterContext);
    
//     // useEffect(() => {
//     //     setShowFooter(true);
//     // }, [setShowFooter]);  
        
//     const { register } = useContext(UserContext) as UserContextTypes;
//     const [afterRegisterMessage, setAfterRegisterMessage] = useState('');
//     const navigate = useNavigate();
//     // const [keepLoggedIn, setKeepLoggedIn] = useState(false);
//     // const { users, dispatch, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  
//     const initialValues: InitValues = {
//       name: '',
//       email: '',
//       password: '',
//       passwordRepeat: '',
//       role: 'user'
//     };
  
//     const validationSchema = Yup.object({
//       username: Yup.string()
//         .min(5, 'Username too short.')
//         .max(20, 'Username too long.')
//         .required('This field is required.'),
//       email: Yup.string()
//         .email('Enter a valid email.')
//         .required('This field is required.'),
//       password: Yup.string()
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
//           'Password must include at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be 8–25 characters long.'
//         )
//         .required('This field is required.'),
//       passwordRepeat: Yup.string()
//         .oneOf([Yup.ref('password')], 'Passwords must match.')
//         .required('This field is required.'),
//     });
  
//     type InitValues = Omit<User, 'id' | 'passwordText' | 'joined'> & { passwordRepeat: string };
  
//     const handleSubmit = async (
//       values: InitValues,
//       { setErrors }: FormikHelpers<InitValues>
//     ) => {

//       setAfterRegisterMessage('');
//       const Register_Response = await register(values);
//       if('error' in Register_Response){
//         setAfterRegisterMessage(Register_Response.error);
//       } else {
//         setAfterRegisterMessage(Register_Response.success);
//         setTimeout(() => navigate('/'), 2000);
//       }
//       // TODO: Replace with actual user registration logic
//       // const emailExists = users.some(user => user.email === values.email);
//       // const usernameExists = users.some(user => user.username === values.username);
  
//       // if (emailExists || usernameExists) {
//       //   setErrors({
//       //     ...(emailExists ? { email: 'This email already exists.' } : {}),
//       //     ...(usernameExists ? { username: 'This username already exists.' } : {})
//       //   });
//       //   return;
//       // }
  
//       // const newUser: User = {
//       //   id: generateID(),
//       //   username: values.username,
//       //   email: values.email,
//       //   password: bcrypt.hashSync(values.password, 10),
//       //   passwordText: values.password,
//       //   role: 'customer',
//       //   joined: new Date().toISOString()
//       // };
  
//       // dispatch({ type: "addUser", newUser });
//       // setLoggedInUser(newUser);
//       // localStorage.setItem("loggedInUser", JSON.stringify(newUser));
//       // navigate("/");
//     };
  
//     return (  
//         <Register>
//             <Container>
//                 <StyledMainIconWrapper>
//                     <StyledMainIcon />
//                 </StyledMainIconWrapper>
//                 <Title>Register</Title>               
                    
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
                            
//                     {() => (
//                         <Form>
//                             <FieldWrapper>
//                                 <Label htmlFor="username">Your name</Label>
//                                 <StyledField name="username" type="text" placeholder="First and last name" />
//                                 <ErrorMessage name="username" component={ErrorText} />
//                             </FieldWrapper>
//                             <FieldWrapper>
//                                 <Label htmlFor="email">Email</Label>
//                                 <StyledField name="email" type="email" />
//                                 <ErrorMessage name="email" component={ErrorText} />
//                             </FieldWrapper>
//                             <FieldWrapper>
//                                 <Label htmlFor="password">Password</Label>
//                                 <StyledField name="password" type="password" placeholder="at least 8 characters" />
//                                 <ErrorMessage name="password" component={ErrorText} />
//                                 <InfoText>Passwords must be at least 8 characters.</InfoText>
//                             </FieldWrapper>
//                             <FieldWrapper>
//                                 <Label htmlFor="passwordRepeat">Re-enter password</Label>
//                                 <StyledField name="passwordRepeat" type="password" />
//                                 <ErrorMessage name="passwordRepeat" component={ErrorText} />
//                             </FieldWrapper>
                            
//                             <AuthButton type="submit">     
//                                 Create your account
//                             </AuthButton>  

//                             <Divider />
                        
                                
//                             <p> Already have an account?</p>
//                             <Link to="/login"> 
//                                 <AuthButton>     
//                                     Continue with Login
//                                 </AuthButton>   
//                             </Link>      
//                         </Form>

//                     )}
//                 </Formik>
//             </Container>
//          </Register>
//     );
// }
 
// export default RegisterPage;


const Register = styled.div`
  background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  background: linear-gradient(180deg, #0f2027, #203a43, #2c5364);
  border-radius: 24px;
  padding: 40px 24px;
  max-width: 400px;
  margin: 80px 0;
  text-align: center;
  color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
`;

const StyledMainIconWrapper = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  width: 90px;
  height: 90px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
`;

const StyledMainIcon = styled(SportsEsportsRoundedIcon)`
  font-size: 150px;
  color: white;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #d5d9d9;
  margin: 20px 0;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 6px;
  font-size: 12px;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  margin-bottom: 8px;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: red;
  margin-bottom: 8px;
`;

const AuthButton = styled.button`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  width: 100%;
  font-size: 16px;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const RegisterPage = () => {
  const { register, loggedInUser } = useContext(UserContext) as UserContextTypes;
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const initialValues: Omit<User, 'id'> & { confirmPassword: string } = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    _id: '',
    passwordText: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const { confirmPassword, ...userData } = values;

    const response = await register(userData);

    if ('error' in response) {
      setMessage(response.error);
    } else {
      setMessage(response.success);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser]);

  return (
    <Register>
      <Container>
        <StyledMainIconWrapper>
          <StyledMainIcon />
        </StyledMainIconWrapper>
        <Title>Register</Title>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Label htmlFor="name">Name</Label>
                <StyledField type="text" name="name" />
                <ErrorMessage name="name" component={ErrorText} />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <StyledField type="email" name="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <StyledField type="password" name="password" />
                <ErrorMessage name="password" component={ErrorText} />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <StyledField type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component={ErrorText} />
              </div>

              <AuthButton type="submit" disabled={isSubmitting}>
                Register
              </AuthButton>

              {message && <p>{message}</p>}

              <Divider />

              <p>Already have an account?</p>
              <Link to="/login">
                <AuthButton>Login</AuthButton>
              </Link>
            </Form>
          )}
        </Formik>
      </Container>
    </Register>
  );
};

export default RegisterPage;