
document.addEventListener("DOMContentLoaded", function () {
  // Load the navbar
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;
    });

  // Load the initial joke
  jokee();
});

function jokee() {
  let jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Parallel lines have so much in common. It's a shame they'll never meet.",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    "Why was the math book sad? Because it had too many problems.",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "What's orange and sounds like a parrot? A carrot.",
    "I used to play piano by ear, but now I use my hands.",
    "I used to be a baker, but I couldn't make enough dough.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I'm on a seafood diet. I see food, and I eat it.",
    "I used to be a banker, but I lost interest.",
    "I'm writing a book on reverse psychology. Please don't read it.",
    "I told my computer I needed a break, and now it won't stop laughing at me.",
];

// Add more jokes to the array as needed

  // Ensure the next joke is different from the current one
  let currentJoke = document.getElementById("joke").textContent.trim();
  let random, joke;
  do {
    random = Math.floor(Math.random() * jokes.length);
    joke = jokes[random];
  } while (joke === currentJoke);

  let string = document.getElementById("joke");
  string.innerHTML = joke;

  // Create a star emoji button to star (favorite) the current joke
  let starButton = document.createElement("button");
  starButton.innerHTML = "⭐"; // Star emoji
  starButton.title = "Star This Joke";
  starButton.onclick = function () {
    // Check if localStorage is available
    if (typeof Storage !== "undefined") {
      // Get existing favorite jokes from localStorage or initialize as an empty array
      let favoriteJokes = JSON.parse(localStorage.getItem("favoriteJokes")) || [];

      // Add the current joke to the favorite jokes list
      favoriteJokes.push(joke);

      // Store the updated list back in localStorage
      localStorage.setItem("favoriteJokes", JSON.stringify(favoriteJokes));

      // Display the favorite jokes
      displayFavoriteJokes();
    } else {
      alert("LocalStorage is not supported in this browser.");
    }
  };

  // Remove the previous star button (if any)
  let previousStarButton = document.querySelector("#star-button");
  if (previousStarButton) {
    previousStarButton.remove();
  }
  starButton.id = "star-button";

  // Append the star button to the page
  string.appendChild(starButton);
}

function loadHome() {
  document.getElementById("joke-container").style.display = "block";
  document.getElementById("favorite-jokes").style.display = "none";
  jokee();
}

function loadFavoriteJokes() {
  document.getElementById("joke-container").style.display = "none";
  document.getElementById("favorite-jokes").style.display = "block";

  // Load and display favorite jokes from localStorage
  displayFavoriteJokes();
}

// Function to display favorite jokes
function displayFavoriteJokes() {
  let favoriteJokes = JSON.parse(localStorage.getItem("favoriteJokes")) || [];
  let favoriteJokesContainer = document.getElementById("favorite-jokes");
  favoriteJokesContainer.innerHTML = "";

  favoriteJokes.forEach((joke, index) => {
    let jokeDiv = document.createElement("div");
    jokeDiv.innerHTML = `<p><b>Favorite Joke ${index + 1}:</b></p><p>${joke}</p>`;
    favoriteJokesContainer.appendChild(jokeDiv);
  });
}

