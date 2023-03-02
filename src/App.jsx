import React, { useState } from 'react';
import Logo from './assets/images/logo.svg';
import { images } from './assets/data';
import Card from './components/Card';
import Confetti from './components/Confetti';
import { nanoid } from 'nanoid';
import { LayoutGroup, motion } from 'framer-motion';
import { shuffleArray } from './utils';

function App() {
  const levels = [
    { name: 'Easy', cards: 3 },
    { name: 'Normal', cards: 6 },
    { name: 'Hard', cards: 9 },
    { name: 'Expert', cards: 12 },
    { name: 'Madness', cards: 24 },
    { name: 'Impossibruuu (lvl max)', cards: 48 }
  ];
  const [level, setLevel] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(getBestScore() || 0);
  const [score, setScore] = React.useState(0);
  const [gameStart, setGameStart] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [win, setWin] = React.useState(false);
  const [cards, setCards] = React.useState(getNewCards(levels[0].cards));
  const [revealed, setRevealed] = useState(true);

  function getNewCards(nbCards) {
    const newImages = shuffleArray(images);
    const imagesSelection = newImages.slice(0, nbCards);
    const newCards = imagesSelection.map((item) => ({
      image: item,
      clickCount: 0,
      isClicked: false,
      id: nanoid()
    }));

    return newCards;
  }
  function handleClick(id) {
    cards.map((card) => {
      if (card.id === id) {
        if (card.isClicked === true) {
          //if already click, another click = game over
          setGameOver(true);
          setGameStart(true);
        } else {
          // assign isClicked:true value to current card
          setCards((oldCards) =>
            shuffleArray(
              oldCards.map((card) => {
                return card.id === id ? { ...card, isClicked: true } : card;
              })
            )
          );
          //update score and highscore
          const newScore = score + 1;
          if (newScore > bestScore) {
            saveBestScore(newScore);
          }
          setScore(newScore);
        }
      }
    });
    // turn card animation
    setRevealed((prevState) => !prevState);
    setTimeout(() => {
      setRevealed((prevState) => !prevState);
    }, 1000);
  }

  // save score to localstorage
  function saveBestScore(bestScore) {
    setBestScore(bestScore);
    localStorage.setItem('MemoryBestScore', bestScore);
  }
  function getBestScore() {
    return localStorage.getItem('MemoryBestScore');
  }
  // when click on start button
  function handleNewGame() {
    if (win) {
      gameLevelUp();
    } else {
      gameReset();
    }
  }

  function gameReset() {
    // easy number of cards
    setCards(getNewCards(levels[0].cards));
    setScore(0);
    setGameStart(false);
    setGameOver(false);
    setWin(false);
  }

  // when player wins, a new level is available with increase in difficulty
  function gameLevelUp() {
    if (level < levels.length - 1) {
      setLevel((prevLevel) => prevLevel + 1);
      // new card set with  difficulty increase
      setCards(getNewCards(levels[level + 1].cards));
    } else {
      //level max stays the same
      setLevel((prevLevel) => prevLevel);
      setCards(getNewCards(levels[level].cards));
    }
    setGameStart(false);
    setGameOver(false);
    setWin(false);
  }

  React.useEffect(() => {
    const allCliqued = cards.every((card) => card.isClicked);

    //check if win on each render of cards
    if (allCliqued) {
      setWin(true);
      setGameStart(true);
    }
  }, [cards]);

  // create a array of card components
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
    <>
      {win ? <Confetti /> : ''}
      <main className="App">
        <header>
          <div className="header-left">
            <motion.img
              initial={{ x: 300, opacity: 0, rotate: 0 }}
              animate={{ x: 0, opacity: 1, rotate: -10 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
              }}
              src={Logo}
              className="logo"
            />
          </div>

          <div className="score-board">
            <div className="score-board-current">Current Score: {score}</div>
            <div className="score-board-high">HighScore: {bestScore}</div>
            <div>{`Level: ${levels[level].name} `}</div>
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
                  <span>🎲</span> Don't pick the same animal twice !
                </p>
                <div className="cards">{cardElements}</div>
              </>
            )}
          </>
        )}
        {gameStart && (
          <>
            <button className="roll" onClick={handleNewGame}>
              {win ? 'Play next level' : 'New game'}
            </button>
          </>
        )}
      </main>
    </>
  );
}

export default App;
