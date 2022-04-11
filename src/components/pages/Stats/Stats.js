import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import Batchstats from "./Batchstats";
import Attendancestats from "./Attendancestats";
import { FaUsers, FaChalkboardTeacher, FaPeopleCarry } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { getUserCount, getTotalPart } from "../../../services/api";

const Stats = () => {

    // State to store Users Data
    const [userData, setUserData] = useState();

    // State to store total students
    const [totalStu, setTotalStu] = useState();

    useEffect(() => {
        getUserData()
        getTotalStudents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUserData = async () => {
        await getUserCount().then((res) => {
            console.log("Result", res.data[0])
            setUserData(res.data[0]);
        })
    }

    const getTotalStudents = async () => {
        await getTotalPart().then((res) => {
            console.log("Totl Students", res.data[0]);
            setTotalStu(res.data[0]);
        })
    }

    return (
        <>
            <div className="page-top custom"><span>Dashboard</span> </div>
            <div className=" row  page-bottom  usercards py-3">
                <div className="col-3">
                    <div class="card users cardmargin ">
                        <div class="card-header">
                            <h6 className="m-0"> No. Of Users | <FaUsers size={20} /> </h6>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p style={{ color: "#ffffff" }}>{userData?.totalUsers}</p>
                            </blockquote>
                        </div>
                    </div>

                </div>
                <div className="col-3">
                    <div class="card admins  cardmargin">
                        <div class="card-header">
                            <h6 className="m-0">No. Of Admins | <RiAdminFill size={20} /> </h6>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>{userData?.admins}</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div class="card coordinators  cardmargin">
                        <div class="card-header">
                            <h6 className="m-0"> No. Of Coordinators | <FaPeopleCarry size={20} /> </h6>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>{userData?.coordinators}</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div class="card instructors cardmargin">
                        <div class="card-header">
                            <h6 className="m-0">No. Of Instructors | <FaChalkboardTeacher size={20} /> </h6>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>{userData?.instructors}</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-top">
                <h6>Total Employees under Tarining:  <span style={{ fontWeight: "bold" }}>{totalStu?.totalParticipants}</span></h6>
            </div>
            <div className="row  page-bottom batchattendance">
                <div className="col-sm-8 userstats ">
                    <Batchstats />
                </div>
                <div className="col-sm-4 attendancestats ">
                    <Attendancestats />
                </div>
            </div>
        </>
    );
}

export default Stats;