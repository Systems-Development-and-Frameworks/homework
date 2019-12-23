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
    'CREATE (a:Todo {id: $id, description: $description, isDone: $isDone, createdAt: $createdAt}) RETURN a',
    {
        id: "83cab48e-5fb7-4ca0-b0de-3e6177e927ca",
        description: "Build House",
        isDone: "true",
        createdAt: currentDate
    },
);

todoPromise.then(result => {
    console.log(`Ran todo promise`);


    const userName = 'Bob';
    const userPromise = session.run(
        'CREATE (a:User {name: $name}) RETURN a',
        { name: userName }
    );
    userPromise.then(result => {
        console.log(`Ran user promise`);

        const relationshipPromise = session.run(
            'MATCH (a:User),(b:Todo)' +
            'WHERE a.name = "Bob" AND b.id = "83cab48e-5fb7-4ca0-b0de-3e6177e927ca"' +
            'CREATE (b)-[r:assignedTo]->(a)' +
            'RETURN r'
        );

        relationshipPromise.then(result => {
            console.log(`Ran relationship promise.`);

        }).catch(message => {
            console.log(message);
            session.close();
        });
    }).catch(message => {
        console.log(message);
        session.close();
    });
}).catch(message => {
    console.log(message);
    session.close();
});

/*
'CREATE (a:Todo) RETURN a',
*/










/**
 * Resolve all promises
 */
/*
Promise.all(promiseArray).then(results => {
    session.close();
    results.forEach(result => {
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);

        console.log(node.properties.name);
    });
    // on application exit:
    driver.close();
}).catch(message => {
    console.log(`Something went wrong: ${message}`);
});
*/
