import React from "react";
import { ReactComponent as Yoursvg } from "../assets/images/card.svg"
import { GoogleLogin } from "react-google-login";
import { seroLogin } from "../services/api";
import { notification } from "antd";
require("./LoginPage.css");
function LoginPage({ sendDataToParent, dataFromLogin }) {

    const clientId = '1045862628128-catlo61kcvop92eg3psbgi8hjidrv2fk.apps.googleusercontent.com'

    const notify = (type) => {
        notification[type]({
            message: 'Unauthorized User',
            description:
                'Please contact your Manager',
        });
    }

    const onLoginSuccess = (res) => {
        localStorage.setItem("name", res.profileObj.name);
        localStorage.setItem("image", res.profileObj.imageUrl);
        localStorage.setItem("profileDrawer", false);
        let emailBody = { "email": res.profileObj.email }

        seroLogin(emailBody).then((res) => {
            sendDataToParent(true)
            localStorage.setItem("isLoggedIn", "true");
            dataFromLogin(res.data[0])
            let body = {
                email: res.data[0].Email,
                role: res.data[0].Role,
                userId: res.data[0].UserId

            }
            localStorage.setItem("personal", JSON.stringify(body));
        }).catch((err) => {
            console.log(err);
            notify("warning")
        }

        )
    }

    const onLoginFailure = (res) => {
        console.log("Login Failed", res)
    }


    return (
        <div id="login-root">
            <div class="row shadow-card mt-5">
                <div class="shadow-card-body col-sm-6" id="login-body">
                    <div class="mb-5 mt-5">
                        <h2 ><b>SERO BOARD</b></h2>
                        <p>For @Apisero Learning and Devlopment team </p>

                    </div>
                    <div className="login">
                        <GoogleLogin
                            render={renderProps => (
                                <button type="light" class="google-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</button>
                            )}
                            clientId={clientId}
                            buttonText="Login"
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div class="mt-5">
                        <p class="fw-light">© 2022 Apisero all rights reserved</p>
                    </div>
                </div>
                <div class="shadow-card-body col-sm-6" id="login-img">

                    <Yoursvg />

                </div>
            </div>
        </div >
    )
}
export default LoginPage