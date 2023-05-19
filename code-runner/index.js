const express = require('express');
require('dotenv').config();
const fs = require('fs');
const { returnScript, returnFileName } = require('./utils/constant');
const { Buffer } = require('node:buffer');
const { spawn } = require('node:child_process');

const app = express();
app.use(express.json());

(() =>{
    if (!fs.existsSync('uploads')){
        fs.mkdirSync('uploads');
    }
})();

app.post('/', async (req, res, next) => {
    
    try {
        const buffer = new Uint8Array(Buffer.from(req.body.code))
        const filePath = returnFileName(req.body.language);
        
        await fs.promises.writeFile(filePath, buffer, (err) => {
            if (err) {
                throw err;
            };
        });

        const script = returnScript(req.body.language, filePath);

        const processScript = `${script[0]} ${script[1]} >> ${filePath}.txt`;
        const process = spawn(processScript, { shell: '/bin/bash' });

        process.on('error', (data) => {
            res.send(data)
        });

        process.stdout.on('close', async() => {
            
            const data = await fs.promises.readFile(`${filePath}.txt`);
            
            [`${filePath}.txt`, filePath].forEach(path => {
                fs.unlink(path, (err) => {
                    if(err){
                        console.log(path, ": ", err.message);
                    } else {
                        console.log(path, 'deleted successfully');
                    }
                })
            })

            res.send(data);
        });


    } catch (err) {
        res.status(500).send(err)
    }
})


app.get('/', async (req, res) => {
    const process = spawn('node', ['uploads/file.js']);

    process.stdout.on('data', (data) => {
        res.send(data)
    });
})


const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log('listening on port ', port)
});