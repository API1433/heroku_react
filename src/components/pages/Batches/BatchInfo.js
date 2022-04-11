import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './BatchInfo.css';
import ButtonReuse from "../../../atoms/Button";
import { Table, Form, Popconfirm, notification, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PopupImport, CreateParticipant, participantList } from '../../index';
import { deleteParticipantsById, getBatchById, addParticipant } from '../../../services/api';
import { Excel } from 'antd-table-saveas-excel';
import { useNavigate } from 'react-router';
import EditParticipants from "./Paricipants/EditParticipants";
import InstructorCard from "./InstructorCard";
import ProgressBar from './ProgressBar';
import * as xlsx from "xlsx";
// import xlsx from 'json-as-xlsx';

function BatchInfo() {

  const { Batch_id } = useParams();

  console.log("Batch Id", Batch_id);

  // State for import participant Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State for Edit User Drawer
  const [editVisible, setEditVisible] = useState(false);

  // State to get new data 
  const [getNew, setGetNew] = useState(true);

  // Get Role
  let personal = JSON.parse(localStorage.getItem("personal"));
  let role = personal.role;


  let navigate = useNavigate();

  // Handle Ok for Import Modal
  const handleOk = () => {
    setIsModalVisible(false);
    getBatchDetails();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const visibleHandlerEdit = (id) => {
    setEditVisible(true);
    console.log("Employee id", id)
    localStorage.setItem("EmployeeId", id);
  };
  const closeHandlerEdit = () => {
    setVisible(false);
    setEditVisible(false);
  };
  const [batch, setBatch] = useState([])

  useEffect(() => {
    getBatchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNew])

  const getBatchDetails = async () => {
    const batchDetails = await getBatchById(Batch_id);
    console.log("The participants", batchDetails.data.data.rows);
    setBatch(batchDetails.data.data.rows);
    localStorage.setItem("BatchName", batchDetails.data.data.rows[1][0]?.BatchName)
  }

  console.log("The batch details", batch[1]);

  const [form] = Form.useForm();


  // api call to delete a participants 
  const delParticipants = async (id) => {
    console.log("The Id", id);
    await deleteParticipantsById(id);
    getBatchDetails();
    notification.open({
      message: "Participant Deleted",
    });
  }

  // Function to get new Data after Add / Edit
  const getNewData = () => {
    setGetNew(!getNew);
  }

  const columns = [
    {
      title: 'Emp Id',
      dataIndex: 'EmployeeId',
      key: 'EmployeeId',

    },
    {
      title: 'Emp Name',
      dataIndex: 'Name',
      key: 'Name',
      editable: true,
      sorter: (a, b) => a.name.localeCompare(b.Name),
    },
    {
      title: 'Designation',
      dataIndex: 'Designation',
      key: 'Designation',
      editable: true,
      sorter: (a, b) => a.Designation.localeCompare(b.Designation),
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
      editable: true,
      sorter: (a, b) => a.Location.localeCompare(b.Location),
    },
    {
      title: 'Phone',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
      editable: true,
      sorter: (a, b) => a.PhoneNumber.localeCompare(b.PhoneNumber),
    },
    {
      title: 'Email',
      dataIndex: 'EmailId',
      key: 'EmailId',
      editable: true,
      sorter: (a, b) => a.EmailId.localeCompare(b.EmailId),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      width: "10%",
      render: (text, record) =>

        <div>
          <span >
            <EditOutlined
              onClick={() => visibleHandlerEdit(record.ID)}
              style={{ cursor: "pointer", color: "blue", paddingRight: "20px" }} />
          </span>
          <span >
            <Popconfirm className="ant-typography" title="Sure to delete?" onConfirm={() => delParticipants(record.ID)}>
              <DeleteOutlined
                style={{ cursor: "pointer", color: "red", paddingRight: "20px" }} />
            </Popconfirm>
          </span>

        </div>
    },

  ];

  // Visible function for Add participant
  const visibleHandler = () => {
    setVisible(true);
  };
  // close Button (X) for Add participant
  const closeHandler = () => {
    setVisible(false);
    setEditVisible(false);
  };
  // State for Add participant Drawer
  const [visible, setVisible] = useState(false);

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        addParticipant(json).then(() => {
          notification.open({
            message: "Participants Imported Successfully",
          });
          setGetNew(!getNew)
        })
        console.log(json);

      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }


  return (

    <>

      <div className='page-top'>
        <InstructorCard info={batch[1] ? batch[1] : ""} />
      </div>

      <div className="page-top">
        <ProgressBar info={batch[1] ? batch[1] : ""} />
      </div>

      <div className="page-bottom">
        <Row style={{ marginBottom: "30px" }}>
          <Col md={4}>
            <span>List of Participants </span>
          </Col>
          <Col md={20} style={{ textAlign: "end" }}>
            {role === "Co-ordinator" &&
              <div className="bd_button">
                <form>
                  <label htmlFor="upload">Import from Excel:</label>
                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={readUploadFile}
                  />
                </form>
              </div>

            }


            <div className='bd_button'>
              <ButtonReuse
                type="primary"
                className="btn btn-warning"
                htmlType="primary"
                value="Download as Excel"
                onClick={() => {
                  const excel = new Excel();
                  excel
                    .addSheet('test1')
                    .addColumns(participantList)
                    .addDataSource(batch)
                    .saveAs('ParticipantsList.xlsx');
                }}
              >
              </ButtonReuse>
            </div>

            <div className="bd_button">
              {role === "Co-ordinator" &&

                <ButtonReuse
                  type="primary"
                  className="btn btn-primary"
                  htmlType="primary"
                  value="+ Add New Participant"
                  onClick={visibleHandler}
                ></ButtonReuse>
              }

              <CreateParticipant
                getBatchDetails={getBatchDetails}
                visible={visible}
                onClose={closeHandler}
                onCancelButton={closeHandler}
              // newData={getNewData}
              />
            </div>
            {role === "Co-ordinator" &&
              <div className="bd_button">
                <ButtonReuse
                  type="primary"
                  className="btn btn-warning"
                  htmlType="primary"
                  value="Attendance"
                  onClick={() => { navigate(`/attendance/${Batch_id}`) }}

                ></ButtonReuse>

              </div >
            }

          </Col>
        </Row>

        <PopupImport handleOk={handleOk} handleCancel={handleCancel} isModalVisible={isModalVisible} Batch_id={Batch_id} />
        <div className="row py-2">

          <Form form={form} component={false}>

            <Table
              // columns={columns}
              columns={
                role === "Co-ordinator"
                  ? columns
                  : columns.filter(col => col.title !== "Action")
              }
              dataSource={batch[0]}
              bordered
              rowClassName="editable-row"
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
              }}
            />
          </Form>
        </div>
        <EditParticipants
          visible={editVisible}
          onClose={closeHandler}
          onCancelButton={closeHandlerEdit}
          newData={getNewData}

        />
      </div>


    </>
  )
}

export default BatchInfo;