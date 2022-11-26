import { writeFileSync, readFileSync } from 'fs';
import path from 'path';

const dataName = 'Data';
const csvFilePath = './data.csv';

let data = readFileSync(path.resolve(__dirname, csvFilePath)).toString();
let json = [];

data = data.split('\r\n');
const head = data[0].split(',');
data.splice(0, 1);
data.forEach((row) => {
  let obj = {};
  const elements = row.split(',');
  obj['text'] = elements[0];
  obj['answers'] = [];
  elements.forEach((entry, index) => {
    if (!index) return null;
    if (index % 2 == 1) {
      return null;
    } else {
      obj['answers'].push({
        answer: elements[index - 1],
        points: parseInt(elements[index]),
      });
    }
  });
  json.push(obj);
});

json = JSON.stringify(json);
writeFileSync('output.json', json);
