import neo4j from "neo4j-driver";


const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "12345";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const userName = 'Alice';
const resultPromise = session.run(
    'CREATE (a:User {name: $name}) RETURN a',
    { name: userName }
);

resultPromise.then(result => {
    session.close();

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);

    // on application exit:
    driver.close();
});