/*
1. Gdy użytkownik wpisuje dane do formularza, niech będą zapisywane one do local storage w kluczy "feedback-form-state".

2. Gdy odświeżamy stronę interpretator ma wypełniać pola wartościami z local storage

3. Po naciśnięciu przycisku wyczyść local storage i pola formularza i w konsoli wyloguj obiekt z polami email i message i ich wartościami.

4. Local storage ma się aktualizować nie częściej niż raz na 0.5 sekundy.
*/

import throttle from 'lodash.throttle';

// dostęp do wszystkich elementów HTML
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageTextArea = document.querySelector('textarea[name="message"]');

// deklaracja callbacku z throttlem, który zapisuje co 0.5 sekundy dane z pól do local storage
const saveToLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextArea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

// przy evencie input zapisuje się co 0.5 sekundy dane z pól do formularza
form.addEventListener('input', saveToLocalStorage);

// funkcja strzałkowa która ma za zadanie pobrać wartość z local storage i wkleić je do pól formularza
const loadFromLocalStorage = () => {
  // zmienna formDataJSON to wartość klucza z localStorage
  const formDataJSON = localStorage.getItem('feedback-form-state');
  // jeśli ta zmienna nie jest pustym stringiem
  if (formDataJSON) {
    // to od razu prasuje obiekt pobrany ze storage
    const formData = JSON.parse(formDataJSON);
    // i przypisuje polom fomularza wartości z local storage
    emailInput.value = formData.email;
    messageTextArea.value = formData.message;
  }
};
// tej funkcji nie używamy przy żadnym nasłuchiwaniu eventu, więc musimy ją po prostu wywołać
loadFromLocalStorage();

// gdy naciśniemy przycisk
form.addEventListener('submit', evt => {
  // strona nie odświeży się
  evt.preventDefault();
  // sprawdzi czy wartości pól to są same spacje
  if (emailInput.value.trim() === '' || messageTextArea.value.trim() === '') {
    // w tym przypadku wyświetlu się alert
    return alert('Proszę wypełnić wszystkie pola formularza.');
  }
  // w przeciwnym przypadku jeśli to nie są same spacje i pola są rzeczywiście zapełnione, wtedy w konsoli pojawi się obiekt
  console.log('Submitted:', {
    email: emailInput.value,
    message: messageTextArea.value,
  });
  // po wyrzuceniu danych do konsoli resetujemy cały formularz, czyli usuwamy dane z pól formularza
  form.reset();
  // oraz usuwamy klucz z local storage
  localStorage.removeItem('feedback-form-state');
});
