import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Formik } from "formik";
import InputField from "../../../../atoms/InputField"
import ButtonReuse from "../../../../atoms/Button";
import { notification } from "antd";
import { getStudentById, updateParticipants } from "../../../../services/api";

const EditParticipants = (props) => {

    // Edit User form validation
    // const validationSchema = yup.object({
    //     email: yup.string().required("Please enter the Email"),
    //     username: yup.string().required("Please enter the User Name"),
    // });

    // Function to show toaster after update success
    const openNotification = () => {
        notification.open({
            message: "User Updated Successfully",
        });
    };

    let id = localStorage.getItem("EmployeeId");
    const initialValues = {
        EmployeeId: '',
        EmailId: '',
        Name: '',
        Location: '',
        PhoneNumber: '',
        Designation: '',
        ID: id
    }


    const [employeeData2, setEmployeeData2] = useState(initialValues)

    // Get the User by Id
    useEffect(() => {
        getStudentById(id).then((res) => {
            setEmployeeData2(res.data.data.rows[0]);
            console.log(res.data.data.rows[0])
            console.log("hello parti")
        })
    }, [id]);
    // console.log(batchData2[0]?.BatchName)
    // Set the data to empty when cancel is clicked
    const onCancelHandler = () => {
        props.onCancelButton();
        props.onClose();
        setEmployeeData2('')
        localStorage.removeItem("EmployeeId");
    };


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
                        //   EmployeeId:employeeData2?.EmployeeId,
                        //   EmailId:employeeData2?.EmailId,
                        name: employeeData2?.Name,
                        work_location: employeeData2?.Location,
                        phone_number: employeeData2?.PhoneNumber,
                        designation: employeeData2?.Designation,
                        id: Number(id)

                    }}
                    //    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("values", values);
                        updateParticipants(values)
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
                            <label>Employee Id</label>
                            <InputField
                                type="text"
                                placeholder="Enter the Email Id"
                                name="empId"
                                onChange={handleChange}
                                value={employeeData2?.EmployeeId}
                                disabled
                                className="input--field"
                            ></InputField>
                            <label>Name</label>
                            <InputField
                                type="text"
                                placeholder="Enter the Email Id"
                                name="name"
                                onChange={handleChange}
                                value={values.name}

                                className="input--field"
                            ></InputField>

                            <p className="display_error">{errors.name}</p>

                            <label>Email id</label>
                            <InputField
                                type="text"
                                placeholder="Enter the start date"
                                name="EmailId"
                                onChange={handleChange}
                                value={employeeData2?.EmailId}
                                className="input--field"
                                disabled
                            ></InputField>
                            {/* <p className="display_error">{errors.start_date}</p> */}
                            <label>Location</label>
                            <InputField
                                type="text"
                                placeholder="Enter the Email Id"
                                name="work_location"
                                onChange={handleChange}
                                value={values.work_location}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.work_location}</p>

                            <label>Phone number</label>
                            <InputField
                                type="text"
                                placeholder="Enter the Email Id"
                                name="phone_number"
                                onChange={handleChange}
                                value={values.phone_number}
                                className="input--field"
                            ></InputField>

                            <p className="display_error">{errors.phone_number}</p>

                            <label>designation</label>
                            <InputField
                                type="text"
                                placeholder="Enter the Email Id"
                                name="designation"
                                onChange={handleChange}
                                value={values.designation}
                                className="input--field"
                            ></InputField>

                            <p className="display_error">{errors.designation}</p>

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

export default EditParticipants;
