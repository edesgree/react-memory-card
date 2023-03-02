import React from 'react';
import imageBack from '../assets/images/back.svg';
import { motion, AnimatePresence } from 'framer-motion';

export default function Card(props) {
  let animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  return (
    <AnimatePresence>
      <motion.figure
        layout
        id={props.id}
        className={`card ${props.isClicked ? 'is-clicked' : ''}`}
        onClick={props.handleClick}
      >
        <div className="img-holder">
          <motion.img
            {...animationProps}
            src={props.revealed ? props.image : imageBack}
            alt=""
          />
        </div>
      </motion.figure>
    </AnimatePresence>
  );
}
