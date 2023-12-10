import { clickScreenerButton, getAllQuestions } from './queries';

export function debug() {
  clickScreenerButton(getAllQuestions()[0]);
}
