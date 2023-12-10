import { querySelectorDeep } from 'query-selector-shadow-dom';

import { getAllQuestions, getQuestionReward } from './queries';

function declineTest(question: HTMLElement) {
  const closeButton = querySelectorDeep(
    'button[aria-label="Decline test"]',
    question
  );
  if (!closeButton) throw new Error('could not find close button');
  closeButton.click();
}

export function hideShortTests() {
  const questions = getAllQuestions();
  questions.forEach((question) => {
    if (getQuestionReward(question) === 4) {
      declineTest(question);
    }
  });
}
