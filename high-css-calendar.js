/**
 * Fashionable Calendar Logic - Pure JS
 * Controls Month Switching, Year Calculation, and Live Time
 */
function initStylishCalendar(containerId, monthId, yearId, timeId, headerId) {
    let date = new Date();
    let dMonth = date.getMonth();
    let dYear = date.getFullYear();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthGradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
        'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)'
    ];

    function render() {
        const container = document.getElementById(containerId);
        const header = document.getElementById(headerId);
        const firstDay = new Date(dYear, dMonth, 1).getDay();
        const daysInMonth = new Date(dYear, dMonth + 1, 0).getDate();
        
        document.getElementById(monthId).innerText = months[dMonth];
        document.getElementById(yearId).innerText = dYear;
        header.style.background = monthGradients[dMonth];
        
        container.innerHTML = '';
        // Pad previous days
        for (let i = 0; i < firstDay; i++) {
            container.innerHTML += '<div class="day" style="visibility:hidden"></div>';
        }
        // Fill actual days
        for (let i = 1; i <= daysInMonth; i++) {
            let isToday = (i === date.getDate() && dMonth === date.getMonth() && dYear === date.getFullYear());
            container.innerHTML += `<div class="day ${isToday ? 'today' : ''}">${i}</div>`;
        }
    }

    // Global switch for buttons
    window.changeMonth = (dir) => {
        dMonth += dir;
        if (dMonth > 11) { dMonth = 0; dYear++; }
        else if (dMonth < 0) { dMonth = 11; dYear--; }
        render();
    };

    setInterval(() => {
        document.getElementById(timeId).innerText = new Date().toLocaleString();
    }, 1000);

    render();
}
