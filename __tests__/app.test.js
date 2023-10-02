const { app } = require("../app.js")
const request = require("supertest")
const testData = require("../db/data/test-data")
const seed = require("../db/seeds/seed.js")
const database = require("../db/connection.js")


beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    database.end()
})

// be available on /api/topics
// get all topics

// it should respond with an array
// the array should contain topic objects
// each object should have property of slug, description

describe("GET api/topics", () => {
    it("should send 200 status upon a valid request and respond with all topics data", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            expect(body.topics.length).toBe(3)
            body.topics.forEach((elem) => {
                expect(elem.hasOwnProperty('slug')).toBe(true)
                expect(elem.hasOwnProperty('description')).toBe(true)
            })
        })
    })
    it("should respond with 404 upon invalid request", () => {
        return request(app)
        .get('/api/invalid')
        .expect(404)
    })
})


/* 
SHOULD:
be available on /api
provide a description of all other endpoints

RESPONDS WITH:
an object describing all available endpoints on the API

EACH ENDPOINT SHOULD INCLUDE:

a brief description of the purpose and functionality of the endpoint.
which queries are accepted.
what format the request body needs to adhere to.
what an example response looks like.
*/

const endpointDocs = require("../endpoints.json")
describe("GET /api" , () => {
    it("should respond with 200 and object containing info about all endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
            let parsedEndpoints = JSON.parse(body.endpoints)
            const responseKeys = Object.keys(parsedEndpoints)
            expect(responseKeys.length).toBe(Object.keys(endpointDocs).length)
            responseKeys.forEach((key) => {
                expect(parsedEndpoints[key].hasOwnProperty("description")).toBe(true)
                expect(parsedEndpoints[key].hasOwnProperty("queries")).toBe(true)
                expect(parsedEndpoints[key].hasOwnProperty("exampleResponse")).toBe(true)
            })
        })
    })

    it("should respond with 404 upon invalid request", () => {
        return request(app)
        .get("/invalid")
        .expect(404)
    })
})