import './App.css';
import Case from './components/Case/Case';
import Title from './components/Title/Title';
import heart from './components/Case/IMAGES/heart.png';
import moon from './components/Case/IMAGES/moon.png';
import triangle from './components/Case/IMAGES/triangle.png';
import round from './components/Case/IMAGES/rond.png';
import star from './components/Case/IMAGES/stars.png';
import React, {useEffect, useState} from 'react';


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

let fullList = [...listImages,...listImages];

fullList = shuffleArray(fullList);

function App() {
  const [cardClicked, setCard] = useState([]);
  const [active, setActive] = useState({active : []});
  const [flipped, setFlipped] = useState(null);
  const [match, setMatch] = useState([]);

  
  const caseStyle = {
    border : '1px solid red'
  };

  const valeurEnfant = (itemName) => {
    setActive(prevActive => ({
      ...prevActive,
      active :[...(prevActive.active || []), itemName]
    }));
    setCard([...cardClicked, itemName]);
    setFlipped("returned");
  };

  useEffect(() => {
    const verification = () =>{
          if (active.active.length === 2) {
            const arrayActive = active.active
            if (arrayActive[0] === arrayActive[1]) {
              setFlipped("recto")
              setActive({active:[]})
              setMatch(prevMatch => [...prevMatch,...cardClicked])
              setCard([])
            } else {
              setTimeout(() => {
                setActive({active:[]})
                setFlipped("verso")
                setCard([])
              }, 1000)
              
            };
          };
        };
    verification()

  }, [active, cardClicked]);
      
 
  useEffect(()=> {
    if(match.length === 10) {
      setTimeout(()=> {
        alert("Vous avez gagné!")
      },800);
    };
  },[match]);
  
  
  
  
  const Cases = (times) => {
    let cases = []
    for (let i = 0; i<times; i++) {
      const itemName = fullList[i% 10].fig[1]
      const itemImg = fullList[i% 10].fig[0]
      cases.push(<Case keepFlipped={flipped} key={i} name={itemName} img={itemImg} style={caseStyle} match={match} card={cardClicked} statut={valeurEnfant}/>)
    }
    return cases;
  };

  function restart(){
    console.log("coucou")
    setMatch([])
    setCard([])
    setActive({active:[]})
    setFlipped('verso')
    const shuffledList = shuffleArray([...listImages,...listImages]);
    fullList = shuffledList;  
  };

  return (
    <div className="App">
      <Title text="Mémory"/>
      <div className='PlayGround'>
        {Cases(10)}
      </div>
      <h1>{active.active.join(', ')}</h1>
      <button onClick={restart}>Recommencer</button>
    </div>
  );
}

export default App;
