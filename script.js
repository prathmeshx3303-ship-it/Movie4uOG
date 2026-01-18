const API_KEY = "61790ec4b30862edcf008c304cfce00a";
const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("search");
const tabs = document.querySelectorAll(".tab");

let currentType = "movie";

function fetchData(type, query = "") {
  let url;

  if (query) {
    url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-IN&query=${query}`;
  } else {
    url = type === "movie"
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-IN&sort_by=popularity.desc`
      : `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-IN`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => showMovies(data.results, type));
}

function showMovies(list, type) {
  moviesDiv.innerHTML = "";

  list.forEach(item => {
    if (!item.poster_path) return;

    const div = document.createElement("div");
    div.className = "movie-card";
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
      <h3>${type === "movie" ? item.title : item.name}</h3>
      <div class="rating">⭐ ${item.vote_average}</div>
    `;

    div.addEventListener("click", () => {
      window.location.href = `details.html?type=${type}&id=${item.id}`;
    });

    moviesDiv.appendChild(div);
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentType = tab.dataset.type;
    fetchData(currentType);
  });
});

searchInput.addEventListener("input", () => {
  fetchData(currentType, searchInput.value);
});

fetchData(currentType);