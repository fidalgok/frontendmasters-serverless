const {query} = require('./util/hasura');

exports.handler = async (event) => {
    const {id, title, tagline, poster} = JSON.parse(event.body);
    
    const result = await query({
        query: `
        mutation addOneMovie($id: String!, $poster: String!, $tagline: String!, $title: String!) {
            insert_movies(objects: {id: $id, poster: $poster, tagline: $tagline, title: $title}) {
              returning {
                id
                title
                poster
                tagline
              }
            }
          }
        `,
        variables: {id, title, tagline, poster}
    });
    
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    }
}