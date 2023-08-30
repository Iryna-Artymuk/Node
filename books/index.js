const fs= require("fs/promises")
const{nanoid}=require("nanoid")
const path = require("path");
const books= require("./books")
// // __dirname aбсолютний шлях до файла відносно кореня проекту шоб йлго можна було відкрити в будь якому місці додатку 
// console.log('__dirname: ', __dirname);
const booksPath = path.join(__dirname, "books.json");
console.log(' booksPath : ',  booksPath );

const getAll=async()=>{

    const data= await fs.readFile(booksPath)
// кодування utf 8 можна не вказувти  json.parse вміє читати buffer
   return    JSON.parse(data)
}


// ------getBookById=-----------
const  getBookById=async(id)=>{
const allBooks= await getAll()
const OneBook=allBooks.find(book=>book.id1==id)
// кодування utf 8 можна не вказувти  json.parse вміє читати buffer
   return  OneBook|| null
}

// ------addBook-----------
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

    const updateById = async(id, data) => {
        const books = await getAll();
        const index = books.findIndex(item => item.id === id);
        if(index === -1){
            return null;
        }
        books[index] = {id, ...data};
        await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
        return books[index];
    }
    

    // ------deleteBook-----------
    const deleteById = async(id) => {
        console.log('id: ', id);

        const books = await getAll();
        const index = books.findIndex(item => item.id === id);
        console.log(' index : ',  index );

        if(index === -1){
            return null;
        }
        const [result] = books.splice(index, 1);
        // [result] деструкруризація з масиву в result приходить масив з  вирізаним обєктом тому що splice повертає вирізаний елемент у нашому випадку обєкт у вигляді масиву,  а нам треба  лише обєкт кнги  тому ми робимо деструктуризацію з масиву  [result] щоб дістати тільки обєкт  
        await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
        return result;
    }
    

module.exports={ 
    getAll,
    getBookById,
    addBook,
    deleteById,
    updateById 
}