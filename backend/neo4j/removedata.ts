import neo4j from "neo4j-driver";


const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "12345";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const removePromise = session.run(
    'Match (n) DETACH DELETE n'
);

removePromise.then(result => {
    console.log(`Deleted all data`);
});

