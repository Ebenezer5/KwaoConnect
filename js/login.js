const form = document.getElementById('login');
const createAccount = document.getElementById('accountLink');

const inputContact = document.getElementById('inputContact'); // updated for phone
const inputPassword = document.getElementById('inputPassword');

const contactError = document.getElementById('contactError'); // updated
const passwordError = document.getElementById('passwordError');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (validateLogin()) {
        const success = await loginUser();
        if (success) {
            window.location.href = 'dashboard.html';
        }
    }
});

createAccount.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'signup.html';
});
 
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function loginUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!users.length) {
        alert('No users found. Please register first.');
        return false;
    }

    const hashedPassword = await hashPassword(inputPassword.value.trim());

    const user = users.find(u =>
        u.contact === inputContact.value.trim() &&
        u.password === hashedPassword
    );

    if (!user) {
        passwordError.textContent = 'Invalid phone number or password';
        return false;
    }

        localStorage.setItem('currentUser', JSON.stringify(user));

    return true;
}

function validateLogin() {
    document.querySelectorAll('.error-text').forEach(el => el.textContent = "");

        if (!/^0\d{9}$/.test(inputContact.value.trim())) {
        contactError.textContent = "Phone number is required";
        return false;
    }

    if (inputPassword.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        return false;
    }

    return true;
}
