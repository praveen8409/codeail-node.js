const development = {
    asset_path: '/assets',
    // name: 'development',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'trey.prosacco@ethereal.email',
            pass: 'q9gxQzn3rqKpPDZWNW'
        }
    },
    google_client_id : "472059763624-35norpk29vhgjkkb2evsicfs3v92n3v7.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}

const production =  {
    name: 'production'
}



module.exports = development;