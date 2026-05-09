const depts = {
    "Faculty of Science and Technology (FST)": ["ICT", "CSE", "Environmental Science"],
    "Faculty of Business Studies (FBS)": ["Accounting", "Finance", "Management", "Marketing"],
    "Faculty of Arts and Social Sciences (FASS)": ["Economics", "English", "Sociology", "Law"]
};

function updateDepartments() {
    const faculty = document.getElementById('faculty').value;
    const deptSelect = document.getElementById('dept');
    deptSelect.innerHTML = '<option value="">Select Department</option>';
    
    if (faculty && depts[faculty]) {
        depts[faculty].forEach(d => {
            let opt = document.createElement('option');
            opt.value = d;
            opt.innerText = d;
            deptSelect.appendChild(opt);
        });
    }
}

function generatePDF() {
    const name = document.getElementById('studentName').value;
    if(!name || !document.getElementById('faculty').value) {
        alert("Please fill in the required fields!");
        return;
    }

    // টেমপ্লেটে ডাটা পাঠানো
    document.getElementById('pdfFaculty').innerText = document.getElementById('faculty').value;
    document.getElementById('pdfDept').innerText = "Department of " + document.getElementById('dept').value;
    document.getElementById('pdfCourseTitle').innerText = document.getElementById('courseTitle').value;
    document.getElementById('pdfCourseCode').innerText = document.getElementById('courseCode').value;
    
    const topic = document.getElementById('topic').value;
    if(topic) {
        document.getElementById('pdfTopic').innerText = topic;
        document.getElementById('pdfTopicRow').style.display = 'block';
    } else {
        document.getElementById('pdfTopicRow').style.display = 'none';
    }

    document.getElementById('pdfName').innerText = name;
    document.getElementById('pdfId').innerText = document.getElementById('studentId').value;
    document.getElementById('pdfSection').innerText = document.getElementById('section').value;
    document.getElementById('pdfSemester').innerText = document.getElementById('semester').value;
    document.getElementById('pdfTeacherName').innerText = document.getElementById('teacherName').value;
    document.getElementById('pdfTeacherDesig').innerText = document.getElementById('teacherDesignation').value;
    document.getElementById('pdfTeacherDept').innerText = document.getElementById('teacherDept').value;
    
    const subDate = document.getElementById('subDate').value;
    document.getElementById('pdfDate').innerText = subDate ? new Date(subDate).toLocaleDateString('en-GB') : "";

    // PDF জেনারেশন
    const element = document.getElementById('pdf-template');
    element.style.display = 'block';

    const opt = {
        margin: 0,
        filename: `Assignment_${name}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        element.style.display = 'none';
    });
}
