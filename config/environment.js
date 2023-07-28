const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp : {
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
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name : 'production',
    asset_path : process.env.CODEIAL_ASSEST_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp : {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret :  process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url :  process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:  process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = development;
// module.exports = production;
// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);