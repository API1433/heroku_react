import React, { useEffect, useState } from "react";
import { Table, Row, Col, Modal, notification, Input } from "antd";
import { getAllBatches, deleteBatchById, getRole, getAllCor, getAllIns, getAllBatchesCor, getAllBatchesIns } from "../../../services/api";
import ButtonReuse from "../../../atoms/Button";
import AddBatch from "./AddBatch";
import EditBatch from "./EditBatch";
import {
    EditOutlined,
    EyeOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
const GetBatch = () => {

    const { confirm } = Modal;

    // Get User Role
    let role = getRole();

    // State to store User data
    const [batchData, setBatchData] = useState([]);

    // State to store filtered Data on Search
    const [filterData, setFilterData] = useState([]);

    const [userId, setUserId] = useState("");

    // State to get new data 
    const [getNew, setGetNew] = useState(true);

    // State for Add User Drawer
    const [visible, setVisible] = useState(false);

    // State for Edit User Drawer
    const [editVisible, setEditVisible] = useState(false);

    // State to search the table
    const [nameSearch, setNameSearch] = useState("");

    // State to store co-ordinator options
    const [coordinators, setCoordinators] = useState();

    // State to store Instructor options
    const [instructors, setInstructors] = useState();

    // close Button (X) for Add User
    const closeHandler = () => {
        setVisible(false);
        setEditVisible(false);
    };

    // Visible function for Add User
    const visibleHandler = () => {
        setVisible(true);
    };

    // Visible function for Edit User
    const visibleHandlerEdit = (id) => {
        setEditVisible(true);
        setUserId(id);
        localStorage.setItem("batchId", id);
    };

    // Get the list of all users
    useEffect(() => {
        getBatches();
        getAllIns().then((res) => {
            let output = res.map(s => ({ text: s.label, value: s.value }));
            setInstructors(output);
        })
        getAllCor().then((res) => {
            let output = res.map(s => ({ text: s.label, value: s.value }));
            setCoordinators(output)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getNew])

    let personal = JSON.parse(localStorage.getItem("personal"));

    const getBatches = async () => {
        if (personal?.role === "instructor") {
            let batches = await getAllBatchesIns(Number(personal?.userId));
            console.log("Batches Data", batches?.data.batches);
            setBatchData(batches?.data.batches);
            setFilterData(batches?.data.batches);
        }

        else if (personal?.role === "Co-ordinator") {
            let batches = await getAllBatchesCor(Number(personal?.userId));
            console.log("Batches Data", batches?.data.batches);
            setBatchData(batches?.data.batches);
            setFilterData(batches?.data.batches);
        }
        else {
            let batches = await getAllBatches();
            console.log("Batches Data", batches?.data.batches);
            setBatchData(batches?.data.batches);
            setFilterData(batches?.data.batches);
        }

    }

    // Function to search the Table
    useEffect(() => {
        if (batchData) {
            const results = batchData.filter(
                (item) =>
                    item.StartDate.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.BatchName.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.EndDate.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.Instructor.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.Coordinator.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.Course.toLowerCase().includes(nameSearch.toLowerCase())

            );
            setFilterData(results);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameSearch])

    // Modal to delete the User
    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this batch?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteBatchById(id).then(() => {
                    const notify = () => {
                        notification.open({
                            message: "Batch Deleted",
                        });
                    };
                    notify();
                    setGetNew(!getNew);
                })
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }

    // User Table Columns
    const columns = [
        {
            title: "Batch Id",
            dataIndex: "BatchId",
            key: "BatchId",
            // sorter: (a, b) => a.BatchId.localeCompare(b.BatchId),
        },
        {
            title: "Batch Name",
            dataIndex: "BatchName",
            key: "BatchName",
            sorter: (a, b) => a.BatchName.localeCompare(b.BatchName),
        },
        {
            title: "Start Date",
            dataIndex: "StartDate",
            key: "StartDate",
            sorter: (a, b) => a.StartDate.localeCompare(b.StartDate),
        }
        ,
        {
            title: "End Date",
            dataIndex: "EndDate",
            key: "EndDate",
            sorter: (a, b) => a.EndDate.localeCompare(b.EndDate),
        }
        ,
        {
            title: "Instructor Name",
            dataIndex: "Instructor",
            key: "Instructor",
            filters: instructors,
            onFilter: (value, record) => record.Instructor.indexOf(value) === 0,
            sorter: (a, b) => a.Instructor.localeCompare(b.Instructor),
        }
        ,
        {
            title: "Coordinator Name",
            dataIndex: "Coordinator",
            key: "Coordinator",
            filters: coordinators,
            onFilter: (value, record) => record.Coordinator.indexOf(value) === 0,
            sorter: (a, b) => a.Coordinator.localeCompare(b.Coordinator),
        }
        ,
        {
            title: "Course",
            dataIndex: "Course",
            key: "Course",
            sorter: (a, b) => a.Course.localeCompare(b.Course),
        }
        ,
        {
            title: "Duration",
            dataIndex: "Duration",
            key: "Duration",
            // sorter: (a, b) => a.Duration.localeCompare(b.Duration),
        }
        ,
        {
            title: "Action",
            dataIndex: "BatchId",
            key: "BatchId",
            width: "10%",
            render: (text, record) =>
                <>
                    <div>
                        {role === "admin" &&
                            <EditOutlined
                                onClick={() => { visibleHandlerEdit(record.BatchId) }}
                                style={{ cursor: "pointer", color: "blue", paddingRight: "20px" }} />}

                        <span>
                            <Link to={`/batches/${record.BatchId}`}>
                                < EyeOutlined style={{ cursor: "pointer", paddingRight: "20px" }} /></Link>
                        </span>
                        {role === "admin" &&
                            <DeleteOutlined
                                onClick={() => { showConfirm(record.BatchId) }}
                                style={{ cursor: "pointer", color: "red" }} />
                        }


                    </div>

                </>

        },
    ];

    // Function to set nameSearch
    const handleOnChange = (event) => {
        setNameSearch(event.target.value);
    };

    // Function to get new Data after Add / Edit
    const getNewData = () => {
        setGetNew(!getNew);
    }


    return (

        <>
            <div className="page-top">
                <Row>
                    <Col md={14}>
                        <span>Batches</span>
                    </Col>
                    <Col md={10} style={{ textAlign: "end" }}>
                        <div className="searchForm">
                            <form>
                                <Input.Search
                                    allowClear
                                    onChange={handleOnChange}
                                    placeholder="Search by Batch Name / Instructor / Co-ordinator / course"
                                />
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="page-bottom">
                <Row className='add-pad'>
                    <Col md={12}>
                        <span>List of Batches</span>
                    </Col>
                    <Col md={12} style={{ textAlign: "end" }}>
                        {role === "admin" &&
                            <ButtonReuse
                                type="primary"
                                className="primary-btn"
                                htmlType="primary"
                                value="+ Add Batch"
                                onClick={visibleHandler}
                            ></ButtonReuse>}

                    </Col>
                </Row>
                {
                    <AddBatch
                        getBatches={getBatches}
                        visible={visible}
                        onClose={closeHandler}
                        onCancelButton={closeHandler}
                    />}
                <EditBatch
                    visible={editVisible}
                    onClose={closeHandler}
                    onCancelButton={closeHandler}
                    newData={getNewData}
                    userId={userId}
                />
                <Table
                    columns={columns}
                    dataSource={filterData}
                    bordered
                    className="usersTable"
                    scroll={{ x: 1400 }}
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "30", "40", "50"],
                    }}
                />
            </div>
        </>


    );
}

export default GetBatch
