document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
    document.querySelector('#clock-in').addEventListener('click', () => clockIn());
    document.querySelector('#clock-out').addEventListener('click', () => clockOut());
    document.querySelector('#clock-view-btn').addEventListener('click', () => showClockView());
    document.querySelector('#schedule-view-btn').addEventListener('click', () => showScheduleView());
  });

function updateClock(){

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, 0);;
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById("clock").textContent = timeString;
}

function clockIn(){
    console.log("clock in");
    const guardId = Number(document.querySelector('#text-box').value);
    console.log(guardId);
    fetch('http://127.0.0.1:8000/ClockInSystem/clockin', {
        method: 'POST',
        body: JSON.stringify({
            guardId: guardId
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        document.querySelector('#text-box').value = '';
        if (result.message) {
            alert(result.message); 
        } else if (result.error) {
            alert(result.error); 
        }
    });
    
}

function clockOut(){
    console.log("clock out");
    const guardId = Number(document.querySelector('#text-box').value);
    console.log(guardId);
    fetch('http://127.0.0.1:8000/ClockInSystem/clockout', {
        method: 'PUT',
        body: JSON.stringify({
            guardId: guardId
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        document.querySelector('#text-box').value = '';
        if (result.message) {
            alert(result.message); 
        } else if (result.error) {
            alert(result.error); 
        }
    })
    .catch(error => console.error('Error:', error));
}


function showClockView() {
    document.querySelector('#clock-container').style.display = 'flex'; 
    document.querySelector('#schedule-container').style.display = 'none'; 
}

function showScheduleView() {
    document.querySelector('#clock-container').style.display = 'none'; 
    document.querySelector('#schedule-container').style.display = 'flex'; 

    fetch('http://127.0.0.1:8000/ClockInSystem/log')  
    .then(response => response.json())
    .then(data => {
    
        
        const tbody = document.querySelector('#schedule-list tbody');
        tbody.innerHTML = ''; 
        
        data.forEach(logRow => {
            
            const clockInDate = logRow.clockIn ? new Date(logRow.clockIn) : null;
            const clockOutDate = logRow.clockOut ? new Date(logRow.clockOut) : null;

            
            const clockInTime = clockInDate ? clockInDate.toISOString().substring(11, 16) : 'N/A'; 
            const clockInDateStr = clockInDate ? clockInDate.toISOString().substring(0, 10) : 'N/A'; 

            const clockOutTime = clockOutDate ? clockOutDate.toISOString().substring(11, 16) : 'N/A'; 
            const clockOutDateStr = clockOutDate ? clockOutDate.toISOString().substring(0, 10) : 'N/A'; 

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${logRow.guardId}</td>
                <td>${clockInTime}</td>
                <td>${clockInDateStr}</td>
                <td>${clockOutTime}</td>
                <td>${clockOutDateStr}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error)); 
}

