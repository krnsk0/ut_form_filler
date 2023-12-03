/**
 * Get a question number and see if it is answered already
 */
export const isQuestionAnswered = (questionNumber: number): boolean => {
  const inputList = document.querySelectorAll<HTMLInputElement>(
    `#question-${questionNumber} input[type="radio"]`
  );
  const isAnswered = Array.from(inputList).some((input) => input.checked);
  return isAnswered;
};

/**
 * In Data Annotation projects, get the choices for a question
 */
export const getRadioChoiceElement = (
  questionNumber: number
): NodeListOf<HTMLInputElement> => {
  const inputList = document.querySelectorAll<HTMLInputElement>(
    `#question-${questionNumber} input[type="radio"]`
  );

  return inputList;
};

/**
 * Make choice for question
 */
export const answerQuestion = (
  questionNumber: number,
  choiceNumber: number
): void => {
  const inputList = getRadioChoiceElement(questionNumber);
  inputList[choiceNumber].click();
};

/**
 * Focus a question's input box child
 */
export const focusQuestionTextArea = (questionNumber: number): void => {
  const textArea = document.querySelector<HTMLTextAreaElement>(
    `#question-${questionNumber} textarea`
  );
  if (textArea) {
    textArea.focus();
  }
};
