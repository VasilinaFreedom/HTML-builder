const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;


const yourText = fs.WriteStream(path.join(__dirname, 'yourText.txt'));
stdout.write('Привет! Напиши что-нибудь хорошее:)\n');


stdin.on('data', data => {
    stdout.write(data)
    const dataString = data.toString()

    if(dataString.includes('exit')){
        process.exit()
    }else yourText.write(dataString); 
})
process.on('SIGINT', () => { process.exit()}) //Прекращение из-за внешнего сигнала
process.on('exit', () => stdout.write('Успехов!'));//exit