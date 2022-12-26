import { For, createSignal, onCleanup, onMount } from 'solid-js';
import type { Accessor, Component } from 'solid-js';

import pointerImgUrl from '../assets/pointer.png';
import styles from './PickerWheel.module.css';

type PickerWheelItem = {
  name: string;
  imgUrl: string;
};

export type PickerWheelProps = {
  diameter: string;
  dividerThickness: string;
  items: Array<PickerWheelItem>;
};

function calcAngleDegrees(x: number, y: number) {
  const radianAngle = Math.atan2(y, x);
  const degreeAngle = (radianAngle * 180) / Math.PI;
  const angle = Math.floor(degreeAngle);

  if (angle < 0) {
    return angle + 360;
  }

  return angle;
}

const PickerWheel: Component<PickerWheelProps> = (p) => {
  let pickerWheelElem: HTMLDivElement | undefined;
  let controllerLoopId: number;
  const [angle, setAngle] = createSignal(0);

  const dividers = () => {
    const itemsNum = p.items.length;
    const dividersNum = Math.floor(itemsNum / 2);
    const dividers = Array(dividersNum);

    return dividers;
  };

  const checkActiveItem = (index: Accessor<number>) => {
    const itemsNum = p.items.length;
    const angleRange = Math.floor(360 / itemsNum);
    const angleFloor = angleRange * index();
    const angleCiel = angleFloor + angleRange;

    const angleValue = angle();

    if (angleValue >= angleFloor && angleValue <= angleCiel) {
      return true;
    }

    return false;
  };

  const handlePointerMove = (event: MouseEvent) => {
    const pwRect = pickerWheelElem!.getBoundingClientRect();
    const pwX = pwRect.left + pwRect.width / 2;
    const pwY = pwRect.top + pwRect.height / 2;

    const pointerX = event.pageX;
    const pointerY = event.pageY;

    const relX = pointerX - pwX;
    const relY = pwY - pointerY;

    const angle = calcAngleDegrees(relX, relY);

    setAngle(angle);
  };

  const controllerLoop = () => {
    console.log('loop running');
    const gp = navigator.getGamepads()[0]!;
    console.log(gp.axes);
  };

  const handleControllerConnected = () => {
    controllerLoop();
    controllerLoopId = window.requestAnimationFrame(controllerLoop);
  };

  const handleControllerDisconnected = () => {
    window.cancelAnimationFrame(controllerLoopId);
  };

  onMount(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('gamepadconnected', handleControllerConnected);
    window.addEventListener(
      'gamepaddisconnected',
      handleControllerDisconnected
    );
  });

  onCleanup(() => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('gamepadconnected', handleControllerConnected);
    window.removeEventListener(
      'gamepaddisconnected',
      handleControllerDisconnected
    );
  });

  return (
    <div
      class={styles.pickerWheel}
      style={{
        '--pw-diameter': p.diameter,
        '--pw-angle': angle(),
      }}
      ref={pickerWheelElem}
    >
      <ul class={styles.itemsGroup}>
        <For each={p.items}>
          {(item, index) => (
            <li
              class={styles.item}
              classList={{
                [styles.activeItem]: checkActiveItem(index),
              }}
              style={{
                '--pw-item-index': index(),
              }}
            >
              <img src={item.imgUrl} alt={item.name} class={styles.itemImg} />
            </li>
          )}
        </For>
      </ul>
      <ul class={styles.dividerGroup}>
        <For each={dividers()}>
          {(_divider, index) => (
            <li
              class={styles.divider}
              style={{
                '--pw-divider-index': index(),
                '--pw-divider-thickness': p.dividerThickness,
              }}
            />
          )}
        </For>
      </ul>
      <div class={styles.pointer}>
        <img src={pointerImgUrl} class={styles.pointerImg} />
      </div>
    </div>
  );
};

export default PickerWheel;
