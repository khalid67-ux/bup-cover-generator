const depts = {
    "Faculty of Science and Technology": ["Information & Communication Technology (ICT)", "Computer Science and Engineering (CSE)", "Environmental Science"],
    "Faculty of Business Studies": ["Accounting and Information Systems", "Finance and Banking", "Management"],
    "Faculty of Arts and Social Sciences": ["Economics", "English", "Law"]
};

function updateDepartments() {
    const faculty = document.getElementById('faculty').value;
    const deptSelect = document.getElementById('dept');
    deptSelect.innerHTML = '<option value="">Select Department</option>';
    if (faculty && depts[faculty]) {
        depts[faculty].forEach(d => {
            let opt = document.createElement('option');
            opt.value = d; opt.innerText = d;
            deptSelect.appendChild(opt);
        });
    }
}

function generatePDF() {
    const name = document.getElementById('studentName').value;
    if(!name) { alert("Please enter your name!"); return; }

    // Map data to Template
    document.getElementById('pFaculty').innerText = document.getElementById('faculty').value;
    document.getElementById('pDept').innerText = "Department of " + document.getElementById('dept').value;
    document.getElementById('pTitle').innerText = document.getElementById('courseTitle').value;
    document.getElementById('pCode').innerText = document.getElementById('courseCode').value;
    document.getElementById('pName').innerText = name;
    document.getElementById('pId').innerText = document.getElementById('studentId').value;
    document.getElementById('pSection').innerText = document.getElementById('section').value;
    document.getElementById('pSemester').innerText = document.getElementById('semester').value;
    document.getElementById('pTName').innerText = document.getElementById('teacherName').value;
    document.getElementById('pTDesig').innerText = document.getElementById('teacherDesignation').value;
    document.getElementById('pTDept').innerText = document.getElementById('teacherDept').value;
    
    const sDate = document.getElementById('subDate').value;
    document.getElementById('pDate').innerText = sDate ? new Date(sDate).toLocaleDateString('en-GB') : "";

    const element = document.getElementById('pdf-template');
    
    const opt = {
        margin: 0,
        filename: `BUP_Cover_${name}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
