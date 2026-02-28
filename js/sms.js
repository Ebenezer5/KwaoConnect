const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const smsGrid = document.getElementById("smsGrid");
const form = document.getElementById("smsForm");

const recipientInput = document.getElementById("recipient");
const paymentMethod = document.getElementById("paymentMethod");

const recipientError = document.getElementById("recipientError");
const packageError = document.getElementById("packageError");
const balanceInfo = document.getElementById("balanceInfo");

let selectedSMS = null;
let price = null;

// ===============================
// GENERATE SMS PACKAGES
// ===============================
const packages = [
    { sms: 5, price: 1 },
    { sms: 50, price: 5 },
    { sms: 100, price: 10 }
];

packages.forEach(pkg => {

    const card = document.createElement("div");
    card.classList.add("package-card");

    card.innerHTML = `
        <div class="left">${pkg.sms} SMS</div>
        <div class="right">GHS ${pkg.price}</div>
    `;

    card.addEventListener("click", () => {

        document.querySelectorAll(".package-card")
            .forEach(c => c.classList.remove("active"));

        card.classList.add("active");
        selectedSMS = pkg.sms;
        price = pkg.price;
    });

    smsGrid.appendChild(card);
});

// ===============================
// SHOW BALANCE WHEN PAYMENT SELECTED
// ===============================
paymentMethod.addEventListener("change", () => {

    if (paymentMethod.value === "airtime") {
        balanceInfo.textContent =
            `Your Airtime Balance: GHS ${currentUser.airtime.toFixed(2)}`;
    }
    else if (paymentMethod.value === "momo") {
        balanceInfo.textContent =
            `Your MoMo Balance: GHS ${currentUser.momo.toFixed(2)}`;
    }
    else {
        balanceInfo.textContent = "";
    }
});

// ===============================
// FORM SUBMIT
// ===============================
form.addEventListener("submit", (e) => {

    e.preventDefault();

    recipientError.textContent = "";
    packageError.textContent = "";

    const phone = recipientInput.value.trim();

    // Validate phone
    if (!/^0\d{9}$/.test(phone)) {
        recipientError.textContent = "Enter valid 10 digit phone number";
        return;
    }

    if (!selectedSMS) {
        packageError.textContent = "Select a package";
        return;
    }

    if (!paymentMethod.value) {
        alert("Select payment method");
        return;
    }

    // ===============================
    // PAYMENT LOGIC
    // ===============================

    if (paymentMethod.value === "airtime") {

        if (currentUser.airtime < price) {
            alert("Insufficient Airtime Balance");
            return;
        }

        currentUser.airtime -= price;
    }

    if (paymentMethod.value === "momo") {

        if (currentUser.momo < price) {
            alert("Insufficient MoMo Balance");
            return;
        }

        currentUser.momo -= price;
    }

    // Add SMS
    currentUser.SMS += selectedSMS;

    // Update users array
    let users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex(u => u.contact === currentUser.contact);
    users[index] = currentUser;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Prevent double submission
    form.querySelector("button").disabled = true;

    // Redirect
    window.location.href = "../success.html";
});