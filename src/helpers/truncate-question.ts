export const truncateQuestion = (question: string): string => {
    const regex = /^\d+\.\s*/;
    return question.replace(regex, '');
  }