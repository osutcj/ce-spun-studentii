const fs = require('fs');

const MAX_ANSWERS = 8;

const inputFilename = 'input.txt';
const outputFilename = 'output.csv';

// Read the input file and split it into lines
const lines = fs.readFileSync(inputFilename, 'utf8').split('\n');

// Create an array to hold the data for the output CSV file
var outputData = [];

// Initialize the line index
var i = 0;

while (i < lines.length) {
    // Check if this is a question line
    if (lines[i].includes('.')) {
       

        var question = lines[i].trim().replace(',', '');

        console.log(`Question detected: ${question}`);

        var answers = [];
        var points = [];;
        // Loop through the next 5 lines to get the answers and points
        for (var j = i + 1; j < i + MAX_ANSWERS; j++) {
            try {
                var line = lines[j].trim().replace('—', '').replace('â€”', '').replace('""', '').replace(',', '').replace("   ", '');
                //var [answer, point] = line.split(' ');
                const parts = line.split(' ');
                if (parts.length >= 2) {
                    var answer = parts.slice(0, -1).join(' '); 
                    var point = parts[parts.length - 1];
                }
                else {
                    var [answer, point] = line.split(' ');
                }
                console.log(`Answer: ${answer} Point: ${point}`);
                if(answer == '' && point == undefined) {
                    break;
                }
                answers.push(answer);
                points.push(parseInt(point)); // Parse the point as a number
            } catch (error) {
                break;
            }
        }

        // Sort answers by points in descending order
        var sortedAnswers = [];

        while (points.length > 0) {
            var maxIndex = points.indexOf(Math.max(...points));
            sortedAnswers.push(answers[maxIndex]);
            
            if (points[maxIndex] !== undefined) {
                sortedAnswers.push(points[maxIndex].toString());
            }
            
            answers.splice(maxIndex, 1);
            points.splice(maxIndex, 1);
        }

        console.log('Answers: ', answers);
        console.log('Sorted Answers: ', sortedAnswers);

        
            var row = [question, ...sortedAnswers];
            // Filter out undefined values from the row
            row = row.filter(value => value !== undefined);
            console.log('Inserting row: ', row);
            outputData.push(row);
        

        // Move to the next question
        i += 2;
    } else {
        // Move to the next line
        i++;
    }
}

// Write the output data to the CSV file
var header = ['question'];

for (var i = 0; i < MAX_ANSWERS; i++) {
    header.push('answer');
    header.push('points');
}

var csvRows = [header, ...outputData];
var csvContent = csvRows.map(row => row.join(',')).join('\n');

fs.writeFileSync(outputFilename, csvContent, 'utf8');
