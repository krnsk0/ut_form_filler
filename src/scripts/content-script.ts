import { createStore } from '../common/store/createRootStore';
import { startStoreSync } from '../common/store/startStoreSync';
import { makeLogger } from '../common/utils/makeLogger';
import { observeQuestionList } from './observeQuestionList';
import { waitForQuestionParent } from './waitForQuestionParent';

const logger = makeLogger('content-script');
logger.log('starting content script');

(async () => {
  const store = createStore();
  await startStoreSync(store);
  store.markLoadComplete();
  await waitForQuestionParent();

  observeQuestionList((questions) => {});
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
