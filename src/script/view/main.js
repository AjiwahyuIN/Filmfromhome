const searchButton = document.querySelector('.searchBtn');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeyword = document.querySelector('.keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch (err) {
        alert(err);
    }

});

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=f69c3d35&s=' + keyword)
        .then(response => {
            if (response.ok === "false") {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response.Response === "false") {
                throw new Error(response.Error);
            }
            return response.Search;
        });
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showMovies(m));
    const movieContainer = document.querySelector('.cardContainer');
    movieContainer.innerHTML = cards;
}

document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=f69c3d35&i=' + imdbid)
        .then(response => response.json())
        .then(m => m);
}

function updateUIDetail(m) {
    const movieDetail = showDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}




function showMovies(m) {
    return ` <div class="col-md-4 my-3">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">( ${m.Year} )</h6>
            <a href="#" class="btn btn-dark text-warning detail-button" data-toggle="modal" data-target="#moviedetail" data-imdbid="${m.imdbID}">Detail</a>
        </div>
    </div>
</div>`;
}

function showDetail(m) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">
                    <h4>${m.Title} ( ${m.Year} )</h4>
                </li>
                <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                <li class="list-group-item"><strong>Actor : </strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`;
}

// export default main;