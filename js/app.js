/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = [...document.querySelectorAll("section")];
const navbarList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Add ore remove active class
function addActiveClass(e) {
    return e.classList.add('your-active-class');
}
function removeActiveClass(e) {
    return e.classList.remove('your-active-class');
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// for each section create a list item
function createLiItem() {
    for (const section of sections) {
        liItem = document.createElement("li");
        liItem.innerHTML = `<a data-nav="${section.id}" class="menu__link">
            ${section.getAttribute("data-nav")}</a>`;
        console.log(liItem);
        navbarList.appendChild(liItem);
    }
}
createLiItem();
// Add class 'active' to section when near top of viewport
// check if user's view on specific section
// Set sections as active
window.addEventListener('scroll', (e) => {
    sections.forEach(section => {

        // return value of distance from the top (based on viewport)
        // if the distance is between 0 & 120 => user on that section
        // add active class
        const viewDistance = section.getBoundingClientRect().top;
        if (viewDistance > -100 && viewDistance < 160) {
            addActiveClass(section);
        } else {
            removeActiveClass(section);
        }
    });
});


// Scroll to anchor ID using scrollTO event
// Scroll to section on link click
navbarList.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById(e.target.dataset.nav).scrollIntoView({ behavior: 'smooth' });
})

/**
 * End Main Functions
 * Begin Events
 *
*/

// Hide Navigation bar when user not active
function inactivityTime() {
    let time;
    // Reset timer when any of these event happen (so navbar appear again)
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    document.onscroll = resetTimer;
    window.onmousemove = resetTimer;

    function resetTimer() {
        clearTimeout(time);
        document.getElementById("navbar__list").style.display = "block";
        // timeout is 4 seconds then navbar is hidden
        time = setTimeout(timeout, 4000)
    }
    function timeout() {
        document.getElementById("navbar__list").style.display = "none";
    }
};
inactivityTime();
