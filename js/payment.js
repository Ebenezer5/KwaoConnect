const paymentForm = document.getElementById("paymentForm");
const displayAmount = document.getElementById("displayAmount");

const paymentError = document.getElementById("paymentError");
const balanceInfo = document.getElementById("balanceInfo");

const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');

let amount = Number(localStorage.getItem("purchaseAmount")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

if (!currentUser || !amount) {
    window.location.href = "../dashboard.html";
}

currentUser.airtime = currentUser.airtime ?? 0;
currentUser.momo = currentUser.momo ?? 0;

displayAmount.textContent = `GHS ${amount.toFixed(2)}`;

paymentOptions.forEach(option => {
    option.addEventListener("change", () => {

        const method = option.value;

        balanceInfo.textContent =
            `Your ${method.toUpperCase()} Balance: GHS ${currentUser[method].toFixed(2)}`;
    });
});



paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    paymentError.textContent = "";

    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (!selectedMethod) {
        paymentError.textContent = "Please select a payment method";
        return;
    }

    const method = selectedMethod.value;

    if (currentUser[method] < amount) {
        paymentError.textContent = `Insufficient ${method} balance`;
        return;
    }

    currentUser[method] -= amount;

    const userIndex = users.findIndex(user => user.ID === currentUser.ID);

    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));

    paymentForm.querySelector("button").disabled = true;

    localStorage.removeItem("purchaseAmount");

    window.location.href = "../features/success.html";
});