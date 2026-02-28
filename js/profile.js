const fullNameEl = document.getElementById("fullName");
const contact = document.getElementById("contact");
const dateJoinedEl = document.getElementById("dateJoined");
const initialsDiv = document.getElementById("initials");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const fullName =
    (currentUser.firstName || "") +
    (currentUser.lastName ? " " + currentUser.lastName : "");

    function capitalizeEachWord(text) {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
         
    fullNameEl.textContent =  capitalizeEachWord(fullName.trim());
    contact.textContent = currentUser.contact

const firstInitial = currentUser.firstName
    ? currentUser.firstName.charAt(0).toUpperCase()
    : "";

const lastInitial = currentUser.lastName
    ? currentUser.lastName.charAt(0).toUpperCase()
    : "";

    initialsDiv.textContent = firstInitial + lastInitial;


if (currentUser.dateJoined) {
    const formattedDate = new Date(currentUser.dateJoined)
        .toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    dateJoinedEl.textContent = "Member since " + formattedDate;
}