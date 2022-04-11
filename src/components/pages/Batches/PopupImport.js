import React from 'react';
import { Modal } from 'antd';
import * as XLSX from 'xlsx'

function PopupImport(props) {
  const OnChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });


      console.log("The Excel data", data);
      // let ab = data.split('\n')
      // mydata = ab;
      // console.log("Excel Data", mydata)
      // for (var i = 1; i < mydata.length; i++) {
      //   let xy = mydata[i].split(",");
      //   const setstudents = {
      //     batch_id: Number(props.Batch_id),
      //     name: xy[4],
      //     employee_id: xy[1],
      //     designation: xy[7],
      //     work_location: xy[5],
      //     phone_number: xy[6],
      //     email_id: xy[3]
      //   }
      // console.log(setstudents);

      // addParticipant(setstudents);



      // Axios.post(`http://localhost:4567/students`, setstudents)
      //   .then((result) => {
      //     console.log("response", result)
      //   })
      //   .catch((error) => console.log(error))
      // }

    };
    reader.readAsBinaryString(file);
  };


  return (
    <div>
      <Modal title="Upload Excel Sheet" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
        <div className="container">
          <div className="row px-5 py-2 text-center">
            <div className="col-md-12 py-2 upl">
              <div className="row">
                <div className="col-md-5"><span>Upload Excel:</span> </div>
                <div className="col-md-5 "><input type="file" onChange={OnChange} accept=".xlsx, .xls, .csv" /></div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default PopupImport