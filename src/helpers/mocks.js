const faker = require('faker')

function createMockUser() {
    return {
        userName: faker.internet.userName(),
        userPassword: faker.internet.password(),
        userEmail: faker.internet.email(),
    }
}

function createMockPost() {
    return {
        postTitle: faker.lorem.sentence(),
        postText: faker.lorem.paragraph(),
        postCreated: faker.date.recent()
    }
}

module.exports = {
    createMockPost,
    createMockUser
}