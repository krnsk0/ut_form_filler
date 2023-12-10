import { querySelectorAllDeep } from 'query-selector-shadow-dom';

export function getAllQuestions() {
  const questions = document.querySelectorAll<HTMLElement>(
    'available-tests-list-item'
  );
  if (!questions) throw new Error('No questions found');
  return questions;
}

export function getQuestionParent() {
  const parent = document.querySelector<HTMLElement>('available-tests-list');
  if (!parent) throw new Error('No question parent found');
  return parent;
}

export function getQuestionReward(question: HTMLElement) {
  // querySelectorAllDeep fails with the classname
  // so we search in JS
  const spans = querySelectorAllDeep('span', question);
  if (!spans) throw new Error('No spans found');
  const reward = spans.find((node) => {
    return node.classList.contains('compensation-amount__text');
  });
  if (!reward) return 0;
  return parseInt(reward.innerText.replace('$', ''), 10);
}
