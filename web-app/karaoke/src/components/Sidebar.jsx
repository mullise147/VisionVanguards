import React, { useState } from 'react';
import { Menu, Button, Modal, Input, Form, Alert } from 'antd';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SettingOutlined,
  LogoutOutlined,
  AudioOutlined,
  VideoCameraOutlined, 
  LeftOutlined
} from '@ant-design/icons';
import { auth } from '../firebase'; 
import { updateEmail, updatePassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const { SubMenu } = Menu;
const { confirm } = Modal;

const Navbar = () => {
  const [changeEmailForm] = Form.useForm();
  const [collapsed, setCollapsed] = useState(true); // Initialize menu collapsed as true
  const [collapsed1, setCollapsed1] = useState(true); 
  const [deleteError, setdeleteError] = useState(null);
  const [changeUserError, setchangeUserError] = useState(null);
  const [changePWError, setchangePWError] = useState(null); 
  const [changeUserSuccess, setchangeUserSuccess] = useState(null); 
  const [changePWSuccess, setchangePWSuccess] = useState(null); 
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(auth.currentUser.email || ''); // Sample email

  // Check if the current page is the leaderboard page
  const isLeaderboardPage = location.pathname === '/leaderboard';
  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed); // Toggle collapsed state
  };

  const toggleCollapsed1 = () => {
    setCollapsed1(!collapsed); 
  }

  const showDeleteConfirmation = async () => {
    confirm({
      title: 'Are you sure you want to delete your account?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
            await auth.currentUser.delete(); 
            navigate('/'); 
            console.log('Account deleted');
        }
        catch (error){
            console.error('Error deleting account:', error);
            setdeleteError(error.message); 
        }
      },
    });
  };

  const handleSignOut = () => {
    navigate("/"); 
  }

  const handleStartPerformingAudio = () => { //Navigate to audio page 
    navigate("/audio")
  }

  const handleStartPerformingVideo = () => { //Navigate to audio page 
    navigate("/audio-video")
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px', // Adjusted padding for thin navbar
        backgroundColor: '#001529', // Dark blue background color
        color: '#ffffff', // White text color
      }}
    >
      <div justify="center" style={{ paddingTop: '50px' }}>
        {deleteError && <Alert message={deleteError} type="error" showIcon />}
        {changeUserError && <Alert message={changeUserError} type="error" showIcon />}
        {changePWError && <Alert message={changePWError} type="error" showIcon />}
        {changeUserSuccess && <Alert message={changeUserSuccess} type="success" showIcon />}
        {changePWSuccess && <Alert message={changePWSuccess} type="success" showIcon />}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div>
  {!isLeaderboardPage && (
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ backgroundColor: "#001529", color: "#ffffff"}}
        >
          <Menu.Item
            key="back"
            icon={<LeftOutlined style={{ fontSize: '24px'}} />}
            onClick={() => navigate('/leaderboard')}
          >
          </Menu.Item>
        </Menu>
      )}

{isLeaderboardPage && (
 <Menu
 theme="dark"
 mode="horizontal"
 style={{ backgroundColor: '#001529', color: '#ffffff' }}
>
 <SubMenu
   key="newSession"
   icon={<PlusOutlined style={{ fontSize: '24px' }} />}
 >
   <Menu.Item key="startAudio" icon={<AudioOutlined />} onClick={handleStartPerformingAudio}>
   Start Karaoke Session
   </Menu.Item>
   <Menu.Item key="startAudio" icon={<VideoCameraOutlined />} onClick={handleStartPerformingVideo}>
     Start Karaoke-Dance Session
   </Menu.Item>
 </SubMenu>
</Menu>

)}
  </div>

  <Menu
      theme="dark"
      mode="horizontal"
      style={{ backgroundColor: '#001529', color: '#ffffff' }}
    >
      <SubMenu
        key="settings"
        icon={<SettingOutlined style={{ fontSize: '24px' }} />}
      >
        <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={showDeleteConfirmation}>
        Delete Account
        </Menu.Item>
        <Menu.Item key="signOut" icon={<LogoutOutlined />} onClick={handleSignOut}>
          Sign Out       
        </Menu.Item>
      </SubMenu>
    </Menu>
</div>    
    </div>
  );
};

export default Navbar;