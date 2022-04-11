import React, { useState } from 'react';
import { Modal } from 'antd';
import {addMarks} from '../../../services/api';
import * as XLSX from 'xlsx';
import Template from '../../../assets/Marks_Template.xlsx'

export default function ImportExcel(props){
  const [dataforPost,setDataforPost] = useState([])
    let mydata = []
    const OnChange =(e) => {
        const [file] = e.target.files;
        const reader = new FileReader();
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    
    
          console.log(data);
          let ab = data.split('\n')
          mydata = ab;
          let postMarkData=[];
          console.log(mydata)
          for (var i = 1; i < mydata.length; i++) {
            let xy = mydata[i].split(",");
            console.log(xy);
            const setMarks = {
              employee_id:  xy[0],
              batch_id:  xy[1],
              test_name:  xy[2],
              exam_date:  xy[3],
              marks:  xy[4],
              comments:  xy[5],
            }
            postMarkData[i-1] = setMarks
            console.log(setMarks);
          }
          setDataforPost(postMarkData);

        };
        reader.readAsBinaryString(file);
      };
    const onOk = () => {
      console.log(dataforPost)
      addMarks(dataforPost);
      props.handleOk();
    };
  
    return(
        <div>
            <Modal title="Upload Excel Sheet" visible={props.isModalVisible} onOk={onOk} onCancel={props.handleCancel}>
                <div className="container">
                    <div className="row px-5 py-2 text-center " style={{bacground:"#fafafa",boxShadow: "0px 3px 20px 5px rgb(0 0 0 / 7%)"}}>
                        <div className="col-md-12 py-2 upl">
                        <div className="row">
                        <div className="col-md-5"><span>Upload Excel:</span> </div>
                        <div className="col-md-5 "><input type="file" onChange={OnChange}  accept=".xlsx, .xls, .csv" /></div>
                        </div>
                        </div>
                        
                    </div>
                    <div className="text-center" style={{marginTop:"15px"}}>
                          <a href={Template} download>click here</a> to download the import template.
                        </div>
                </div>
            </Modal>
        </div>
    )
}
