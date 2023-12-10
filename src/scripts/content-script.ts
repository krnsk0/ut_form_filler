import { autorun } from 'mobx';

import { createStore } from '../common/store/createRootStore';
import { startStoreSync } from '../common/store/startStoreSync';
import { makeLogger } from '../common/utils/makeLogger';
import { hideMobileTests } from './hideMobileTests';
import { hideShortTests } from './hideShortTests';
import { sortQuestions } from './sortQuestions';
import { waitForQuestionParent } from './waitForQuestionParent';

const logger = makeLogger('content-script');
logger.log('starting content script');

(async () => {
  const store = createStore();
  await startStoreSync(store);
  store.markLoadComplete();
  await waitForQuestionParent();

  const onChanges = () => {
    if (store.sortQuestions) {
      sortQuestions();
    }
    if (store.declineShortTests) {
      hideShortTests();
    }
    hideMobileTests(store.hideMobileTests);
  };

  autorun(onChanges);
  setInterval(onChanges, 200);
})();

/**
 * TODO:
 * - get X button
 * - remembering screener answers and automating them
 * - auto-reject $4 tests
 * - reversible sort
 * - run code on mutation of the parent
 * - pull out scenario for live
 * - restore scroll position after sort
 * -
 *
 */
