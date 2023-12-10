import './App.css';

import { observer } from 'mobx-react-lite';

import { useStore } from '../common/store/useStore';

const App = observer(() => {
  const store = useStore();

  if (store.isLoading) {
    return <div data-testid="loading">loading...</div>;
  }

  return (
    <div data-testid="app-wrapper">
      <div className={'checkboxes'}>
        <label>
          <input
            type="checkbox"
            id="sortQuestions"
            checked={store.sortQuestions}
            onChange={() => store.setSortQuestions(!store.sortQuestions)}
          />
          Sort Questions
        </label>
        <label>
          <input
            type="checkbox"
            id="hideMobileTests"
            checked={store.hideMobileTests}
            onChange={() => store.setHideMobileTests(!store.hideMobileTests)}
          />
          Hide Short Tests
        </label>
        <label>
          <input
            type="checkbox"
            id="hideShortTests"
            checked={store.hideShortTests}
            onChange={() => store.setHideShortTests(!store.hideShortTests)}
          />
          Hide Short Tests
        </label>
      </div>
    </div>
  );
});

export default App;
