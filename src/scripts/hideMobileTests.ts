import { getAllQuestions, getQuestionInfo } from './queries';

export function hideQuestion(question: HTMLElement) {
  question.style.display = 'none';
}

export function showQuestion(question: HTMLElement) {
  question.style.display = 'inherit';
}

export function hideMobileTests(hide: boolean) {
  const questions = getAllQuestions();
  questions.forEach((question) => {
    if (getQuestionInfo(question).device === 'mobile') {
      if (hide) hideQuestion(question);
      else showQuestion(question);
    }
  });
}
