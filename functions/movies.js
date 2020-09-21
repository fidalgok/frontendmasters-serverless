const {URL} = require('url');
const fetch = require('node-fetch');
const movies = require('../data/movies.json');

exports.handler = async () => {
    const api = new URL('https://www.omdbapi.com/');

    
    
    const promises = movies.map((movie) => {
        // use the movie's IMDB ID to look up details
        api.searchParams.set('i', movie.id);
        // add the secret api key
        api.searchParams.set('apikey', process.env.OMDB_API_KEY);
        return fetch(api)
        .then(res => res.json())
        .then(data => {
            const scores = data.Ratings;
            console.log(data)
            return {
                ...movie,
                scores,
            }
        })
    });

    const moviesWithRatings = await Promise.all(promises);
    return {
        statusCode: 200,
        body: JSON.stringify(moviesWithRatings),
    };
}