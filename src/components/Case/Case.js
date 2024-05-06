import React, { useState, useEffect } from 'react';

export default function Case(props) {
    const [show, setShow] = useState(1);

    function handleOverlay() {
        if (show===1){
            setShow(0); // Cacher la carte (retourner) // Appeler la fonction onClick du parent
            props.statut(props.name); // Appeler la fonction statut du parent
        } 
    };

    useEffect(()=>{
        if (props.keepFlipped === 'verso' && !props.match.includes(props.name)){
            setShow(1);
        };

    },[props.keepFlipped, props.name, props.match]);

    return (
        <div onClick={handleOverlay} className={'case'} style={{ ...props.style, transform: show === 0 ? "rotateY(180deg)" : "", transition: "0.3s ease-in" }}>
            <div className='overlay' style={{ "opacity": show, "transition": "0.5s ease-in" }}></div>
            <img src={props.img} alt={`${props.img}`} />
        </div>
    );
};
