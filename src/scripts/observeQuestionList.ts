import { makeLogger } from '../common/utils/makeLogger';
import { getQuestionParent } from './queries';
const logger = makeLogger('observeQuestionList');

/**
 * TODO add rate limiting/batching via callback batcher
 */
export function observeQuestionList(callback: () => void) {
  const parent = getQuestionParent();

  const observationFn = () => {
    logger.log('mutation detected');
    teardownObserver();
    callback();
    setTimeout(() => {
      logger.log('restarting observer');
      setupObserver();
    }, 1000);
  };

  const observer = new MutationObserver(observationFn);
  const setupObserver = () => {
    observer.observe(parent, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });
  };
  const teardownObserver = () => observer.disconnect();
  logger.log('running initial observation function');
  observationFn();
}
