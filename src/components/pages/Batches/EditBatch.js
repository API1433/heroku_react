import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Formik } from "formik";
// import * as yup from "yup";
import InputField from "../../../atoms/InputField";
import ButtonReuse from "../../../atoms/Button";
import { notification } from "antd";
import { getBatchById, updateBatch, getAllCor, getAllIns } from "../../../services/api";
import Select from "react-select";

const EditBatch = (props) => {

    // Edit User form validation
    // const validationSchema = yup.object({
    //     batch_name: yup.string().required("Please enter the Batch Name"),
    //     start_date: yup.string().required("Please select the Start Date"),
    //     end_date: yup.string().required("Please select the End Date"),
    //     coordinator_name: yup.string().required("Please select a Co-ordinator"),
    //     instructor_name: yup.string().required("Please select an Instructor"),
    //     course: yup.string().required("Please add a course"),
    //     total_weeks: yup.string().required("Please select duration")
    // });

    // Function to show toaster after update success
    const openNotification = () => {
        notification.open({
            message: "Batch Updated Successfully",
        });
    };

    let id = localStorage.getItem("batchId");
    const initialValues = {

        start_date: "",
        end_date: "",
        instructor_username: "",
        coordinator_username: "",
        course: "",
        duration: "",
        batch_id: id,
    }



    // State to store Batch details
    const [batchData, setbatchData] = useState(initialValues);

    // State to store list of Instructors
    const [instructors, setInstructors] = useState();

    // State to store list of Co-ordinators
    const [coordinators, setCoordinators] = useState();

    // Get the User by Id
    useEffect(() => {
        getBatchById(id).then((res) => {
            setbatchData(res.data.data.rows[1]);
            setbatchData(res.data.data.rows[1]);
            getAllCor().then((res) => {
                setCoordinators(res);
            })
            getAllIns().then((res) => {
                setInstructors(res);
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    console.log("Instructors", instructors);
    // Set the data to empty when cancel is clicked
    const onCancelHandler = () => {
        props.onCancelButton();
        props.onClose();
        setbatchData("")
        localStorage.removeItem("batchId");
    };

    return (
        <>
            <Drawer
                title="Update Batch"
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
                        start_date: batchData[0]?.BatchStartDate,
                        end_date: batchData[0]?.BatchEndDate,
                        instructor_username: batchData[0]?.InstructorName,
                        coordinator_username: batchData[0]?.CoordinatorName,
                        course: batchData[0]?.Course,
                        duration: batchData[0]?.Duration,
                        batch_id: Number(id)
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("values", values);
                        updateBatch(values)
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
                            <label>Batch Name</label>
                            <InputField
                                type="text"
                                placeholder="Enter the Email Id"
                                name="BatchName"
                                onChange={handleChange}
                                value={batchData[0]?.BatchName}
                                disabled
                                className="input--field"
                            ></InputField>

                            <label>Start date</label>
                            <InputField
                                type="date"
                                placeholder="Enter the start date"
                                name="start_date"
                                onChange={handleChange}
                                value={values.start_date}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.start_date}</p>

                            <label>End date</label>
                            <InputField
                                type="date"
                                placeholder="Enter the Email Id"
                                name="end_date"
                                onChange={handleChange}
                                value={values.end_date}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.end_date}</p>

                            <label>Instructor Name</label>
                            <Select
                                value={{ label: values.instructor_username, value: values.instructor_username }}
                                options={instructors}
                                onChange={(value) =>
                                    setFieldValue("instructor_username", value.value)
                                }
                                name="instructor_username"
                            />
                            <p className="display_error">{errors.instructor_username}</p>

                            <label>Coordinator Name</label>
                            <Select
                                value={{ label: values.coordinator_username, value: values.coordinator_username }}
                                options={coordinators}
                                onChange={(value) =>
                                    setFieldValue("coordinator_username", value.value)
                                }
                                name="coordinator_username"
                            />
                            <p className="display_error">{errors.coordinator_username}</p>

                            <label>Course</label>
                            <InputField
                                type="text"
                                placeholder="Enter the Email Id"
                                name="course"
                                onChange={handleChange}
                                value={values.course}
                                className="input--field"
                            ></InputField>

                            <label>Duration</label>
                            <InputField
                                type="number"
                                placeholder="Enter the Email Id"
                                name="duration"
                                onChange={handleChange}
                                value={values.duration}
                                className="input--field"
                            ></InputField>

                            {" "}
                            <div className="button-container" style={{ marginTop: "20px" }}>
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

export default EditBatch;
