const addMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("add-modal");
const cancelMovieModal = document.getElementById("cancel");
const addMovie = document.getElementById("add");
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
    title,
    imageUrl,
    rating,
  };

  movieList.push(movie);
  console.log("movieList:", movieList);
  showAddedMovie(title, imageUrl, rating);
  cancelMovieModalHandler();
  clearBanner();
};

const showAddedMovie = (title, imageUrl, rating) => {
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
