import React from 'react'
import Card from './card';

require('isomorphic-fetch');

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

    handleSubmit(event) {
        if (this.state.search === "") {
            return alert("Please enter a search item");
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
        /* .then(()=>{const strResults = this.state.results.results;
            strResults.map(result => {
                return (document.getElementById('search-results').innerHTML = document.getElementById('search-results').innerHTML +
                    JSON.stringify(<Card 
                        id={result.collectionId}
                        key={result.collectionId}
                        name={result.artistName} 
                        previewUrl={result.previewUrl}
                        imgThumbnail={result.artworkUrl100}
                    />)
                )}
            )}
        ) */
        .catch(error => {
            alert("Server is currently offline. Please try again later.");
            this.setState(error);
            console.log(error);
        })
    }

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


    render() {
        return (
            <div className="search-form" id="Search">
                <h1>Search</h1>
                <form className="search-bar-form" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="What do you want to search for?" onChange={(event) => this.setState({search:event.target.value})}></input>
                    <div className="dropdown">
                        <select className="drop-btn form-select form-select-lg mb-3 mt-3" onChange={(event) => this.setState({option: event.target.value})}>
                            <option value="all">All</option>
                            <option value="movie">Movies</option>
                            <option value="music">Music</option>
                            <option value="podcast">Podcasts</option>
                            <option value="audiobook">Audiobook</option>
                            <option value="shortFilm">Short Film</option>
                            <option value="tvShow">TV Shows</option>
                            <option value="ebook">Ebooks</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-lg btn-info mb-3">Search <i className="fa fa-search"></i></button>
                </form>
                <div className="search-results"  id ="search-results">
                    
                    {this.state.results.length !== 0 ? <div><h3>Search Results</h3>{this.searchResults()}</div> : ""} 
                </div>
            </div>
        )
    }
}

export default SearchBar