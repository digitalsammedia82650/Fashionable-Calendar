let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let displayMonth = currentMonth;
let displayYear = currentYear;
let selectedWidth = 400;
let selectedHeight = 550;

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const monthColors = [
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

const calendar = document.getElementById('calendar');
const container = document.getElementById('calendarContainer');
let isDragging = false;
let currentX = 0, currentY = 0, initialX = 0, initialY = 0, xOffset = 0, yOffset = 0;

// Dragging Logic
container.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    if (e.target === calendar || calendar.contains(e.target)) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        const rotateX = (currentY / window.innerHeight) * 20 - 10;
        const rotateY = (currentX / window.innerWidth) * 20 - 10;
        calendar.style.transform = `translate(${currentX}px, ${currentY}px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

function dragEnd() {
    isDragging = false;
    calendar.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    calendar.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
    xOffset = 0; yOffset = 0; currentX = 0; currentY = 0;
    setTimeout(() => { calendar.style.transition = 'transform 0.1s ease-out'; }, 500);
}

// Calendar Rendering Logic
function renderCalendar() {
    const firstDay = new Date(displayYear, displayMonth, 1).getDay();
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const daysContainer = document.getElementById('daysContainer');
    daysContainer.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        daysContainer.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        if (day === currentDate.getDate() && displayMonth === currentMonth && displayYear === currentYear) {
            dayElement.classList.add('today');
        }
        daysContainer.appendChild(dayElement);
    }

    document.getElementById('monthName').textContent = monthNames[displayMonth];
    document.getElementById('yearDisplay').textContent = displayYear;
    document.getElementById('calendarHeader').style.background = monthColors[displayMonth];
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    const timeDisplay = document.getElementById('currentTime');
    if (timeDisplay) timeDisplay.textContent = timeString;
}

// Navigation Events
document.getElementById('prevBtn').addEventListener('click', () => {
    calendar.classList.add('flipping');
    setTimeout(() => {
        displayMonth--;
        if (displayMonth < 0) { displayMonth = 11; displayYear--; }
        renderCalendar();
        calendar.classList.remove('flipping');
    }, 400);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    calendar.classList.add('flipping');
    setTimeout(() => {
        displayMonth++;
        if (displayMonth > 11) { displayMonth = 0; displayYear++; }
        renderCalendar();
        calendar.classList.remove('flipping');
    }, 400);
});

// Widget Copying Logic
function getWidgetCode() {
    // Note: Update the URL below with your actual GitHub Pages URL
    const githubURL = window.location.href; 
    return `<div style="text-align: center; padding: 20px;">
  <iframe 
    src="${githubURL}" 
    width="${selectedWidth}" 
    height="${selectedHeight}" 
    style="border: none; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);"
    title="Fashionable Calendar">
  </iframe>
</div>`;
}

function updateCodePreview() {
    const preview = document.getElementById('codePreview');
    if (preview) preview.textContent = getWidgetCode();
}

// Globally accessible functions for HTML onclick attributes
window.copyWidget = function() {
    const code = getWidgetCode();
    const textArea = document.createElement('textarea');
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    const btn = document.getElementById('copyBtn');
    const btnText = document.getElementById('btnText');
    btn.classList.add('copied');
    btnText.textContent = '✓ Copied to Clipboard!';
    
    setTimeout(() => {
        btn.classList.remove('copied');
        btnText.textContent = '📋 Copy Calendar Widget';
    }, 2000);
};

window.selectSize = function(width, height, button) {
    selectedWidth = width;
    selectedHeight = height;
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    updateCodePreview();
};

// Initialization
renderCalendar();
updateTime();
updateCodePreview();
setInterval(updateTime, 1000);
