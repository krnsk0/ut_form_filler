import { getAllQuestions } from './queries';

export async function waitForQuestions(): Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (getAllQuestions().length > 0) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}
