import React, { useEffect, useState } from "react";
// import { FaUserCircle } from 'react-icons/fa'
import InputField from "../../../atoms/InputField";
import { Formik } from "formik";
import * as yup from "yup";
import { notification, Row, Col } from "antd";
import { getPersonal, updatePersonal } from "../../../services/api";
import ButtonReuse from "../../../atoms/Button";
import '../Users/EditProfile.css';

function Editprofile() {

    const validationSchema = yup.object({
        first_name: yup.string().required("Please enter your First Name"),
        last_name: yup.string().required("Please enter your Last Name"),
        designation: yup.string().required("Please enter your Designation"),
        phone_number: yup.string().required("Please enter your Phone Number"),
        work_location: yup.string().required("Please enter your Work Location"),
    });

    const openNotification = () => {
        notification.open({
            message: "Updated Successfully",
        });
    };


    // const initialValues = {
    //     employee_id: "",
    //     first_name: "",
    //     last_name: "",
    //     phone_number: "",
    //     work_location: "",
    //     designation: "",
    //     email: "",
    //     role: ""
    // }

    // State to store Personal Details
    // const [myinfo, setMyinfo] = useState(initialValues);

    // State to store Update Details
    const [personal, setPersonal] = useState();

    // State to get Updated Data
    const [getNew, setGetNew] = useState(false);

    useEffect(() => {
        getPersonalData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getNew])

    const getPersonalData = async () => {

        let body = localStorage.getItem("personal");
        // let info = await getPersonal();
        getPersonal(JSON.parse(body)).then((res) => {
            console.log("Res", res.data[0]);
            setPersonal(res.data[0])
            // setMyinfo(res.data[0])
        })

        // console.log("Info", info);
        // setMyinfo(info.data);
    }

    let imageUrl = localStorage.getItem("image");

    return (
        <>
            <div className="page-top">
                <Row>
                    <Col md={24}>
                        <span>Profile</span>
                    </Col>
                </Row>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    employee_id: personal?.EmployeeId,
                    first_name: personal?.FirstName,
                    last_name: personal?.LastName,
                    phone_number: personal?.PhoneNumber,
                    work_location: personal?.WorkLocation,
                    designation: personal?.Designation,
                    email: personal?.EmailId,
                    role: personal?.Role
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("values", values);
                    updatePersonal(values)
                        .then((response) => {
                            console.log(response.data);
                            openNotification();
                            setGetNew(!getNew);
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
                {({ handleSubmit, handleChange, errors, values }) => (
                    <form onSubmit={handleSubmit} className="add_project_form">
                        <Row>
                            <div id="profile-root">
                                <div className="row shadow-card mt-5">
                                    <Col span={6}>
                                        <div className="shadow-card-head col-sm-3" id="profile-body">
                                            <div className="mt-5">
                                                {/* <FaUserCircle size={70} /> */}
                                                <img alt="mail" style={{ borderRadius: "50%" }} src={imageUrl}></img>
                                            </div>

                                            <div className=" mb-1 mt-3  b-b-default f-w-600">

                                                <h5>{values.first_name + " " + values.last_name}</h5>
                                            </div>
                                            <div className=" mb-5  f-w-600">

                                                <p>{values.designation}</p>
                                            </div>

                                        </div>
                                    </Col>

                                    <Col span={18}>
                                        <div className="shadow-card-body col-sm-9" id="card-block">

                                            <h5 className="m-b-20 p-b-5 b-b-default f-w-600">| Personal Info |</h5>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <h6 className="m-b-2 m-t-5 f-w-600">First Name</h6>
                                                    <InputField
                                                        placeholder="First Name"
                                                        name="first_name"
                                                        onChange={handleChange}
                                                        type="text"
                                                        value={values.first_name}
                                                        className="input--field"
                                                        required

                                                    ></InputField>
                                                    <p className="display_error">{errors.first_name}</p>
                                                </div>
                                                <div className="col-sm-6">
                                                    <h6 className="m-b-2 m-t-5 f-w-600">Last Name</h6>
                                                    <InputField
                                                        placeholder="Last Name"
                                                        name="last_name"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.last_name}
                                                        className="input--field"
                                                    ></InputField>
                                                    <p className="display_error">{errors.last_name}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <h6 className="m-b-2 m-t-5 f-w-600">Designation</h6>
                                                    <InputField
                                                        placeholder="Designation"
                                                        name="designation"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.designation}
                                                        className="input--field"
                                                    ></InputField>
                                                    <p className="display_error">{errors.designation}</p>
                                                </div>
                                                <div className="col-sm-6">
                                                    <h6 className="m-b-2 m-t-5 f-w-600">Employee ID</h6>
                                                    <InputField
                                                        placeholder="Employee Id"
                                                        name="employee_id"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.employee_id}
                                                        className="input--field"
                                                    // disabled={true}
                                                    ></InputField>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <h6 className="m-b-2 m-t-5 f-w-600">Role</h6>
                                                    <InputField
                                                        placeholder="Role"
                                                        name="role"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.role}
                                                        className="input--field"
                                                        disabled={true}
                                                    ></InputField>
                                                </div>
                                                <div className="col-sm-6">
                                                    <h6 className="m-b-2 m-t-5 f-w-600">Email</h6>
                                                    <InputField
                                                        placeholder="Email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        type="email"
                                                        className="input--field"
                                                        disabled={true}
                                                    ></InputField>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <h6 className="m-b-2 m-t-5 f-w-600">Work Location</h6>
                                                    <InputField
                                                        placeholder="Work Location"
                                                        name="work_location"
                                                        onChange={handleChange}
                                                        value={values.work_location}
                                                        className="input--field"
                                                        type="text"
                                                    ></InputField>
                                                    <p className="display_error">{errors.work_location}</p>
                                                </div>
                                                <div className="col-sm-6">
                                                    <h6 className="m-b-2 m-t-5 f-w-600">Phone Number</h6>
                                                    <InputField
                                                        placeholder="Phone Number"
                                                        type="number"
                                                        name="phone_number"
                                                        onChange={handleChange}
                                                        value={values.phone_number}
                                                        className="input--field"
                                                    ></InputField>
                                                    <p className="display_error">{errors.phone_number}</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="saveButton">
                                            <ButtonReuse
                                                type="primary"
                                                className="primary-btn cancel--btn"
                                                value="Save Chnages"
                                                onClick={(e) => {
                                                    handleSubmit(e)
                                                }}
                                            ></ButtonReuse>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Row>
                    </form>
                )}
            </Formik>

        </>

    )

}
export default Editprofile