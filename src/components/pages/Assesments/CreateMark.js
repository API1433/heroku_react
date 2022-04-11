import React from 'react'
import { Drawer } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import InputField from "../../../atoms/InputField";
import ButtonReuse from "../../../atoms/Button";
import { notification } from "antd";
import { addMarks } from "../../../services/api";

function CreateMark(props) {
    
    const validationSchema = yup.object({
        employee_id: yup.string().required("Please enter the Participant Name"),
        marks: yup.string().required("Please enter the Score"),
    })
    const onCancelHandler = () => {
        props.onCancelButton();
    };
    const openNotification = () => {
        notification.open({
            message: "Marks added Successfully",
        });
    };
    return (
        <>
            <Drawer
                title="Add New Record"
                width={500}
                onClose={props.onClose}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
                className="add_user"
            >                <Formik
                initialValues={{
                    employee_id: '',
                    batch_id: '',
                    test_name: '',
                    exam_date: '',
                    marks: '',
                    comments: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("values", values);
                    const formValues = [values]
                    addMarks(formValues)
                        .then((response) => {
                            console.log(response)
                            openNotification();
                            props.onClose();
                            props.getMarks();
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
                        
                            <label>Emp Id</label>
                            <InputField
                                placeholder="Enter Emp Id"
                                name="employee_id"
                                onChange={handleChange}
                                value={values.employee_id}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.employee_id}</p>
                           
                            <label>Batch Id</label>
                            <InputField
                                placeholder="Enter Batch id"
                                name="batch_id"
                                onChange={handleChange}
                                value={values.batch_id}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.batch_id}</p>
                          
                            <label>Assesment id</label>
                            <InputField
                                placeholder="Enter batch Name"
                                name="test_name"
                                onChange={handleChange}
                                value={values.test_name}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.test_name}</p>
                           
                            <label>Exam Date</label>
                           
                            <InputField
                            type="date"
                           placeholder="Enter Assesment Date"
                           name="exam_date"
                           onChange={handleChange}
                           value={values.exam_date}
                           className="input--field"
                            ></InputField>
                            

                            <p className="display_error">{errors.exam_date}</p>
                            <label>Score</label>
                            <InputField
                                placeholder="Enter Score"
                                name="marks"
                                onChange={handleChange}
                                value={values.marks}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.marks}</p>
                            <label>Comments</label>
                            <InputField
                                placeholder="Enter comments"
                                name="comments"
                                onChange={handleChange}
                                value={values.comments}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.comments}</p>
                            <div className="button-container">
                                <ButtonReuse
                                    type="primary"
                                    className="primary-btn"
                                    htmlType="submit"
                                    value="Add Marks"
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
export default CreateMark