// --- CONFIGURATION & STATE ---
let date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// --- MAIN RENDER FUNCTION ---
function renderCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Update Header Text
    document.getElementById('monthName').innerText = monthNames[month];
    document.getElementById('yearDisplay').innerText = year;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDayDate = new Date(year, month + 1, 0).getDate();
    const grid = document.getElementById('daysContainer');
    
    grid.innerHTML = "";

    // Padding for previous month days
    for (let x = 0; x < firstDayIndex; x++) {
        grid.innerHTML += `<div class="day empty"></div>`;
    }

    // Actual Days
    for (let i = 1; i <= lastDayDate; i++) {
        let isToday = (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) ? "today" : "";
        grid.innerHTML += `<div class="day ${isToday}">${i}</div>`;
    }
}

// --- NAVIGATION ---
window.changeMonth = (dir) => {
    date.setMonth(date.getMonth() + dir);
    renderCalendar();
};

// --- SMALL BUTTON COPY LOGIC ---
window.copyWidget = () => {
    // This detects the current GitHub Pages URL automatically
    const currentURL = window.location.href;
    const iframeCode = `<iframe src="${currentURL}" width="350" height="500" style="border:none; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1);" scrolling="no"></iframe>`;
    
    navigator.clipboard.writeText(iframeCode).then(() => {
        const btnText = document.getElementById('btnText');
        const originalText = btnText.innerText;
        btnText.innerText = "✅ Copied!";
        setTimeout(() => { btnText.innerText = originalText; }, 2000);
    }).catch(err => {
        alert("Error copying code. Please copy the URL manually.");
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', renderCalendar);
