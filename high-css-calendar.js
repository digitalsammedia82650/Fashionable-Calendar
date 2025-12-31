<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fashionable Calendar Widget</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .main-container {
            display: flex;
            gap: 30px;
            max-width: 1200px;
            align-items: flex-start;
            flex-wrap: wrap;
            justify-content: center;
        }

        /* Calendar Styles */
        .calendar-wrapper {
            perspective: 1500px;
            position: relative;
        }

        .calendar-hook {
            width: 60px;
            height: 8px;
            background: linear-gradient(to bottom, #8b7355, #654321);
            border-radius: 4px 4px 0 0;
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            z-index: 10;
        }

        .calendar-hook::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 20px;
            background: linear-gradient(to bottom, #666, #8b7355);
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 2px;
        }

        .calendar {
            width: 350px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
            transition: transform 0.1s ease-out;
            cursor: move;
        }

        .calendar.flipping {
            animation: pageFlip 0.8s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        @keyframes pageFlip {
            0% { transform: perspective(1500px) rotateY(0deg); }
            50% { transform: perspective(1500px) rotateY(-180deg); }
            100% { transform: perspective(1500px) rotateY(-360deg); }
        }

        .calendar-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px 20px;
            text-align: center;
            position: relative;
        }

        .calendar-header h2 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 5px;
            letter-spacing: 1px;
        }

        .calendar-header .year {
            font-size: 18px;
            opacity: 0.9;
            font-weight: 300;
        }

        .nav-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
        }

        .nav-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            transition: all 0.3s;
        }

        .nav-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }

        .calendar-body {
            padding: 20px;
            background: #fafafa;
        }

        .weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;
            margin-bottom: 10px;
        }

        .weekday {
            text-align: center;
            font-weight: 600;
            color: #666;
            font-size: 13px;
            padding: 8px 0;
        }

        .days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;
        }

        .day {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            background: white;
            color: #333;
            border: 2px solid transparent;
        }

        .day:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .day.empty {
            background: transparent;
            cursor: default;
        }

        .day.empty:hover {
            background: transparent;
            transform: none;
            box-shadow: none;
        }

        .day.today {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
        }

        .calendar-footer {
            background: linear-gradient(to right, #e0e0e0, #f5f5f5);
            padding: 12px 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 3px solid #ddd;
        }

        .current-time {
            font-weight: 600;
            color: #764ba2;
        }

        /* Widget Panel */
        .widget-panel {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 400px;
        }

        .widget-panel h3 {
            color: #333;
            font-size: 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .copy-widget-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            width: 100%;
            transition: all 0.3s;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .copy-widget-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .copy-widget-btn.copied {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .code-preview {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.5;
            overflow-x: auto;
            max-height: 200px;
            margin-bottom: 15px;
        }

        .info-box {
            background: #f0f7ff;
            border-left: 4px solid #667eea;
            padding: 12px;
            border-radius: 4px;
            font-size: 13px;
            color: #333;
            margin-top: 15px;
        }

        .info-box strong {
            color: #667eea;
        }

        .size-selector {
            margin: 15px 0;
        }

        .size-selector label {
            display: block;
            margin-bottom: 8px;
            color: #666;
            font-size: 14px;
            font-weight: 600;
        }

        .size-options {
            display: flex;
            gap: 8px;
        }

        .size-btn {
            flex: 1;
            padding: 8px;
            border: 2px solid #ddd;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s;
        }

        .size-btn:hover {
            border-color: #667eea;
            color: #667eea;
        }

        .size-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        @media (max-width: 768px) {
            .main-container {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <!-- Live Calendar -->
        <div class="calendar-wrapper" id="calendarContainer">
            <div class="calendar-hook"></div>
            <div class="calendar" id="calendar">
                <div class="calendar-header" id="calendarHeader">
                    <h2 id="monthName">January</h2>
                    <div class="year" id="yearDisplay">2026</div>
                    <div class="nav-buttons">
                        <button class="nav-btn" id="prevBtn">‹</button>
                        <button class="nav-btn" id="nextBtn">›</button>
                    </div>
                </div>
                <div class="calendar-body">
                    <div class="weekdays">
                        <div class="weekday">Sun</div>
                        <div class="weekday">Mon</div>
                        <div class="weekday">Tue</div>
                        <div class="weekday">Wed</div>
                        <div class="weekday">Thu</div>
                        <div class="weekday">Fri</div>
                        <div class="weekday">Sat</div>
                    </div>
                    <div class="days" id="daysContainer"></div>
                </div>
                <div class="calendar-footer">
                    <div class="current-time" id="currentTime">Loading...</div>
                </div>
            </div>
        </div>

        <!-- Widget Copy Panel -->
        <div class="widget-panel">
            <h3>📦 Copy Widget</h3>
            
            <button class="copy-widget-btn" id="copyBtn" onclick="copyWidget()">
                <span id="btnText">📋 Copy Calendar Widget</span>
            </button>

            <div class="size-selector">
                <label>Widget Size:</label>
                <div class="size-options">
                    <button class="size-btn active" onclick="selectSize(400, 550, this)">Small</button>
                    <button class="size-btn" onclick="selectSize(500, 650, this)">Medium</button>
                    <button class="size-btn" onclick="selectSize(600, 750, this)">Large</button>
                </div>
            </div>

            <div class="code-preview" id="codePreview"></div>

            <div class="info-box">
                <strong>How to use:</strong><br>
                1. Click "Copy Calendar Widget"<br>
                2. Go to your Blogger/Website<br>
                3. Add HTML/JavaScript gadget<br>
                4. Paste and Save!
            </div>
        </div>
    </div>

    <script>
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
            document.getElementById('currentTime').textContent = timeString;
        }

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

        function getWidgetCode() {
            return `<!-- Fashionable Calendar Widget -->
<div style="text-align: center; padding: 20px;">
  <iframe 
    src="https://digitalsammedia82650.github.io/Fashionable-Calendar/" 
    width="${selectedWidth}" 
    height="${selectedHeight}" 
    style="border: none; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);"
    title="Fashionable Calendar">
  </iframe>
</div>`;
        }

        function updateCodePreview() {
            document.getElementById('codePreview').textContent = getWidgetCode();
        }

        function copyWidget() {
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
        }

        function selectSize(width, height, button) {
            selectedWidth = width;
            selectedHeight = height;
            document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateCodePreview();
        }

        renderCalendar();
        updateTime();
        updateCodePreview();
        setInterval(updateTime, 1000);
    </script>
</body>
</html>
