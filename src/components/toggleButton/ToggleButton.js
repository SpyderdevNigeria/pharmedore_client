import { useState } from 'react';
import s from './ToggleButton.module.css';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <button className={`${s.toggleButton } ${ isOn ? s.on : s.off}`} onClick={handleToggle}>
      <div className={s.slider} />
    </button>
  );
};

export default ToggleButton;
