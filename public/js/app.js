const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "from javascript";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = null;

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (
            (messageOne.textContent = data.error.toString()),
            (messageTwo.textContent = null)
          );
        }

        messageOne.textContent = data.location.toString();
        messageTwo.textContent = data.forecast.toString();
      });
    }
  );
});
