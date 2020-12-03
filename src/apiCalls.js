const getData = (path) => {
  return fetch(path)
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const apiCalls = {
  allMovies: () => {
    return getData("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
  },

  selectMovie: (id) => {
    return getData(`https://rancid-tomatillos.herokuapp.com/api/v2//movies/${id}`)
  }
}
