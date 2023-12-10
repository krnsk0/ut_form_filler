import { makeLogger } from '../common/utils/makeLogger';
import {
  getAllQuestions,
  getQuestionParent,
  getQuestionReward,
} from './queries';

const logger = makeLogger('sortQuestions');

function sortChildrenInPlace(
  parentElement: HTMLElement,
  childrenToSort: NodeListOf<HTMLElement>,
  comparator: (a: HTMLElement, b: HTMLElement) => number
): boolean {
  let changed = false;
  for (let i = 0; i < childrenToSort.length - 1; i++) {
    for (let j = i + 1; j < childrenToSort.length; j++) {
      const a = childrenToSort[i];
      const b = childrenToSort[j];
      if (comparator(a, b) > 0) {
        parentElement.insertBefore(a, b); // Move a before b
        changed = true;
      }
    }
  }
  return changed;
}

export function sortQuestions() {
  const parent = getQuestionParent();
  const questions = getAllQuestions();

  const changed = sortChildrenInPlace(parent, questions, (a, b) => {
    const aReward = getQuestionReward(a);
    const bReward = getQuestionReward(b);
    return bReward - aReward;
  });

  if (changed) logger.log('sorted questions in place');
}
