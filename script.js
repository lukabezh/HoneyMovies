async function getData() {
  try {
    const searchInput = document.getElementById("search");
    const movieIds = ["tt0073195", "tt9018736", "tt0317248", "tt0970411"];
    const cardContainer = document.querySelector(".topContainer");

    for (const id of movieIds) {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=19c069a7`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      const card = document.createElement("div");
      card.classList.add("topcard");
      const cardUpper = document.createElement("div");
      cardUpper.classList.add("topcard__upper");
      const cardBottom = document.createElement("div");
      cardBottom.classList.add("topcard__bottom");
      const title = document.createElement("h1");
      title.textContent = data.Title;
      title.classList.add("topcard__bottom__name");

      const poster = document.createElement("img");
      poster.src = data.Poster;

      const rating = document.createElement("p");
      rating.textContent = data.Ratings[0].Value.slice(0, 3);
      rating.classList.add("topcard__upper__rating");

      const release = document.createElement("p");
      release.textContent = data.Released;
      release.classList.add("topcard__bottom__release");

      const description = document.createElement("p");
      description.textContent = data.Plot;
      description.classList.add("topcard__bottom__description");

      cardUpper.appendChild(poster);
      cardUpper.appendChild(rating);
      cardBottom.appendChild(title);
      cardBottom.appendChild(release);
      cardBottom.appendChild(description);
      card.appendChild(cardUpper);
      card.appendChild(cardBottom);
      cardContainer.appendChild(card);
    }
    searchInput.addEventListener("input", async (event) => {
      const searchTerm = event.target.value;
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=19c069a7&s=${searchTerm}`
      );
      const data = await response.json();

      if (data.Search && data.Search.length > 0) {
        const firstResult = data.Search[0];
        const movieId = firstResult.imdbID;
        const movieResponse = await fetch(
          `https://www.omdbapi.com/?apikey=19c069a7&i=${movieId}`
        );
        const movieData = await movieResponse.json();

        const searchDiv = document.querySelector(".search-div");
        if (searchTerm === "") {
          searchDiv.style.display = "block";
        } else {
          searchDiv.style.display = "block";
        }
        const searchCard = document.createElement("div");
        const searchCardUpper = document.createElement("div");
        const searchCardBottom = document.createElement("div");
        const searchImg = document.createElement("img");
        searchImg.src = movieData.Poster;
        const searchRating = document.createElement("p");
        const searchName = document.createElement("h2");
        const searchDate = document.createElement("p");
        const searchPlot = document.createElement("p");

        searchCard.classList.add("searchCard");
        searchCardUpper.classList.add("searchCard__upper");
        searchCardBottom.classList.add("searchCard__bottom");
        searchName.classList.add("searchCard__bottom__name");
        searchRating.classList.add("searchCard__upper__rating");
        searchDate.classList.add("searchCard__bottom__release");
        searchPlot.classList.add("searchCard__bottom__description");

        searchRating.textContent = movieData.Ratings[0].Value.slice(0, 3);
        searchName.textContent = movieData.Title;
        searchDate.textContent = movieData.Released;
        searchPlot.textContent = movieData.Plot;
        searchCard.appendChild(searchCardUpper);
        searchCard.appendChild(searchCardBottom);
        searchCardUpper.appendChild(searchImg);
        searchCardUpper.appendChild(searchRating);
        searchCardBottom.appendChild(searchName);
        searchCardBottom.appendChild(searchDate);
        searchCardBottom.appendChild(searchPlot);

        searchDiv.innerHTML = "";
        searchDiv.appendChild(searchCard);
        const closeSearchDiv = document.getElementById("close");
        closeSearchDiv.addEventListener("click", () => {
          searchDiv.style.display = "none";
          document.getElementById('search').value = ''; 
        });
      }
    });
  } catch (err) {
    console.error(err, "Error fetching data");
  }
}

getData();
