import neo4j from "neo4j-driver";


const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "12345";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

/**
 * Promises to write dummy data to database for testing.
 */

/**
 * 1. Todos
 */

/**
 * id: '83cab48e-5fb7-4ca0-b0de-3e6177e927ca',
   description: 'Number one',
   isDone: true,
   assignedUser: users[0],
   createdAt: new Date().toISOString(),
 */

const currentDate = Date.now();

const todoPromise = session.run(
    'CREATE (a:Todo { id: "83cab48e-5fb7-4ca0-b0de-3e6177e927ca", description: "Number one", isDone: "true") RETURN a',
    { createdAt: currentDate }
);


/**
 * 2. Users
 */
const userName = 'Bob';
const userPromise = session.run(
    'CREATE (a:User {name: $name}) RETURN a',
    { name: userName }
);

const promiseArray = [todoPromise, userPromise];


/**
 * Resolve all promises
 */
Promise.all(promiseArray).then(results => {
    session.close();
    results.forEach(result => {
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);

        console.log(node.properties.name);
    });
    // on application exit:
    driver.close();
});
