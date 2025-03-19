const formContainer = document.querySelector(
  ".form-container"
);
const tableContainer = document.querySelector(
  ".table-container"
);

const studentDetails = document.getElementById(
  "studentDetails"
);
const tbody = document.getElementById("tbody");
const studentNameEl =
  studentDetails.elements["studentName"];
const courseNameEl = studentDetails.elements["courseName"];
const emailEl = studentDetails.elements["email"];
const graduationDateEl = studentDetails.elements["date"];
let editedRowId = "";
studentDetails.addEventListener("submit", addStudentList);

function addStudentList(e) {
  e.preventDefault();
  const id = editedRowId !== "" ? editedRowId : new Date().getTime().toString();
  let newStudent = {
    id: id,
    studentName: studentNameEl.value,
    courseName: courseNameEl.value,
    email: emailEl.value,
    graduationDate: graduationDateEl.value,
  };
  addStudent(newStudent);
  createRow(newStudent, tbody,index);
  studentNameEl.value = "";
  courseNameEl.value = "";
  emailEl.value = "";
  graduationDateEl.value = "";

  tableContainer.style.display = "flex";
  formContainer.style.display = "none";
}

function addStudent(studentObject) {
  let students =
    JSON.parse(localStorage.getItem("students")) || [];
  students.push(studentObject);

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );
}

function createCell(tr, content) {
  const td = document.createElement("td");
  td.innerText = content;
  tr.appendChild(td);
}

function createRow(student, tbody) {
  const tr = document.createElement("tr");
  tr.setAttribute("id", student.id);
  const sName = student.studentName;
  const cName = student.courseName;
  const sEmail = student.email;
  const graduationDate = student.graduationDate;
  createCell(tr, sName);
  createCell(tr, cName);
  createCell(tr, sEmail);
  createCell(tr, graduationDate);
  const td = document.createElement("td");

  const editButton = document.createElement("button");
  editButton.innerText = "EDIT";
  editButton.addEventListener("click", editRow);
  td.appendChild(editButton);
  tr.appendChild(td);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";
  deleteButton.addEventListener("click", deleteRow);
  td.appendChild(deleteButton);
  tr.appendChild(td);

  tbody.appendChild(tr);
}
function createTable() {
  let students = getAllStudentList();

  for (let i = 0; i < students.length; i++) {
    createRow(students[i], tbody);
  }
}
function editRow(e) {
  const tr = e.target.parentElement.parentElement;
  const studentId = tr.getAttribute("id");
  editedRowId = studentId
  let students = getAllStudentList();
  let editRow = students.find((student) => {
    if (student.id === studentId) {
      return true;
    } else {
      return false;
    }
  });
  tableContainer.style.display = "none";
  formContainer.style.display = "block";

  studentNameEl.value = editRow.studentName;
  courseNameEl.value = editRow.courseName;
  emailEl.value = editRow.email;
  graduationDateEl.value = editRow.graduationDate;


}

function deleteRow(e) {
  if (confirm("Are you sure, you want delete this row?")) {
    const tr = e.target.parentElement.parentElement;
    const studentId = tr.getAttribute("id");
    let students = getAllStudentList();
    students = students.filter((student) => {
      if (student.id !== studentId) {
        return true;
      } else {
        return false;
      }
    });
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
    const currentrowIndex = tr.rowIndex;
    tbody.deleteRow(currentrowIndex);
  } else {
    return false;
  }
}

const addButton = document.getElementById("addBtn");
addButton.addEventListener("click", (e) => {
  formContainer.style.display = "block";
  tableContainer.style.display = "none";
});

function getAllStudentList() {
  return JSON.parse(localStorage.getItem("students"));
}

createTable();
