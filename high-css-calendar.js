// high-css-calendar.js
function initCalendar(containerId, monthId, yearId, timeId) {
    let date = new Date();
    let dMonth = date.getMonth();
    let dYear = date.getFullYear();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function render() {
        const container = document.getElementById(containerId);
        const firstDay = new Date(dYear, dMonth, 1).getDay();
        const daysInMonth = new Date(dYear, dMonth + 1, 0).getDate();
        
        document.getElementById(monthId).innerText = months[dMonth];
        document.getElementById(yearId).innerText = dYear;
        
        container.innerHTML = '';
        for (let i = 0; i < firstDay; i++) {
            container.innerHTML += '<div class="day empty"></div>';
        }
        for (let i = 1; i <= daysInMonth; i++) {
            let todayClass = (i === date.getDate() && dMonth === date.getMonth() && dYear === date.getFullYear()) ? 'today' : '';
            container.innerHTML += `<div class="day ${todayClass}">${i}</div>`;
        }
    }

    window.changeMonth = (dir) => {
        dMonth += dir;
        if (dMonth > 11) { dMonth = 0; dYear++; }
        else if (dMonth < 0) { dMonth = 11; dYear--; }
        render();
    };

    setInterval(() => {
        document.getElementById(timeId).innerText = new Date().toLocaleTimeString();
    }, 1000);

    render();
}
