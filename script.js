const depts = {
    "Faculty of Science and Technology (FST)": ["ICT", "CSE", "Environmental Science"],
    "Faculty of Business Studies (FBS)": ["Accounting", "Finance", "Management"],
    "Faculty of Arts and Social Sciences (FASS)": ["Economics", "English", "Public Administration"]
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
    document.getElementById('viewDept').innerText = document.getElementById('dept').value ? "Department of " + document.getElementById('dept').value : "Department Name";
    document.getElementById('viewCourseTitle').innerText = document.getElementById('courseTitle').value || "Digital Signal Processing";
    document.getElementById('viewCourseCode').innerText = document.getElementById('courseCode').value || "ICE 3107";
    document.getElementById('viewName').innerText = document.getElementById('studentName').value || "Your Name";
    document.getElementById('viewID').innerText = document.getElementById('studentId').value || "ID Number";
    document.getElementById('viewTeacher').innerText = document.getElementById('teacherInfo').value || "Lecturer Name";
    
    const dateInput = document.getElementById('subDate').value;
    document.getElementById('viewDate').innerText = dateInput ? new Date(dateInput).toLocaleDateString('en-GB') : "05/05/2026";
}

function generatePDF() {
    const element = document.getElementById('pdf-template');
    const name = document.getElementById('studentName').value || "CoverPage";
    
    // ডাউনলোড করার সময় প্রিভিউ এরিয়া জুম আউট সমস্যা এড়াতে width ফিক্স করা
    const opt = {
        margin: 0,
        filename: `${name}_Cover.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
