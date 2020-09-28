console.log("js loaded");

const weatherForm = document.querySelector("form");

const searchInput = document.querySelector("input");

const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
const messageH2 = document.getElementById('location-text');
const iconSrc = document.getElementById('icon');

messageH2.textContent = ''
messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  iconSrc.src = '';
  messageH2.textContent = 'Loading...';
  messageOne.textContent = '';
  messageTwo.textContent = '';
  const location = searchInput.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (
            messageOne.textContent = '' ,
            messageTwo.textContent = '',
            messageH2.textContent = data.error);
        }
        iconSrc.src = data.icon[0];
        messageH2.textContent = data.location;
        messageOne.textContent = '';
        messageTwo.textContent = data.forecast ;
      });
    }
  );
});
