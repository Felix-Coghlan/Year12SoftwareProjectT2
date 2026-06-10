let result = "";

function displayResults(gameData) {
  // Checks if it got an actual game object back
  if (gameData && gameData.name) {
    // Creates a string of HTML with the game data
    const result = `
      <div class="container">
        <nav>
          <h2>${gameData.name}</h2>
        </nav>
        <p><strong>Genre:</strong> ${gameData.genre}</p>
        <p><strong>Subgenre:</strong> ${gameData.subgenre}</p>
        <p><strong>Creator:</strong> ${gameData.creator}</p>
        <p><strong>Release Date:</strong> ${gameData.releasedate}</p>
        <a href=${gameData.hyperlink}><p><strong>Visit ${gameData.name}</strong> </p></a>
      </div>
    `;
    // Inserts the HTML into the container
    document.querySelector(".container").innerHTML = result;
  } else {
    // If no data came back
    document.querySelector(".container").innerHTML = '<p>No games found with that name. Try again using no capital letters</p>';
  }
}

function search() {
  const query = document.getElementById("quicksearch").value;

  fetch(`/search?q=${query}`)
  .then(res => res.json())
  .then(gameData => {
    displayResults(gameData);
  })
  .catch(err => console.error(err));          
}

let genreresult = "";

function displayGenreResults(genreDataArray) {
  // Check if the array is empty or null
  if (!genreDataArray || genreDataArray.length === 0) {
    document.querySelector(".container").innerHTML = '<p>No games found with that genre. Try again using no capital letters</p>';
    return; // Exit the function
  }

  const result = genreDataArray.map(game => {
    return `
      <div class="container">
        <nav>
          <h2>${game.name}</h2>
        </nav>
        <p><strong>Genre:</strong> ${game.genre}</p>
        <p><strong>Subgenre:</strong> ${game.subgenre}</p>
        <p><strong>Creator:</strong> ${game.creator}</p>
        <p><strong>Release Date:</strong> ${game.releasedate}</p>
        <a href=${game.hyperlink}><p><strong>Visit ${game.name}</strong> </p></a>
      </div>
    `;
  }).join(''); // Join all HTML snippets together
  document.querySelector(".container").innerHTML = result;
}


function genresearch() {
  const query = document.getElementById("broadsearch").value;

  fetch(`/genresearch?q=${query}`)
  .then(res => res.json())
  .then(genreDataArray => {
    displayGenreResults(genreDataArray);
  })
  .catch(err => console.error(err));          
}