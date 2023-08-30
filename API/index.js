const express = require('express');
const cors = require('cors');

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

// ---Middleware error page--
app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found ',
  });
});
//  -----порт на якому буде запущений веб сервер ---
app.listen(4000, () => console.log('Server running on port 4000'));
