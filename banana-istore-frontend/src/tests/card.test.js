import React from 'react';
import Card from '../components/card';
// import renderer from "react-test-renderer"
import {render} from '@testing-library/react';


// Testing if the Card Component renders correctly and is functional.
// 'it' is just another form of 'test' according to the HypDev instructional documentation.
test("Correct Render", () => {
    // Creating a variable that will hold our rendered component
    const tree = render(<Card />)
    // Checks to see if the original tree matches the snapshot. If no snapshot exists it will create one. IF it matches then it will pass the test.
    expect(tree).toMatchSnapshot();
    const functionality = <Card />;
    expect(functionality).toBeDefined();
})

// Test to see if the functionality of the sessions Storage works.
test("if function works", () => {
    let addFavourite = []
    addFavourite.push("test")
    sessionStorage.setItem('favouriteList', JSON.stringify(addFavourite));
    let testFavourite = JSON.parse(sessionStorage.getItem('favouriteList'));
    expect(testFavourite).toHaveLength(1);
})
