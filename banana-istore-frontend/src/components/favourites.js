import React from 'react';
import Card from './card';

function Favourites() {
    if (sessionStorage.getItem('favouriteList') === null) {
        const favourites = [];
        sessionStorage.setItem('favouriteList', JSON.stringify(favourites));
      }
    let favouritesList = JSON.parse(sessionStorage.getItem("favouriteList"));
    let count = 0;

    function getFavourites() {
        return(
        favouritesList.map(result => {
            count = count + 1;
            return (
            <div className="fav-items-div">
                <Card 
                id={result.id}
                key={result.key}
                kind={result.kind}
                link={result.link}
                name={result.name}
                artistName={result.artistName}
                imgThumbnail={result.imgThumbnail}    
                />
                <br/>
                <button className="btn btn-lg btn-info DeleteBtn" onClick={(e) => delFavourite(count)}>Delete</button>
            </div>
            )}
        ))
    }

    function delFavourite(index) {
        let delFav = [];
        delFav = favouritesList.splice(index - 1, 1);
        sessionStorage.setItem('favouriteList', JSON.stringify(delFav));
        window.location.reload();
    }


    return(
        <div id="Favs">
            <h1>Your favourite items are:</h1>
            <div className="search-results"  id ="search-results">
                    {favouritesList.length !== 0 ? getFavourites() : <h3>Nothing at the moment. <br/> Feel free to add some after searching. <br/> If you still can't see your favourites but you know you added them.<br/> Please refresh the page.</h3>} 
                </div>
        </div>
    )
}

export default Favourites