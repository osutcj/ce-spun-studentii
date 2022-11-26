import { DBQuestion } from '../shared/types/questions';

export default function convertFirebaseToCsv(questions: DBQuestion[]) {
  let csvContent =
    'Question,Answer,Points,Answer,Points,Answer,Points,Answer,Points,Answer,Points,Answer,Points,Answer,Points,Answer,Points\n';

  questions.forEach((question) => {
    let row = `${question.text.replace(',', '')},`;
    question.answers.forEach((answer, index) => {
      if (index === question.answers.length - 1) {
        row += `${answer.answer.replace(',', '')},${answer.points}`;
      } else {
        row += `${answer.answer.replace(',', '')},${answer.points},`;
      }
    });

    row += '\n';
    csvContent += row;
  });

  return csvContent;
}
