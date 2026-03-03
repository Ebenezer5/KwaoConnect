const welcomeUser = document.getElementById("welcome");
const contact = document.getElementById("contact");
const logoutBtn = document.getElementById("logout");

const airtime = document.getElementById("airtime");
const data = document.getElementById("data");
const SMS = document.getElementById("SMS");

const buyAirtime = document.getElementById("buyAirtime");
const buyData = document.getElementById("buyData");
const buySMS = document.getElementById("buySMS");

const sidebar = document.getElementById("sidebar");
const openSidebar = document.querySelector(".settings-icon");
const closeSidebar = document.getElementById("closeSidebar");

const profileBtn = document.getElementById("profile");
const sideLogout = document.getElementById("sideLogout");

const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");


const popup = document.getElementById("welcomePopup");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "index.html";
}



if (popup && !currentUser.welcomeShown) {

    popupMessage.textContent =
        `You have GHS ${currentUser.momo.toFixed(2)} in your MoMo account.
Enjoy our services!`;

    popup.classList.add("active");

    currentUser.welcomeShown = true;

    // Update current user
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update inside users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.ID === currentUser.ID);

    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// Close popup safely
if (closePopup) {
    closePopup.addEventListener("click", () => {
        popup.classList.remove("active");
    });
}


// ======================================
// DISPLAY USER INFO
// ======================================
function capitalizeEachWord(text) {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

if (welcomeUser) {
    welcomeUser.textContent = `Hi, ${capitalizeEachWord(currentUser.firstName)}`;
}

if (contact) {
    contact.textContent = currentUser.contact;
}

if (airtime) {
    airtime.textContent = `GHS ${currentUser.airtime.toFixed(2)}`;
}

if (data) {
    data.textContent = `${currentUser.data ?? 0} MB`;
}

if (SMS) {
    SMS.textContent = `${currentUser.SMS ?? 0} SMS`;
}


// ======================================
// LOGOUT SYSTEM
// ======================================
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);
if (sideLogout) sideLogout.addEventListener("click", logout);


// ======================================
// SIDEBAR TOGGLE
// ======================================
if (openSidebar && sidebar) {
    openSidebar.addEventListener("click", () => {
        sidebar.classList.add("active");
    });
}

if (closeSidebar && sidebar) {
    closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
}


// ======================================
// PROFILE NAVIGATION
// ======================================
if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        window.location.href = "features/profile.html";
    });
}


// ======================================
// SLIDER SYSTEM
// ======================================
let index = 0;

function showSlide(i) {
    if (!slides) return;

    index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
}

function nextSlide() {
    index++;
    if (index >= slideItems.length) index = 0;
    showSlide(index);
}

if (slideItems.length > 0) {
    setInterval(nextSlide, 5000);
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
});


if (buyAirtime) {
    buyAirtime.addEventListener("click", () => {
        window.location.href = "features/airtime.html";
    });
}

if (buyData) {
    buyData.addEventListener("click", () => {
        window.location.href = "features/data.html";
    });
}

if (buySMS) {
    buySMS.addEventListener("click", () => {
        window.location.href = "features/sms.html";
    });
}