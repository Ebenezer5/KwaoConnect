const form = document.getElementById("dataForm");

const dataGrid = document.getElementById("dataGrid");
const purchaseRadios = document.querySelectorAll('input[name="purchaseFor"]');
const someoneWrapper = document.getElementById("someoneWrapper");
const someoneInput = document.getElementById("someoneNumber");

const someoneError = document.getElementById("someoneError");
const bundleError = document.getElementById("bundleError");

let selectedAmount = null;

// Generate 1–20 packages
for (let i = 1; i <= 20; i++) {

    const card = document.createElement("div");
    card.classList.add("data-card");

    card.innerHTML = `
        <div class="data-left">${i} GB</div>
        <div class="data-right">GHS ${i}</div>
    `;

    card.addEventListener("click", () => {

        document.querySelectorAll(".data-card")
            .forEach(c => c.classList.remove("active"));

        card.classList.add("active");
        selectedAmount = i;
    });

    dataGrid.appendChild(card);
}

// Show/hide someone input
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

    bundleError.textContent = "";
    someoneError.textContent = "";

    if (!selectedAmount) {
        bundleError.textContent = "Please select a package";
        return;
    }

    const purchaseType = document.querySelector('input[name="purchaseFor"]:checked').value;

    let purchaseData = {
        service: "data",
        amount: selectedAmount,
        type: purchaseType,
        number: null
    };

    if (purchaseType === "someone") {

        const number = someoneInput.value.trim();

        if (!/^\d{10}$/.test(number)) {
            someoneError.textContent = "Enter phone number";
            return;
        }

        purchaseData.number = number;
    }

    localStorage.setItem("purchaseAmount", selectedAmount);
    localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
    localStorage.setItem("paymentPending", "true");

    window.location.href = "../features/payment.html";
});