const apiConfig = {
   baseUrl: "https://api.themoviedb.org/3/",
   apiKey: "0ab8190bbe65e834c5ca41dffb31c726",
   originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
   w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig