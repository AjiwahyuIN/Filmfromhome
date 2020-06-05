$('.searchBtn').on('click', function () {
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=f69c3d35&s=" + $('.keyword').val(),
        success: result => {
            const movies = result.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showMovies(m);
            });
            $('.cardContainer').html(cards);

            $('.detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=f69c3d35&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responText);
                    }
                });
            });
        },
        error: (e) => {
            console.log(e.responText);
        }
    });
})



function showMovies(m) {
    return ` <div class="col-md-4 my-3">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
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
                    <h4>${m.Title} ${m.Year} </h4>
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