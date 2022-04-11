import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, DatePicker, Table, Switch, Input, notification } from "antd";
import ButtonReuse from "../../../../atoms/Button";
import { getBatchById, markAttendance, getAttendance, getAttendanceById } from "../../../../services/api";
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import exportFromJSON from 'export-from-json';
require("./Attendance.css");

const Attendance = () => {

    // Batch Id from Params
    let { Batch_id } = useParams();

    // Array to store students Data
    const [students, setStudents] = useState([]);

    // Array to store Filtered Student data
    const [filStudents, setFilStudents] = useState([]);

    // State to get Datepicker to mark Attendance
    const [datePick, setDatePick] = useState(false);

    // State to get Datepicker to get Attendance
    const [datePickGet, setDatePickGet] = useState(false);

    // State to store date Value
    const [selectDate, setSelectDate] = useState("");

    // State to enable and disable attendance toggle
    const [disabled, setDisabled] = useState(true);

    // UseEffect to get all Participants
    useEffect(() => {
        getParticipants()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Function to get all Paticipants
    const getParticipants = async () => {
        let newData = await getBatchById(Batch_id);
        setStudents(newData.data.data.rows[0]);
        setFilStudents(newData.data.data.rows[0]);
    }

    // Function to set Attendance Input
    let newStudentData = students.map((stu) => ({
        employee_id: stu.EmployeeId,
        batch_id: Batch_id,
        attendance_date: selectDate,
        present: "P"
    }))

    // Function to Mark Attendance
    const setNewData = (emp_id) => {
        for (let i in newStudentData) {
            if (newStudentData[i].employee_id === emp_id) {
                newStudentData[i].present = "A"
            }
        }
    }


    // Fuction to set new Date
    const onChangeDate = (dateString) => {
        setSelectDate(dateString.format("YYYY-MM-DD"))
        setDisabled(false);
    }


    // Function to get Attendance
    const onChangeDateGet = (dateString) => {
        let inputData = {
            "batch_id": Batch_id,
            "attendance_date": dateString.format("YYYY-MM-DD")
        }
        getAttendance(inputData).then((res) => {
            const data = res.data
            const fileName = 'Attendance'
            const exportType = 'xls'
            exportFromJSON({ data, fileName, exportType })

        })

    }

    // State to search the table
    const [nameSearch, setNameSearch] = useState("");

    // Function to set nameSearch
    const handleOnChange = (event) => {
        setNameSearch(event.target.value);
    };

    // Function to search the Table
    useEffect(() => {
        if (students) {
            const results = students.filter(
                (item) =>
                    item.Name.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.EmployeeId.toLowerCase().includes(nameSearch.toLowerCase())
            );
            setFilStudents(results);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameSearch]);

    // Function to download Individual attendance
    const downloadAtt = (body) => {
        console.log("The body", body);
        getAttendanceById(body).then((res) => {
            console.log("Res", res.data.data.row);
            const data = res.data.data.row
            const fileName = 'Attendance'
            const exportType = 'xls'
            exportFromJSON({ data, fileName, exportType })
        })
    }


    // Colums of Attendance Table
    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            sorter: (a, b) => a.Name.localeCompare(b.Name),
        },
        {
            title: "Emp Id",
            dataIndex: "EmployeeId",
            key: "EmployeeId",
            sorter: (a, b) => a.EmployeeId.localeCompare(b.EmployeeId),
        },
        {
            title: "Action",
            dataIndex: ["ID", "EmployeeId"],
            key: "EmployeeId",
            render: (text, record) =>
                <>
                    <Switch disabled={disabled} defaultChecked
                        onClick={() => { setNewData(record.EmployeeId) }} />
                    <DownloadOutlined
                        onClick={() => {
                            downloadAtt({
                                batch_id: Number(Batch_id),
                                student_id: Number(record["ID"])
                            })
                        }}
                        style={{ cursor: "pointer", color: "blue", paddingLeft: "30px" }} />
                </>
        },
    ];

    // Function to Submit Attendance
    const submitAttendance = () => {
        markAttendance(newStudentData).then((res) => {
            notification.open(({
                message: "Attendance added for the day"
            }))
            setDatePick(false);
            setDisabled(true);
        }).catch(() => {
            notification.open(({
                message: "Something went wrong"
            }))
        })
    }

    return (<>
        <div className="page-top">
            <Row>
                <Col md={24}>
                    <span>Attendance</span>
                </Col>
            </Row>
        </div>
        <div className="page-top">
            <Row>
                <Col md={12}>
                    <ButtonReuse
                        type="primary"
                        className="primary-btn markAttendanceBtn"
                        htmlType="primary"
                        value="Mark Attendance"
                        onClick={() => {
                            setDatePick(true)
                            setDatePickGet(false)
                        }}
                    ></ButtonReuse>
                    <ButtonReuse
                        type="primary"
                        className="primary-btn"
                        htmlType="primary"
                        value="Get Attendance"
                        onClick={() => {
                            setDatePickGet(true)
                            setDatePick(false)
                            setDisabled(true)
                        }}
                    ></ButtonReuse>
                </Col>
                <Col md={12} style={{ textAlign: "end" }}>
                    <div className="searchForm">
                        <form>
                            <Input.Search
                                allowClear
                                onChange={handleOnChange}
                                placeholder="Search by Name / Emp Id"
                            />
                        </form>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {datePick &&
                        <>
                            <div className="markdatePicker">
                                <Row style={{ marginRight: "20px" }}>
                                    <p>Please Select Date to Proceed</p>
                                </Row>
                                <Row>
                                    <DatePicker onChange={onChangeDate} />
                                    <div className="cancelDatePick">
                                        <CloseOutlined
                                            onClick={() => setDatePick(false)}
                                        />
                                    </div>

                                </Row>
                            </div>

                        </>
                    }
                    {datePickGet &&
                        <>
                            <div style={{ marginTop: "20px" }}>
                                <Row style={{ marginRight: "20px" }}>
                                    <p>Please Select Date to Proceed</p>
                                </Row>
                                <Row>
                                    <DatePicker onChange={onChangeDateGet} />
                                    <div className="cancelDatePick">
                                        <CloseOutlined
                                            onClick={() => setDatePickGet(false)}
                                        />
                                    </div>
                                </Row>
                            </div>

                        </>
                    }
                </Col>
            </Row>
            <div className="page-top">
                <Table
                    columns={columns}
                    dataSource={filStudents}
                    bordered
                    className="attendanceData"
                />
                <Row>
                    <ButtonReuse
                        type="primary"
                        className="primary-btn"
                        value="Submit"
                        onClick={submitAttendance}
                    ></ButtonReuse>
                </Row>
            </div>
        </div>
    </>);
}

export default Attendance;