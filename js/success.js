const successDetails = document.getElementById("successDetails");
const backDashboard = document.getElementById("backDashboard");

const amount = localStorage.getItem("purchaseAmount");
const purchaseData = JSON.parse(localStorage.getItem("purchaseData"));

if (purchaseData.type === "self") {
    successDetails.textContent = `You purchased GHS ${amount} for yourself.`;
} else {
    successDetails.textContent =
        `You purchased GHS ${amount} for ${purchaseData.number}.`;
}

localStorage.removeItem("purchaseAmount");
localStorage.removeItem("purchaseData");

backDashboard.addEventListener("click", () => {
    window.location.href = "../dashboard.html";
});

// ../features/success.html