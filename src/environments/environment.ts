export const environment = {
  production: false,
  identityApi: {
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:',
    signInUrl: 'signInWithPassword',
    signUpUrl: 'signUp',
    apiKey: '?key=AIzaSyDBuXSetADJSpBBOxT-7wsVMT3fVurlE3U',
  },
  theMovieApi: {
    baseUrl: 'https://api.themoviedb.org/3',
    popularMovies: '/movie/popular',
    getMovie: '/movie/',
    apiKey: '739d88f0ca8909ee15f7310778dcb551',
  },
  localStorage: {
    tokenKey: 'WM_TOKEN',
    userKey: 'WM_USER',
  },
  jwtAuthorization: {
    authText: 'Authorization',
    tokenText: 'Bearer',
  },
  rickandmortyapi: {
    baseUrl: 'https://rickandmortyapi.com/api',
    character: '/character/',
  },
};
