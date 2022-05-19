const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), //читает сод. папки
{withFileTypes: true}, //
    (err, files) => {
    console.log('Список файлов:');
    if (err){
        console.log(err)}
    else{
        files.forEach(file => { //выводим результат в нужном виде по тз
            if(file.isFile()){  
                const arr = file.name.split('.')
                // console.log(arr)
                // console.log(`${arr[0]} - ${arr[1]}` )
  
              const sizeFile = path.join(__dirname, 'secret-folder', file.name);
              fs.stat(sizeFile, (err, stats) => {
                    console.log(`${arr[0]} - ${arr[1]} -  ${stats.size} bites`)
              })
}})}})
