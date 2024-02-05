import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const emailInput = document.querySelector('input');
const messageTextArea = document.querySelector('textarea');

// zmienna zawiera funkcję która ma się wywoływać co pół sekundy
// ta funkcja to zapisywanie danych do localStorage
const saveToLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextArea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

const loadFromLocalStorage = () => {
  // wartość klucza feedback
  const formDataJSON = localStorage.getItem('feedback-form-state');
  // ten if sprawdza czy owa wartość istnieje
  if (formDataJSON) {
    // jeśli tak to tworzy zmienną która prasuje wartość klucza feedback
    const formData = JSON.parse(formDataJSON);
    // zmień wartości na sprasowane przed chwilą stringi
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
