function startCalendar(daysId, monthId, yearId, timeId, headId) {
    let now = new Date();
    let currM = now.getMonth();
    let currY = now.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const grads = [
        'linear-gradient(135deg, #667eea, #764ba2)', 'linear-gradient(135deg, #f093fb, #f5576c)',
        'linear-gradient(135deg, #4facfe, #00f2fe)', 'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #fa709a, #fee140)', 'linear-gradient(135deg, #30cfd0, #330867)',
        'linear-gradient(135deg, #a8edea, #fed6e3)', 'linear-gradient(135deg, #ff9a9e, #fecfef)',
        'linear-gradient(135deg, #ffecd2, #fcb69f)', 'linear-gradient(135deg, #ff6e7f, #bfe9ff)',
        'linear-gradient(135deg, #e0c3fc, #8ec5fc)', 'linear-gradient(135deg, #f77062, #fe5196)'
    ];

    function update() {
        const dCont = document.getElementById(daysId);
        const first = new Date(currY, currM, 1).getDay();
        const total = new Date(currY, currM + 1, 0).getDate();
        
        document.getElementById(monthId).innerText = monthNames[currM];
        document.getElementById(yearId).innerText = currY;
        document.getElementById(headId).style.background = grads[currM];
        
        dCont.innerHTML = '';
        for (let i = 0; i < first; i++) dCont.innerHTML += '<div class="fcal-day" style="opacity:0"></div>';
        for (let i = 1; i <= total; i++) {
            let active = (i === now.getDate() && currM === now.getMonth() && currY === now.getFullYear()) ? 'fcal-today' : '';
            dCont.innerHTML += `<div class="fcal-day ${active}">${i}</div>`;
        }
    }

    window.moveMonth = (step) => {
        currM += step;
        if (currM > 11) { currM = 0; currY++; }
        else if (currM < 0) { currM = 11; currY--; }
        update();
    };

    setInterval(() => {
        const timeEl = document.getElementById(timeId);
        if(timeEl) timeEl.innerText = new Date().toLocaleTimeString();
    }, 1000);

    update();
}
