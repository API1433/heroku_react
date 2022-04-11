import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import InputField from "../../../atoms/InputField";
import ButtonReuse from "../../../atoms/Button";
import { notification } from "antd";
import { getUserById } from "../../../services/api";
import { editUserData } from "../../../services/api";
import Select from "react-select";

const EditUser = (props) => {

    // Edit User form validation
    const validationSchema = yup.object({
        email: yup.string().required("Please enter the Email"),
        username: yup.string().required("Please enter the User Name"),
    });

    // Function to show toaster after update success
    const openNotification = () => {
        notification.open({
            message: "User Updated Successfully",
        });
    };

    let id = localStorage.getItem("userId");
    const initialValues = {
        id: id,
        email: "",
        role: "",
        username: "",
    }


    const [userData, setUserData] = useState(initialValues);

    // Get the User by Id
    useEffect(() => {
        getUserById(id).then((res) => {
            console.log("Single User", res.data.data.rows);
            setUserData(res.data.data.rows);
        })
    }, [id]);


    console.log("Single User", userData[0]);

    // Set the data to empty when cancel is clicked
    const onCancelHandler = () => {
        props.onCancelButton();
        props.onClose();
        setUserData("")
        localStorage.removeItem("userId");
    };

    const options = [
        { value: 'Admin', label: 'Admin' },
        { value: 'instructor', label: 'Instructor' },
        { value: 'Co-ordinator', label: 'Co-ordinator' },
    ];

    return (
        <>
            <Drawer
                title="Update User"
                width={500}
                onClose={onCancelHandler}
                visible={props.visible}
                className="edit_user"
                closable={false}
                maskClosable={false}
            >
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        id: Number(id),
                        email: userData[0]?.Email,
                        role: userData[0]?.Role,
                        username: userData[0]?.UserName,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("values", values);
                        editUserData(values)
                            .then((response) => {
                                console.log(response.data);
                                openNotification();
                                props.onClose();
                                props.newData();
                            })
                            .catch(function (error) {
                                console.log(error.response.data);
                                const notify = () => {
                                    notification.open({
                                        message: error.response.data.status.message,
                                    });
                                };

                                notify();

                            });
                    }}
                >
                    {({ handleSubmit, handleChange, errors, values, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className="add_project_form">
                            <label>Email</label>
                            <InputField
                                placeholder="Enter the Email Id"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.email}</p>

                            <label>Role</label>
                            <Select
                                value={{ label: values.role, value: values.role }}
                                options={options}
                                onChange={(value) =>
                                    setFieldValue("role", value.value)
                                }
                                name="role"
                            />
                            <p className="display_error">{errors.role}</p>

                            <label>User Name</label>
                            <InputField
                                placeholder="Enter the User Name"
                                name="username"
                                onChange={handleChange}
                                value={values.username}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.username}</p>

                            <div className="button-container">
                                <ButtonReuse
                                    type="primary"
                                    className="primary-btn"
                                    htmlType="submit"
                                    value="Update"
                                ></ButtonReuse> {"  "}
                                <ButtonReuse
                                    type="primary"
                                    className="primary-btn cancel--btn"
                                    value="Cancel"
                                    onClick={onCancelHandler}
                                ></ButtonReuse>
                            </div>
                        </form>
                    )}
                </Formik>
            </Drawer>
        </>
    );
}

export default EditUser;