function generateAccount() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // Regex that checks there is no special characters

    if (username.length > 0 && username.length < 50 && !format.test(username)) {
        if (password.length > 8 && password.length < 100 && !format.test(password)){
            fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
            .catch(err => console.error(err));
        document.querySelector(".container").innerHTML = '<p>Account succesfully created! Please login with these credentials to access this</p>';
        } else{
                    document.querySelector(".container").innerHTML = '<p>There was an error in the creation of your account. Please ensure that your password has more than 8 characters, and no special characters</p>'
        }
            
    } else {
        document.querySelector(".container").innerHTML = '<p>There was an error in the creation of your account. Please ensure that your username has less than 50 characters, and no special characters</p>'
    };
}

function LoginAccount() {
    event.preventDefault();
    const LoginUsername = document.getElementById("usernameLOGIN").value;
    const LoginPassword = document.getElementById("passwordLOGIN").value;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // Regex that checks there is no special characters
    document.querySelector(".container").innerHTML = '<p>Login attempted</p>';
    
    if (LoginUsername.length > 0 && LoginUsername.length < 50 && !format.test(LoginUsername)) {
        if (LoginPassword.length > 8 && LoginPassword.length < 100 && !format.test(LoginPassword)){
            
            document.querySelector(".container").innerHTML = '<p>Login trying</p>';
            
            fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ LoginUsername, LoginPassword })
            })
            .then(res => res.json())
            .then(LoginData => {
                LoginConfirmation(LoginData, LoginPassword);
            })

            .catch(err => console.error(err));
        
        } else{
            ocument.querySelector(".container").innerHTML = '<p>Username/Password invalid, please try again </p>'
        }

    } else {
        document.querySelector(".container").innerHTML = '<p>Username/Password invalid, please try again</p>'
    };
}

function LoginConfirmation(LoginData, LoginPassword) {
    console.log(LoginData.password);
    console.log(LoginPassword);
    if (LoginData.password === LoginPassword) {
        document.querySelector(".container").innerHTML = '<p>Login successful</p>';
        sessionStorage.setItem("user", LoginData.username)
        window.location.href = "studentrecords.html";
    } else{
        document.querySelector(".container").innerHTML = '<p>Username or Password incorrect</p>';
    };
};

function registerStudent() { 
    const Owner = sessionStorage.getItem("user")
    const Name = document.getElementById("name").value;
    const Age = document.getElementById("age").value;
    const Class = document.getElementById("class").value;
    const Skill = document.getElementById("skill").value;
                
    fetch('/student', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Owner, Name, Age, Class, Skill })
    })
    .then(res => res.json())
    .catch(err => console.error(err));
    
    document.querySelector(".container").innerHTML = '<p>Student Uploaded! You can reuse this form as many times as needed for your students</p>';
    

};

function loadStudentsGrab(){
    const Owner = sessionStorage.getItem("user")

    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Owner })
    })
    .then(res => res.json())
    .then(StudentArray => {
        loadStudents(StudentArray);
    })
    .then(StudentArray => StudentArray)
    .catch(err => console.error(err)); 
};

function loadStudents(StudentArray){
    if (!StudentArray || StudentArray.length === 0) {
        document.querySelector(".container").innerHTML = '<p>No students found. Register a student to begin using the program</p>';
        return; // Exit the function
    }

    const result = StudentArray.map(student => {
        return `
        <div class="container">
            <nav>
                <h2>${student.name}</h2>
            </nav>
            <p><strong>Age:</strong> ${student.age}</p>
            <p><strong>Class:</strong> ${student.class}</p>
            <p><strong>Skill Level:</strong> ${student.skill}</p>
            <button id="${student.name}" onclick="loadStudentsPage('${student.name}'); return false"><b>go to student page</b></button>
            <br></br>
        </div>
        `;
    }).join(''); // Join all HTML snippets together
    document.querySelector(".container").innerHTML = result;
    if (sessionStorage.getItem('DarkMode') === 't'){
            document.body.classList.toggle('dark-mode');
    }
    if (sessionStorage.getItem('Zoom') === 't') {
        const targets = document.querySelectorAll('.font-target');
        targets.forEach(target => {
            target.classList.toggle('active-style');
        });
    }
};

// For the studentpage
function loadStudents2(StudentArray){
    if (!StudentArray || StudentArray.length === 0) {
        document.querySelector(".container").innerHTML = '<p>No students found. Register a student to begin using the program</p>';
        return; // Exit the function
    }

    const result = StudentArray.map(student => {
        return `
        <div class="container">
            <nav>
                <h2>${student.name}</h2>
            </nav>
            <p><strong>Age:</strong> ${student.age}</p>
            <p><strong>Class:</strong> ${student.class}</p>
            <p><strong>Skill Level:</strong> ${student.skill}</p>
        </div>
        `;
    }).join(''); // Join all HTML snippets together
    document.querySelector(".container").innerHTML = result;
};

