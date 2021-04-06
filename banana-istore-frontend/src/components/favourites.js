// Import React module and Card component
import React from 'react';
import Card from './card';

// Creating a functional component. This will render our Favourite Cards component using the Card component again.(Hey hey hey React am I right?)
function Favourites() {
    // This first part is so that our program doesnt break on startup. By giving it a value we can skip the null error.
    if (sessionStorage.getItem('favouriteList') === null) {
        const favourites = [];
        sessionStorage.setItem('favouriteList', JSON.stringify(favourites));
      }
    //   Getting the session storage data and storing it in a global variable
    let favouritesList = JSON.parse(sessionStorage.getItem('favouriteList'));
    let count = 0;

    // This basically just maps our session storage data so that we can create the needed cards passing on the relevant props. I also threw in our delete button with onClick events that trigger our delFavourite function.
    function getFavourites() {
        return(
        favouritesList.map(result => {
            count = count + 1;
            return (
            <div className='fav-items-div'>
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
                <button className='btn btn-lg btn-info DeleteBtn' onClick={(e) => delFavourite(count)}>Delete</button>
            </div>
            )}
        ))
    }

    // Deletes an item from our array. Then sends the updated version back to JSON format and into our sessionStorage. Reloads the page so that we can see the updated array.
    function delFavourite(index) {
        let delFav = [];
        delFav = favouritesList.splice(index - 1, 1);
        sessionStorage.setItem('favouriteList', JSON.stringify(delFav));
        window.location.reload();
    }


    return(
        <div id='Favs'>
            <h1>Your favourite items are:</h1>
            <div className='search-results'  id ='search-results'>
            {/* ternary operator that triggers the getFavourites function if the length of the array is greater than 0 */}
                    {favouritesList.length !== 0 ? getFavourites() : <h3>Nothing at the moment. <br/> Feel free to add some after searching. <br/> If you still can't see your favourites but you know you added them.<br/> Please refresh the page.</h3>} 
                </div>
        </div>
    )
}

export default Favourites