import React from 'react';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <MdKeyboardArrowRight
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

export default NextArrow;
