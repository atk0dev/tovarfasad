const expressJwt = require('express-jwt');

function authJwt() {

    console.log("authJwt");

    const secret = process.env.secret;
    const api = process.env.API_URL;
   
    console.log("secret", secret);
    
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    console.log("Is revoked: ", payload);
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}



module.exports = authJwt