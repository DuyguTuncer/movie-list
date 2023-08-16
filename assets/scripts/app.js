const addMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("add-modal");
const movieModalCancelButton = document.getElementById("cancel");
const movieModalAddButton = document.getElementById("add");
const userInputs = document.querySelectorAll("input");
const deleteModalEl = document.getElementById("delete-modal");
const listRoot = document.getElementById("movie-list");

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
  clearMovieInput();
};

const addMovieHandler = () => {
  getUserInput();
};

const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const getUserInput = () => {
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === "" ||
    imageUrl.trim() === "" ||
    rating.trim() === "" ||
    +rating < 0 ||
    +rating > 5
  ) {
    alert("please enter a valid input");
  }
  const newMovie = {
    id: Math.random().toString(),
    title,
    imageUrl,
    rating,
  };

  movies.push(newMovie);
  console.log("movies:", movies);
  renderNewlyAddedMovie(newMovie.id, title, imageUrl, rating);
  closeMovieModal();
  updateUI();
};

const renderNewlyAddedMovie = (id, title, imageUrl, rating) => {
  const newMovieLi = document.createElement("li");
  newMovieLi.className = "movie-element";
  newMovieLi.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class= "movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>`;

  listRoot.append(newMovieLi);
  newMovieLi.addEventListener("click", deleteMovieHandler.bind(null, id));
};

const deleteMovieHandler = (movieId) => {
  deleteModalEl.classList.add("visible");
  toggleBackdrop();

  const cancelMovieDeletionButton = document.getElementById("cancel-delete");
  cancelMovieDeletionButton.addEventListener("click", cancelMovieDeletion);

  const confirmMovieDeletionButton = document.getElementById("confirm-delete");
  confirmMovieDeletionButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};

const cancelMovieDeletion = () => {
  deleteModalEl.classList.remove("visible");
  toggleBackdrop();
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
  deleteModalEl.classList.remove("visible");
  updateUI();
};

const updateUI = () => {
  const section = document.getElementById("entry-text");
  if (movies.length === 0) {
    section.style.display = "block";
  } else if (movies.length !== 0) {
    section.style.display = "none";
  }
};

addMovieButton.addEventListener("click", openMovieModal);
movieModalCancelButton.addEventListener("click", closeMovieModal);
movieModalAddButton.addEventListener("click", addMovieHandler);
