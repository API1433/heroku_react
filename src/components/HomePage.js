import React from "react";
import SideBar from "../viewgroups/SideBar";
import LoginPage from "../viewgroups/LoginPage";
import Logo from "../assets/images/sero-final.png";
import {
    Users,
    Stats,
    Batches,
    GetBatch,
    BatchInfo,
    EditProfile,
    Attendance,
    Assesments
} from "./index";
import { Layout, Row, Col } from 'antd';
import { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
require("./HomePage.css");



const { Content, Sider, Header } = Layout;

const HomePage = () => {

    let navigate = useNavigate();

    // State to check if User is Logged In
    let loggedIn = localStorage.getItem("isLoggedIn")
    const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

    // State to store user role
    const [role, setRole] = useState("");

    // State to store user Id
    const [userId, setUserId] = useState();


    // Child to Parent
    const sendDataToParent = (index) => {
        setIsLoggedIn(index)
    };

    // User Type and His Id
    const dataFromLogin = (data) => {
        console.log("Data from Login", data.Role);
        setRole(data.Role);
        setUserId(data.UserId);
    }

    console.log("IsloggedIng", role);
    console.log("user Id", userId);

    let UserImg = localStorage.getItem("image");
    let UserName = localStorage.getItem("name");


    return (
        <>
            {isLoggedIn ? (
                <>
                    {/* <Drawer
                        title={"Profile"}
                        width={330}
                        onClose={closeDrawer}
                        visible={showDrawer}
                        bodyStyle={{ paddingBottom: 80, backgroundColor: "#fafafa" }}
                    >
                        {(
                            <div>
                                <>
                                    <div style={{ justifyContent: "center", display: "flex", marginBottom: "4%" }}>
                                        <Avatar size={64} icon={<UserOutlined />} />
                                    </div>
                                    <div style={{ justifyContent: "center", display: "flex" }}>
                                        <h3>API0000&nbsp;-&nbsp;user name </h3>
                                    </div>
                                    <div style={{ justifyContent: "center", display: "flex" }}>
                                        <p>user.v.a@apisero.com</p>
                                    </div>
                                    <div style={{ justifyContent: "center", display: "flex" }}>
                                        <h4>Software Engineer</h4>
                                    </div>
                                    <div style={{ justifyContent: "center", display: "flex", margin: "7%" }}>
                                        <Button
                                            onClick={() => {
                                                navigate("/editprofile")
                                                closeDrawer()
                                            }}
                                            type="default"
                                            size="small">
                                            Edit Profile
                                        </Button>
                                    </div>
                                </>
                            </div>
                        )}
                    </Drawer> */}
                    <Layout style={{ background: "#fafafa" }}>
                        <Sider width={250} className="sidebar-style" style={{ position: "fixed", height: "100%" }}
                        >
                            <div className="apiseroLogoDiv">
                                <center><img style={{ width: "85%", height: "75%", "margin": "6%" }} src={Logo} alt="companyLogo" className="apiseroLogo"></img></center>
                            </div>
                            <SideBar />
                        </Sider>
                        <Layout className="site-layout" style={{ backgroundColor: "transparent", marginLeft: 250 }}>
                            <Header className="site-layout-background" style={{ backgroundColor: "#FAFAFA", padding: "0px 20px", position: "fixed", width: "82%", zIndex: "999" }}>

                                <Row>
                                    <Col md={8}>
                                    </Col>
                                    <Col md={10}>
                                        <span className="btn-shine">
                                            Welcome to SEROBOARD
                                        </span>

                                    </Col>
                                    <Col md={6} style={{ textAlign: "end" }}>

                                        <Dropdown overlay={<Menu>
                                            <Menu.Item key="1" icon={<UserOutlined />} onClick={() => { navigate("/editprofile") }}>
                                                Profile
                                            </Menu.Item>
                                            <Menu.Item key="2" icon={<LogoutOutlined />}
                                                Log out
                                                onClick={() => {
                                                    setIsLoggedIn(false)
                                                    localStorage.clear();
                                                    navigate("/")
                                                }}>
                                                Logout
                                            </Menu.Item>
                                        </Menu>}>
                                            <Button className="profile-button">
                                                <img style={{ borderRadius: "50%" }} src={UserImg} className="user-icon" alt="profile" />
                                                <span style={{ paddingLeft: "4px" }}>{UserName}</span>
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Header>
                            <Content
                                className="site-layout-background content-main"
                                style={{
                                    minHeight: "100vh",
                                }}
                            >
                                <Routes>
                                    <Route path='/' element={<Stats />} />
                                    <Route path='/users' element={<Users />} />
                                    <Route path='/batches' element={<Batches />} />
                                    <Route path='/getbatch' element={<GetBatch />} />
                                    <Route path='/editprofile' element={<EditProfile />} />
                                    <Route path='/batches/:Batch_id' element={<BatchInfo />} />
                                    <Route path='/attendance/:Batch_id' element={<Attendance />} />
                                    <Route path='/assesment' element={<Assesments />} />
                                </Routes>
                            </Content>
                        </Layout>
                    </Layout>
                </>
            ) :
                <Routes>
                    <Route path='/' element={<LoginPage
                        sendDataToParent={sendDataToParent}
                        dataFromLogin={dataFromLogin}
                    />} />
                </Routes>
            }

        </>
    );
}

export default HomePage;