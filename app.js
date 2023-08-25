const books= require("./books")
// експортує по дефолту з файлу шndex в папці books
// тут буде обєкт 
console.log(' books: ',  books);
// console.log(__dirname)

const invokeActions= async({action,id,title,author})=>{

    switch (action) {
        case "read":
            const allBooks=await books.getAll()
            return  console.log('allBookd: ', allBooks);
            case "getBookById":
                const oneBook=await books.getBookById()
                return  console.log('oneBook: ', oneBook);

            case "addBook":
                const newBook=await books.addBook({title,author})
                return  console.log('newBook: ', newBook);
    }
}

invokeActions({action:"read"})
// invokeActions({action:"getBookById",id:"dkJSszfrRVtLVR_MfRqcu"})
// invokeActions({action:"addBook",title:"qqqq",author:"wwww"} )
