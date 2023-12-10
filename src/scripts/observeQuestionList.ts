import { getQuestionParent } from './queries';

export function observeQuestionList(callback: () => void) {
  const parent = getQuestionParent();
  const observer = new MutationObserver(callback);
  observer.observe(parent, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
  });
  return () => observer.disconnect();
}
