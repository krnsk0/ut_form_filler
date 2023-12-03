import { setCodexDefaults } from './setCodexDefaults';

function createButton(text: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.innerText = text;
  button.addEventListener('click', onClick);
  button.style.margin = '0em';
  button.style.padding = '0.3em';
  button.style.border = '1px solid black';
  button.style.backgroundImage = 'grey';
  return button;
}

export const injectMenu = () => {
  const menuDiv = document.createElement('div');
  menuDiv.style.backgroundColor = 'white';
  menuDiv.style.padding = '5px';
  menuDiv.style.position = 'fixed';
  menuDiv.style.top = '6px';
  menuDiv.style.right = '140px';
  menuDiv.style.display = 'flex';
  menuDiv.style.flexDirection = 'column';
  menuDiv.style.gap = '5px';

  const buttons = [
    createButton('Codex A', () => setCodexDefaults('A')),
    createButton('Codex B', () => setCodexDefaults('B')),
  ];

  buttons.forEach((button) => menuDiv.appendChild(button));

  document.body.appendChild(menuDiv);
};
