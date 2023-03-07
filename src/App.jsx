import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src" : "/img/helmet-1.png", "matched" : false},
  {"src" : "/img/potion-1.png", "matched" : false},
  {"src" : "/img/ring-1.png", "matched" : false},
  {"src" : "/img/scroll-1.png", "matched" : false},
  {"src" : "/img/shield-1.png", "matched" : false},
  {"src" : "/img/sword-1.png", "matched" : false}
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [newGame, setNewGame] = useState(false);
  const [count, setCount] = useState(0);
 
  const shuffleCards = () => {
    setNewGame(true);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=>(0.5-Math.random()))
        .map((card)=>( {...card, id : Math.random()} ));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    return shuffledCards;
  }
 
  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns=>prevTurns + 1);
    setDisabled(false);
  }
  
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCount(prevCount=> prevCount + 1);
        if(count+1 === cards.length/2){
          setTimeout(()=>{setNewGame(false)}, 1000);
        }
        setCards(prevCards=>{
          return prevCards.map((card)=>{
            if(card.src === choiceOne.src){
              return {...card, "matched": true};
            }else{
              return card;
            }
          })
        })
        resetTurns();
      } else{
        setTimeout(()=>resetTurns(), 600);
      }
    }
  }, [choiceOne, choiceTwo, count]);
  

  return (
    <div className="App">
      <h1>Purble Match</h1>
      {!newGame && <button onClick={()=>(
        shuffleCards(),
        setCount(0),
        setNewGame(true),
        setTurns(0)
        )}>New Game</button>}
      {newGame && <div className='card-grid'>
        {cards.map((card)=>(
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled} />
        ))}
      </div>}
      {newGame && <p>Turns :<span>{turns}</span></p>}
      {!newGame && count && <div className='kudos'>
          <h2>Kudos!</h2>
          <p>Click on the 'New Game' button to play again.</p>
        </div>}
    </div>
  );
}

export default App
