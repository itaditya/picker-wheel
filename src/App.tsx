import type { Component } from 'solid-js';

import styles from './App.module.css';
import PickerWheel from './PickerWheel/PickerWheel';

const items = [
  {
    name: 'Bazooka',
  },
  {
    name: 'Chicago',
  },
  {
    name: 'M-44',
  },
  {
    name: 'SMP 29',
  },
  {
    name: 'Grenade',
  },
  {
    name: 'Smoke',
  },
  {
    name: 'Molotov',
  },
  {
    name: 'Proximity Mine',
  },
];

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>Picker Wheel in Days Gone</header>
      <main class={styles.main}>
        <PickerWheel items={items} diameter="500px" />
      </main>
    </div>
  );
};

export default App;
