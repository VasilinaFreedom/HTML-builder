const fs = require("fs");
const path = require("path");
const { readdir, readFile } = require('fs/promises');

const input = path.join(__dirname, "styles");
const output = fs.createWriteStream(path.join(__dirname, "project-dist", "bundle.css"));

async function mergeStyles(){
    try {
    const files = await readdir(input, {withFileTypes: true});   
    for (const fileCss of files)  {
      if (fileCss.name.endsWith('.css')){//позволяет определить, заканчивается ли строка символов описанием в скобках
        try{
          output.write(await readFile(path.join(input, fileCss.name)));//считываем и записываем информацию
        } catch (err){}        
      }
    }      
  } catch (err) {console.log(err)}
}

mergeStyles();

