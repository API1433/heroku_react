import React from "react";
import { Drawer } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import InputField from "../../../atoms/InputField";
import ButtonReuse from "../../../atoms/Button";
import { notification } from "antd";
import { addUser } from "../../../services/api";
import Select from "react-select";
require("./AddUser.css");


const AddUser = (props) => {

    const validationSchema = yup.object({
        username: yup.string().required("Please enter the User Name"),
        email: yup.string().email('Must be a valid email').max(255).required('Please enter the Email'),
    });

    const onCancelHandler = () => {
        props.onCancelButton();
    };

    const openNotification = () => {
        notification.open({
            message: "User Added Successfully",
        });
    };

    const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'instructor', label: 'Instructor' },
        { value: 'co-ordinator', label: 'Co-ordinator' },
    ];

    return (
        <>
            <Drawer
                title="Add User"
                width={500}
                onClose={props.onClose}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
                className="add_user"
            >
                <Formik
                    initialValues={{
                        email: "",
                        role: "",
                        username: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("values", values);
                        addUser(values)
                            .then((response) => {
                                openNotification();
                                props.onClose();
                                props.getUsers();

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
                                defaultValue={values.role}
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
                                    value="Add"
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
};

export default AddUser;
