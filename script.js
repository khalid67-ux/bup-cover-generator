const departmentData = {
    "Faculty of Science and Technology (FST)": ["ICT", "CSE", "Environmental Science"],
    "Faculty of Business Studies (FBS)": ["Accounting", "Finance", "Management"],
    "Faculty of Arts and Social Sciences (FASS)": ["Economics", "English", "Sociology"]
};

function updateDepartments() {
    const faculty = document.getElementById('faculty').value;
    const deptSelect = document.getElementById('dept');
    deptSelect.innerHTML = '<option value="">Select Dept</option>';
    
    if (faculty && departmentData[faculty]) {
        departmentData[faculty].forEach(dept => {
            deptSelect.innerHTML += `<option value="${dept}">${dept}</option>`;
        });
    }
    updatePreview();
}

function updatePreview() {
    // Inputs
    const faculty = document.getElementById('faculty').value;
    const dept = document.getElementById('dept').value;
    const title = document.getElementById('courseTitle').value;
    const code = document.getElementById('courseCode').value;
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentId').value;
    const teacher = document.getElementById('teacherInfo').value;
    const date = document.getElementById('subDate').value;

    // View Update
    document.getElementById('viewFaculty').innerText = faculty || "Faculty Name";
    document.getElementById('viewDept').innerText = dept ? "Department of " + dept : "Department Name";
    document.getElementById('viewCourseTitle').innerText = title || "Course Title";
    document.getElementById('viewCourseCode').innerText = code || "Course Code";
    document.getElementById('viewName').innerText = name || "Student Name";
    document.getElementById('viewID').innerText = id || "Student ID";
    document.getElementById('viewTeacher').innerText = teacher || "Lecturer Name";
    document.getElementById('viewDate').innerText = date ? new Date(date).toLocaleDateString('en-GB') : "Submission Date";
}

function generatePDF() {
    const element = document.getElementById('pdf-template');
    const studentName = document.getElementById('studentName').value || "Assignment";
    
    const options = {
        margin: 0,
        filename: `${studentName}_Cover.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
}
