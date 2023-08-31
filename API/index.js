const express = require('express');
const cors = require('cors');
const moviesRouter = require("./routes/api/movies_api");

// console.log('moviesRouter : ', moviesRouter);
const app = express(); // app - веб-сервер

app.use(cors());

// const corsMiddleware = cors();
/*
const cors = options => {
    return (req, res, next) => {
        // allow cors
        next()
    }
}
*/
// app.use(corsMiddleware);
// API
app.use("/api/movies",moviesRouter )


// ---Middleware error page--
app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found ',
  });
});
//  -----порт на якому буде запущений веб сервер ---
app.listen(4000, () => console.log('Server running on port 4000'));
