let timer;
let timerIsOn = false;
let editMode = false;

const ring = document.querySelector(".ring");
const minutesInput = document.querySelector(".minutes > input");
const secondsInput = document.querySelector(".seconds > input");
const startButton = document.querySelector(".start");
const settingsButton = document.querySelector(".settings");
const settingsIcon = document.querySelector(".settings > img");

let minutes = parseInt(minutesInput.value);
let seconds = parseInt(secondsInput.value);

const toggleTimer = () => {
  timerIsOn = !timerIsOn;

  if(timerIsOn) {
    startButton.textContent = 'pause';
    settingsButton.setAttribute('disabled', true);
  } else {
    startButton.textContent = 'start';
    settingsButton.removeAttribute('disabled');
  }
};

const toggleEditMode = () => {
  editMode = !editMode;

  if(editMode) {
    settingsIcon.src = "images/check.svg";
    minutesInput.removeAttribute('disabled');
    secondsInput.removeAttribute('disabled');
    startButton.setAttribute('disabled', true);
  } else {
    settingsIcon.src = "images/gear.svg";
    minutesInput.setAttribute('disabled', true);
    secondsInput.setAttribute('disabled', true);
    startButton.removeAttribute('disabled');
  }
}

const formatTimeValue = (value) => String(value).padStart(2, '0');

const checkInput = (value) => !!value.match(/^[0-9]\d*$/g); // 0 and positive numbers

const changeMinutes = (e) => {
  const value = parseInt(e.target.value);

  if(checkInput(e.target.value) && value < 60) {
    minutesInput.value = value > 10 ? value : formatTimeValue(value);
    minutes = parseInt(minutesInput.value);
  } else {
    minutesInput.value = formatTimeValue(minutes);
  }
};

const changeSeconds = (e) => {
  const value = parseInt(e.target.value);

  if(checkInput(e.target.value) && value < 60) {
    secondsInput.value = value > 10 ? value : formatTimeValue(value);
    seconds = parseInt(secondsInput.value);
  } else {
    secondsInput.value = formatTimeValue(seconds);
  }
};

onload = () => {
  startButton.addEventListener('click', toggleTimer); 
  settingsButton.addEventListener('click', toggleEditMode);
  minutesInput.addEventListener('input', changeMinutes);
  secondsInput.addEventListener('input', changeSeconds);

  timer = setInterval(() => {
    if(timerIsOn) {
      if(seconds > 0) {
        seconds--;
      } else if(seconds === 0 && minutes > 0) {
        seconds = 59;
        minutes--;
      }
  
      minutesInput.value = formatTimeValue(minutes);
      secondsInput.value = formatTimeValue(seconds);
      
      if(!minutes && !seconds) {
        ring.classList.add('ending');
        clearInterval(timer);
      }
    }
  }, 1000);
}

onunload = () => {
  startButton.removeEventListener('click', toggleTimer);
  settingsButton.removeEventListener('click', toggleEditMode);
  minutesInput.removeEventListener('input', changeMinutes);
  secondsInput.removeEventListener('input', changeSeconds);

  clearInterval(timer);
}