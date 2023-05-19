const express = require('express');
require('dotenv').config();
const fs = require('fs');
const { returnScript, returnFileName } = require('./utils/constant');
const { Buffer } = require('node:buffer');
const { exec, spawn } = require('node:child_process');

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

        console.log(script);

        // saving output to file
        let  processScript;

        if(['c', 'c++'].includes(req.body.language)){
            processScript = `${script[0]} ${script[1]} -o ${filePath}.output`;
        } else {
            processScript = `${script[0]} ${script[1]} >> ${filePath}.output`;
        }

        const process = spawn(processScript, { shell: '/bin/bash' });

        process.on('error', (err) => {
            res.send(err)
        });

        process.stdout.on('close', async() => {
            if(!['c', 'c++'].includes(req.body.language)){
                const data = await fs.promises.readFile(`${filePath}.output`);
                res.send(data);

                 // deleting auto generated files
                [`${filePath}.output`, filePath].forEach(path => {
                    fs.unlink(path, (err) => {
                        if(err){
                            console.log(path, ": ", err.message);
                        } else {
                            console.log(path, 'deleted successfully');
                        }
                    })
                })
                
            } else {
                const readOutput = exec(`${filePath}.output`);

                readOutput.stdout.on('data', (data) => {
                    res.send(data);
                    
                    // deleting auto generated files
                    [`${filePath}.output`, filePath].forEach(path => {
                        fs.unlink(path, (err) => {
                            if(err){
                                console.log(path, ": ", err.message);
                            } else {
                                console.log(path, 'deleted successfully');
                            }
                        })
                    })
                })
            }    
        });
    } catch (err) {
        res.status(500).send(err)
    }
})


const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log('listening on port ', port)
});