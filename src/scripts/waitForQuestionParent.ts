import { makeLogger } from '../common/utils/makeLogger';
import { getQuestionParent } from './queries';

const logger = makeLogger('waitForQuestionParent');

export async function waitForQuestionParent(): Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      logger.log('polling...');
      const questionParent = getQuestionParent();
      if (questionParent) {
        clearInterval(interval);
        logger.log('found');
        resolve();
      }
    }, 100);
  });
}
