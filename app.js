const books= require("./books")
// експортує по дефолту з файлу шndex в папці books
// тут буде обєкт 
// console.log(' books: ',  books);
// console.log(__dirname)
const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

//  
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
            case "deleteBook":
                const deleteBook=await books.deleteById(id)
               
                return  console.log('deleteBook: ', deleteBook);
                default: console.log("unknown action");
    }
}

// invokeActions({action:"read"})
// invokeActions({action:"getBookById",id:"dkJSszfrRVtLVR_MfRqcu"}) 
// invokeActions({action:"addBook",title:"qqqq",author:"wwww"} )
// invokeActions({action:"deleteBook",id:"smpQSUoQE23UoqJyi9S9J"} )

// ----------------process.argv---------------

// console.log("process.argv)",process.argv);
// const index= process.argv.indexOf("--action")
// console.log('index: ', index);
// if(index!== -1){
//     const action =process.argv[index+1]
//     console.log('action : ', action );
//     invokeActions({action})

// }


// ----------yargs-----------
// const arr = hideBin(process.argv);
// console.log('process.argv: ', process.argv);

// console.log('arr : ', arr );

// const yargsObj=yargs(arr)
// console.log('yargsObj: ', yargsObj.argv);
// const{argv}=yargs(arr)
// console.log('argv: ', argv);


// yargs перетворює цифри в рядках на числа якщо це  Id то перед тим як його пердати в функцію треба привести до рядка

// invokeActions(argv)
// const path = require("path");
// const booksPath = path.join(__dirname,"books", "books.json");
// console.log(' booksPath: ',  booksPath);


// ---comander---
const program = require("commander");


// -a скорочена версія команди --action 
program 
.option(
    "-a, --action <type>" 
)
.option(
    "--id <type>" 
)
.option(
    " -t, --title <type>" 
)
.option(
    "-au, --author  <type>" 
)

// за замовчуванням бере глобальну змінну process.argv яка є масивом елементами якого є те що ми ввкли в командному рядку 
program.parse()

const userAction = program.opts()
console.log(' userAction: ',  userAction);


invokeActions(userAction)