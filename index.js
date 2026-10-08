const form = document.querySelector("#form");
const input = document.querySelector("#input");
const results = document.querySelector("#results");

const NO_POSTER = "https://placehold.co/300x450/18181b/a1a1aa?text=No+Poster";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = input.value.trim();
    if (!query) {
        return;
    }
    searchMovies(query);
});

async function searchMovies(movieName) {

    results.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-20">
            <span class="loader"></span>
        </div>
    `;

    try {
        let response = await fetch(
            `https://www.omdbapi.com/?apikey=6c6a32bf&s=${encodeURIComponent(movieName)}`
        );
        let data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        }
        else {
            results.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div class="text-5xl mb-5">
                    🎬
                </div>
                <p class="text-gray-400 text-lg">
                    ${data.Error}
                </p>
                <p class="text-gray-600 text-sm mt-2">
                    Try searching for another movie.
                </p>
            </div>
        `;
        }
    } catch (error) {
        results.innerHTML = `<p class="col-span-full text-center text-red-400 py-16 text-lg">Error loading movies. Please try again.</p>`;
    }
}

function displayMovies(movies) {

    results.innerHTML = "";

    movies.forEach(movie => {
        const div = document.createElement("div");
        div.dataset.imdbID = movie.imdbID;

        div.setAttribute("class", "movie-card group bg-[#15151b] border border-[#292930] rounded-xl overflow-hidden cursor-pointer transition duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]");

        const poster = (movie.Poster && movie.Poster !== "N/A") ? movie.Poster : NO_POSTER;
        console.log({ poster, mp: movie.Poster });

        div.innerHTML = `
            <div class="h-[280px] overflow-hidden bg-[#202027]">
                <img src="${poster}" alt="${movie.Title}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105">
            </div>

            <div class="p-4">
                <p class="text-base font-bold text-white truncate mb-2">${movie.Title}</p>
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-400">${movie.Year}</p>
                    <span class="text-xs text-orange-500">IMDb</span>
                </div>
            </div>
        `;
        results.append(div);
    });
}

results.addEventListener("click", (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-card");
    if (movieCard && movieCard.dataset.imdbID) {
        const imdbID = movieCard.dataset.imdbID;
        location.href = `movie-details.html?id=${imdbID}`;
    }
});

let data = [
    {
        "Title": "Kill Bill: Vol. 1",
        "Year": "2003",
        "imdbID": "tt0266697",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZmMyYzJlZmYtY2I3NC00NjAyLTkyZWItZjdjZDI1YTYyYTEwXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg"
    },
    {
        "Title": "Kill Bill: Vol. 2",
        "Year": "2004",
        "imdbID": "tt0378194",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BY2FiNzhiZTctNzU1Mi00NDkwLWExNDMtZTg0MjYyNzhkNWNkXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg"
    },
    {
        "Title": "To Kill a Mockingbird",
        "Year": "1962",
        "imdbID": "tt0056592",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZTlkYWU4MGEtZmQyYi00OWEzLTgzY2EtYzVjOTEzYzAyNTk1XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
        "Title": "A Time to Kill",
        "Year": "1996",
        "imdbID": "tt0117913",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYmNiYzY1N2ItZDZiNC00ZGMyLWJlZjktZDE1MDI3NDBlYjE5XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
        "Title": "Sin City: A Dame to Kill For",
        "Year": "2014",
        "imdbID": "tt0458481",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5ODYwNjgxMF5BMl5BanBnXkFtZTgwMTcwNzAyMjE@._V1_SX300.jpg"
    },
    {
        "Title": "Licence to Kill",
        "Year": "1989",
        "imdbID": "tt0097742",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYjY3OWJkMjMtYTgwYS00MjJjLWE4M2ItOWVhOWMxNGM1NDk3XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
        "Title": "A View to a Kill",
        "Year": "1985",
        "imdbID": "tt0090264",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZjc3ZTJkZjUtM2E4Mi00YzA1LWJkZTAtM2U0OWUyYTE4YTFiXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
        "Title": "3 Days to Kill",
        "Year": "2014",
        "imdbID": "tt2172934",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMzM0MjE0Nzg1N15BMl5BanBnXkFtZTgwODA4ODE4MDE@._V1_SX300.jpg"
    },
    {
        "Title": "Righteous Kill",
        "Year": "2008",
        "imdbID": "tt1034331",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwMjg3MjY3OV5BMl5BanBnXkFtZTcwNTc4MDU3MQ@@._V1_SX300.jpg"
    },
    {
        "Title": "Generation Kill",
        "Year": "2008",
        "imdbID": "tt0995832",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTM2NjAxOTQzNl5BMl5BanBnXkFtZTcwMjk4NzU3MQ@@._V1_SX300.jpg"
    }
];

displayMovies(data);