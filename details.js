const API_KEY = "61790ec4b30862edcf008c304cfce00a";

const detailsDiv = document.getElementById("details");
const params = new URLSearchParams(window.location.search);

const type = params.get("type"); // movie or tv
const id = params.get("id");

// TMDB URL
const URL =
  "https://api.themoviedb.org/3/" +
  type +
  "/" +
  id +
  "?api_key=" +
  API_KEY +
  "&language=en-IN";

// Fetch TMDB data
fetch(URL)
  .then(res => res.json())
  .then(item => {

    // find custom links
    const custom = customData.find(
      d => d.id == id && d.type === type
    );

    detailsDiv.innerHTML = `
      <div class="details-card">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
        <h2>${type === "movie" ? item.title : item.name}</h2>
        <p><b>Release Date:</b> ${type === "movie" ? item.release_date : item.first_air_date}</p>
        <p><b>Rating:</b> ⭐ ${item.vote_average}</p>
        <p>${item.overview}</p>

        ${custom ? `<a class="link-btn" href="${custom.streaming}" target="_blank">Watch on Platform</a>` : ""}
        ${custom ? `<a class="link-btn" href="${custom.download}" target="_blank">Download Link</a>` : ""}
      </div>
    `;
  });