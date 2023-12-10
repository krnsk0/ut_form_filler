import {
  querySelectorAllDeep,
  querySelectorDeep,
} from 'query-selector-shadow-dom';

/**
 * Retrieve DOM elements for all questions
 */
export function getAllQuestions() {
  const questions = document.querySelectorAll<HTMLElement>(
    'available-tests-list-item'
  );
  if (!questions) throw new Error('No questions found');
  return questions;
}

/**
 * Get the parent element of all questions
 */
export function getQuestionParent() {
  const parent = document.querySelector<HTMLElement>('available-tests-list');
  if (!parent) throw new Error('No question parent found');
  return parent;
}

/**
 * Get the reward for a question if there is one; otherwise 0
 */
export function getQuestionReward(question: HTMLElement): number {
  // querySelectorAllDeep fails with the classname
  // so we search in JS
  const spans = querySelectorAllDeep('span', question);
  if (!spans.length) return 0;
  const reward = spans.find((node) => {
    return node.classList.contains('compensation-amount__text');
  });
  if (!reward) return 0;
  return parseInt(reward.innerText.replace('$', ''), 10);
}

interface SurveyQuestionContent {
  questionText: string;
  choices: {
    text: string;
    selectChoice: () => void;
  }[];
}

/**
 * Scrape the question content and return in a data structure
 */
export function getSurveyQuestionContent(
  question: HTMLElement
): SurveyQuestionContent {
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

interface QuestionInfo {
  device: 'desktop' | 'mobile';
  live: boolean;
}

/**
 * Is this a desktop or mobile test?
 */
export function getQuestionInfo(question: HTMLElement): QuestionInfo {
  const badges = querySelectorAllDeep('tk-badge', question);
  const deviceBadge = badges[0];
  if (!deviceBadge) throw new Error('No device badge found');
  const badgeText = deviceBadge.innerText;
  const maybeLiveConvoBadge = badges.find((badge) => {
    return badge.innerText.includes('Live Conversation');
  });
  return {
    device: badgeText.includes('Mac or Windows computer')
      ? 'desktop'
      : 'mobile',
    live: !!maybeLiveConvoBadge,
  };
}
