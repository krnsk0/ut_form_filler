import { getAllQuestions, getQuestionType } from './queries';

export function hideQuestion(question: HTMLElement) {
  question.style.display = 'none';
}

export function hideMobile() {
  const questions = getAllQuestions();
  questions.forEach((question) => {
    if (getQuestionType(question) === 'mobile') {
      hideQuestion(question);
    }
  });
}
