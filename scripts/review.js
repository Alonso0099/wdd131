document.querySelector("#lastModified").textContent = document.lastModified;
let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
reviewCount++;
localStorage.setItem("reviewCount", reviewCount);
document.querySelector("#reviewCount").textContent = reviewCount;