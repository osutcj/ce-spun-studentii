import { writeFileSync } from "fs";
import csv from 'csvtojson';

const dataName = "Data"
const csvFilePath='data.csv';

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    let json = JSON.stringify(jsonObj);
    writeFileSync('output.json', `{"${dataName}":${json}}`);

})

