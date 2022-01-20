const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const paragraph1 = document.querySelector('#message-1');
const paragraph2 = document.querySelector('#message-2');

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchElement.value;

    paragraph1.textContent = "Loading...";
    paragraph2.textContent = "";

    (async (location) => {
        const response = await fetch(`http://localhost:3000/weather?address=${location}`);
        const data = await response.json();
        if (data.error) {
            paragraph1.textContent = data.error;
            return
        }

        paragraph1.textContent = data.location;
        paragraph2.textContent = data.forecast;

    })(location)
})