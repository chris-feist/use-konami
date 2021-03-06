import { renderHook } from '@testing-library/react-hooks';

import useKanomiCode from '../';

describe('index', () => {
  test('adds keydown listener', () => {
    const args = {
      onUnlock: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKanomiCode(args));

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
    const { rerender } = renderHook((props) => useKanomiCode(props), {
      initialProps: args,
    });

    rerender({
      ...args,
      target: undefined, 
    });

    expect(args.target.removeEventListener).toHaveBeenCalled();
  });

  test('calls onUnlock when sequence completed', () => {
    const args = {
      onUnlock: jest.fn(),
      onReset: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKanomiCode(args));
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

    expect(args.onUnlock).toHaveBeenCalled();
    expect(args.onReset).not.toHaveBeenCalled();
  });

  test('calls onReset when sequence reset', () => {
    const args = {
      onUnlock: jest.fn(),
      onReset: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKanomiCode(args));
    const keyHandler = args.target.addEventListener.mock.calls[0][1];

    keyHandler({ key: 'ArrowUp' });
    keyHandler({ key: 'ArrowUp' });
    keyHandler({ key: 'ArrowUp' });

    expect(args.onReset).toHaveBeenCalledWith(2);
    expect(args.onUnlock).not.toHaveBeenCalled();
  });

  test('doesn\'t call onReset if sequence not started', () => {
    const args = {
      onUnlock: jest.fn(),
      onReset: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKanomiCode(args));
    const keyHandler = args.target.addEventListener.mock.calls[0][1];

    keyHandler({ key: 'a' });
    keyHandler({ key: 'b' });
    keyHandler({ key: 'c' });

    expect(args.onReset).not.toHaveBeenCalled();
    expect(args.onUnlock).not.toHaveBeenCalled();
  });

  test('calls onUnlock when custom sequence completed', () => {
    const args = {
      onUnlock: jest.fn(),
      sequence: ['1', '2', '3'],
      onReset: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    renderHook(() => useKanomiCode(args));
    const keyHandler = args.target.addEventListener.mock.calls[0][1];

    keyHandler({ key: '1' });
    keyHandler({ key: '2' });
    keyHandler({ key: '3' });

    expect(args.onUnlock).toHaveBeenCalled();
    expect(args.onReset).not.toHaveBeenCalled();
  });

  test('calls resets index when sequence changes', () => {
    const args = {
      onUnlock: jest.fn(),
      sequence: ['1', '2', '3'], 
      onReset: jest.fn(),
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    };

    const { rerender } = renderHook((props) => useKanomiCode(props), {
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
    expect(args.onReset).not.toHaveBeenCalled();
  });
});