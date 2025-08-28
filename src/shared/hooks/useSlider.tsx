// import React, { useState, useEffect, useCallback } from 'react';
// // import { getPercentagePosition, getValueByCursor, getValueInRange } from '../core/utility/RangeUtil';

// type SliderProps = {
//   initialValue: number;
//   minLimit: number;
//   maxLimit: number;
//   constrainValue: (value: number, otherValue: number) => number;
//   onChange: (value: number) => void;
// };

// export const useSlider = ({ initialValue, minLimit, maxLimit, constrainValue, onChange }: SliderProps) => {
//   const [position, setPosition] = useState(getPercentagePosition(initialValue, minLimit, maxLimit));

//   useEffect(() => {
//     setPosition(getPercentagePosition(initialValue, minLimit, maxLimit));
//   }, [initialValue, minLimit, maxLimit]);

//   const getSliderHandler = useCallback(
//     (otherValue: number) => {
//       let rect: DOMRect;

//       const move = (e: MouseEvent | TouchEvent) => {
//         const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX;

//         const newValue = getValueByCursor({
//           max: maxLimit,
//           min: minLimit,
//           rootWidth: rect.width,
//           cursorClientX: clientX,
//           rootClientX: rect.x,
//         });

//         const constrainedValue = constrainValue(newValue, otherValue);
//         setPosition(getPercentagePosition(constrainedValue, minLimit, maxLimit));
//         onChange(constrainedValue);
//       };

//       const end = () => {
//         window.removeEventListener('mousemove', move);
//         window.removeEventListener('touchmove', move);
//         window.removeEventListener('mouseup', end);
//         window.removeEventListener('touchend', end);
//       };

//       const setupEvents = () => {
//         window.addEventListener('mousemove', move);
//         window.addEventListener('touchmove', move);
//         window.addEventListener('mouseup', end);
//         window.addEventListener('touchend', end);
//       };

//       return (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         rect = (e.currentTarget.parentElement as HTMLDivElement).getBoundingClientRect();
//         setupEvents();
//       };
//     },
//     [minLimit, maxLimit, constrainValue, onChange]
//   );

//   const constrainedValue = getValueInRange(initialValue, minLimit, maxLimit);

//   return {
//     position,
//     constrainedValue,
//     getSliderHandler,
//   };
// };
