import { createStore } from '../common/store/createRootStore';
import { startStoreSync } from '../common/store/startStoreSync';
import { makeLogger } from '../common/utils/makeLogger';
import { appendMenu } from './appendMenu';
import { getAllQuestions, getQuestionContent } from './queries';
import { sortQuestions } from './sortQuestions';

const logger = makeLogger('content-script');
logger.log('starting content script');

(async () => {
  const store = createStore();
  await startStoreSync(store);
  store.markLoadComplete();

  appendMenu([
    {
      buttonText: 'sort',
      callback: sortQuestions,
    },
    {
      buttonText: 'test',
      callback: () => {
        const questions = getAllQuestions();
        const content = getQuestionContent(questions[0]);
        console.log('CONTENT: ', content);
      },
    },
  ]);
})();

/**
 * TODO:
 * - function to wait until questions appear
 */
