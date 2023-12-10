import { getAllQuestions, getQuestionInfo } from './queries';

export function hideQuestion(question: HTMLElement) {
  question.style.display = 'none';
}

export function hideMobile() {
  const questions = getAllQuestions();
  questions.forEach((question) => {
    if (getQuestionInfo(question) === 'mobile') {
      hideQuestion(question);
    }
  });
}
