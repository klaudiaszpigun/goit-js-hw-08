import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageTextArea = document.querySelector('textarea[name="message"]');

// wczytuje dane z local storage i wypełnia nimi pola formularza podczas ładowania strony.
// funkcja strzałkowa pełniąca rolę callbacku
const loadFromLocalStorage = () => {
  // zmienna zawiera wartość obecnej wartości w localStorage
  const formDataJSON = localStorage.getItem('feedback-form-state');
  // jeśli wyżej zadeklarowana zmienna nie jest pustym stringiem
  if (formDataJSON) {
    // wtedy zmienna formData to będzie sprasowany obiekt
    const formData = JSON.parse(formDataJSON);
    // wartość obecna okna w formularzu to właściwość obiektu sprasowanego
    emailInput.value = formData.email;
    messageTextArea.value = formData.message;
  }
};
// wywołujemy tą funkcję
loadFromLocalStorage();

// zapisuje dane formularza do local storage z opóźnieniem za pomocą throttle
// funkcja strzałkowa, pełniąca rolę callbacku który wykonuje się nie częściej niż co 0.5 sekundy
const saveToLocalStorage = throttle(() => {
  // zawiera obiekt w którym znajduje się dwie właściwości i każda z nich zawiera AKTUALNĄ wartość pola
  const formData = {
    email: emailInput.value,
    message: messageTextArea.value,
  };
  // dodaje ten obiekt do localStorage
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

// wywołujemy funkcję zapisującą dane do localStorage gdy użytkownik coś wpisuje
form.addEventListener('input', saveToLocalStorage);

// gdy użytkowniek naciśnie przycisk i pola będą zapełnione, to usuwamy dane z localStorage, resetujemy formularz i wyrzucamy dane w konsoli
form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (emailInput.value.trim() === '' || messageTextArea.value.trim() === '') {
    return alert('Proszę wypełnić wszystkie pola formularza.');
  }
  localStorage.removeItem('feedback-form-state');
  form.reset();
  console.log('Submitted:', {
    email: emailInput.value,
    message: messageTextArea.value,
  });
});
