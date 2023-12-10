import { makeLogger } from '../common/utils/makeLogger';
import { getQuestionParent } from './queries';
const logger = makeLogger('observeQuestionList');

export function observeQuestionList(callback: () => void) {
  const parent = getQuestionParent();
  const observer = new MutationObserver(() => {
    logger.log('mutation detected');
    callback();
  });
  observer.observe(parent, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
  });
  return () => observer.disconnect();
}
