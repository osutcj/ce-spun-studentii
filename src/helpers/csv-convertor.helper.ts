import { DBQuestion } from '../shared/types/questions';

export default function convert(csv: string) {
  let data = csv.split('\n');
  data.splice(0, 1);

  let json: DBQuestion[] = [];

  data.forEach((row) => {
    let obj: DBQuestion = {
      id: '',
      text: '',
      answers: [],
    };
    if (row.trim().length === 0) {
      return;
    }
    const elements = row.split(',');
    obj['text'] = elements[0];
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

  return json;
}
