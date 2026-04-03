const year = document.querySelector("#currentYear");
year.textContent = new Date().getFullYear();

const lastMod = document.querySelector("#lastModified");
lastMod.textContent = `Last Modified: ${document.lastModified}`;

const reviewDisplay = document.querySelector("#reviewCount");

let numReviews = Number(localStorage.getItem("reviewCount-ls")) || 0;
numReviews++;
localStorage.setItem("reviewCount-ls", numReviews);
reviewDisplay.textContent = numReviews;

const resultsContainer = document.querySelector("#results");
const params = new URLSearchParams(window.location.search);

if ([...params].length > 0) {
  const list = document.createElement("ul");

  params.forEach((value, key) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${key}:</strong> ${value}`;
    list.appendChild(item);
  });

  resultsContainer.appendChild(list);
} else {
  resultsContainer.innerHTML = "<p>No review data was received.</p>";
}