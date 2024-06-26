import React, { useState } from 'react';
import { Input, Avatar, Dropdown,MenuProps ,Layout, Flex} from 'antd';
import ButtonComponent from '../components/Button'
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const {Header} =Layout

interface User {
  email: string;
  avatar: string;
}

export const NavBarComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const navigate = useNavigate();

  const navToPage=(url:string)=>{
      navigate(url)
  }
  const handleLogin = () => {

    setUser({
      email: 'user@example.com',
      avatar: 'https://via.placeholder.com/150',
    });
  };

 

  const handleLogout = () => {
    setUser(null);
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
                <Avatar src={user.avatar} style={{ marginRight: 8 }} />
                {user.email}
              </a>
            </Dropdown>
          ) : (
            <Flex align='center'>
              <ButtonComponent type="primary" onClick={handleLogin} style={{marginRight:'16px'}}>Sign In</ButtonComponent>
              <ButtonComponent onClick={()=>navToPage('/register')}>Register</ButtonComponent>
            </Flex>
          )}
      </Flex>
      </Flex>
    </Header>
  );
};

