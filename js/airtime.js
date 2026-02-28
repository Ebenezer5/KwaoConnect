const airtime = document.getElementById('airtime');
const inputAirtime = document.getElementById('inputAirtime');
const airtimeError = document.getElementById('airtimeError');

airtime.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateAirtime()) {

        localStorage.setItem("purchaseAmount", inputAirtime.value.trim());

        window.location.href = '../features/purchaseType.html';
    }
});

function validateAirtime() {

    const amount = Number(inputAirtime.value.trim());

    if (isNaN(amount) || amount <= 0) {
        airtimeError.textContent = "Please enter an amount greater than 0";
        return false;
    }

    airtimeError.textContent = "";
    return true;
}