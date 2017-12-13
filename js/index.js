$(document).ready(function() {
  var sessionLength = 25,
    breakLength = 5,
    minutes = 25,
    seconds = 0,
    btnTrigger = false,
    inSession = true,
    countdown = 0,
    sessionSound = new Audio(
      "http://www.jarrodyellets.com/sounds/sessionStart.mp3"
    ),
    breakSound = new Audio(
      "http://www.jarrodyellets.com/sounds/breakStart.mp3"
    );

  // Initail Setup of Clock
  resetClock();
  
  // Start Button Click Event
  $("#start").click(function() {
    if (btnTrigger === false) {
      btnTrigger = true;
      
      // Check if session or break is running
      if (inSession === true) {
        changeData("In Session", "#sign");
        changeClass("#logo", "activeSession");
        sessionSound.play();
      } else {
        changeData("On Break", "#sign");
        changeClass("#logo", "activeBreak");
        breakSound.play();
      }
      
      // Clock Interval
      countdown = setInterval(function() {
        
        // Subtract minute when second reaches 0
        if (seconds < 0) {
          changeData(seconds, "#seconds");
          minutes -= 1;
          changeData(minutes, "#minutes");
          seconds = 59;
        }
        
        // Add leading 0 to seconds less than 10
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        
        // Trigger either Break or Session Timer
        if (minutes === 0 && seconds == 0 && btnTrigger === true) {
          
          // Start Session Timer
          if (inSession === true) {
            minutes = breakLength;
            inSession = false;
            changeData("On Break", "#sign");
            changeClass("#logo", "activeBreak");
            breakSound.play();
          } 
          
          // Start Break Timer
          else {
            minutes = sessionLength;
            inSession = true;
            changeData("In Session", "#sign");
            changeClass("#logo", "activeSession");
            sessionSound.play();
          }
        }
        // Countdown Seconds
        changeData(seconds, "#seconds");
        seconds -= 1;
      }, 1000);
    }
  });

  // Reset Button Click Event
  $("#reset").click(function() {
    resetClock();
  });

  // Session Minus Click Event
  $("#sesMin").click(function() {
    if (sessionLength > 1) {
      sessionLength -= 1;
      changeData(sessionLength, "#sessionTimer");
      if (inSession === true) {
        resetClock();
        minutes = sessionLength;
        changeData(minutes, "#minutes");
      }
    }
  });

  // Session Plus Click Event
  $("#sesPlus").click(function() {
    sessionLength += 1;
    changeData(sessionLength, "#sessionTimer");
    if (inSession === true) {
      resetClock();
      minutes = sessionLength;
      changeData(minutes, "#minutes");
    }
  });
  
  // Break Minus Click Event
  $("#breMin").click(function() {
    if (breakLength > 1) {
      breakLength -= 1;
      changeData(breakLength, "#breakTimer");
      if (inSession === false) {
        minutes = breakLength;
        changeData(minutes, "#minutes");
        changeData("00", "#seconds");
        seconds = 0;
        clearInterval(countdown);
        btnTrigger = false;
      }
    }
  });

  // Break Plus Click Event
  $("#brePlus").click(function() {
    breakLength += 1;
    changeData(breakLength, "#breakTimer");
    if (inSession === false) {
      minutes = breakLength;
      changeData(minutes, "#minutes");
      changeData("00", "#seconds");
      seconds = 0;
      clearInterval(countdown);
      btnTrigger = false;
    }
  });

  // Reset Button Click Event
  function resetClock() {
    btnTrigger = false;
    inSession = true;
    minutes = sessionLength;
    seconds = -1;
    changeData(sessionLength, "#minutes");
    changeData("00", "#seconds");
    clearInterval(countdown);
    changeData("Ready", "#sign");
    $("#logo").removeClass();
  }

  // Empty and append div
  function changeData(num, numDiv) {
    $(numDiv).empty();
    $(numDiv).append(num);
  }

  // Remove and add class to div
  function changeClass(div, newClass) {
    $(div).removeClass();
    $(div).addClass(newClass);
  }
});