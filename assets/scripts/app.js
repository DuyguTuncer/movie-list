const addMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("add-modal");
const cancelMovieModal = document.getElementById("cancel");
const addMovie = document.getElementById("add");
const deleteMovieModal = document.getElementById("delete-modal");
const cancelDeteleButton = document.getElementById("cancel-delete");
const confirmDeleteButton = document.getElementById("confirm-delete");
const movieList = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};
const addMovieButtonHandler = () => {
  movieModal.classList.add("visible");
  toggleBackdrop();
};

const cancelMovieModalHandler = () => {
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

  if (title.trim() === "" || imageUrl.trim() === "" || rating.trim() === "") {
    alert("Please enter a valid input");
  }

  const movie = {
    id: parseInt(Math.random()),
    title,
    imageUrl,
    rating,
  };

  movieList.push(movie);
  console.log("movieList:", movieList);
  showAddedMovie(movie.id, title, imageUrl, rating);
  cancelMovieModalHandler();
  clearBanner();
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
  const root = document.getElementById("movie-list");
  root.append(newMovieEl);

  newMovieEl.addEventListener("click", deleteMovieModalHandler);
  confirmDeleteButton.addEventListener(
    "click",
    confirmDeletetingMovie.bind(null, id)
  );
};

const cancelDeletingMovie = () => {
  deleteMovieModal.classList.remove("visible");
  toggleBackdrop();
};

const confirmDeletetingMovie = (movieId) => {
  const findMovieIdToDelete = movieList.find((movie) => {
    return movie.id === movieId;
  });
  console.log("findMovieIdToDelete:", findMovieIdToDelete);
};

const deleteMovieModalHandler = () => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
};

const clearBanner = () => {
  const sectionEl = document.querySelector("section");
  if (movieList.length === 0) {
    sectionEl.style.display = "block";
  } else if (movieList.length == !0) {
    sectionEl.style.display = "none";
  }
};


addMovieButton.addEventListener("click", addMovieButtonHandler);
cancelMovieModal.addEventListener("click", cancelMovieModalHandler);
addMovie.addEventListener("click", addMovieHandler);
cancelDeteleButton.addEventListener("click", cancelDeletingMovie);
