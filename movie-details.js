let params = new URLSearchParams(location.search);
let imdbID = params.get("id");
let movieDetails = document.querySelector("#movieDetails");


async function searchMovie(imdbID) {

    movieDetails.innerHTML = `
        <div class="flex justify-center items-center py-24">
            <span class="loader"></span>
        </div>
    `;


    let response = await fetch(
        `https://www.omdbapi.com/?apikey=6c6a32bf&i=${imdbID}&plot=full`
    );

    let data = await response.json();


    if (data.Response === "True") {

        displayMovies(data);

    }

    else {

        movieDetails.innerHTML = `
            <div class="flex flex-col items-center justify-center py-24 text-center">

                <div class="text-5xl mb-5">
                    🎬
                </div>

                <p class="text-xl font-semibold text-gray-300">
                    ${data.Error}
                </p>

                <a
                    href="index.html"
                    class="mt-6 px-5 py-3
                           bg-orange-600
                           hover:bg-orange-500
                           rounded-lg
                           font-semibold
                           transition duration-300"
                >
                    ← Back to Movies
                </a>

            </div>
        `;

    }

}


searchMovie(imdbID.trim());


function displayMovies(movie) {

    movieDetails.innerHTML = `

        <div class="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">


            <!-- ================= POSTER ================= -->

            <div>

                <div class="rounded-2xl overflow-hidden
                            bg-[#15151b]
                            border border-[#292930]
                            shadow-[0_20px_50px_rgba(0,0,0,0.45)]">

                    <img
                        src="${movie.Poster}"
                        alt="${movie.Title}"
                        class="w-full h-auto object-cover"
                    >

                </div>

            </div>



            <!-- ================= MOVIE INFORMATION ================= -->

            <div class="flex flex-col">


                <!-- Title -->

                <h1 class="text-4xl md:text-5xl
                           font-bold
                           leading-tight
                           mb-5">

                    ${movie.Title}

                </h1>



                <!-- Movie Meta Information -->

                <div class="flex flex-wrap items-center gap-3 mb-8">

                    <span
                        class="px-3 py-1
                               bg-orange-500/10
                               border border-orange-500/30
                               text-orange-400
                               rounded-full
                               text-sm
                               font-medium"
                    >
                        ${movie.Year}
                    </span>


                    <span
                        class="px-3 py-1
                               bg-[#18181f]
                               border border-gray-700
                               text-gray-300
                               rounded-full
                               text-sm"
                    >
                        ${movie.Rated}
                    </span>


                    <span
                        class="px-3 py-1
                               bg-[#18181f]
                               border border-gray-700
                               text-gray-300
                               rounded-full
                               text-sm"
                    >
                        ${movie.Runtime}
                    </span>


                    <span
                        class="px-3 py-1
                               bg-[#18181f]
                               border border-gray-700
                               text-gray-300
                               rounded-full
                               text-sm"
                    >
                        ${movie.Genre}
                    </span>


                    <span
                        class="px-3 py-1
                               bg-yellow-500/10
                               border border-yellow-500/30
                               text-yellow-400
                               rounded-full
                               text-sm
                               font-semibold"
                    >
                        ⭐ ${movie.imdbRating} / 10
                    </span>

                </div>



                <!-- ================= PLOT ================= -->

                <div
                    class="mb-8
                           p-6
                           bg-[#15151b]
                           border border-[#292930]
                           rounded-xl"
                >

                    <p
                        class="text-orange-500
                               text-xs
                               font-bold
                               tracking-[3px]
                               uppercase
                               mb-3"
                    >
                        Plot Overview
                    </p>


                    <p
                        class="text-gray-400
                               leading-7
                               text-base"
                    >
                        ${movie.Plot}
                    </p>

                </div>



                <!-- ================= CREW ================= -->

                <div
                    class="grid grid-cols-1 md:grid-cols-2
                           gap-6
                           mb-8"
                >

                    <!-- Director -->

                    <div>

                        <p
                            class="text-gray-500
                                   text-xs
                                   uppercase
                                   tracking-wider
                                   mb-2"
                        >
                            Director
                        </p>


                        <p class="text-gray-200 font-medium">
                            ${movie.Director}
                        </p>

                    </div>



                    <!-- Writer -->

                    <div>

                        <p
                            class="text-gray-500
                                   text-xs
                                   uppercase
                                   tracking-wider
                                   mb-2"
                        >
                            Writer
                        </p>


                        <p class="text-gray-200 font-medium">
                            ${movie.Writer}
                        </p>

                    </div>



                    <!-- Actors -->

                    <div>

                        <p
                            class="text-gray-500
                                   text-xs
                                   uppercase
                                   tracking-wider
                                   mb-2"
                        >
                            Actors
                        </p>


                        <p class="text-gray-200 font-medium">
                            ${movie.Actors}
                        </p>

                    </div>



                    <!-- Language -->

                    <div>

                        <p
                            class="text-gray-500
                                   text-xs
                                   uppercase
                                   tracking-wider
                                   mb-2"
                        >
                            Language
                        </p>


                        <p class="text-gray-200 font-medium">
                            ${movie.Language}
                        </p>

                    </div>



                    <!-- Country -->

                    <div>

                        <p
                            class="text-gray-500
                                   text-xs
                                   uppercase
                                   tracking-wider
                                   mb-2"
                        >
                            Country
                        </p>


                        <p class="text-gray-200 font-medium">
                            ${movie.Country}
                        </p>

                    </div>

                </div>



                <!-- ================= IMDb BUTTON ================= -->

                <div class="mt-auto pt-4">

                    <a
                        href="https://www.imdb.com/title/${movie.imdbID}/"
                        target="blank"

                        class="inline-flex items-center gap-2
                               px-6 py-3
                               bg-orange-600
                               hover:bg-orange-500
                               rounded-lg
                               font-semibold
                               text-white
                               transition duration-300
                               shadow-lg
                               shadow-orange-600/10"
                    >

                        ⭐ View on IMDb

                    </a>

                </div>


            </div>

        </div>

    `;

}