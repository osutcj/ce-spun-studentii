const fs = require('fs');

const MAX_ANSWERS = 8;

const inputFilename = 'input.txt';
const outputFilename = 'output.csv';

function writeOutputFile(filename, data) {
    const header = ['question'];

    for (let i = 0; i < MAX_ANSWERS; i++) {
        header.push('answer');
        header.push('points');
    }

    const csvRows = [header, ...data];
    const csvContent = csvRows.map(row => row.join(',')).join('\n');

    fs.writeFileSync(filename, csvContent, 'utf8');
}

function readInputFile(file) {
    return fs.readFileSync(file, 'utf8').split('\n');
}

function processLines(lines) {
    const outputData = [];
    let i = 0;

    while (i < lines.length) {
        if (lines[i].includes('.')) {
            const question = lines[i].trim().replace(',', '');
            console.log(`Question detected: ${question}`);

            const answers = [];
            const points = [];

            for (let j = i + 1; j < i + MAX_ANSWERS; j++) {
                try {
                    let line = lines[j].trim().replace('—', '').replace('â€”', '').replace('""', '').replace(',', '').replace("   ", '');
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
                    console.log("Function processLines caught an error: "+ error);
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
            row = row.filter(value => value !== undefined);
            console.log('Inserting row: ', row);
            outputData.push(row);

            i += 2;
        } else {
            i++;
        }
    }

    return outputData;
}

// Read the input file and split it into lines
const lines = readInputFile(inputFilename);

// Process the lines to get the output data
const outputData = processLines(lines);

// Write the output data to the CSV file
writeOutputFile(outputFilename, outputData);
