// http://localhost:3000/movies fetch and display data 
        // create image and add it to 'movie-list' nav element

let urlMovies = 'http://localhost:3000/movies';
        //generate movies
function renderMovieList(movie) {
        const getNav = document.querySelector("#movie-list");
        const createImg = document.createElement("img");
        getNav.appendChild(createImg)
        createImg.src = movie.image
        createImg.dataset.movieDataId = movie.id

        if (movie.id === 1){
                createImg.id = "selectedMovie";
        }else{
                createImg.id = ""
        }

        // eventhandler for loading movie info based on clicked
        createImg.addEventListener("click", (e) => {
               renderMovieInfo(movie);
               
        })
        
}

function patchMovieWatched(id, boolean){
        fetch(`${urlMovies}/${id}`,
        
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "watched": boolean
            })
        })
        .then(response => response.json())
        .then(console.log())
        .catch(error => console.log(error))
}

function updateBlood(id) {
        const getBloodForm = document.querySelector('#blood-form')
        const getBloodInput = document.querySelector('#blood-amount')
        const getBloodAmount = document.querySelector(`#amount`)

        getBloodForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const newBloodAmount = parseInt(getBloodInput.value) + parseInt(getBloodAmount.innerText);
                console.log(parseInt(getBloodAmount.innerText));
                getBloodAmount.innerText = `${newBloodAmount}`;

                fetch(`${urlMovies}/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "blood_amount": newBloodAmount
                    })
                })
                .then(response => response.json())
                .catch(err => console.log(err))
        })
}

function watchedMovie(movie){
        const getWatchedBtn = document.querySelector("#watched")
        const watchedMovieId = movie.id;
         if (movie.watched === true){
                getWatchedBtn.innerText = "Watched";
        }else if (movie.watched === false){
                getWatchedBtn.innerText = "Not Watched"
        }
        getWatchedBtn.addEventListener("click", (e) => {
                //optimistically render & patch  watch btn
                if (getWatchedBtn.innerText === "Watched") {
                        getWatchedBtn.innerText = "Not Watched";
                        console.log(watchedMovieId)
                        patchMovieWatched(watchedMovieId, false)
                        console.log(watchedMovieId)
                }else if (getWatchedBtn.innerText === "Not Watched"){
                        getWatchedBtn.innerText = "Watched"
                        patchMovieWatched(watchedMovieId, true)
                        console.log(watchedMovieId)
                }

        })
}

function renderMovieInfo(movie){
        //generate movie information
        const getInfoImg = document.querySelector("#detail-image")
        getInfoImg.src = movie.image
        const getTitle = document.querySelector("#title")
        getTitle.innerText = movie.title
        const getYear = document.querySelector("#year-released")
        getYear.innerText = movie.release_year
        const getDescription = document.querySelector("#description")
        getDescription.innerText = movie.description
        const getBloodAmount = document.querySelector(`#amount`)
        getBloodAmount.innerText = movie.blood_amount;
        watchedMovie(movie)
        console.log(movie.id)
        updateBlood(movie.id);
        
}

function renderMovies(){
        //fetch api data  
        fetch(urlMovies)
        .then(response => response.json())
        .then(movies => {
                //render movies list images
                movies.forEach(movie => {renderMovieList(movie);})
                let selectedMovie = document.querySelector("#selectedMovie")
                console.log(selectedMovie)

                //default to 1
                renderMovieInfo(movies[1])
        })
        .catch(error => {
                console.log(error);
        });

}




document.addEventListener('DOMContentLoaded', (e) => {
        renderMovies();

})

