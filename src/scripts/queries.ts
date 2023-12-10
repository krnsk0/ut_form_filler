import {
  querySelectorAllDeep,
  querySelectorDeep,
} from 'query-selector-shadow-dom';

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

interface QuestionContent {
  questionText: string;
  choices: {
    text: string;
    selectChoice: () => void;
  }[];
}

export function getQuestionContent(question: HTMLElement): QuestionContent {
  const legend = querySelectorDeep('legend', question);
  if (!legend) throw new Error('No legend found');
  const labelWrappers = querySelectorAllDeep('.label-wrapper', question);
  const nextButton = question.querySelector<HTMLElement>(
    'button[aria-label="Next"]'
  );
  if (!nextButton) throw new Error('No next button found');
  const choices = labelWrappers.map((labelWrapper) => {
    const input = labelWrapper.querySelector<HTMLInputElement>(
      'input[type="radio"]'
    );
    const label = labelWrapper.querySelector('label');
    if (!input || !label) throw new Error('No input or label found');
    return {
      text: label.innerText,
      selectChoice: () => {
        input.click();
        nextButton.click();
      },
    };
  });

  return {
    questionText: legend.innerText,
    choices,
  };
}
