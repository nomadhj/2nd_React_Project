import React from 'react';
import { MdKeyboardArrowLeft } from '@react-icons/all-files/md/MdKeyboardArrowLeft';

export const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <MdKeyboardArrowLeft
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black',
        background: 'white',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
};

export default PrevArrow;
