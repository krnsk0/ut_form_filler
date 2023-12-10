import { createStore } from '../common/store/createRootStore';
import { startStoreSync } from '../common/store/startStoreSync';
import { makeLogger } from '../common/utils/makeLogger';
import { appendMenu } from './appendMenu';
import { debug } from './debug';
import { enhance } from './enhance';
import { hideMobile } from './hideMobile';
import { observeQuestionList } from './observeQuestionList';
import { sortQuestions } from './sortQuestions';

const logger = makeLogger('content-script');
logger.log('starting content script');

(async () => {
  const store = createStore();
  await startStoreSync(store);
  store.markLoadComplete();

  observeQuestionList(() => {
    console.log('CHANGE DETECTED');
    appendMenu([
      {
        buttonText: 'sort',
        callback: sortQuestions,
      },
      {
        buttonText: 'hide mobile',
        callback: hideMobile,
      },
      {
        buttonText: 'enhance',
        callback: enhance,
      },
      {
        buttonText: 'debug',
        callback: debug,
      },
    ]);
  });
})();

/**
 * TODO:
 * - get X button
 * - remembering screener answers and automating them
 * - auto-reject $4 tests
 * - reversible sort
 * - run code on mutation of the parent
 * - pull out scenario for live
 *
 */
