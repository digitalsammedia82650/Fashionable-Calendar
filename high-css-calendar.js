/**
 * Fashionable Calendar Engine
 * Handles Date Logic & UI Updates
 */

class FashionCalendar {
    constructor(containerId, timeId) {
        this.currentDate = new Date();
        this.displayMonth = this.currentDate.getMonth();
        this.displayYear = this.currentDate.getFullYear();
        this.container = document.getElementById(containerId);
        this.timeDisplay = document.getElementById(timeId);
        this.monthNames = ["January", "February", "March", "April", "May", "June", 
                           "July", "August", "September", "October", "November", "December"];
    }

    init() {
        this.render();
        this.startTime();
    }

    render() {
        if (!this.container) return;
        
        const firstDay = new Date(this.displayYear, this.displayMonth, 1).getDay();
        const daysInMonth = new Date(this.displayYear, this.displayMonth + 1, 0).getDate();
        
        let html = '';
        // Add empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="day empty"></div>';
        }
        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === this.currentDate.getDate() && 
                            this.displayMonth === this.currentDate.getMonth() && 
                            this.displayYear === this.currentDate.getFullYear();
            html += `<div class="day ${isToday ? 'today' : ''}">${day}</div>`;
        }
        
        this.container.innerHTML = html;
        this.updateHeader();
    }

    updateHeader() {
        document.getElementById('monthName').textContent = this.monthNames[this.displayMonth];
        document.getElementById('yearDisplay').textContent = this.displayYear;
    }

    changeMonth(direction) {
        this.displayMonth += direction;
        if (this.displayMonth > 11) {
            this.displayMonth = 0;
            this.displayYear++;
        } else if (this.displayMonth < 0) {
            this.displayMonth = 11;
            this.displayYear--;
        }
        this.render();
    }

    startTime() {
        setInterval(() => {
            const now = new Date();
            this.timeDisplay.textContent = now.toLocaleTimeString();
        }, 1000);
    }
}

// Auto-initialize if elements exist
const myCal = new FashionCalendar('daysContainer', 'currentTime');
window.onload = () => myCal.init();
