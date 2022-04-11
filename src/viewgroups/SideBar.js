import React from "react";
import { Menu } from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    PicCenterOutlined,
    SettingOutlined,
    SnippetsOutlined,
    QuestionOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import Logo from "../assets/images/Apisero.png";

const SideBar = () => {

    let navigate = useNavigate();

    let personal = JSON.parse(localStorage.getItem("personal"));
    let role = personal?.role;

    return (
        <>
            <Menu mode="inline" className="side-menu" style={{ border: "none" }} >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => { navigate("/") }}>
                        Home
                    </Menu.Item>
                    {role === "admin" &&
                        <Menu.Item key="2" icon={<UserOutlined />} onClick={() => { navigate("/users") }}>
                            Users
                        </Menu.Item>
                    }
                    <Menu.Item key="3" icon={<PicCenterOutlined />} onClick={() => { navigate("/batches") }}>
                        Batches
                    </Menu.Item>
                    <Menu.Item key="4" icon={<SettingOutlined />} onClick={() => { navigate("/editprofile") }}>
                        Edit Profile
                    </Menu.Item>
                    <Menu.Item key="5" icon={<SnippetsOutlined />} onClick={() => { navigate("/assesment") }}>
                        Assesments
                    </Menu.Item>
                    <Menu.Item key="6" icon={<QuestionOutlined />} onClick={() => { navigate("/assesments") }}>
                        Help
                    </Menu.Item>
                </Menu>
            </Menu>
            <Menu mode="inline" className="side-menu" style={{ border: "none", overflow: "hidden" }} >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <div style={{ position: "absolute", left: "0", bottom: "0" }}>
                        <center><i>Powered By</i><br></br><img style={{ width: "65%", height: "75%", "margin": "6%" }} src={Logo} alt="companyLogo" className="apiseroLogo"></img></center>
                    </div>
                </Menu>
            </Menu>
        </>
    );

}

export default SideBar;