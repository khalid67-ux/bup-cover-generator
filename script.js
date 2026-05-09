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

async function generatePDF() {
    const name = document.getElementById('studentName').value;
    
    // তথ্য পূরণ করা হয়েছে কি না চেক করা
    if(!name || !document.getElementById('faculty').value) {
        alert("Please fill in the required fields!");
        return;
    }

    // পিডিএফ টেমপ্লেট এলিমেন্ট ধরা
    const element = document.getElementById('pdf-template');
    
    // ১. পিডিএফ তৈরির আগে টেমপ্লেটটি দৃশ্যমান করা (খুবই গুরুত্বপূর্ণ)
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.position = 'absolute';
    element.style.left = '-9999px'; // স্ক্রিনের বাইরে পাঠিয়ে দেওয়া যাতে ইউজার না দেখে

    // ২. টেমপ্লেটে ডাটা বসানো
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

    // ৩. পিডিএফ কনফিগারেশন
    const opt = {
        margin: 0,
        filename: `Assignment_${name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: true, 
            letterRendering: true 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // ৪. পিডিএফ জেনারেট এবং ডাউনলোড
    try {
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error("PDF Error: ", error);
        alert("Something went wrong. Try again on a different browser.");
    } finally {
        // ৫. কাজ শেষ হলে আবার হাইড করে দেওয়া
        element.style.display = 'none';
        element.style.position = 'static';
    }
}
