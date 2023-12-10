import { createStore } from '../common/store/createRootStore';
import { startStoreSync } from '../common/store/startStoreSync';
import { makeLogger } from '../common/utils/makeLogger';
import { appendMenu } from './appendMenu';
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
  ]);
})();