function loadStudentsPage(studentname) {
    sessionStorage.setItem('Student', studentname)
    window.location.href = "studentpage.html";
}

function studentPageData() {
    // initialise the accessibility options as onload doesn't like being run more than once
    if (sessionStorage.getItem('DarkMode') === 't'){
        document.body.classList.toggle('dark-mode');
        }
    if (sessionStorage.getItem('Zoom') === 't') {
        const targets = document.querySelectorAll('.font-target');
        targets.forEach(target => {
            target.classList.toggle('active-style');
    });
    }
    
    const Student = sessionStorage.getItem("Student")
    fetch('/studentsdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Student })
    })
    .then(res => res.json())
    .then(StudentArray => {
        loadStudents2(StudentArray);
    })
    .catch(err => console.error(err));

    // Grabs records
    fetch('/records', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Student })
    })
    .then(res => res.json())
    .then(RecordsArray => {
        loadRecords(RecordsArray);
    })
    .catch(err => console.error(err));

    fetch('/checklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Student })
    })
    .then(res => res.json())
    .then(ChecklistsArray => {
        loadChecklists(ChecklistsArray);
    })
    .catch(err => console.error(err));

    // continue for - records, then once again for checklist
};

function loadRecords(RecordsArray) {
    if (!RecordsArray || RecordsArray.length === 0) {
        document.querySelector(".container2").innerHTML = '<p>No records found.</p>';
        return; // Exit the function
    }

    const result = RecordsArray.map(record => {
        return `
        <div class="container2">
            <p>${record.records}</p>
            <br></br>
        </div>
        `;
    }).join(''); // Join all HTML snippets together
    document.querySelector(".container2").innerHTML = result;
};

function loadChecklists(ChecklistsArray) {
    if (!ChecklistsArray || ChecklistsArray.length === 0) {
        const student = sessionStorage.getItem('Student')
        fetch('/checklistMake', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student })
        })
        .then(res => res.json())
        .then(ChecklistsArray => {
            loadChecklists(ChecklistsArray);
        })
        .catch(err => console.error(err));
        return; // Exit the function
    }

    const result = ChecklistsArray.map(check => {
        return `
        <div class="container3">
            <form>
                <input type="checkbox" id="safeentry" name="safeentry" value="1" ${(check.safeentry) === '1' ? 'checked' : ''}>
                <label for="safeentry">Safe Entry</label>
                <input type="checkbox" id="treading" name="treading" value="1" ${(check.treading) === '1' ? 'checked' : '' }>
                <label for="treading">Treading</label>
                <input type="checkbox" id="backfloat" name="backfloat" value="1" ${(check.backfloat) === '1' ? 'checked' : '' }>
                <label for="backfloat">Back float</label>
                <br></br>
                <input type="checkbox" id="backscull" name="backscull" value="1" ${(check.backscull) === '1' ? 'checked' : '' }>
                <label for="backscull">Back Scull</label>
                <input type="checkbox" id="duckdive" name="duckdive" value="1" ${(check.duckdive) === '1' ? 'checked' : '' }>
                <label for="duckdive">Duck Dive</label>
                <br></br>
                <input type="checkbox" id="paddling" name="paddling" value="1" ${(check.paddling) === '1' ? 'checked' : '' }>
                <label for="paddling">Paddling</label>
                <input type="checkbox" id="freestyle" name="freestyle" value="1" ${(check.freestyle) === '1' ? 'checked' : '' }>
                <label for="freestyle">Freestyle</label>
                <button onclick="readChecks(); return false"><b>Submit</b></button>
            </form> 
            <br></br>
        </div> 
        `;
    }).join(''); // Join all HTML snippets together
    document.querySelector(".container3").innerHTML = result;
};


function readRecord(){
    const file = document.getElementById("textFile").value;

    fetch('/read', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file })
    })
    .then(res => res.json())
    .catch(err => console.error(err));
    
};

function uploadFile() {
    const formdata = new FormData();
    const student = sessionStorage.getItem('Student');
    const fileInput = document.querySelector('#textFile'); 

    formdata.append('avatar', fileInput.files[0]);
    formdata.append('student', student);

    fetch('/upload', {
        method: 'POST',
        body: formdata
    })
    .then(res => res.json())
    .catch(err => console.error(err));
    
};

function readChecks() {
    const safeentry = document.getElementById("safeentry").checked;
    const treading = document.getElementById("treading").checked;
    const backfloat = document.getElementById("backfloat").checked;
    const backscull = document.getElementById("backscull").checked;
    const duckdive = document.getElementById("duckdive").checked;
    const paddling = document.getElementById("paddling").checked;
    const freestyle = document.getElementById("freestyle").checked;
    const student = sessionStorage.getItem('Student')

    fetch('/checklistread', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student, safeentry, treading, backfloat, backscull, duckdive, paddling, freestyle })
    })
    .then(res => res.json())
    .catch(err => console.error(err));
};