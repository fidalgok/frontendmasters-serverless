// This is for use with my functions. That's why it's in a util folder
const fetch = require('node-fetch');

async function query({ query, variables = {} }) {
    const result = await fetch(process.env.HASURA_API_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({ query, variables }),
    })
        .then(res => res.json())
    //TODO: handle errors...and show helpful info
    // result.errors
    return result.data;
}

exports.query = query;