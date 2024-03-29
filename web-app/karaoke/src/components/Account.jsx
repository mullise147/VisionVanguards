import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/google.css"; 
import "../assets/styles/account.css"; 
import { auth } from '../firebase'; 
import { signInWithGoogle } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , updateProfile} from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; // Corrected Firestore import

const Account = () => {
  const [signupError, setSignupError] = useState(null);
  const [signinError, setSigninError] = useState(null);
  const [signinSuccess, setSignUpSuccess] = useState(null); 
  const navigateTo = useNavigate();

  const signupFinish = async (values) => {
    const { email, signupPassword, username } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, signupPassword);
      const user = userCredential.user;
      console.log('Signup successful:', user);
      
      // Initialize Firestore
      const db = getFirestore();
      
      // Save username to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username
      });
      
      setSignUpSuccess("Sign Up Successful!");
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(error.message);
    }
  };

  const signinFinish = async (values) => {
    const { signinEmail, signinPassword } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, signinEmail, signinPassword);
      const user = userCredential.user;
      console.log('Sign-In successful:', user);
      navigateTo('/leaderboard'); 
    } catch (error) {
      console.error('Sign-In error:', error);
      setSigninError(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle(); // Await for Google sign-in to complete
      navigateTo('/leaderboard'); 
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setSigninError(error.message);
    }
  };
  
  return (
    <>
      <Row justify="center" style={{ paddingTop: '25px' }}>
        {signupError && <Alert message={signupError} type="error" showIcon />}
        {signinError && <Alert message={signinError} type="error" showIcon />}
        {signinSuccess && <Alert message={signinSuccess} type="success" showIcon />}
      </Row>

      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={12}>
          <Card title="Sign Up" justify="center" align="middle" style={{ margin: '0 90px' }} className="form-item">
            <Form
              name="signupForm"
              initialValues={{ remember: true }}
              onFinish={signupFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
              >
                <Input placeholder="Email" />
              </Form.Item> 
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="signupPassword"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters long!' } // Custom validation rule
                ]}
              >
                <Input.Password placeholder="Password"/>
              </Form.Item>
              <Form.Item
                name="reenterPassword"
                dependencies={['signupPassword']}
                rules={[
                  { required: true, message: 'Please re-enter your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('signupPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Re-enter Password"/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Sign In" justify="center" align="middle" style={{ margin: '0 90px' }} className="form-item">
            <Form
              name="signinForm"
              initialValues={{ remember: true }}
              onFinish={signinFinish}
              onFinishFailed={onFinishFailed}
            >

              <Form.Item>
                <button className="gsi-material-button" onClick={googleSignIn}>
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">Sign in with Google</span>
                  </div>
                </button>
              </Form.Item>

              <Form.Item
                name="signinEmail"
                rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="signinPassword"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Account;