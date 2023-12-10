import {
  querySelectorAllDeep,
  querySelectorDeep,
} from 'query-selector-shadow-dom';

import { createStore } from '../common/store/createRootStore';
import { startStoreSync } from '../common/store/startStoreSync';
import { makeLogger } from '../common/utils/makeLogger';
import { appendMenu } from './appendMenu';

const logger = makeLogger('content-script');
logger.log('starting content script');

const findQuestion = (questionNumber: number) => {
  const questionNode = document.querySelectorAll('available-tests-list-item')[
    questionNumber
  ];
  const surveyAmount = parseInt(
    questionNode
      ?.querySelector('.compensation-amount__text')
      ?.textContent?.trim()
      .replace('$', '') ?? '0',
    10
  );
};

(async () => {
  const store = createStore();
  await startStoreSync(store);
  store.markLoadComplete();

  appendMenu([
    {
      buttonText: 'test',
      callback: () => {
        console.log('test');
      },
    },
  ]);
})();
