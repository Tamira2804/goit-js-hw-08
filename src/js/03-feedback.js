import throttle from 'lodash.throttle';

const emailInputEl = document.querySelector('input[type="email"]');
const messageInputEl = document.querySelector('textarea[name="message"]');
const formEl = document.querySelector('.feedback-form');

window.addEventListener('load', () => {
  const storedFormData = localStorage.getItem('feedback-form-state');

  if (storedFormData) {
    const formData = JSON.parse(storedFormData);
    emailInputEl.value = formData.email;
    messageInputEl.value = formData.message;
  }
});

formEl.addEventListener('input', throttle(handleFormInput, 500));

function handleFormInput() {
  const emailValue = emailInputEl.value;
  const messageValue = messageInputEl.value;

  const formData = {
    email: emailValue,
    message: messageValue,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const emailValue = emailInputEl.value;
  const messageValue = messageInputEl.value;

  const formData = {
    email: emailValue,
    message: messageValue,
  };

  console.log(formData);

  emailInputEl.value = '';
  messageInputEl.value = '';

  localStorage.removeItem('feedback-form-state');
}
