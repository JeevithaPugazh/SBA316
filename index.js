const tableContainer = document.getElementById(
  "table-container"
);
const formContainer = document.getElementById(
  "form-container"
);
const studentNameEl =
  document.getElementById("studentName");
const courseNameEl = document.getElementById("courseName");
const emailEl = document.getElementById("email");
const graduationDateEl = document.getElementById(
  "graduationDate"
);
const tbody = document.querySelector(".tbody");
const error = document.getElementById("error");
const h1 = document.getElementById("heading");
const addBtn = document.getElementById("addbtn");
const cancelBtn = document.getElementById("cancelBtn");
const checkCourse = document.getElementById("checkCourse");
const noData = document.getElementById("noData");
//creating event listener to ADD STUDENT DETAIL button in main page

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  formContainer.style.display = "block";
  tableContainer.style.display = "none";
  addBtn.style.display = "none";
  h1.innerText = "Add Student details";
  checkCourse.style.display = "block";
});

//creating event listener to ADD button in form container
formContainer.addEventListener("submit", addStudentList);

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.style.display = "none";
  tableContainer.style.display = "block";
  addBtn.style.display = "block";
  checkCourse.style.display = "none";
});

checkCourse.addEventListener("click", (e) => {
  e.preventDefault();
  var myWindow = window.open(
    "https://perscholas.org/courses/",
    "_blank",
    "width=800,height=600,top=100,left=100,resizable=yes,scrollbars=yes"
  );
  myWindow.focus();
  courseNameEl.focus();
});

function addStudentList(e) {
  e.preventDefault();
  const id = new Date().getTime().toString();
  let newStudent = {
    id: id,
    studentName: studentNameEl.value,
    courseName: courseNameEl.value,
    email: emailEl.value,
    graduationDate: graduationDateEl.value,
  };
  try {
    addStudent(newStudent);
    createRow(newStudent, tbody);
    studentNameEl.value = "";
    courseNameEl.value = "";
    emailEl.value = "";
    graduationDateEl.value = "";
    tableContainer.style.display = "block";
    formContainer.style.display = "none";
    addBtn.style.display = "block";
    error.style.display = "none";
    checkCourse.style.display = "none";
    noData.style.display="none";
  } catch (e) {
    error.innerHTML = `<h1>${e.message}</h1>`;
    emailEl.focus();
  }
}

//add newStudent in local Storage
function addStudent(studentObject) {
  let students = getAllStudentList();
  const isStudentExist = students.some((student) => {
    return (
      student.email.toLowerCase() ===
      studentObject.email.toLowerCase()
    );
  });
  if (isStudentExist) {
    error.style.display = "block";
    throw new Error("Error! Email is already exist!");
  }

  students.push(studentObject);

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );
}

//function to create cells
function createCell(tr, content) {
  const td = document.createElement("td");
  td.setAttribute("class", "px-6 py-4");
  td.innerText = content;
  tr.appendChild(td);
}

//Function to create Rows
function createRow(student, tbody) {
  const tr = document.createElement("tr");
  tr.setAttribute("id", student.id);
  tr.setAttribute(
    "class",
    "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
  );
  const sName = student.studentName;
  const cName = student.courseName;
  const sEmail = student.email;
  const graduationDate = student.graduationDate;
  createCell(tr, sName);
  createCell(tr, cName);
  createCell(tr, sEmail);
  createCell(tr, graduationDate);
  const td = document.createElement("td");

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute(
    "class",
    "text-blue-700 bg-transparent hover:bg-blue-800 hover:text-white border border-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  );
  deleteButton.innerText = "DELETE";
  deleteButton.addEventListener("click", deleteRow);
  td.appendChild(deleteButton);
  tr.appendChild(td);
  tbody.appendChild(tr);
}

//function to delete row
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
    const currentrowIndex = tr.rowIndex - 1;
    tbody.deleteRow(currentrowIndex);
  } else {
    return false;
  }
}

function createTable() {
  let students = getAllStudentList();
  if (students.length == 0) {
    noData.innerHTML = `<h1> No data found! Please click add student button</h1>`;
  }else{
    noData.style.display = "none";
  }
  for (let i = 0; i < students.length; i++) {
    createRow(students[i], tbody);
  }
}

function getAllStudentList() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

createTable();
