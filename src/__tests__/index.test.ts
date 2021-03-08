import { renderHook } from '@testing-library/react-hooks';

import useKonami from '../';

describe('index', () => {
  test('adds keydown listener', () => {
    const args = {
      onUnlock: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKonami(args));

    expect(args.target.addEventListener).toHaveBeenCalled();
  });

  test('removes keydown listener', () => {
    const args = {
      onUnlock: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };
    const { rerender } = renderHook((props) => useKonami(props), {
      initialProps: args,
    });

    rerender({
      ...args,
      target: undefined,
    });

    expect(args.target.removeEventListener).toHaveBeenCalled();
  });

  test('doesn\'t remove and add listener for mutable callback', () => {
    const args = {
      onUnlock: jest.fn(() => false),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };
    const { rerender } = renderHook((props) => useKonami(props), {
      initialProps: args,
    });

    rerender({
      ...args,
      onUnlock: jest.fn(() => true),
    });

    expect(args.target.removeEventListener).not.toHaveBeenCalled();
    expect(args.target.addEventListener).toHaveBeenCalledTimes(1);
  });

  test('calls onUnlock when sequence completed', () => {
    const args = {
      onUnlock: jest.fn(),
      onReset: jest.fn(),
      onKeyPress: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKonami(args));
    const keyHandler = args.target.addEventListener.mock.calls[0][1];

    keyHandler({ key: 'ArrowUp' });
    keyHandler({ key: 'ArrowUp' });
    keyHandler({ key: 'ArrowDown' });
    keyHandler({ key: 'ArrowDown' });
    keyHandler({ key: 'ArrowLeft' });
    keyHandler({ key: 'ArrowRight' });
    keyHandler({ key: 'ArrowLeft' });
    keyHandler({ key: 'ArrowRight' });
    keyHandler({ key: 'b' });
    keyHandler({ key: 'a' });

    expect(args.onUnlock).toHaveBeenCalledWith({ key: 'a' });
    expect(args.onKeyPress).toHaveBeenCalledTimes(10);
    expect(args.onKeyPress).toHaveBeenLastCalledWith('a', 9, { key: 'a' });
    expect(args.onReset).not.toHaveBeenCalled();
  });

  test('calls onReset when sequence reset', () => {
    const args = {
      onUnlock: jest.fn(),
      onReset: jest.fn(),
      onKeyPress: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKonami(args));
    const keyHandler = args.target.addEventListener.mock.calls[0][1];

    keyHandler({ key: 'ArrowUp' });
    keyHandler({ key: 'ArrowUp' });
    keyHandler({ key: 'ArrowUp' });

    expect(args.onReset).toHaveBeenCalledWith(2, { key: 'ArrowUp' });
    expect(args.onKeyPress).toHaveBeenCalledTimes(2);
    expect(args.onUnlock).not.toHaveBeenCalled();
  });

  test('doesn\'t call onReset if sequence not started', () => {
    const args = {
      onUnlock: jest.fn(),
      onReset: jest.fn(),
      onKeyPress: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKonami(args));
    const keyHandler = args.target.addEventListener.mock.calls[0][1];

    keyHandler({ key: 'a' });
    keyHandler({ key: 'b' });
    keyHandler({ key: 'c' });

    expect(args.onReset).not.toHaveBeenCalled();
    expect(args.onKeyPress).not.toHaveBeenCalled();
    expect(args.onUnlock).not.toHaveBeenCalled();
  });

  test('calls onUnlock when custom sequence completed', () => {
    const args = {
      onUnlock: jest.fn(),
      sequence: ['1', '2', '3'],
      onReset: jest.fn(),
      onKeyPress: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKonami(args));
    const keyHandler = args.target.addEventListener.mock.calls[0][1];

    keyHandler({ key: '1' });
    keyHandler({ key: '2' });
    keyHandler({ key: '3' });

    expect(args.onUnlock).toHaveBeenCalled();
    expect(args.onKeyPress).toHaveBeenCalledTimes(3);
    expect(args.onReset).not.toHaveBeenCalled();
  });

  test('calls resets index when sequence changes', () => {
    const args = {
      onUnlock: jest.fn(),
      sequence: ['1', '2', '3'],
      onReset: jest.fn(),
      onKeyPress: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    const { rerender } = renderHook((props) => useKonami(props), {
      initialProps: args,
    });
    const keyHandler = args.target.addEventListener.mock.calls[0][1];
    keyHandler({ key: '1' });
    keyHandler({ key: '2' });

    rerender({
      ...args,
      sequence: ['4', '5', '6'],
    });


    keyHandler({ key: '4' });
    keyHandler({ key: '5' });
    keyHandler({ key: '6' });

    expect(args.onUnlock).toHaveBeenCalledTimes(1);
    expect(args.onUnlock).toHaveBeenCalledWith({ key: '6' });
    expect(args.onKeyPress).toHaveBeenCalledTimes(5);
    expect(args.onReset).not.toHaveBeenCalled();
  });
});