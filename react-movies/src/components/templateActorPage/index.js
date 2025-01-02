import { useQuery } from "react-query";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getActorImages, getActorCredits } from "../../api/tmdb-api";

const TemplateActorPage = ({ actor, children }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: actor.id }],
    getActorImages
  );

  const { data: creditsData, error: creditsError, isLoading: isCreditsLoading, isError: isCreditsError } = useQuery(
    ["credits", { id: actor.id }],
    () => getActorCredits(actor.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data.profiles || [];
  const notableWorks = creditsData?.cast || [];

  const highestRatedMovie = notableWorks.reduce((highest, movie) => {
    return (highest.vote_average || 0) > (movie.vote_average || 0) ? highest : movie;
  }, {});

  return (
    <>
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {images.length > 0 && (
              <ImageList sx={{ height: "auto", width: "100%" }} cols={1}>
                <ImageListItem key={images[0].file_path}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${images[0].file_path}`}
                    alt="Actor"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </ImageListItem>
              </ImageList>
            )}
          </div>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <h2>Personal Info</h2>
            <p>
              <strong>NotableWorks:</strong>
              <br></br>
              {highestRatedMovie.title || "N/A"}
            </p>
            <p>
              <strong>Number of Works:</strong>
              <br></br>
              {notableWorks.length || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong>
              <br></br>
              {actor.gender === 1 ? 'Female' : 'Male'}
            </p>
            <p>
              <strong>Birthday:</strong>
              <br></br>
              {actor.birthday || "N/A"}
            </p>
            <p>
              <strong>Place of Birth:</strong>
              <br></br>
              {actor.place_of_birth || "N/A"}
            </p>
            <p>
              <strong>Also Name:</strong>
              <br />
              {actor.also_known_as && actor.also_known_as.length > 0
                ? actor.also_known_as.join(", ")
                : "N/A"}
            </p>

          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;
