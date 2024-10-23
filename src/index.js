import { Hono } from "hono";
import { cors } from "hono/cors";
import index from "./routes/index";
import reviews from "./routes/reviews";
import title from "./routes/title";
import cache from "./helpers/cache";
import search from "./routes/search";
import userRoutes from "./routes/user";
import movie from "./routes/movie";
import discover from "./routes/discover";
import series from "./routes/series";

const app = new Hono();

app.use("*", cors());
app.use("*", cache);

app.route("/search", search);
app.route("/movie", movie);
app.route("/series", series);
app.route("/title", title);
app.route("/reviews", reviews);
app.route("/user", userRoutes);
app.route("/discover", discover);

app.route("/", index);

app.fire();
