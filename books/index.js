const fs= require("fs/promises")
const{nanoid}=require("nanoid")
const path = require("path");
const books= require("./books")
// __dirname aбсолютний шлях до файла відносно кореня проекту шоб йлго можна було відкрити в будь якому місці додатку 
console.log('__dirname: ', __dirname);
const booksPath = path.join(__dirname, "books.json");
const getAll=async()=>{

    const data= await fs.readFile(booksPath)
// кодування utf 8 можна не вказувти  json.parse вміє читати buffer
   return    JSON.parse(data)
}
const  getBookById=async(id)=>{
const allBooks= await getAll()
const OneBook=allBooks.find(book=>book.id1==id)
// кодування utf 8 можна не вказувти  json.parse вміє читати buffer
   return  OneBook|| null
}
const addBook=async(data)=>{
    const allBooks= await getAll()
    const newBook={
        id:nanoid(),
        ...data
    }

    
    allBooks.push( newBook)
    // після додавання книги перезаписуємо json file 
await fs.writeFile(booksPath,JSON.stringify(allBooks,null,2))

return newBook
    }


module.exports={ 
    getAll,
    getBookById,
    addBook,
}