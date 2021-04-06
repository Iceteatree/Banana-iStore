import React from 'react';
import Favourites from '../components/favourites';
// import renderer from "react-test-renderer"
import {render} from '@testing-library/react';

// Testing if the Favourites Component renders correctly.
// 'it' is just another form of 'test' according to the HypDev instructional documentation.
test("Correct Render", () => {
    // Creating a variable that will hold our rendered component
    const tree = render(<Favourites />)
    // Checks to see if the original tree matches the snapshot. If no snapshot exists it will create one. IF it matches then it will pass the test.
    expect(tree).toMatchSnapshot();
    const functionality = <Favourites />;
    expect(functionality).toBeDefined();
})
