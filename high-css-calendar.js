// Fashionable Wall Calendar - Main JavaScript
// Version: 1.0.0
// Author: Your Name
// License: MIT

class FashionableCalendar {
    constructor() {
        // Get current date from system/internet
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.displayMonth = this.currentMonth;
        this.displayYear = this.currentYear;

        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        this.monthColors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
            'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
            'linear-gradient(135deg, #f77062 0%, #fe5196 100%)'
        ];

        // Mouse physics variables
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;

        this.init();
    }

    init() {
        this.calendar = document.getElementById('calendar');
        this.container = document.getElementById('calendarContainer');
        
        this.setupEventListeners();
        this.renderCalendar();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.prevMonth());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextMonth());

        // Mouse physics
        this.container.addEventListener('mousedown', (e) => this.dragStart(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.dragEnd());

        // Touch support for mobile
        this.container.addEventListener('touchstart', (e) => this.dragStart(e.touches[0]));
        document.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
        document.addEventListener('touchend', () => this.dragEnd());
    }

    dragStart(e) {
        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;
        
        if (e.target === this.calendar || this.calendar.contains(e.target)) {
            this.isDragging = true;
        }
    }

    drag(e) {
        if (this.isDragging) {
            e.preventDefault();
            
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            // Calculate rotation based on position
            const rotateX = (this.currentY / window.innerHeight) * 20 - 10;
            const rotateY = (this.currentX / window.innerWidth) * 20 - 10;

            this.calendar.style.transform = 
                `translate(${this.currentX}px, ${this.currentY}px) 
                 rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        }
    }

    dragEnd() {
        this.isDragging = false;
        
        // Smooth return to center with bounce effect
        this.calendar.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        this.calendar.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
        
        this.xOffset = 0;
        this.yOffset = 0;
        this.currentX = 0;
        this.currentY = 0;
        
        setTimeout(() => {
            this.calendar.style.transition = 'transform 0.1s ease-out';
        }, 500);
    }

    renderCalendar() {
        const firstDay = new Date(this.displayYear, this.displayMonth, 1).getDay();
        const daysInMonth = new Date(this.displayYear, this.displayMonth + 1, 0).getDate();
        const daysContainer = document.getElementById('daysContainer');
        
        daysContainer.innerHTML = '';

        // Empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            daysContainer.appendChild(emptyDay);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day;

            // Highlight today
            if (day === this.currentDate.getDate() && 
                this.displayMonth === this.currentMonth && 
                this.displayYear === this.currentYear) {
                dayElement.classList.add('today');
            }

            daysContainer.appendChild(dayElement);
        }

        // Update header
        document.getElementById('monthName').textContent = this.monthNames[this.displayMonth];
        document.getElementById('yearDisplay').textContent = this.displayYear;
        document.getElementById('calendarHeader').style.background = this.monthColors[this.displayMonth];
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('currentTime').textContent = timeString;
    }

    prevMonth() {
        this.calendar.classList.add('flipping');
        setTimeout(() => {
            this.displayMonth--;
            if (this.displayMonth < 0) {
                this.displayMonth = 11;
                this.displayYear--;
            }
            this.renderCalendar();
            this.calendar.classList.remove('flipping');
        }, 400);
    }

    nextMonth() {
        this.calendar.classList.add('flipping');
        setTimeout(() => {
            this.displayMonth++;
            if (this.displayMonth > 11) {
                this.displayMonth = 0;
                this.displayYear++;
            }
            this.renderCalendar();
            this.calendar.classList.remove('flipping');
        }, 400);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FashionableCalendar();
});
