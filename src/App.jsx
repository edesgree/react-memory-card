import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import { images } from './assets/data';
import Card from './components/Card';
import Confetti from './components/Confetti';
import { nanoid } from 'nanoid';
import { LayoutGroup } from 'framer-motion';

function App() {
  const levels = [
    { name: 'easy', cards: 2 },
    { name: 'hard', cards: 3 },
    { name: 'crazy hard', cards: 4 },
    { name: 'impossibruuu', cards: 5 }
  ];
  const [level, setLevel] = React.useState(0);
  //const [numberOfImages, setNumberOfImages] = React.useState(4);
  const [bestScore, setBestScore] = React.useState(getBestScore() || 0);
  const [score, setScore] = React.useState(0);
  const [gameStart, setGameStart] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [gameRunning, setGameRunning] = React.useState(false);
  const [win, setWin] = React.useState(false);
  const [cards, setCards] = React.useState(getNewCards(levels[0].cards));
  const [revealed, setRevealed] = useState(true);
  function getNewCards(nbCards) {
    shuffle(images);
    const imagesSelection = images.slice(0, nbCards);

    console.log('imagesSelection', imagesSelection);
    const newCards = imagesSelection.map((item) => ({
      image: item,
      clickCount: 0,
      isClicked: false,
      id: nanoid()
    }));
    console.log('newCards', newCards);
    return newCards;
  }
  function handleClick(id) {
    cards.map((card) => {
      if (card.id === id) {
        if (card.isClicked === true) {
          //if already click, another click = game over
          console.log('loser');
          setGameOver(true);
          setGameStart(true);
          setGameRunning(false);
        } else {
          shuffle(cards);
          setCards((oldCards) =>
            oldCards.map((card) => {
              return card.id === id ? { ...card, isClicked: true } : card;
            })
          );
          setScore((prevScore) => prevScore + 1);
          console.log(`score ${score} pour card ${card.name}`);
        }
      }
    });
    setRevealed((prevState) => !prevState);
    setTimeout(() => {
      setRevealed((prevState) => !prevState);
    }, 1000);
    console.log('revelead', revealed);
  }
  function countScore() {
    if (!gameOver) {
      const currentScore = cards.filter((card) => card.isClicked).length;
      console.log('currentScore', currentScore);
      //setScore((prevScore) => prevScore + 1);
      if (score >= bestScore) {
        console.log('save best');
        saveBestScore(score);
      }
    }
  }
  function shuffle(array) {
    array.sort((a, b) => 0.5 - Math.random());
  }

  function saveBestScore(score) {
    setBestScore(score);
    localStorage.setItem('MemoryBestScore', bestScore);
  }
  function getBestScore() {
    return localStorage.getItem('MemoryBestScore');
  }
  function handleNewGame() {
    console.log(
      `current level:${levels[level].name} with ${levels[level].cards} cards`
    );
    console.log('win', win);
    if (!gameRunning) {
      console.log('reset du score');
      setScore(0);
    }
    if (win) {
      setScore((prevScore) => prevScore);
      setLevel((prevLevel) => prevLevel + 1);
      setCards(getNewCards(levels[level + 1].cards));
      setGameRunning(true);
    } else {
      setCards(getNewCards(levels[0].cards));
      setGameRunning(false);
    }

    setGameStart(false);
    setGameOver(false);
    setWin(false);
    console.log(cards);
  }

  React.useEffect(() => {
    const allCliqued = cards.every((card) => card.isClicked);

    const cardClickedTwice = cards.every((card) => card.clickCount >= 2);
    if (cardClickedTwice) {
      console.log('vous avez perdu 2x click');
    }
    if (allCliqued) {
      console.log('you win');
      console.log('total clicks', score);
      setWin(true);
      setGameStart(true);
      //setNumberOfImages((prevNbImages) => prevNbImages * 2);

      console.log(
        `current level:${levels[level].name} with ${levels[level].cards} cards`
      );
    }
    countScore();

    shuffle(cards);

    console.log('score', score);
  }, [cards]);
  // create a array of card components, with random position
  const cardElements = cards.map((card) => {
    return (
      <LayoutGroup key={card.id}>
        <Card
          id={card.id}
          isClicked={card.isClicked}
          name={card.name}
          image={card.image}
          handleClick={() => handleClick(card.id)}
          revealed={revealed}
        />
      </LayoutGroup>
    );
  });
  return (
    <main className="App">
      {win ? <Confetti /> : ''}
      <header>
        <div className="header-left">
          <h1 className="title">le memory game</h1>

          <p>{`Level: ${levels[level].name} `}</p>
        </div>

        <div className="score-board">
          <div className="score-board-current">Current Score: {score}</div>
          <div className="score-board-high">HighScore: {bestScore}</div>
        </div>
      </header>

      {gameOver ? (
        <p className="info">
          <span>🎲</span> Game Over !
        </p>
      ) : (
        <>
          {win ? (
            <p className="info">
              <span>🎲</span> Bravo! You won !
            </p>
          ) : (
            <>
              <p className="info">
                <span>🎲</span> Don't click the same card twice !
              </p>
              <div className="cards">{cardElements}</div>
            </>
          )}
        </>
      )}
      {gameStart ? (
        <button className="roll" onClick={handleNewGame}>
          {win ? 'Play next level' : 'New game'}
        </button>
      ) : (
        ''
      )}
    </main>
  );
}

export default App;
