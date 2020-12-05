const getData = (path) => {
  return fetch(path)
    .then(response => response.json())
}

export const apiCalls = {
  allMovies: () => {
    return getData("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
  },

  selectMovie: (id) => {
    return getData(`https://rancid-tomatillos.herokuapp.com/api/v2//movies/${id}`)
  },

  selectVideo: (id) => {
    return getData(`https://rancid-tomatillos.herokuapp.com/api/v2//movies/${id}/videos`)
  }
}
