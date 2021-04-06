// Import React module and Card component
import React from 'react'
import Card from './card';
// So we can use fetch
require('isomorphic-fetch');


// Creating a class component because the searchBar will definitely be stateful and have many changing parts. Constructor is just initialising some state variables.
class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error: null,
            option: 'all',
            search: '',
            results: [],
            reload: false
        }       
    }

    // This function gets triggered when the onClick event gets pressed on the Search button. If there is no search item it will prompt the user to enter a search term first. I reset the state of the results to nothing so that the previous results don't stack ontop of it. I then use the fetch method to not only pass the data of search and option to the backend but also to retrieve that data and then update the results state. I force update the render so that it shows the latest render without having to refresh the screen. If the server wasn't started up then an error alert gets shown.
    handleSubmit(event) {
        if (this.state.search === '') {
            return alert('Please enter a search item');
        }
        this.setState({results: []});
        event.preventDefault();
        fetch('/search', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                search:this.state.search,
                option:this.state.option
            })
        })
        .then(res => res.json())
        .then(response => {
            this.setState({results: response})
            this.forceUpdate();
            console.log(this.state);
        })

        .catch(error => {
            alert('Server is currently offline. Please try again later.');
            this.setState(error);
            console.log(error);
        })
    }

    // Creates the cards that will display the search results. This is also where all the props get passed to the other components. Gets triggered if the length of the results is greater than 0. Basically maps the original results so that the card component can be made whilst passing along the props needed.
    searchResults() {
        const results = this.state.results.results;
        return (
        results.map(result => 
            <Card 
            id={result.collectionId}
            key={result.collectionArtistId}
            kind={result.kind}
            link={result.trackViewUrl}
            name={result.trackName}
            artistName={result.artistName}
            imgThumbnail={result.artworkUrl100}    
            /> )
        )
    }

    // Just some basic forms for input data. Notice the onChange and Onclick events.
    render() {
        return (
            <div className='search-form' id='Search'>
                <h1>Search</h1>
                <form className='search-bar-form' onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='What do you want to search for?' onChange={(event) => this.setState({search:event.target.value})}></input>
                    <div className='dropdown'>
                        <select className='drop-btn form-select form-select-lg mb-3 mt-3' onChange={(event) => this.setState({option: event.target.value})}>
                            <option value='all'>All</option>
                            <option value='movie'>Movies</option>
                            <option value='music'>Music</option>
                            <option value='podcast'>Podcasts</option>
                            <option value='audiobook'>Audiobook</option>
                            <option value='shortFilm'>Short Film</option>
                            <option value='tvShow'>TV Shows</option>
                            <option value='ebook'>Ebooks</option>
                        </select>
                    </div>
                    <button type='submit' className='btn btn-lg btn-info mb-3'>Search <i className='fa fa-search'></i></button>
                </form>
                <div className='search-results'  id ='search-results'>
                    {/* Quite proud of this. Used ternary operator to display the search results. If the length of the state of the results is greater than 0 it will trigger the searchResults method else it will show nothing */}
                    {this.state.results.length !== 0 ? <div><h3>Search Results</h3>{this.searchResults()}</div> : ''} 
                </div>
            </div>
        )
    }
}

export default SearchBar