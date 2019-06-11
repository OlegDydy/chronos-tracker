import React from 'react';

function Icon(props) {
  const { children, className, style } = props;
  const myStyle = style || { height: '1.2em', verticalAlign: 'middle' }
  return (
    <svg viewBox="0 0 32 32" style={myStyle} className={className}>
      {children}
    </svg>
  );
}
 
export default Icon;
