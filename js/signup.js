const form = document.getElementById('signup');

const inputName = document.getElementById('inputName');
const inputContact = document.getElementById('inputContact');
const inputID = document.getElementById('idCard');
const inputPassword = document.getElementById('inputPassword');

const nameError = document.getElementById('nameError');
const contactError = document.getElementById('contactError');
const idCardError = document.getElementById('idCardError');
const passError = document.getElementById('passError');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (validateForm() && await saveUser()) {
        form.reset();
        window.location.href = 'dashboard.html'; // auto login redirect
    }
});

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function saveUser() {

    const users = getUsers();
    const hashedPassword = await hashPassword(inputPassword.value.trim());

    const fullName = inputName.value.trim().replace(/\s+/g, " ");
    const nameParts = fullName.split(" ");

    const firstName = nameParts[0];
    const lastName = nameParts[1];

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        contact: inputContact.value.trim(),
        ID: inputID.value.trim().toUpperCase(),
        password: hashedPassword,
        momo: 20,
        airtime: 5,
        data: 0,
        SMS: 0,
        network: "KwaoConnect",
        dateJoined: new Date().toISOString()
    };

    // Duplicate phone
    if (users.some(user => user.contact === newUser.contact)) {
        contactError.textContent = "Phone number already exists";
        return false;
    }

    // Duplicate ID
    if (users.some(user => user.ID === newUser.ID)) {
        idCardError.textContent = "ID already exists";
        return false;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // ✅ AUTO LOGIN
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return true;
}

function validateForm() {

    nameError.textContent = "";
    contactError.textContent = "";
    idCardError.textContent = "";
    passError.textContent = "";

    const fullName = inputName.value.trim().replace(/\s+/g, " ");
    const nameParts = fullName.split(" ");

    // Require exactly 2 names
    if (nameParts.length !== 2) {
        nameError.textContent = "Enter First and Last name only";
        return false;
    }

    // Ghana phone format
    if (!/^0\d{9}$/.test(inputContact.value.trim())) {
        contactError.textContent = "Enter valid 10 digit phone number";
        return false;
    }

    // Ghana ID format
    if (!/^GHA-\d{9}-\d{1}$/.test(inputID.value.trim().toUpperCase())) {
        idCardError.textContent = "ID must be like GHA-123456789-1";
        return false;
    }

    if (inputPassword.value.trim().length < 6) {
        passError.textContent = "Password must be at least 6 characters";
        return false;
    }

    return true;
}