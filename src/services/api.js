import axios from "axios";

const MAINURL = process.env.REACT_APP_BASE_URL

// API for login
export const seroLogin = async (email) => {
    return await axios.post(`${MAINURL}login`, email);
}

// ------------------ All User Related CRUD Operations ----------------------------


// GET All users from DB
export const getAllUsers = async () => {
    return await axios.get(`${MAINURL}getUsers`);
}

export const getAllIns = async () => {
    let users = await axios.get(`${MAINURL}getUsers`)
    let instructors = users.data.filter((ins) =>
        ins.Role === "instructor"
    )
    let extractIns = instructors.map((ins) => {
        return {
            value: ins.UserName,
            label: ins.UserName,
            key: ins.id,
        }
    })

    return extractIns
}

export const getAllCor = async () => {
    let users = await axios.get(`${MAINURL}getUsers`)
    let coordinators = users.data.filter((ins) =>
        ins.Role === "Co-ordinator"
    )
    var extractCor = coordinators.map((ins) => {
        return {
            value: ins.UserName,
            label: ins.UserName,
            key: ins.id,
        }
    })

    return extractCor

}

// Add User to DB
export const addUser = async (body) => {
    let userData = [{ ...body }]
    return await axios.post(`${MAINURL}insertUser`, userData)
}

// Get User by Id from DB
export const getUserById = async (id) => {
    return await axios.get(`${MAINURL}getUsers/${id}`);
}


// Edit User Data by Id to DB
export const editUserData = async (body) => {
    return await axios.patch(`${MAINURL}updateUser`, body)
}

// Delete User by Id
export const deleteUserById = async (id) => {
    return await axios.delete(`${MAINURL}deleteUser/${id}`)
}


// ------------------ All Batches Related CRUD Operations ----------------------------

// Get all Batches from DB
export const getAllBatches = async () => {
    return await axios.get(`${MAINURL}getBatches`)

}

// Get batches of Instructor
export const getAllBatchesIns = async (id) => {
    return await axios.get(`${MAINURL}getBatchesIns/${id}`)
}

// Get batches of Co-ordinator
export const getAllBatchesCor = async (id) => {
    return await axios.get(`${MAINURL}getBatchesCor/${id}`)
}


// Add Batch to DB
export const addBatch = async (batch) => {
    return await axios.post(`${MAINURL}insertBatch`, batch)
}


// Edit Batch
export const updateBatch = async (batch) => {
    return await axios.patch(`${MAINURL}updateBatch`, batch)
}

// Get Batch by Id from DB
export const getBatchById = async (id) => {
    return await axios.get(`${MAINURL}getBatch/${id}`)
}

// Delete a Batch
export const deleteBatchById = async (id) => {
    return await axios.delete(`${MAINURL}deleteBatch/${id}`)
        .then((res) => { console.log(res) })
        .then((err) => console.log(err))
}

//Get marks
export const getMarks = async () => {
    return await axios.get('http://localhost:4567/Marks')
}


// ------------------ All Participant Related CRUD Operations ----------------------------


// Add participant
export const addParticipant = async (body) => {
    return await axios.post(`${MAINURL}insertStudent`, body)
}

// Edit participant
export const updateParticipants = async (user) => {
    return await axios.patch(`${MAINURL}updateStudent`, user)
}

// Delete a Participants
export const deleteParticipantsById = async (id) => {
    return await axios.delete(`${MAINURL}deleteStudent/${id}`)
        .then((res) => { console.log(res) })
        .then((err) => console.log(err))


}

// Mark Attendance

export const markAttendance = async (body) => {
    return await axios.post(`${MAINURL}insertAttendance`, body);
}

// Get Attendance based on Date
export const getAttendance = async (body) => {
    return await axios.post(`${MAINURL}getAttendanceOnDate`, body);
}


// Get Personal Details
export const getPersonal = async (body) => {
    return await axios.post(`${MAINURL}getPersonalDetails`, body);
}

// Update Personal Details
export const updatePersonal = async (data) => {
    return await axios.patch(`${MAINURL}updatePersonalDetails`, data)
}


// Get total Users of SERO board
export const getUserCount = async () => {
    return await axios.get(`${MAINURL}getUserCount`)
}

// Get Students Per Batch
export const getStudentsPerBatch = async () => {
    return await axios.get(`${MAINURL}getStudentsPerCourse`)
}

// Get Total Students under Training 
export const getTotalPart = async () => {
    return await axios.get(`${MAINURL}totalPart`)
}

// Get Total Attendance
export const getTotalAtd = async () => {
    return await axios.get(`${MAINURL}getPresentAttendance`)
}

// Get studnt by Id
export const getStudentById = async (id) => {
    return await axios.get(`${MAINURL}getStudent/${id}`)
}

// get Assesments Marks by BatchId, Assesment Name and Date
export const getAllMarks = async (body) => {
    return await axios.post(`${MAINURL}getMarksByExam`, body)
}

// Get Assesment by Batch Id
export const getMarksbyBatch = async (id) => {
    return await axios.get(`${MAINURL}marksBy/${id}`)
}
// Add Marks
export const addMarks = async (body) => {
    return await axios.post(`${MAINURL}insertMarks`, body)
}

// Update Marks
export const updateMarks = async (body) => {
    return await axios.patch(`${MAINURL}updateScores`, body)
}


// Get All Assesments
export const getAllAssesments = async () => {
    return await axios.get(`${MAINURL}getAssesments`)
}

// Get the role of User
export const getRole = () => {
    let personal = JSON.parse(localStorage.getItem("personal"));
    let role = personal?.role;
    return role;
}

// Get Attendance by Student Id and Batch Id
export const getAttendanceById = async (body) => {
    return await axios.post(`${MAINURL}attendanceDate`, body)
}