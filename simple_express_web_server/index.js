const express = require("express");
// -------------- щоб створити веб сервер його треба імпортувати з npm пакету і викликати як функцію -----------
const app = express(); // app - веб-сервер
// -----список зпитів які буде обробляти веб сервер та давати відповідь 
app.get("/", (request, response)=> {
    console.log(' response: ',  response)
    
    response.send("<h2>Home page</h2>");
});

app.get("/contacts", (request, response)=> {
   
    //----- request обєкт в якому міститься інформація про запит адреса тіло і тд-----
    
    // console.log('(request: ', (request))
    
    console.log(request.url);
    console.log(request.method);
    
    // ---- response обєкт методи якого дозволяють відправити відповідь на frontend----- 
   
    response.send("<h2>Contacts page</h2>");
})

//  --------------------- порт на якому буде запущений веб сервер --------------------
app.listen(4000, ()=> console.log("Server running on port 4000"));