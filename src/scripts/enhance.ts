import { querySelectorAllDeep } from 'query-selector-shadow-dom';

import { getAllQuestions, getQuestionInfo } from './queries';

/**
 * The scenario text is found on *some* live conversation tests
 * and keeping it on screen can sometimes help with the screener
 */
export function getScenarioText(question: HTMLElement): string | undefined {
  const pTags = querySelectorAllDeep('p', question);
  if (!pTags.length) return;
  const scenario = pTags.find((node) => {
    return node.innerText.includes('Scenario:');
  });
  if (!scenario) return;
  return scenario.innerText;
}

/**
 * The "take screener" button is found on live conversation tests
 */
export function clickScreenerButton(question: HTMLElement) {
  const buttons = querySelectorAllDeep('button', question);
  if (!buttons.length) throw new Error('No buttons found');
  const button = buttons.find(
    (button) => button.textContent?.includes('Take screener')
  );
  if (!button) throw new Error('No screener button found');
  button.click();
}

/**
 * Enhance a question with its scenario text
 */
export function enhance() {
  const questions = getAllQuestions();
  questions.forEach((question) => {
    const questionInfo = getQuestionInfo(question);
    if (!questionInfo.live) return;
    const scenario = getScenarioText(question);
    console.log('scenario: ', scenario);
    clickScreenerButton(question);
    // if (scenario) {
    //   setTimeout(() => {
    //     const scenarioEl = document.createElement('div');
    //     scenarioEl.innerText = scenario;
    //     question.appendChild(scenarioEl);
    //     console.log('scenarioEl: ', scenarioEl);
    //   }, 1000);
    // }
  });
}
