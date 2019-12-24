import { seedData } from '../neo4j/seed';
import neo4j from "neo4j-driver";


const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "12345";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();


/**
 * Setup test data
 */

describe('seeding data', () => {


    test('seeds data', () => {


        return seedData().then(message => {
            console.log(JSON.stringify(message));
            expect(message).toHaveLength(5);
            console.log(`Test setup done: ${message}`);

            /**
             * Test start
             */

            describe('Retrieve User "Nelly"', () => {
                it('Retrieves the user', () => {
                    return session.run('MATCH (a:User) WHERE a.name = Nelly return a').then(result => {
                        const resultingName = result.records;
                        console.log(`Resulting name in test 1: ${JSON.stringify(resultingName)}`)
                        expect(resultingName).toMatch("Nelly");
                    });
                })
            })
        }).catch(error => {
            console.log(`Something went wrong while setting up the tests: ${error}`);
        })
    })
});
