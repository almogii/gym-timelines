import React, { useEffect, useState } from 'react';
import { Input, Avatar, Dropdown,MenuProps ,Layout, Flex} from 'antd';
import ButtonComponent from '../components/Button'
import { useNavigate } from "react-router-dom";
import {getSessionItem,setSessionItem, removeSessionItem} from '../utils/sessionStorage'
import {User} from '../../../backend/src/users/entities/user.entity'

const { Search } = Input;
const {Header} =Layout



export const NavBarComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    
    const storedUser = getSessionItem<User>('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);


  const navigate = useNavigate();

  const navToPage=(url:string)=>{
      navigate(url)
  }
  // const handleLogin = () => {
    
  //   setUser(user);
  //   setSessionItem('user', user);

    
  // };

 

  const handleLogout = () => {
    setUser(null);
    removeSessionItem('user');
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Handle search logic here
    console.log('Performing search with value:', value);
  };

  const items: MenuProps['items']= [
    {
      label: <a href="">My Recipes</a>,
      key: '0',
    },
    {
      label: <a href="">Settings</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Logout',
      key: '3',
    },
  ];
   
  return (
    <Header>
      <Flex style={{width: "100%"}} justify="space-between">
      <Flex className="logo">
        <a href="/">recipe website logo </a>
      </Flex>
      <Flex className="menuCon" gap={20}>
        <Flex className="searchMenu">
          <Search
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 200 , alignSelf:'center'}}
          />
        </Flex>
          {user ? (
            <Dropdown menu={{items,onClick:handleLogout}} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Avatar src={user.firstName} style={{ marginRight: 8 }} />
                {user.email}
              </a>
            </Dropdown>
          ) : (
            <Flex align='center'>
              <ButtonComponent type="primary" onClick={()=>navToPage('/signin')} style={{marginRight:'16px'}}>Sign In</ButtonComponent>
              
              <ButtonComponent  onClick={()=>navToPage('/register')}>Register</ButtonComponent>
            </Flex>
          )}
      </Flex>
      </Flex>
    </Header>
  );
};

