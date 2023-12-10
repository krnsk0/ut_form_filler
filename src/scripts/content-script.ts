import { createStore } from '../common/store/createRootStore';
import { startStoreSync } from '../common/store/startStoreSync';
import { makeLogger } from '../common/utils/makeLogger';
import { appendMenu } from './appendMenu';
import { debug } from './debug';
import { hideMobile } from './hideMobile';
import { sortQuestions } from './sortQuestions';
import { waitForQuestions } from './waitForQuestions';

const logger = makeLogger('content-script');
logger.log('starting content script');

(async () => {
  const store = createStore();
  await startStoreSync(store);
  store.markLoadComplete();

  await waitForQuestions();

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
      buttonText: 'debug',
      callback: debug,
    },
  ]);
})();
