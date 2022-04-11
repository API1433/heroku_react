import React, { useEffect, useState } from "react";
import { Drawer, DatePicker } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import InputField from "../../../atoms/InputField";
import ButtonReuse from "../../../atoms/Button";
import { notification } from "antd";
import { addBatch, getAllUsers } from "../../../services/api";
import Select from "react-select";
import "./AddBatch.css";

const AddBatch = (props) => {

    let x = Math.floor((Math.random() * 1000) + 1);

    // State to store Instructor values
    const [instructors, setInstructors] = useState();

    // State to store Co-ordinator values
    const [coordinators, setCoordinators] = useState();

    const validationSchema = yup.object({
        batch_name: yup.string().required("Please enter the Batch Name"),
        start_date: yup.string().required("Please select the Start Date"),
        end_date: yup.string().required("Please select the End Date"),
        coordinator_name: yup.string().required("Please select a Co-ordinator"),
        instructor_name: yup.string().required("Please select an Instructor"),
        course: yup.string().required("Please add a course"),
        total_weeks: yup.number().required("Please select duration")
    });
    const onCancelHandler = () => {
        props.onCancelButton();
    };
    const openNotification = () => {
        notification.open({
            message: "Batch Created Successfully",
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let users = await getAllUsers();
        let instructors = users.data.filter((ins) =>
            ins.Role === "instructor"
        )
        let coordinators = users.data.filter((ins) =>
            ins.Role === "Co-ordinator"
        )
        let extractIns = instructors.map((ins) => {
            return {
                value: ins.UserName,
                label: ins.UserName,
                key: ins.id,
            }
        })
        setInstructors(extractIns);

        var extractCor = coordinators.map((ins) => {
            return {
                value: ins.UserName,
                label: ins.UserName,
                key: ins.id,
            }
        })
        setCoordinators(extractCor);
    }


    return (
        <>
            <Drawer
                title="Create New Batch"
                width={500}
                onClose={props.onClose}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
                className="add_user"
            >
                <Formik
                    initialValues={{
                        batch_id: x,
                        batch_name: '',
                        start_date: '',
                        end_date: '',
                        instructor_name: '',
                        coordinator_name: '',
                        course: '',
                        total_weeks: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("values", values);
                        addBatch(values)
                            .then((response) => {
                                openNotification();
                                props.onClose();
                                props.getBatches();
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
                            <label>Batch Name</label>
                            <InputField
                                placeholder="Enter Batch Name"
                                name="batch_name"
                                onChange={handleChange}
                                value={values.batch_name}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.batch_name}</p>

                            <label>Start Date</label>
                            <DatePicker name="start_date"
                                onChange={(dateString) => { setFieldValue("start_date", dateString.format("YYYY-MM-DD")) }}
                                style={{ width: "100%" }}
                            />
                            <p className="display_error">{errors.start_date}</p>

                            <label>End Date</label>
                            <DatePicker name="end_date"
                                onChange={(dateString) => { setFieldValue("end_date", dateString.format("YYYY-MM-DD")) }}
                                style={{ width: "100%" }}
                            />
                            <p className="display_error">{errors.end_date}</p>

                            <label>Coordinator</label>
                            <Select
                                defaultValue={values.coordinator_name}
                                options={coordinators}
                                onChange={(value) =>
                                    setFieldValue("coordinator_name", value.value)
                                }
                                name="coordinator_name"
                            />
                            <p className="display_error">{errors.coordinator_name}</p>

                            <label>Instructor</label>
                            <Select
                                defaultValue={values.instructor_name}
                                options={instructors}
                                onChange={(value) =>
                                    setFieldValue("instructor_name", value.value)
                                }
                                name="instructor_name"
                            />
                            <p className="display_error">{errors.instructor_name}</p>

                            <label>Course</label>
                            <InputField
                                placeholder="Enter course"
                                name="course"
                                onChange={handleChange}
                                value={values.course}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.course}</p>

                            <label>Duration</label>
                            <InputField
                                placeholder="Enter weeks"
                                name="total_weeks"
                                onChange={handleChange}
                                value={values.total_weeks}
                                className="input--field"
                                type="number"
                            ></InputField>
                            <p className="display_error">{errors.total_weeks}</p>

                            <div className="button-container">
                                <ButtonReuse
                                    type="primary"
                                    className="primary-btn"
                                    htmlType="submit"
                                    value="Create Batch"
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
export default AddBatch;