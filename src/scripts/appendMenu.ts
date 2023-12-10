interface MenuItem {
  buttonText: string;
  callback: () => void;
}

export function appendMenu(menuItems: MenuItem[]) {
  const menuDiv = document.createElement('div');
  menuDiv.style.cssText = `
    position: fixed;
    top: 200px;
    right: 10px;
    width: 150px;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  `;

  for (const item of menuItems) {
    const button = document.createElement('button');
    button.textContent = item.buttonText;
    button.style.cssText = `
    width: 100%;
    margin-bottom: 5px;
    /* Style for browser-like buttons in Chrome */
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: sans-serif;
    font-size: 14px;
    padding: 8px 12px;
    cursor: pointer;
    -webkit-appearance: none; /* Remove default button styles for consistency */

    /* Hover and active states */
    &:hover {
      background-color: #e0e0e0;
    }

    &:active {
      background-color: #d0d0d0;
      border-color: #999;
    }
  `;
    button.addEventListener('click', item.callback);
    menuDiv.appendChild(button);
  }

  document.body.appendChild(menuDiv);
}
