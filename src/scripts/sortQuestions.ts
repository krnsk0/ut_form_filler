import { makeLogger } from '../common/utils/makeLogger';
import {
  getAllQuestions,
  getQuestionParent,
  getQuestionReward,
} from './queries';

const logger = makeLogger('sortQuestions');

function sortSpecificChildrenByComparator(
  parentElement: HTMLElement,
  childrenToSort: NodeListOf<HTMLElement>,
  comparator: (a: HTMLElement, b: HTMLElement) => number
): void {
  const childrenArray = Array.from(childrenToSort);
  childrenArray.sort(comparator);

  // Remove only the specified children to preserve others
  childrenToSort.forEach((child) => parentElement.removeChild(child));
  childrenArray.forEach((child) => parentElement.appendChild(child));
}

export function sortQuestions() {
  const scrollPosition = window.scrollY;
  sortSpecificChildrenByComparator(
    getQuestionParent(),
    getAllQuestions(),
    (a, b) => {
      const aReward = getQuestionReward(a);
      const bReward = getQuestionReward(b);
      return bReward - aReward;
    }
  );
  window.scrollTo(0, scrollPosition);
  logger.log('sorted questions');
}
