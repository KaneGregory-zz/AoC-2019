const fs = require('fs');
const https = require('https');
const path = require('path');
const {copySync} = require('fs-extra');

const YEAR = 2019;
const session = `53616c7465645f5f93a5b86b5288fa0e9595028ff28e26980f359b61a88a19ddb9f265de250d0b0c74ff270d89124d14`;
const defaultDay = new Date().getUTCDate();
const day = process.argv[2] || '' + defaultDay;
const dataDir = path.join(__dirname, '..', 'data');

const getFile = () =>
    new Promise((resolve, reject) => {
        console.log(`/${YEAR}/day/${day}/input`);
            return https
                .get(
                    {
                        hostname: 'adventofcode.com',
                        path: `/${YEAR}/day/${day}/input`,
                        method: 'GET',
                        headers: {
                            Cookie: `session=${session}`,
                        },
                    },
                    resolve
                )
                .on('error', reject)
        }
    );

const writeFile = stream =>
    new Promise((resolve, reject) => {
        if (!fs.existsSync(dataDir)) {
            copySync(dataDir);
        }
        const fileStream = fs.createWriteStream(path.join(dataDir, 'input.txt'), {
            flags: 'w',
        });
        stream.pipe(fileStream);
        fileStream.on('finish', fileStream.close.bind(fileStream, resolve));
        fileStream.on('error', reject);
    });

getFile()
    .then(writeFile)
    .catch(e => {
        console.log('Error downloading the file');
        console.log(e);
    });
