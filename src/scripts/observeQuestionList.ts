import { makeLogger } from '../common/utils/makeLogger';
import { getAllQuestions, getQuestionParent } from './queries';
const logger = makeLogger('observeQuestionList');

/**
 * TODO add rate limiting/batching via callback batcher
 */
export function observeQuestionList(
  callback: (questions: NodeListOf<HTMLElement>) => void
) {
  const parent = getQuestionParent();
  const observer = new MutationObserver(() => {
    logger.log('mutation detected');
    const questions = getAllQuestions();
    if (questions.length === 0) {
      logger.log('no questions found');
      return;
    }
    logger.log(`${questions.length} quesitons found`);
    callback(questions);
  });
  observer.observe(parent, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
  });
  return () => observer.disconnect();
}
