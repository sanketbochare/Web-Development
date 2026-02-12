
//GLOBALS-NO WINDOW !!!

 // __dirname  - path to current directory
 // __filename - file name
 // require    - function to use modules
 // module     - info about current module
 // process    - info about env where the program is being executed

 console.log(__dirname)
 setInterval(() => {
    console.log(`hello world`)
 }, 1000);


 //Modules
// CommonJS, every file is module (by default)
// Modules - Encapsulated code (only share minimum)
const names=require(`./firstmodules`)
console.log(names)
const name1=names.name2
const name2=names.name3
sayHi=require(`./secondmodules`)

sayHi('Sangharsh')
sayHi(name1)
sayHi(name2) 
