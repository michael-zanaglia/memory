import './App.css';
import Case from './components/Case/Case';
import Title from './components/Title/Title';
import heart from './components/Case/IMAGES/heart.png';
import moon from './components/Case/IMAGES/moon.png';
import triangle from './components/Case/IMAGES/triangle.png';
import round from './components/Case/IMAGES/rond.png';
import star from './components/Case/IMAGES/stars.png';
import React, {useState} from 'react';


function shuffleArray(list){
  // je regarde chaque element et je cree un un objet pour chacun avec un nombre entre 0 et 1
  return list.map((x) => ({x, "sort" : Math.random()}))
      // je tri la liste si a-b est positif avec a passe derierre b et vice versa
      .sort((a,b) => a.sort - b.sort)
      // je recupere que la valeur de la propriete x
      .map((x) => x.x)
};

const listImages = [
    {fig : [heart, "heart"]},
    {fig : [moon, "moon"]},
    {fig : [triangle, "triangle"]},
    {fig : [round, "rond"]},
    {fig : [star, "star"]}
];

let fullList = [...listImages,...listImages]

fullList = shuffleArray(fullList)
//console.log(fullList)
function App() {
  const [cardClicked, setCard] = useState([])

  
  const caseStyle = {
    border : '1px solid red'
  };
  
  function wichCase(itemName){
    if (cardClicked.length < 2){
      setCard([...cardClicked, itemName])
    }
  } 

  console.log(cardClicked)
  
  
  
  const Cases = (times) => {
    let cases = []
    for (let i = 0; i<times; i++) {
      const itemName = fullList[i].fig[1]
      const itemImg = fullList[i].fig[0]
      cases.push(<Case onClick={wichCase} key={i} name={itemName} img={itemImg} style={caseStyle} returnedCards={cardClicked}/>)
    }
    return cases
  }
  
  return (
    <div className="App">
      <Title text="Mémory"/>
      <div className='PlayGround'>
        {Cases(10)}
      </div>
    </div>
  );
}

export default App;
