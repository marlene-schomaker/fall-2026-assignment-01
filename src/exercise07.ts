import * as fs from 'fs';
import * as path from 'path';

export type Gradebook = {
  [studentName: string]: {
    [subjectName: string]: number;
  };
};

export function calculateSubjectAverage(subject: string): number {
  const filePath = path.join(process.cwd(), 'data', 'gradebook.json');

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const gradebook: Gradebook = JSON.parse(fileContent);

  let totalScore = 0;
  let enrolledCount = 0;

  for (const studentName in gradebook) {
    if (Object.prototype.hasOwnProperty.call(gradebook, studentName)) {
      const subjects = gradebook[studentName];

      if (typeof subjects[subject] === 'number') {
        totalScore += subjects[subject];
        enrolledCount++;
      }
    }
  }

  if (enrolledCount === 0) {
    return 0;
  }

  return totalScore / enrolledCount;
}
