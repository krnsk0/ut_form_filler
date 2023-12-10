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
  const childrenCopy = [...childrenArray]; // Create a copy for comparison
  childrenArray.sort(comparator);

  // Check if any changes occurred during sorting
  const itemsChanged = childrenArray.some(
    (item, index) => item !== childrenCopy[index]
  );

  if (itemsChanged) {
    // Remove only the specified children to preserve others
    childrenToSort.forEach((child) => parentElement.removeChild(child));
    childrenArray.forEach((child) => parentElement.appendChild(child));
    logger.log('sorted questions'); // Log only if changes made
  }
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
}
