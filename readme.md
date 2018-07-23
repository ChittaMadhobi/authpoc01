PLEASE HELP

Background: This is a React-Redux trying to use local (email+password) and google oauth with passport 'together'.

Everything rins fine :

1.  email + password registration
2.  Email verification
3.  Login ... receiving jwt token to get user names etc.
4.  Gets token from browser via localhost:5000/auth/google and receives token e.g.:
    {
    success: true,
    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFuZGFpZCI6MCwibmFtZSI6IlNhcmJvaml0IE11a2hlcmplZSIsImVtYWlsIjoic2FyYm9qaXQucHJvamVjdEBnbWFpbC5jb20iLCJhdmF0YXIiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLUZ3bGZ3Sk01MXdFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FBbm5ZN3FKMGhSQTQ5LXVub3FPdzkxOGs3NXdBUzk4dWcvbW8vcGhvdG8uanBnIiwiaWF0IjoxNTMyMzIyNTYxLCJleHAiOjE1MzI0MDg5NjF9.NAFFNk0CrE8o6ePLJ9zyIHJAOi7ZIrTtQj_asYqdOqw"
    }

The only issue is when I click the button that executes axios.get to get to '/auth/google'. On inspect I get the following errors:

Got into Google Auth onclick function
authActions.js:46 Inside googleLoginUser
2accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=851068648862-fs07u9rpv2sdqg94c8kp4rom7qq0mc02.apps.googleusercontent.com:1 GET https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=851068648862-fs07u9rpv2sdqg94c8kp4rom7qq0mc02.apps.googleusercontent.com 400 ()
login:1 Failed to load https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=851068648862-fs07u9rpv2sdqg94c8kp4rom7qq0mc02.apps.googleusercontent.com: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. The response had HTTP status code 400.
authActions.js:51 err: undefined
Cross-Origin Read Blocking (CORB) blocked cross-origin response https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=851068648862-fs07u9rpv2sdqg94c8kp4rom7qq0mc02.apps.googleusercontent.com with MIME type text/html. See https://www.chromestatus.com/feature/5629709824032768 for more details.
webpackHotDevClient.js:76 The development server has disconnected.
Refresh the page if necessary.

---

Quick Steps to clone and execute the app to help find the error.

## Steps to start the app (You do not need this instruction but ... in case it helps)

1.  Clone the repo in you local machine.
2.  From root directory and client directory run
    > > npm install // To create node_modules
3.  For your MLab & GoogleOauth setup fill in:
    module.exports = {
    mongoURI: 'mongodb://xxxxx:yyyyy@ds127771.mlab.com:27771/baanda_dev',
    secretOrKey: 'SomesecretwordsThatisYours',
    googleClientID: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.com',
    googleClientSecret: 'Tttttttttttttttttttttt'
    };
4.  On root directory run >> npm run dev

To test out:

1.  Register using email/pwd
2.  Login (local straetegy)
3.  From browser try localhost:5000/auth/googleClientID
    FAILS:
4.  When you click on 'Authenticate with Google' button.
