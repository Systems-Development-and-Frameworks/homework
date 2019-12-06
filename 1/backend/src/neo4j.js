const neo4j = require('neo4j-driver');

let driver

function getDriver(options = {}) {
    const {
        uri = "bolt://127.0.0.1:7687",
        username = "neo4j",
        password = "neo4j",
    } = options
    if (!driver) {
        driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    }
    return driver
}

exports.getDriver = getDriver

