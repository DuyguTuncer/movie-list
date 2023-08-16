const addMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("add-modal");
const cancelMovieModal = document.getElementById("cancel");
const addMovie = document.getElementById("add");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");


const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};
const openMovieModal = () => {
  movieModal.classList.add("visible");
  toggleBackdrop();
};

const closeMovieModal = () => {
  movieModal.classList.remove("visible");
  toggleBackdrop();
};

const addMovieHandler = () => {
  getUserInput();
};

const getUserInput = () => {
  const title = document.getElementById("title").value;
  const imageUrl = document.getElementById("image-url").value;
  const rating = document.getElementById("rating").value;

  if (
    title.trim() === "" ||
    imageUrl.trim() === "" ||
    rating.trim() === "" ||
    +rating < 0 ||
    +rating > 5
  ) {
    alert("Please enter a valid input");
  }

  const movie = {
    id: Math.random().toString(),
    title,
    imageUrl,
    rating,
  };

  movies.push(movie);
  console.log("movies:", movies);
  movieModal.classList.remove("visible");
  toggleBackdrop();
  updateUI();
  showAddedMovie(movie.id, title, imageUrl, rating);
};

const showAddedMovie = (id, title, imageUrl, rating) => {
  const newMovieEl = document.createElement("li");
  newMovieEl.className = "movie-element";
  newMovieEl.innerHTML = `
      <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
      </div>
      <div class= "movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
      </div>`;
  listRoot.append(newMovieEl);
  newMovieEl.addEventListener("click", deleteMovieHandler.bind(null, id));
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();

  const cancelDeleteMovieEl = document.getElementById("cancel-delete");
  const confirmDeleteMovieEl = document.querySelector(".btn--danger");
  cancelDeleteMovieEl.addEventListener("click", cancelMovieDeletion);
  confirmDeleteMovieEl.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
  updateUI();
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const updateUI = () => {
  const sectionEl = document.querySelector("section");
  if (movies.length === 0) {
    sectionEl.style.display = "block";
  } else if (movies.length == !0) {
    sectionEl.style.display = "none";
  }
};

addMovieButton.addEventListener("click", openMovieModal);
cancelMovieModal.addEventListener("click", closeMovieModal);
addMovie.addEventListener("click", addMovieHandler);
