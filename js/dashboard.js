const welcomeUser = document.getElementById('welcome');
const contact = document.getElementById('contact');
const logoutBtn = document.getElementById('logout');

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const airtime = document.getElementById('airtime');
const data = document.getElementById('data');
const SMS = document.getElementById('SMS');

const buyAirtime = document.getElementById('buyAirtime');
const buyData = document.getElementById('buyData');
const buySMS = document.getElementById('buySMS');

const sidebar = document.getElementById('sidebar');
const openSidebar = document.querySelector('.settings-icon');
const closeSidebar = document.getElementById('closeSidebar');

const profileBtn = document.getElementById('profile');
const sideLogout = document.getElementById('sideLogout');
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");


const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.href = 'index.html';
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});


openSidebar.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

function capitalizeEachWord(text) {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
welcomeUser.textContent = `Hi, ${capitalizeEachWord(currentUser.firstName)}`;
contact.textContent = currentUser.contact;
airtime.textContent = `GHS ${currentUser.airtime.toFixed(2)}`;
data.textContent = `${currentUser.data ?? 0} MB`;
SMS.textContent = `${currentUser.SMS ?? 0} MB`;

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        localStorage.setItem("theme", "light");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
});

let index = 0;

function showSlide(i) {
    index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    index++;
    if (index >= slide.length) {
        index = 0;
    }
    showSlide(index);
}

setInterval(nextSlide, 5000);

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
    });
});


buyAirtime.addEventListener('click', () => {
    window.location.href = 'features/airtime.html';
});

buyData.addEventListener('click', () => {
    window.location.href = 'features/data.html';
});

buySMS.addEventListener('click', () => {
    window.location.href = 'features/sms.html';
});

sideLogout.addEventListener('click', () => {
    window.location.href = 'login.html';
});
