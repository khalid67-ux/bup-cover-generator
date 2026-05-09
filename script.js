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

async function generatePDF() {
    const nameInput = document.getElementById('studentName').value;
    if(!nameInput) { alert("Please enter your name!"); return; }

    const btn = document.querySelector('.btn-generate');
    btn.innerText = "Generating PDF...";
    btn.disabled = true;

    // ডাটা ম্যাপ করা
    document.getElementById('pFaculty').innerText = document.getElementById('faculty').value;
    document.getElementById('pDept').innerText = "Department of " + document.getElementById('dept').value;
    document.getElementById('pTitle').innerText = document.getElementById('courseTitle').value;
    document.getElementById('pCode').innerText = document.getElementById('courseCode').value;
    document.getElementById('pName').innerText = nameInput;
    document.getElementById('pId').innerText = document.getElementById('studentId').value;
    document.getElementById('pSection').innerText = document.getElementById('section').value;
    document.getElementById('pSemester').innerText = document.getElementById('semester').value;
    document.getElementById('pTName').innerText = document.getElementById('teacherName').value;
    document.getElementById('pTDesig').innerText = document.getElementById('teacherDesignation').value;
    document.getElementById('pTDept').innerText = document.getElementById('teacherDept').value;
    
    const rawDate = document.getElementById('subDate').value;
    document.getElementById('pDate').innerText = rawDate ? new Date(rawDate).toLocaleDateString('en-GB') : "";

    // পিডিএফ এলিমেন্ট ধরা
    const element = document.getElementById('pdf-template');
    
    const opt = {
        margin: 0,
        filename: `BUP_Cover_${nameInput.replace(/\s/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            scrollY: 0,
            windowWidth: 210 * 3.78, // এ৪ সাইজের সাথে ব্রাউজার উইন্ডো ম্যাচ করা
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (err) {
        console.error(err);
        alert("Failed to download PDF. Please try on Google Chrome.");
    } finally {
        btn.innerText = "Download Cover Page (PDF)";
        btn.disabled = false;
    }
}
