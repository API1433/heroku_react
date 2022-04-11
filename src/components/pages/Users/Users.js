import React, { useEffect, useState } from "react";
import { Table, Row, Col, Modal, notification, Input } from "antd";
import { getAllUsers, deleteUserById } from "../../../services/api";
import ButtonReuse from "../../../atoms/Button";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
require("./Users.css");

const Users = () => {

    const { confirm } = Modal;

    // State to store User data
    const [userData, setUserData] = useState([]);

    // State to store filtered Data on Search
    const [filterData, setFilterData] = useState([]);

    const [userId, setUserId] = useState("");

    // State to get new data 
    const [getNew, setGetNew] = useState(true);

    // State for Add User Drawer
    const [visible, setVisible] = useState(false);

    // State for Edit User Drawer
    const [editVisible, setEditVisible] = useState(false);

    // State to search the table
    const [nameSearch, setNameSearch] = useState("");

    // close Button (X) for Add User
    const closeHandler = () => {
        setVisible(false);
        setEditVisible(false);
    };

    // Visible function for Add User
    const visibleHandler = () => {
        setVisible(true);
    };

    // Visible function for Edit User
    const visibleHandlerEdit = (id) => {
        console.log("Id", id);
        setEditVisible(true);
        setUserId(id);
        localStorage.setItem("userId", id);
    };

    // Get the list of all users
    useEffect(() => {
        getUsers()
    }, [getNew])

    const getUsers = async () => {
        let users = await getAllUsers();
        console.log("Users Data", users.data);
        setUserData(users.data);
        setFilterData(users.data);
    }

    // Function to search the Table
    useEffect(() => {
        if (userData) {
            const results = userData.filter(
                (item) =>
                    item.Email.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.Role.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.UserName.toLowerCase().includes(nameSearch.toLowerCase())
            );
            setFilterData(results);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameSearch])

    // Modal to delete the User
    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this user?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteUserById(id).then(() => {
                    const notify = () => {
                        notification.open({
                            message: "User Deleted",
                        });
                    };
                    notify();
                    setGetNew(!getNew);
                })
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }

    // User Table Columns
    const columns = [
        {
            title: "User Name",
            dataIndex: "UserName",
            key: "UserName",
            sorter: (a, b) => a.UserName.localeCompare(b.UserName),
        },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
            sorter: (a, b) => a.Email.localeCompare(b.Email),
        },
        {
            title: "Role",
            dataIndex: "Role",
            key: "Role",
            sorter: (a, b) => a.Role.localeCompare(b.Role),
            filters: [
                {
                    text: 'admin',
                    value: 'admin',
                },
                {
                    text: 'instructor',
                    value: 'instructor',
                },
                {
                    text: 'co-ordinator',
                    value: 'co-ordinator',
                },
            ],
            onFilter: (value, record) => record.Role.indexOf(value) === 0,
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (text, record) =>
                <>
                    <div>
                        <EditOutlined
                            onClick={() => { visibleHandlerEdit(record.id) }}
                            style={{ cursor: "pointer", color: "blue", paddingRight: "20px" }} />
                        <DeleteOutlined
                            onClick={() => { showConfirm(record.id) }}
                            style={{ cursor: "pointer", color: "red" }} />
                    </div>

                </>

        },
    ];

    // Function to set nameSearch
    const handleOnChange = (event) => {
        setNameSearch(event.target.value);
    };

    // Function to get new Data after Add / Edit
    const getNewData = () => {
        setGetNew(!getNew);
    }


    return (

        <>
            <div className="page-top">
                <Row>
                    <Col md={14}>
                        <span>Users</span>
                    </Col>
                    <Col md={10} style={{ textAlign: "end" }}>
                        <div className="searchForm">
                            <form>
                                <Input.Search
                                    allowClear
                                    onChange={handleOnChange}
                                    placeholder="Search by name / empId / role / designation / email"
                                />
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="page-bottom">
                <Row className='add-pad'>
                    <Col md={12}>
                        <span>List of Users</span>
                    </Col>
                    <Col md={12} style={{ textAlign: "end" }}>
                        <ButtonReuse
                            type="primary"
                            className="primary-btn"
                            htmlType="primary"
                            value="+ Add User"
                            onClick={visibleHandler}
                        ></ButtonReuse>
                    </Col>
                </Row>

                <AddUser
                    getUsers={getUsers}
                    visible={visible}
                    onClose={closeHandler}
                    onCancelButton={closeHandler}
                />
                <EditUser
                    visible={editVisible}
                    onClose={closeHandler}
                    onCancelButton={closeHandler}
                    newData={getNewData}
                    userId={userId}
                />
                <Table
                    columns={columns}
                    dataSource={filterData}
                    bordered
                    className="usersTable"
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "30", "40", "50"],
                    }}
                />
            </div>
        </>


    );
}

export default Users