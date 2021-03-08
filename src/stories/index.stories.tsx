import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useKonami, { UseKonamiArgs, KONAMI_CODE } from '../index';

export default {
  title: 'useKonami',
  argTypes: {
  },
  parameters: {
    layout: 'centered',
    options: {
      enableShortcuts: false,
    },
  },
} as Meta;

const ToastConfig = () => (
  <ToastContainer
    hideProgressBar
    closeButton={false} />
);

export const Basic: Story<UseKonamiArgs> = (args) => {
  const [lives, setLives] = React.useState(3);

  useKonami({
    ...args,
    onUnlock: () => {
      action('onUnlock')();
      setLives(lives + 30);
      toast.success('Unlocked 30 Lives!');
    },
    onKeyPress: (key, index) => action('onKeyPress')(key, index),
    onReset: (distance) => action('onReset')(distance),
  });

  return (
    <div>
      <div>Lives remaining {lives}</div>

      <ToastConfig />
    </div>
  );
};
Basic.args = {
  sequence:  KONAMI_CODE,
};

export const CustomTarget: Story<UseKonamiArgs> = (args) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [text, setText] = React.useState('');

  useKonami({
    ...args,
    onUnlock: () => {
      action('onUnlock')();
      setText('');
      toast.success('Success!');
    },
    onKeyPress: (key, index) => {
      action('onKeyPress')(key, index);
      setText(text ? `${text}${key}` : key);
    },
    onReset: (distance) => {
      action('onReset')(distance);
      setText('');
      toast.error('Try again!');
    },
    target: ref.current,
  });

  return (
    <div>
      <input
        ref={ref}
        placeholder="Guess the password"
        inputMode="text"
        value={text} />

      <ToastConfig />
    </div>
  );
};
CustomTarget.args = {
  sequence: ['k', 'o', 'n', 'a', 'm', 'i'],
};

