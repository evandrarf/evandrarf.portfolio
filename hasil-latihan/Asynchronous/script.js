// $(".search-button").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=6df2dc29&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movie-container").html(cards);

//       // Ketika tombol detail di klik
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=6df2dc29&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = showMovieDetail(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// Fetch
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=6df2dc29&s=" + inputKeyword.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // ketika tombol detail di klik
//       const modalDetailButton = document.querySelectorAll(".modal-detail-button");
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=6df2dc29&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

// Refactoring
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

// Function yang diperlukan
function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=6df2dc29&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=6df2dc29&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
                  <div class="card">
                      <img src="${m.Poster}" class="card-img-top" />
                      <div class="card-body">
                          <h5 class="card-title">${m.Title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                      </div>
                  </div>
              </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
                  <div class="row">
                      <div class="col-md-3">
                      <img src="${m.Poster}" class="img-fluid" />
                      </div>
                      <div class="col-md">
                          <ul class="list-group">
                              <li class="list-group-item"><strong>${m.Title} (${m.Year})</strong></h4></li>
                              <li class="list-group-item"><strong>Genre : </strong> ${m.Genre}</li>
                              <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                              <li class="list-group-item"><strong>IMDB Rating :</strong> ${m.imdbRating}</li>
                              <li class="list-group-item"><strong>Plot : </strong> <br />${m.Plot}</li>
                          </ul>
                      </div>
                  </div>
              </div>`;
}
