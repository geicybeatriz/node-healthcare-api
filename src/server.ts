import app from "./app";
import "./config/setup";

const port = +process.env.PORT || 5000;

app.listen(port, () => console.log('success'));