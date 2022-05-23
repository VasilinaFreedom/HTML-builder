const fs = require("fs");
const path = require("path");
const { mkdir, readFile, rm, readdir, copyFile } = require("fs/promises")

const folder = path.join(__dirname, "project-dist");

async function addFolder(dir) {
  try {
    mkdir(dir, { recursive: true });
  } catch (err) {}
}

addFolder(folder);

const inputCss = path.join(__dirname, "styles");
const outputCss = fs.createWriteStream(path.join(folder, 'style.css'))

async function mergeStyles(){
    try {
    const files = await readdir(inputCss, {withFileTypes: true});   
    for (const fileCss of files)  {
      if (fileCss.name.endsWith('.css')){//позволяет определить, заканчивается ли строка символов описанием в скобках
        try{
          outputCss.write(await readFile(path.join(inputCss, fileCss.name)));//считываем и записываем информацию
        } catch (err){}        
      }
    }      
  } catch (err) {console.log(err)}
}

mergeStyles();


let htmlFile = "";
const outputHTML = fs.createWriteStream(path.join(__dirname, "project-dist", "index.html"));

async function mergeHTML() {
  try {
    htmlFile = await readFile(path.join(__dirname, "template.html"), {
      encoding: "utf-8",
    });
    try {
      const files = await readdir(path.join(__dirname, "components"), {withFileTypes: true});
      let i = 0;      
      for (const file of files) {
        const nameHTML = file.name.split('.html').join('');
        htmlFile = htmlFile.split(`{{${nameHTML}}}`);        
        try {
          const newFile = await readFile(path.join(__dirname, 'components', file.name), {encoding: "utf-8"});  
          htmlFile.splice(1, 0, newFile);
          htmlFile = htmlFile.join('');
          i++;
          if(i === files.length){outputHTML.write(htmlFile);
          }         
        } catch (err) {}        
      }      
    } catch (err) {}
  } catch (err) {}
}

mergeHTML();


const inputAss = path.join(__dirname, "assets");
const outputAss = path.join(folder, "assets");

async function copyAssets(a, b) {
  try {
    await rm(b, { recursive: true });
  } catch (err) {}

  try {
    await mkdir(b, { recursive: true });
  } catch (err) {
    console.log(err);
  }

  try {
    const items = await readdir(a, { withFileTypes: true });
    items.forEach((it) => {
      if (it.isFile()) {
        copyFile(path.join(a, it.name), path.join(b, it.name));
      } else {
        const inputAssNew = path.join(inputAss, it.name);
        const outputAssNew = path.join(outputAss, it.name);
        copyAssets(inputAssNew, outputAssNew);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
copyAssets(inputAss, outputAss);


