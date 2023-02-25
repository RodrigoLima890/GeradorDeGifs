const form = document.querySelector("form");
const gifsContainer = document.querySelector("div");

const apiKey = "9IILXTfzXG7SVBLceHSS6fsk2BCICcnV";

const getDataGif = (gifName) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${gifName}`;

const insertGifIntoDom = async (inputValue) => {
  try {
    const gifApiUrl = getDataGif(inputValue);
    const response = await fetch(gifApiUrl);

    if (!response.ok) {
      throw new Error("Não foi possivel obter os dados");
    }
    const gifData = await response.json();
    const gifUrl = gifData.data[0].images.downsized.url;

    imgGenerate(gifUrl, gifData);

    form.reset();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

const imgGenerate = async (gifUrl, gifData) => {
  const img = document.createElement("img");
  img.setAttribute("src", gifUrl);
  img.setAttribute("alt", gifData.data[0].title);

  gifsContainer.insertAdjacentElement("afterbegin", img);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputValue = e.target.search.value;
  insertGifIntoDom(inputValue);
});
