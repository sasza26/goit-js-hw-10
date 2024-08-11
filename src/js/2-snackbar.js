import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('[name="delay"]');
  const stateInputs = document.querySelectorAll('[name="state"]');

  const delay = parseInt(delayInput.value);

  let state;
  stateInputs.forEach(input => {
    if (input.checked) {
      state = input.value;
    }
  });

  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  notificationPromise
    .then(delay => {
      iziToast.success({
        title: '✅ Fulfilled promise',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected promise',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});
