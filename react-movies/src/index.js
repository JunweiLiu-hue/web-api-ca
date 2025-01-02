import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingPage from "./pages/UpcomingPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import WatchListPage from "./pages/watchListPage";
import ActorDetails from "./pages/actorDetails";
import LoginPage from "./pages/loginPage";
import PopularPage from "./pages/popularPage.js";
import RatePage from "./pages/ratePage.js";
import LogoutPage from "./pages/logoutPage.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/popular" element={<PopularPage />} />
            <Route path="/movies/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies/upcoming" element={<UpcomingPage />} />
            <Route path="/login/callback" element={<LoginPage />} />
            <Route path="/movies/nowplaying" element={<NowPlayingPage />} />
            <Route path="/movies/watchlist" element={<WatchListPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/actor/:id" element={<ActorDetails />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/rate/:movieId" element={<RatePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);