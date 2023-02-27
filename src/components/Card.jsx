import React from 'react';

export default function Card(props) {
  return (
    <figure className="card">
      <img src={props.image} alt="" />
      <figcaption>{props.title}</figcaption>
    </figure>
  );
}
