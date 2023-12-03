import { render } from '@testing-library/react';
import { assertIsTreeNode, isRoot } from 'mobx-keystone';
import { describe, expect, it, Mock, vi } from 'vitest';

import { nextTick } from '../../../testing/nextTick';
import { Root } from './models/root';
import { startStoreSync } from './startStoreSync';
import StoreProvider, { StoreContext } from './storeProvider';

vi.mock('./startStoreSync', async () => {
  const original = await vi.importActual<{
    startStoreSync: typeof startStoreSync;
  }>('./startStoreSync.js');
  return {
    startStoreSync: vi.fn().mockImplementation(original.startStoreSync),
  };
});

describe('the StoreProvider', () => {
  it('should pass an instance of the store down to child components', () => {
    let storeRef: Root | undefined = undefined;
    render(
      <StoreProvider>
        <StoreContext.Consumer>
          {(store) => {
            storeRef = store;
            return <></>;
          }}
        </StoreContext.Consumer>
      </StoreProvider>
    );
    expect(storeRef).toBeDefined();
    expect(() => assertIsTreeNode(storeRef)).not.toThrow();
    expect(isRoot(storeRef!)).toBeTruthy();
  });

  /**
   * We mock here only to slightly decouple from the implementation of startStoreSync
   * which should be well-tested on its own
   */
  it('should clean up the store sync when the component is unmounted', async () => {
    const cleanup = vi.fn();
    (startStoreSync as Mock).mockImplementationOnce(async () => {
      return cleanup;
    });

    const { unmount } = render(
      <StoreProvider>
        <></>
      </StoreProvider>
    );
    // need to wait for effect to run
    await nextTick();
    unmount();
    expect(cleanup).toHaveBeenCalledWith();
  });

  it('should mark the store as having been fully loaded once it has been', async () => {
    let storeRef: Root | undefined = undefined;
    render(
      <StoreProvider>
        <StoreContext.Consumer>
          {(store) => {
            storeRef = store;
            return <></>;
          }}
        </StoreContext.Consumer>
      </StoreProvider>
    );
    await nextTick();
    expect(storeRef!.isLoading).toBeFalsy();
  });
});
