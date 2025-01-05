- # Assignment 2 - Web API.

  Name: Junwei Liu

  ## Features.

  A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)

   + add to favorite
   + get favorite list
   + delete from favorite
   + add to watchlist
   + get watchlist
   + delete from watchlist
   + fully integrate api in web-api
   + Login and register authentication

  ## Setup requirements.

  Clone the repository:

  ```
  git clone 
  ```

  Install dependencies:

  ```
  npm install
  ```

  Create an `.env` file in the root directory with the following structure:

  ```
  REACT_APP_TMDB_KEY=186c201c0a069c1aa61a04bf86bb27a5
  FAST_REFRESH=false
  REACT_APP_API_BASE_URL=http://localhost:8080/api
  REACT_APP_TMDB_REDIRECT_URI=http://localhost:3000/login/callback
  ```

  Start the API:

  ```
  npm start
  ```

  ## API Configuration

  Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

  REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

  ______________________
  NODE_ENV=development
  PORT=8080
  HOST=localhost
  MONGO_DB=mongodb+srv://20109222:1314Lljw@cluster0.ntauk.mongodb.net/?retryWrites=true&w=majority&appName=tasky
  TMDB_KEY=186c201c0a069c1aa61a04bf86bb27a5
  SECRET=ilikecake

  ______________________

  ## API Design
  Give an overview of your web API design, perhaps similar to the following: 

  - /api/tmdb/upcoming | GET | Gets a list of upcoming movies from tmdb
  - /api/tmdb/genres | GET | Gets a list of genres from tmdb
  - /api/tmdb/popular | GET | Gets a list of popular movies from tmdb
  - /api/tmdb/nowplaying| GET | Gets a list of nowplaying movies from tmdb
  - /api/movies/details/{movieid} | GET | Gets movie details
  - /api/movies/{movieid} | GET | Gets a single movie
  - /api/reviews/{movieid} | GET | Get all reviews for movie
  - /api/reviews | POST | Create a new review for Movie
  - /api/favorites/{username}/favorites | GET | Get all favorite movie for user
  - /api/favorites/{username}/favorites | Delete | Delete favorite movie for user
  - /api/favorites/{username}/favorites | Post | Create favorite movie for user
  - /api/watchlist/{username}/watchlist | GET | Get watchlist movie for user
  - /api/watchlist/{username}/watchlist | Delete | Delete watchlist movie for user
  - /api/watchlist/{username}/watchlist | Post | Create watchlist movie for user

  If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

  ## Security and Authentication

  Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

  When the user login, the api use JWT authentication to generate a token to store in Localstorage.

  - /api/users
  - /api/favourites/{username}/favourites | GET | Get all favorite movie for user
  - /api/favourites/{username}/favourites | Delete | Delete favorite movie for user
  - /api/favourites/{username}/favourites | Post | Create favorite movie for user
  - /api/watchlist/{username}/watchlist | GET | Get watchlist movie for user
  - /api/watchlist/{username}/watchlist | Delete | Delete watchlist movie for user
  - /api/watchlist/{username}/watchlist | Post | Create watchlist movie for user

  all the routes under users are protected.

  ## Integrating with React App

  Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

   I create user, favourite, watchlist, review,movie database and write the api of those database in post, get, delete. And in assignment one, I use third authentication, but here I use JWT token to do it and add login page and register page Also use authcontext to do authentication.

  In react-movies, I use tmdb-api to store all api methods

  ## Independent learning (if relevant)

  Briefly explain any non-standard features developed for the app.   