const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loader

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loader
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// get Quote from API
async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  var point = Math.floor(Math.random() * 1643) + 1;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // If author is empty add Unknown
    if (data[point].author === "" || data[point].author === null) {
      authorText.innerText = "- Unknown";
    } else {
      authorText.innerText = "- " + data[point].author;
    }

    // Reduce font size for big quotes
    if (data[point].text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data[point].text;
    complete();
  } catch (error) {
    getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}  ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// onLoad
getQuote();
