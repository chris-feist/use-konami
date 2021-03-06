import React from 'react';

const KANOMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

type OnUnlock = () => void;
type Sequence = string[];
type OnReset = (distance: number) => void;

interface Target {
  addEventListener: HTMLElement['addEventListener'],
  removeEventListener: HTMLElement['removeEventListener'],
}

export interface UseKanomiCodeArgs {
  onUnlock: OnUnlock,
  sequence?: Sequence,
  onReset?: OnReset,
  target?: Target,
} 

const areArraysEqual = (arr1: string[], arr2: string[]) => arr1 === arr2 || (arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]));

const useKanomiCode = ({
  onUnlock,
  sequence: inputSequence = KANOMI_CODE,
  onReset,
  target = window,
}: UseKanomiCodeArgs) => {
  const index = React.useRef(0);
  const sequence = React.useRef(inputSequence);

  const keyHandler = React.useCallback(({ key }) => {
    if (key !== sequence.current[index.current]) {
      if (index.current !== 0) {
        onReset?.(index.current);
      }
      index.current = 0;
      return;
    }

    index.current += 1;

    if (index.current === sequence.current.length) {
      onUnlock();
      index.current = 0;
    }
  }, [onUnlock, onReset]);

  React.useEffect(() => {
    target?.addEventListener?.('keydown', keyHandler);
    return () => {
      target?.removeEventListener?.('keydown', keyHandler);
    };
  }, [target, keyHandler]);

  if (!areArraysEqual(inputSequence, sequence.current)) {
    // Input sequence changed, so reset current index
    sequence.current = inputSequence;
    index.current = 0;
  }
};

export default useKanomiCode;
