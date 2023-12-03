import { createStore } from '../common/store/createRootStore';
import { startStoreSync } from '../common/store/startStoreSync';
import { makeLogger } from '../common/utils/makeLogger';

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
  const questionDiv: HTMLDivElement =
    questionNode?.querySelector<HTMLDivElement>('.available-tests__tile')
      ?.shadowRoot?.childNodes[0] as HTMLDivElement;
  const slotDiv = questionDiv
    ?.querySelector('slot')
    ?.assignedNodes()[1] as HTMLDivElement;
  const questionText = slotDiv
    .querySelector<HTMLLegendElement>(
      'screener-question .screener-question__title'
    )
    ?.innerText.trim();
  const answers = (
    slotDiv.querySelector('tk-single-select-list')?.shadowRoot
      ?.childNodes[0] as HTMLDivElement
  )?.querySelectorAll('.label-wrapper') as NodeListOf<HTMLDivElement>;

  const parsedAnswers = Array.from(answers).map((answer: HTMLDivElement) => {
    return {
      select: () => answer.querySelector('input')?.click(),
      answerText: answer.querySelector('label')?.innerText.trim(),
    };
  });

  return {
    surveyAmount,
    questionText,
    answers: parsedAnswers,
  };
};

(async () => {
  const store = createStore();
  await startStoreSync(store);
  store.markLoadComplete();

  console.log('question', findQuestion(1));
})();
