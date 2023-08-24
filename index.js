// const date = new Date();
// console.log(" Iryna  wellcome to node.js lesson 1 you can do it");
// console.log(
//   ' date: ',
//   ` today is ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} `
// );

// const users= require('./src/user');
// const{usersName}= require('./src/user');
// console.log('users: ', users);

// console.log('usersNameCap: ', usersName.toString("").toUpperCase());
// console.log('names: ', users.usersName.toString(""))
// console.log('age:' , users.usersAge.toString(""))

// const fs = require("fs")

// fs.readFile("./src/file/file.txt",(erorr, data)=>{
//     console.log('erorr: ', erorr);
//     console.log('data: ', data);
 


// })

const fs = require("fs/promises")

// fs.readFile("./src/file/file.txt")
// .then(textData=>console.log('textData: ', textData))
// .catch(error=>console.log('error: ', error))


const readFile= async()=>{
    // buffer колування файлу через 16 річну систему 

// щоб розкодувати buffer можна використовувати метод toString()
// або 2 параметром передати тип кодування  наприклад "utf-8"
    const buffer= await fs.readFile("./src/file/file.txt","utf-8")
    console.log('buffer: ',  buffer);
}

// readFile()

// ---- add File-----


const addFile= async()=>{

// або 2 параметром передати текст який треба додати 
// \n  символ початку рядка
    const result= await fs.appendFile("./src/file/file.txt","\n і отримати базову зарплату 500$")
    console.log('buffer: ',  result);
}

// addFile()
// повертає undefined
// щоб побачити результат треба прочитати файл


// ---- replace file-----

const replaceFile=async()=>{
    const result = await fs.writeFile("./src/file/file.txt"," React.js + Redux + Noda.js can change my life")
    console.log('result : ', result );

    
    readFile()
}

replaceFile()
// повертає undefined
// щоб побачити результат треба прочитати файл

