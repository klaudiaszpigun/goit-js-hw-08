const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageTextArea = document.querySelector('textarea');

// przesyłaj dane do localStorage nie częściej niż co 0.5 sekundy
const saveToLocalStorage = throttle(() => {
  // tablica danych
  const formData = {
    email: emailInput.value,
    message: messageTextArea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

const loadFromLocalStorage = () => {
  const formDataJSON = localStorage.getItem('feedback-form-state');
  // jeśli formDataJSON nie jest pustym stringiem
  if (formDataJSON) {
    const formData = JSON.parse(formDataJSON);
    emailInput.value = formData.email;
    messageTextArea.value = formData.message;
  }
};
loadFromLocalStorage();

form.addEventListener('input', saveToLocalStorage);

form.addEventListener('submit', evt => {
  evt.preventDefault();
  localStorage.removeItem('feedback-form-state');
  form.reset();
  console.log('Submitted:', {
    email: emailInput.value,
    message: messageTextArea.value,
  });
});
