// Import React, useState and UseEffect and bootstrap Card library
import React, {useState, useEffect} from 'react';
import BSCard from 'react-bootstrap/Card';
// import useForceUpdate from 'use-force-update'; Apparently this was supposed to force a render but it didn't work out for me so I left it for later.

// Creating our functional card component and passing in props. Creating hooks using useState.
function Card(props) {
    const [isFavourite, setIsFavourite] = useState(false);
    const [display, setDisplay] = useState(false);
    const [click, setClicked] = useState(false);
    // const forceUpdate = useForceUpdate()

    // This is so that I can assign a class name to the favourites line in the card so that I can control whether its red or default.
    let btnClicked = click? 'button-clicked' : 'button-not-clicked';

    // This function is triggered by an Onclick event. 
    function addToFavourites() {
        // This first part is just to make sure the browser can load into the initial state of the webpage without encountering the null problem due to it not having data.
        if (sessionStorage.getItem('favouriteList') === null) {
            const favourites = [];
            sessionStorage.setItem('favouriteList', JSON.stringify(favourites));
          }
        //   Creating a variable to hold our converted session storage data.
        let addFavourite = JSON.parse(sessionStorage.getItem('favouriteList'));
        setClicked(true);
        // Creating a new object that will be passed into our session storage.
        const newFavourite = {
            id:props.id,
            key:props.key,
            kind:props.kind,
            link:props.link,
            name:props.name,
            artistName:props.artistName,
            imgThumbnail:props.imgThumbnail,    
          };

        // This is so that no duplicates are added as well as allowing toggling so that u can add and remove your favourites easily. That functionality still needs to be added.
        for (let i=0; i<addFavourite.length; i++) {
            if (addFavourite[i].name === newFavourite.name) {
                setIsFavourite(!isFavourite);
                alert("You've already added this item"); //This is a temporary solution till I understand how to add and remove favourites easily.
                return;
            }
        }
        // Pushing our new object into our existing array. Then sending that updated converted data to the sessionStorage. Finally alerting the user and reloading the page.
        addFavourite.push(newFavourite)
        sessionStorage.setItem('favouriteList', JSON.stringify(addFavourite));
        alert('Item added to Favorites');
        setDisplay(true);
        window.location.reload()//temporary solution till I can wrap my head around how to update the render of the favourite items after a click has happened.
    }

    // Had big plans but ran out of time. In the future I will repair this section.
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

        // Using our lovely bootstrap Card library to create a clean card that can be manipulated easily. Pass in the props from the other components to receive the data.
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