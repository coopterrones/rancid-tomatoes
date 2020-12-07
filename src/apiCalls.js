const getData = (path) => {
  return fetch(path)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error('Sorry we are having difficulty loading this page, please try again later!')
      }
    })
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
