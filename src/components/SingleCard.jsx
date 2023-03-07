function SingleCard({card, handleChoice, flipped, disabled}) {
  
  const handleClick = () =>{
    if(!disabled){
      handleChoice(card)};
  }

  return (
   <div className='card'>
    <div className={`${flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''} `}>
      <img src={card.src} className='front' alt="card front" />
      <img src='/img/cover.png' onClick={handleClick} className='back' alt="card back" />
    </div>
   </div>
  )
}

export default SingleCard
