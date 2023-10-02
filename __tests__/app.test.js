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
    it("should send 200 status upon a valid request", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
    })
    it("should respond with an array", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            expect(Array.isArray(body.topics)).toBe(true)
        })
    })
    it("all items in array should be objects", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            body.topics.forEach((elem) => {
                expect(typeof elem).toBe('object')
            })
            expect(body.topics.length).toBe(3)
        })
    })
    it("all object in array should have slug and description properties", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
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