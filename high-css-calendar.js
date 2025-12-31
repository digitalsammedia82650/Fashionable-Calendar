// --- FASHION CALENDAR LOGIC ---
let currentDisplayDate = new Date();

function initCalendar() {
    const calendarHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <button id="copyBtn" onclick="copyWidgetCode()" style="background: rgba(0,0,0,0.1); border: 1px solid #ccc; padding: 5px 15px; border-radius: 20px; cursor: pointer; font-size: 12px;">
                📋 Copy Widget
            </button>
            <div id="calendar-container" style="width: 320px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; font-family: sans-serif;">
                <div id="cal-header" style="background: #764ba2; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <button onclick="changeMonth(-1)" style="background:none; border:none; color:white; cursor:pointer; font-size:20px;">‹</button>
                    <h3 id="monthYear" style="margin:0; font-size: 18px;"></h3>
                    <button onclick="changeMonth(1)" style="background:none; border:none; color:white; cursor:pointer; font-size:20px;">›</button>
                </div>
                <div style="padding: 15px;">
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: bold; font-size: 11px; color: #999; margin-bottom: 10px;">
                        <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                    </div>
                    <div id="daysGrid" style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; gap: 5px;"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.innerHTML = calendarHTML;
    renderCalendar();
}

function renderCalendar() {
    const grid = document.getElementById('daysGrid');
    const label = document.getElementById('monthYear');
    grid.innerHTML = '';

    const year = currentDisplayDate.getFullYear();
    const month = currentDisplayDate.getMonth();
    
    label.innerText = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDisplayDate);

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDayDate = new Date(year, month + 1, 0).getDate();

    for (let x = 0; x < firstDayIndex; x++) {
        grid.appendChild(document.createElement('div'));
    }

    for (let i = 1; i <= lastDayDate; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.style.padding = "8px";
        dayDiv.style.fontSize = "13px";
        if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayDiv.style.background = "#764ba2";
            dayDiv.style.color = "white";
            dayDiv.style.borderRadius = "5px";
        }
        dayDiv.innerText = i;
        grid.appendChild(dayDiv);
    }
}

function changeMonth(step) {
    currentDisplayDate.setMonth(currentDisplayDate.getMonth() + step);
    renderCalendar();
}

// --- THE SMALL BUTTON "COPY" FUNCTION ---
function copyWidgetCode() {
    const currentURL = window.location.href;
    const iframeCode = `<iframe src="${currentURL}" width="350" height="450" style="border:none;"></iframe>`;
    
    navigator.clipboard.writeText(iframeCode).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.innerText = "✅ Copied!";
        setTimeout(() => { btn.innerText = "📋 Copy Widget"; }, 2000);
    });
}

// Start the calendar
window.onload = initCalendar;
