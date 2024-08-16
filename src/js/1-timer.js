import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const button = document.querySelector('button');
const daysEl = document.querySelector('span.value[data-days]');
const hoursEl = document.querySelector('span.value[data-hours]');
const minutesEl = document.querySelector('span.value[data-minutes]');
const secondsEl = document.querySelector('span.value[data-seconds]');

let userSelectedDate;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() <= Date.now()) {
      button.disabled = true;
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: 'Please choose a date in the future',
      });
    } else {
      button.disabled = false;
    }
  },
};

const dateTimeInput = document.querySelector('#datetime-picker');

flatpickr(dateTimeInput, options);

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

button.addEventListener('click', handleBtnClick);

function handleBtnClick(event) {
  dateTimeInput.disabled = true;
  button.disabled = true;
  const interval = setInterval(() => {
    let different = userSelectedDate - Date.now();
    if (different <= 0) {
      dateTimeInput.disabled = false;
      clearInterval(interval);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const timerGo = convertMs(different);
    updateTimer(timerGo);
  }, 1000);
}
