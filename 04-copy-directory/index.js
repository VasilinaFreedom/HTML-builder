const fs = require("fs");
const path = require("path");


function copyDir() {
    fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, (err) => {
        if (err) throw err;
      });

//копируем файлы
    fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true },
        (err, files) => {
          console.log('Список файлов:');
          if (err) console.log(err);
          else {
            files.forEach((file) => {
                const folder = path.join(__dirname, 'files', file.name); //обращаемся к папкам
                const folderCopy = path.join(__dirname, 'files-copy', file.name);
              fs.copyFile(folder, folderCopy, () => {
                console.log(`${file.name} скопирован`);
              });
            });
}})}

copyDir()
