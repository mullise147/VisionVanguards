import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Alert, Row } from 'antd';
import { auth } from '../firebase'; 
import { updateEmail, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [email, setEmail] = useState(auth.currentUser.email || ''); // Sample email
  const [password, setPassword] = useState(''); // Sample password
  const navigate = useNavigate(); 

  const [deleteError, setdeleteError] = useState(null);
  const [changeUserError, setchangeUserError] = useState(null);
  const[changePWError, setchangePWError] = useState(null); 
  const [changeUserSuccess, setchangeUserSuccess] = useState(null); 
  const [changePWSuccess, setchangePWSuccess] = useState(null); 

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const [formItemLayout, setFormItemLayout] = useState(null); // Define formItemLayout state variable

useEffect(() => {
  setFormItemLayout(
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 10, // Increased span to accommodate longer labels
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null
  );
}, [formLayout]);


  const handleDeleteAccount = async () => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
  
      if (confirmation) {
        await auth.currentUser.delete();
        navigate("/"); 
  
        console.log('Account deleted');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setdeleteError(error.message); 
    }
  };

  const handleEmailChange = async (email) => {
    const user = auth.currentUser;
    try {
      setEmail(email); 
      await updateEmail(user, email);
      setchangeUserSuccess('Email updated successfully');
    } catch (error) {
      console.error('Error updating email:', error);
      setchangeUserError(error.message); 
    }
  };

  const handlePasswordChange = async (password) => {
    const user = auth.currentUser;
    try 
    {
      setPassword(password); 
      await updatePassword(user, password);
      await setchangePWSuccess('Password updated successfully')
    }
    catch (error) {
      console.error("Error updating password: ", error); 
      setchangePWError(error.message); 
    }
  };


  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '20px' }}>
      <Row justify="center" style={{ paddingTop: '50px' }}>
        {deleteError && <Alert message={deleteError} type="error" showIcon />}
        {changeUserError && <Alert message={changeUserError} type="error" showIcon />}
        {changePWError && <Alert message={changePWError} type="error" showIcon />}
        {changeUserSuccess && <Alert message={changeUserSuccess} type="success" showIcon />}
        {changePWSuccess && <Alert message={changePWSuccess} type="success" showIcon />}
      </Row>
      <Row justify="center" style={{ paddingTop: '50px' }}>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
          style={{
            maxWidth: formLayout === 'inline' ? 'none' : 800,
          }}
          onSubmit={(e) => e.preventDefault()} // Add onSubmit event handler to prevent default form submission
        >
          <Form.Item label="Change Email" style={{ marginBottom: '20px' }}>
            <Input placeholder={email} />
          </Form.Item>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button type="primary" onClick={handleEmailChange} style={{ marginRight: '30px' }}>
              Save E-Mail Changes
            </Button>
          </div>
          <p><br /></p>
          <Form.Item label="Change Password" style={{ marginBottom: '20px' }}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Re-Type Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {
                message: 'Please re-type your password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The passwords do not match'));
                },
              }),
            ]}
            style={{ marginBottom: '10px' }}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button type="primary" onClick={handlePasswordChange} style={{ marginRight: '10px' }}>
              Save Password Changes
            </Button>
            <p><br /></p>
            <Button type="danger" onClick={handleDeleteAccount} style={{ backgroundColor: 'red', borderColor: 'red', marginRightt: '10px' }}>
              Delete Account
            </Button>
          </div>
          <p style={{ color: 'red', fontSize: 'small', textAlign: 'center', marginTop: '10px' }}>WARNING: Deleting your account is irreversible.</p>
        </Form>
      </Row>
    </div>
  );
};

export default Settings;