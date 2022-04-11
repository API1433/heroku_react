import React from 'react'
import { Drawer } from "antd";
import { Formik } from "formik";
import InputField from "../../../../atoms/InputField";
import ButtonReuse from "../../../../atoms/Button";
import { notification } from "antd";
import { addParticipant } from "../../../../services/api";
import { useParams } from "react-router-dom";

function CreateParticipant(props) {

    let { Batch_id } = useParams();

    console.log("Batch Id", Batch_id);

    // const validationSchema = yup.object({
    //     name: yup.string().required("Please enter the Participant Name"),
    //     email: yup.string().required("Please enter the Email"),
    // })
    const onCancelHandler = () => {
        props.onCancelButton();
    };
    const openNotification = () => {
        notification.open({
            message: "Participant added Successfully",
        });
    };

    const initialValues = {
        batch_id: Number(Batch_id),
        name: '',
        employee_id: '',
        designation: '',
        work_location: '',
        phone_number: '',
        email_id: ''
    }

    return (
        <>
            <Drawer
                title="Create New Participant"
                width={500}
                onClose={props.onClose}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
                className="add_user"
            >                <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("values", [values]);
                    addParticipant([values])
                        .then((response) => {
                            openNotification();
                            props.onClose();
                            props.newData();
                            props.getBatchDetails();
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
                            {/* <label>Batch Id</label>
                    <InputField
                        placeholder="Enter Batch Id"
                        name="batch_id"
                        onChange={handleChange}
                        value={values.batch_id}
                        className="input--field"
                    ></InputField> */}
                            <p className="display_error">{errors.batch_id}</p>
                            <label>Emp Name</label>
                            <InputField
                                placeholder="Enter Emp Name"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.name}</p>
                            <label>Emp ID</label>
                            <InputField
                                placeholder="Enter Emp ID"
                                name="employee_id"
                                onChange={handleChange}
                                value={values.employee_id}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.employee_id}</p>
                            <label>Designation</label>
                            <InputField
                                placeholder="Enter designation"
                                name="designation"
                                onChange={handleChange}
                                value={values.designation}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.designation}</p>
                            <label>Location</label>
                            <InputField
                                placeholder="Enter instructor"
                                name="work_location"
                                onChange={handleChange}
                                value={values.work_location}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.work_location}</p>
                            <label>Phone No</label>
                            <InputField
                                placeholder="Enter phone no"
                                name="phone_number"
                                onChange={handleChange}
                                value={values.phone_number}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.phone_number}</p>
                            <label>Email</label>
                            <InputField
                                placeholder="Enter email"
                                name="email_id"
                                onChange={handleChange}
                                value={values.email_id}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.email_id}</p>
                            <div className="button-container">
                                <ButtonReuse
                                    type="primary"
                                    className="primary-btn"
                                    htmlType="submit"
                                    value="Create Participant"
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
    )
}
export default CreateParticipant