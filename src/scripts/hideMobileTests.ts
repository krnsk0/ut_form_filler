import { getAllQuestions, getQuestionInfo } from './queries';

export function hideQuestion(question: HTMLElement) {
  question.style.display = 'none';
}

export function hideMobileTests() {
  const questions = getAllQuestions();
  questions.forEach((question) => {
    if (getQuestionInfo(question).device === 'mobile') {
      hideQuestion(question);
    }
  });
}
