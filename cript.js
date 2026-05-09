// script.js

const departmentData = {

  FST: [
    "Department of Information & Communication Technology (ICT)",
    "Department of Computer Science and Engineering (CSE)",
    "Department of Electrical & Electronic Engineering (EEE)",
    "Department of Environmental Science",
    "Department of Disaster Management and Resilience"
  ],

  FBS: [
    "Department of Business Administration (BBA)",
    "Department of Accounting and Information Systems",
    "Department of Management Studies"
  ],

  FASS: [
    "Department of English",
    "Department of Economics",
    "Department of Public Administration",
    "Department of International Relations",
    "Department of Mass Communication and Journalism",
    "Department of Development Studies"
  ],

  FSSS: [
    "Department of Law",
    "Department of Peace, Conflict and Human Rights",
    "Department of Security Studies"
  ],

  FMS: [
    "Army Medical College",
    "BUP Medical Institute"
  ]

};

function updateDepartments(){

  const faculty =
    document.getElementById("faculty").value;

  const departmentSelect =
    document.getElementById("department");

  departmentSelect.innerHTML = "";

  departmentData[faculty].forEach(function(dept){

    const option =
      document.createElement("option");

    option.value = dept;

    option.textContent = dept;

    departmentSelect.appendChild(option);

  });

}

updateDepartments();

function updatePreview(){

  const facultyText =
    document.getElementById("faculty")
    .options[
      document.getElementById("faculty").selectedIndex
    ].text;

  document.getElementById("previewFaculty")
    .innerText = facultyText;

  document.getElementById("previewDepartment")
    .innerText =
    document.getElementById("department").value;

  document.getElementById("previewCourseTitle")
    .innerText =
    document.getElementById("courseTitle").value;

  document.getElementById("previewCourseCode")
    .innerText =
    document.getElementById("courseCode").value;

  document.getElementById("previewName")
    .innerText =
    document.getElementById("studentName").value;

  document.getElementById("previewId")
    .innerText =
    document.getElementById("studentId").value;

  document.getElementById("previewSection")
    .innerText =
    document.getElementById("section").value;

  document.getElementById("previewSemester")
    .innerText =
    document.getElementById("semester").value;

  document.getElementById("previewTeacher")
    .innerText =
    document.getElementById("submittedTo").value;

  document.getElementById("previewDesignation")
    .innerText =
    document.getElementById("teacherDesignation").value;

  let dateValue =
    document.getElementById("submissionDate").value;

  if(dateValue){

    const formatted =
      new Date(dateValue)
      .toLocaleDateString('en-GB');

    document.getElementById("previewDate")
      .innerText = formatted;

  }

}

function downloadPDF(){

  updatePreview();

  const element =
    document.getElementById("coverPage");

  const options = {

    margin:0,

    filename:'assignment-cover.pdf',

    image:{
      type:'jpeg',
      quality:1
    },

    html2canvas:{
      scale:3
    },

    jsPDF:{
      unit:'px',
      format:[794,1123],
      orientation:'portrait'
    }

  };

  html2pdf()
    .set(options)
    .from(element)
    .save();

}
