import React, {useState} from 'react';

export default function Case(props) {
    
    const [show, setShow] = useState(1)
    function handleOverlay() {
        setShow(0); 
        if(props.returnedCards.includes(props.name) && props.returnedCards.length === 2) {
           setShow(0); 
        } else {
            setTimeout(() => setShow(1), 700);
        }
        
        //i)f (props.first !== props.name && props.first !== null) {
        //    
        //}
        props.onClick(props.name);  
    };


    return (
        <div onClick={show === 1 ?handleOverlay : null} className={'case'} style={{...props.style, transform: show === 0 ? "rotateY(180deg)" : "", transition: "0.3s ease-in"}}>
            <div className='overlay' style={{"opacity":show, "transition": "0.5s ease-in" }}></div>
            <img src={props.img} alt={`${props.img}`} />  
        </div>
    );
};
