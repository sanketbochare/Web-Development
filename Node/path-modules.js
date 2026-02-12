const path=require(`path`)

console.log(path.sep)

const filepath=path.join(`NodeCourse`,`node_modules/`,`random-words`,`index.js`)

console.log(filepath)

const absolute=path.resolve(__dirname,'node_modules','random-words','index.js')
console.log(absolute)