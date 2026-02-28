const form = document.getElementById("purchaseForm");
const someoneWrapper = document.getElementById("someoneNumberWrapper");
const someoneInput = document.getElementById("someoneNumber");

const someoneError = document.getElementById("someoneError");

const purchaseRadios = document.querySelectorAll('input[name="purchaseFor"]');

// Show/hide input
purchaseRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "someone" && radio.checked) {
            someoneWrapper.classList.remove("hidden");
        } else {
            someoneWrapper.classList.add("hidden");
            someoneInput.value = "";
            someoneError.textContent = "";
        }
    });
});

form.addEventListener("submit", function (e) {

    e.preventDefault();
    someoneError.textContent = "";

    const selected = document.querySelector('input[name="purchaseFor"]:checked').value;

    let purchaseData = {
        type: selected,
        number: null
    };

    if (selected === "someone") {

        const number = someoneInput.value.trim();

        if (!/^\d{10}$/.test(number)) {
            someoneError.textContent = "Enter valid phone number";
            return;
        }

        purchaseData.number = number;
    }

    // Save purchase info
    localStorage.setItem("purchaseData", JSON.stringify(purchaseData));

    window.location.href = "../features/payment.html";
});