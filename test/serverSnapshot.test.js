let Server = require('../server');

let expect = require('chai').expect;
let request = require('request');
// Testing if the Server renders correctly.
// 'it' is just another form of 'test' according to the HypDev instructional documentation.

describe("Server status and API fetch", () => {
    it('status', function(completed) {
        request('http://localhost:8000/', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            completed();
        })
    })
    it('fetch correct data', () => {
        let term = 'adele'
        let option = 'artistName'
        request(`https://itunes.apple.com/search?term=${term}&media=${option}`, function(error, response, body) {
            expect(response.statusCode).to.equal(200)
        });

    })
    
})