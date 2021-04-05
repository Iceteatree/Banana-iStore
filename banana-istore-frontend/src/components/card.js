import React, {useState, useEffect} from 'react';
import BSCard from 'react-bootstrap/Card';
// import useForceUpdate from 'use-force-update';

function Card(props) {
    const [isFavourite, setIsFavourite] = useState(false);
    const [display, setDisplay] = useState(false);
    const [click, setClicked] = useState(false);
    // const forceUpdate = useForceUpdate()

    let btnClicked = click? 'button-clicked' : 'button-not-clicked';

    function addToFavourites() {
        if (sessionStorage.getItem('favouriteList') === null) {
            const favourites = [];
            sessionStorage.setItem('favouriteList', JSON.stringify(favourites));
          }
        let addFavourite = JSON.parse(sessionStorage.getItem('favouriteList'));
        setClicked(true);
        const newFavourite = {
            id:props.id,
            key:props.key,
            kind:props.kind,
            link:props.link,
            name:props.name,
            artistName:props.artistName,
            imgThumbnail:props.imgThumbnail,    
          };
        for (let i=0; i<addFavourite.length; i++) {
            if (addFavourite[i].name === newFavourite.name) {
                setIsFavourite(!isFavourite);
                alert("You've already added this item");
                return;
            }
        }
        addFavourite.push(newFavourite)
        sessionStorage.setItem('favouriteList', JSON.stringify(addFavourite));
        alert('Item added to Favorites');
        setDisplay(true);
        window.location.reload()//temporary solution till I can wrap my head around how to update the render of the favourite items after a click has happened.
    }

    
    useEffect(() => {
        // let array = JSON.parse(sessionStorage.getItem('favouriteList'));
        // for (let i = 0; i < array.length; i++){
            // sessionStorage.setItem('favouriteList', JSON.stringify(array));
    

        // if (sessionStorage.getItem('favouriteList') !== null) {
        //     setDisplay(true);
        //     }
        if (display === true) { 
            for (let i=0; i<1; i++) {
                // forceUpdate();
                setDisplay(false);
            }
        }
        
        }, [isFavourite, display]

    )

    return (
        <BSCard className='display-card-body card-group mb-3 h-100'>
            <div className='card'>
            <BSCard.Link href={props.link}>
                <BSCard.Img src={props.imgThumbnail} className='card-img'/>
            </BSCard.Link>
            <BSCard.Body>
                <BSCard.Title><strong>{props.name}</strong></BSCard.Title>
                <BSCard.Subtitle className='mb-2 text-muted'>{props.id}</BSCard.Subtitle>
                <BSCard.Subtitle className='mb-2 card-type'>{props.kind}</BSCard.Subtitle>
                <BSCard.Text>
                {props.artistName}
                </BSCard.Text>
                <BSCard.Link className='card-links' href={props.link}>Link to item <i class='fas fa-link'></i></BSCard.Link>
                <BSCard.Link className={`${btnClicked} card-links`}  id="addFavBtn" onClick={() => addToFavourites()}>Favourite <i class='far fa-heart'></i></BSCard.Link>
            </BSCard.Body>
            </div>
        </BSCard>
    )
}

export default Card;