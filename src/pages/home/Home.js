import React, { useEffect, useState } from 'react'
import { PageWithNavbar, DrawerComponent } from '../../common/components'
import { setLoading } from '../../redux/loaderReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsersList } from '../../common/apis/users';
import { Button, Image, Input, message, Space, Table } from 'antd';
import { FormOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const Home = () => {

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDrawer = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    getUsers();
  };

  const deleteUserFunx = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoading(true));
      const data = await deleteUser({
        id: selectedUser.id
      });
      if (data?.success) {
        message.success(data?.message || 'User deleted successfully');
        getUsers();
      }
      else {
        message.error(data?.message || 'Some Error Occured');
      }
    } else {
      navigate('/login');
    }
    dispatch(setLoading(false));
  }


  const getUsers = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoading(true));
      const data = await getUsersList({
        page: currentPage
      });
      if (data?.data) {
        setUsers(data?.data);
        setFilteredUsers(data?.data);
        setTotalUsers(data?.total);
        message.success(data?.message || 'Blogs fetched successfully');
      }
      else {
        message.error('Some Error Occured');
      }
    } else {
      navigate('/login');
    }
    dispatch(setLoading(false));
  }

  const handleSearchChange = () => {
    let filteredData = users.filter((val) => {
      return val.email.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredUsers(filteredData);
  }


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <Image src={record.avatar} alt={record.first_name} className='w-10 h-10 rounded-full' />
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filterDropdown: ({ confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => {
              search !== '' ? handleSearchChange() : confirm();
            }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            onKeyUp={(e) => { e.key === 'Enter' && handleSearchChange() }}
          />
          <Space>
            <Button
              onClick={() => handleSearchChange()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setFilteredUsers(users)
                setSearch('')
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      filterDropdown: ({ confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search First Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => {
              search !== '' ? handleSearchChange() : confirm();
            }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            onKeyUp={(e) => { e.key === 'Enter' && handleSearchChange() }}
          />
          <Space>
            <Button
              onClick={() => handleSearchChange()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setFilteredUsers(users)
                setSearch('')
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      filterDropdown: ({ confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Last Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => {
              search !== '' ? handleSearchChange() : confirm();
            }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            onKeyUp={(e) => { e.key === 'Enter' && handleSearchChange() }}
          />
          <Space>
            <Button
              onClick={() => handleSearchChange()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setFilteredUsers(users)
                setSearch('')
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div className="flex flex-row">
          <button
            className="bg-green-500 text-white rounded-md px-2 py-1 mx-1"
            onClick={() => showDrawer(record)}
          >
            <FormOutlined />
          </button>
          <button
            className="bg-red-500 text-white rounded-md px-2 py-1 mx-1"
            onClick={() => deleteUserFunx(record)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    }
  ]


  useEffect(() => {
    getUsers();
  }, [currentPage])  // eslint-disable-line react-hooks/exhaustive-deps


  const handlePageChange = (page) => {
    setCurrentPage(page.current);
  }

  return (
    <PageWithNavbar>
      <div className="flex flex-col bg-[#FAFAFB]">
        <div className="flex flex-row w-full md:px-16 lg:px-16 px-4 pt-8">
          <span className='lg:text-2xl md:text-2xl text-[16px] font-medium md:w-64'>Users ({totalUsers})</span>
        </div>
        <div className="flex flex-row w-full md:px-16 lg:px-16 px-4 pt-8">
          <Table columns={columns} dataSource={filteredUsers} className='w-full' bordered pagination={{ pageSize: 6, total: totalUsers }} onChange={handlePageChange} />
        </div>
        <DrawerComponent onClose={onClose} open={open} data={selectedUser} />
      </div>
    </PageWithNavbar>
  )
}

export default Home