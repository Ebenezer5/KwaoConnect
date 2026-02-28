const paymentForm = document.getElementById("paymentForm");
const displayAmount = document.getElementById("displayAmount");

const paymentError = document.getElementById("paymentError");

const amount = Number(localStorage.getItem("purchaseAmount"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

displayAmount.textContent = amount;

paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    paymentError.textContent = "";

    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (!selectedMethod) {
        paymentError.textContent = "Please select a payment method";
        return;
    }

        if (selectedMethod.value === "airtime") {

        if (currentUser.airtime < amount) {
            paymentError.textContent = "Insufficient airtime balance";
            return;
        }

        
        currentUser.airtime -= amount;

        const userIndex = users.findIndex(user => user.ID === currentUser.ID);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
        }

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "../features/success.html";
    }

   if (selectedMethod.value === "momo") {

    if (currentUser.momo < amount) {
        paymentError.textContent = "Insufficient momo balance";
        return;
    }

    currentUser.momo -= amount;

    const userIndex = users.findIndex(user => user.ID === currentUser.ID);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "../features/success.html";
}
});