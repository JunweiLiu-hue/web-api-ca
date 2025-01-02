# Assignment 1 - ReactJS app.



Name: Junwei Liu Number： 20109222

## Overview.



This repository is a ReactJS application that allows users to explore, rate, and manage their favorite movies and the movies they want to watch using data from the TMDb API. Users can also view detailed information about movies and actors. The app includes authentication through third-party services, allowing users to log in, manage their movie ratings, and add movies to their favorite list and watchlist. The app provides a user-friendly interface with Material UI components.

### Features.

- Added **actor list** to the movie details page.
- Users can **click on an actor** to jump to their detailed profile page.
- Navigate from **actor detail page** to **movie detail page**.login by third-party authentication
- **Login** through third-party authentication.
- The **favorite page** and **watchlist page** are accessible only after login.
- **Rating function**: Users can rate movies using a rating icon.
- Added various **icons** to the **movie detail page**, such as a downward arrow, bookmark add icon, and more.
- use some new components in Material UI
  - accordion and some relate to it
  - arrow downward icon
  - bookmark add icon
  - dialog and some relate to it
  - alert
  - drawer

## Setup requirements.



# Getting Started with Create React App



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts



In the project directory, you can run:

### `npm start`



Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000/) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`



Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`



Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`



**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More



You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting



This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size



This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App



This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration



This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment



This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify



This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## API Endpoints and Descriptions

- ### ***\*Movie Data\****

  · **Homepage Movies**: GET /movies/home
  Retrieves data for the homepage, including popular and recommended movies.

  ### ***\*Movie Details\****

  · **Get Movie Details**: GET /movies/:id
  Retrieves detailed information about a specific movie.

  ### ***\*Favorite Movies\****

  · **Favorite List**: GET /movies/favorites
  Retrieves the list of movies favorited by the user.

  · **Toggle Favorite Status**: POST /movies/favorites/:id
  Adds or removes a movie from the user's favorites.

  ### ***\*Upcoming Movies\****

  · **Upcoming Movies**: GET /movies/upcoming
  Retrieves a list of upcoming movies.

  ### ***\*Now Playing Movies\****

  · **Now Playing Movies**: GET /movies/nowplaying
  Retrieves a list of movies currently in theaters.

  ### ***\*Popular Movies\****

  · **Popular Movies**: GET /movies/popular
  Retrieves a list of the most popular movies.

  ### ***\*Watchlist\****

  · **Get Watchlist**: GET /movies/watchlist
  Retrieves the user's watchlist.

  · **Toggle Watchlist Status**: POST /movies/watchlist/:id
  Adds or removes a movie from the user's watchlist.

  ### ***\*Rating\****

  · **Movie Rating Page**: GET /rate/:movieId
  Displays the page for rating a specific movie.

  · **Submit Rating**: POST /rate/:movieId
  Submits a rating for a movie.

  ### ***\*Actor Details\****

  · **Actor Information**: GET /actor/:id
  Retrieves detailed information about a specific actor.

  · **Actor Movie Credits**: GET /actor/:id/movielist
  Retrieves a list of movies featuring the actor.

  ### ***\*Reviews\****

  · **Movie Review Page**: GET /reviews/:id
  Displays reviews for a specific movie.

  · **Add Movie Review**: POST /reviews/form
  Submits a new review for a movie.

  ### ***\*User Authentication\****

  · **Login Page**: GET /login
  Displays the login interface for users.

  · **Login Callback**: POST /login/callback
  Handles callbacks after third-party login.

## Application Routes and Pages



- - ### ***\*Authenticated Routes\****

    · **Favorite Movies**: /movies/favorites
    Displays all movies marked as favorites. Authentication required.

    · **Watchlist Movies**: /movies/watchlist
    Displays all movies in the user's watchlist. Authentication required.

    ### ***\*Public Routes\****

    · **Now Playing Movies**: /movies/nowplaying
    Displays all movies currently in theaters.

    · **Actor Details**: /actors/:id
    Displays detailed information about a specific actor.

    · **Upcoming Movies**: /movies/upcoming
    Displays a list of all upcoming movies.

    · **Popular Movies**: /movies/popular
    Displays a list of all popular movies.

    · **Login Page**: /login
    Displays the user login interface.

## Independent learning (If relevant).



I learned to use sessionStorage to storage data in frontend. After the user login, the session id should be storaged and clear until logout.https://blog.csdn.net/weixin_53877433/article/details/117911670

I learned about the progress of third-party authentication.https://developer.themoviedb.org/reference/intro/authentication