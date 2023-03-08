# use-konami

A zero dependency React hook that listens for a sequence of key presses to unlock a feature. This is usually referred to as an easter egg. The default sequence is commonly known as the [Konami Code][link-konami-code-wiki]: `↑` `↑` `↓` `↓` `←` `→` `←` `→` `b` `a`. 

[![NPM Version][icon-npm-version]][link-npm]
[![NPM Total Downloads][icon-npm-total-downloads]][link-npm]
[![License][icon-license]][link-license]
[![Build Status][icon-build-status]][link-build]
[![Coverage][icon-coverage]][link-coverage]
[![Demo][icon-demo]][link-demo]

## Installation

```sh
yarn add use-konami
```

## Usage

```jsx
import useKonami from 'use-konami';

const Demo = () => {
  useKonami({
    onUnlock: () => console.log('Unlocked 30 extra lives'),
  });

  return (
    <div>useKonami Demo</div>
  );
};
```

[**Check out the demo**][link-demo]

### Options

`onUnlock: (event: KeyboardEvent) => void` The callback when the sequence has been completed and the secret unlocked

`sequence: string[]` An optional key sequence to use instead of the default Konami Code. This should be an array of strings that correspond to [key events][link-key-events].

`onReset: (distance: number, event: KeyboardEvent) => void` An optional callback when a portion of the sequence has been completed, but reset before being unlocked. The callback is invoked with total distance through the sequence. For example, it would be invoked with `3` if the they successfully pressed the first 3 keys in the sequence before pressing an incorrect key.

`onKeyPress: (key: string, index: number, event: KeyboardEvent) => void` An optional callback when a key in the sequence is pressed.

`target: HTMLElement` An optional target element to listen to events. The default is the window object.

[icon-npm-version]: https://img.shields.io/npm/v/use-konami.svg
[icon-npm-total-downloads]: https://img.shields.io/npm/dt/use-konami.svg
[icon-license]: https://img.shields.io/github/license/chris-feist/use-konami.svg
[icon-build-status]: https://travis-ci.com/chris-feist/use-konami.svg?branch=main
[icon-coverage]: https://img.shields.io/codecov/c/github/chris-feist/use-konami/main.svg
[icon-demo]: https://img.shields.io/badge/demo-🎨-blue.svg

[link-npm]: https://www.npmjs.com/package/use-konami
[link-license]: ./LICENSE
[link-build]: https://travis-ci.com/chris-feist/use-konami
[link-coverage]: https://codecov.io/gh/chris-feist/use-konami
[link-demo]: https://chris-feist.github.io/use-konami/
[link-konami-code-wiki]: https://en.wikipedia.org/wiki/Konami_Code
[link-key-events]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
