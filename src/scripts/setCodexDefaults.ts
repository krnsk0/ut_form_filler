import { makeLogger } from '../common/utils/makeLogger';
import {
  answerQuestion,
  focusQuestionTextArea,
  isQuestionAnswered,
} from './helpers';

const logger = makeLogger('codex-defaults');

export const setCodexDefaults = (winningModel: 'A' | 'B') => {
  logger.log('TRIGGERING CODEX DEFAULTS SCRIPT');

  // Reponse Comparison Questions > A is negligably better or unsure
  if (winningModel === 'A') {
    answerQuestion(3, 1);
  } else {
    answerQuestion(3, 6);
  }

  // Model A/B Overall quality > Okay
  answerQuestion(6, 2);
  answerQuestion(7, 2);

  // Model A/B  well written > No Issues
  answerQuestion(8, 0);
  answerQuestion(9, 0);

  // Model A/B verbosity > Just Right
  answerQuestion(10, 1);
  answerQuestion(11, 1);

  // Model A/B instruction following > No Issues
  answerQuestion(12, 0);
  answerQuestion(13, 0);

  // Model A/B Truthfullness > No Issues
  answerQuestion(14, 0);
  answerQuestion(15, 0);

  // Model A/B Harmlessness > No Issues
  answerQuestion(16, 0);
  answerQuestion(17, 0);

  // coding category of initial prompt
  if (!isQuestionAnswered(21)) {
    answerQuestion(21, 0);
  }

  // put cursor in box
  focusQuestionTextArea(4);
};
