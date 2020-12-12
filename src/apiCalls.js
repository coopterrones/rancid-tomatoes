const getData = (path) => {
  return fetch(path)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Sorry we are having difficulty loading this page, please try again later!')
      }
    })
}

const getWatchList = (path, action, id) => {
  return fetch(path, {
    method: action,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })
    .then(response => {
      if (response.ok) {
        return response;
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
  },

  addToWatchList: (id) => {
    return getWatchList("http://localhost:3001/watch-list", 'POST', id)
  }
}
