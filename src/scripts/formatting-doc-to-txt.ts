import fs from 'fs';

const MAX_ANSWERS = 8;

const inputFilename = 'input.txt';
const outputFilename = 'output.csv';

function writeOutputFile(filename: string, data: any) {
  const header = ['question'];

  for (let fileParserIndex = 0; fileParserIndex < MAX_ANSWERS; fileParserIndex++) {
    header.push('answer');
    header.push('points');
  }

  const csvRows = [header, ...data];
  const csvContent = csvRows.map((row) => row.join(',')).join('\n');

  fs.writeFileSync(filename, csvContent, 'utf8');
}

function readInputFile(file: string) {
  return fs.readFileSync(file, 'utf8').split('\n');
}

function processLines(lines: string[]) {
  const outputData = [];
  let fileParserIndex = 0;

  while (fileParserIndex < lines.length) {
    if (lines[fileParserIndex].includes('.')) {
      const question = lines[fileParserIndex].trim().replace(',', '');
      console.log(`Question detected: ${question}`);

      const answers = [];
      const points = [];

      for (let i = fileParserIndex + 1; i < fileParserIndex + MAX_ANSWERS; i++) {
        try {
          let line = lines[i]
            .trim()
            .replace('—', '')
            .replace('â€”', '')
            .replace('""', '')
            .replace(',', '')
            .replace('   ', '');
          const parts = line.split(' ');

          let answer, point;
          if (parts.length >= 2) {
            answer = parts.slice(0, -1).join(' ');
            point = parts[parts.length - 1];
          } else {
            [answer, point] = line.split(' ');
          }

          console.log(`Answer: ${answer} Point: ${point}`);

          if (answer === '' && point === undefined) {
            break;
          }

          answers.push(answer);
          points.push(parseInt(point));
        } catch (error) {
          console.log(
            'Function processLines() from formatting-doc-to-txt.ts caught an error: ' + error
          );
          break;
        }
      }

      const sortedAnswers = [];

      while (points.length > 0) {
        const maxIndex = points.indexOf(Math.max(...points));
        sortedAnswers.push(answers[maxIndex]);

        if (points[maxIndex] !== undefined) {
          sortedAnswers.push(points[maxIndex].toString());
        }

        answers.splice(maxIndex, 1);
        points.splice(maxIndex, 1);
      }

      let row = [question, ...sortedAnswers];
      row = row.filter((value) => value !== undefined);
      console.log('Inserting row: ', row);
      outputData.push(row);

      fileParserIndex += 2;
    } else {
      fileParserIndex++;
    }
  }

  return outputData;
}

const lines = readInputFile(inputFilename);

const outputData = processLines(lines);

writeOutputFile(outputFilename, outputData);
