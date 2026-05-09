const depts = {
    "Faculty of Science and Technology (FST)": ["ICT", "CSE", "Environmental Science"],
    "Faculty of Business Studies (FBS)": ["Accounting", "Finance", "Management"]
};

function updateDepartments() {
    const f = document.getElementById('faculty').value;
    const d = document.getElementById('dept');
    d.innerHTML = '<option value="">Select Department</option>';
    if(f && depts[f]) {
        depts[f].forEach(item => {
            d.innerHTML += `<option value="${item}">${item}</option>`;
        });
    }
    updatePreview();
}

function updatePreview() {
    document.getElementById('viewFaculty').innerText = document.getElementById('faculty').value || "Faculty Name";
    document.getElementById('viewDept').innerText = "Department of " + (document.getElementById('dept').value || "...");
    document.getElementById('viewCourseTitle').innerText = document.getElementById('courseTitle').value || "Course Title";
    document.getElementById('viewCourseCode').innerText = document.getElementById('courseCode').value || "Code";
    document.getElementById('viewName').innerText = document.getElementById('studentName').value || "Name";
    document.getElementById('viewID').innerText = document.getElementById('studentId').value || "ID";
    document.getElementById('viewTeacher').innerText = document.getElementById('teacherInfo').value || "Teacher Designation";
    document.getElementById('viewDate').innerText = document.getElementById('subDate').value || "Date";
}

function generatePDF() {
    const element = document.getElementById('pdf-template');
    const opt = {
        margin: 0,
        filename: 'assignment-cover.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // সরাসরি প্রোমিজ হ্যান্ডেল করা
    html2pdf().set(opt).from(element).save()
    .catch(err => alert("Error generating PDF. Please check internet/logo."));
}
