import type { Component } from 'solid-js';

import styles from './App.module.css';
import PickerWheel from './PickerWheel/PickerWheel';

const weaponsImgModule = import.meta.glob('./assets/weapons/*.png', {
  eager: true,
  as: 'url',
});

const getImgUrl = (id: string) => {
  const path = `./assets/weapons/${id}.png`;
  return weaponsImgModule[path];
};

const items = [
  {
    name: 'Bazooka',
    imgUrl: getImgUrl('test-img'),
  },
  {
    name: 'Chicago Chopper',
    imgUrl: getImgUrl('chicago_chopper'),
  },
  {
    name: 'M-44',
    imgUrl: getImgUrl('m_44'),
  },
  {
    name: 'SMP 29',
    imgUrl: getImgUrl('test-img'),
  },
  {
    name: 'Grenade',
    imgUrl: getImgUrl('test-img'),
  },
  {
    name: 'Smoke',
    imgUrl: getImgUrl('test-img'),
  },
  {
    name: 'Molotov',
    imgUrl: getImgUrl('test-img'),
  },
  {
    name: 'Proximity Mine',
    imgUrl: getImgUrl('test-img'),
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
