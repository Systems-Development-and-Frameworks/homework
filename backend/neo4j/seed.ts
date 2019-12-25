import neo4j from 'neo4j-driver';

const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = '12345';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

/**
 * Creates todos with the given parameters
 * @param id The Todos unique Id
 * @param description The Todos description of the activity
 * @param isDone Whether the Todo is done (true) or not (false)
 * @param createdAt When this Todo has been created
 */

const createTodo = (id: string, description: string, isDone: boolean, createdAt: number) => {
    return session.run('CREATE (a:Todo {id: $id, description: $description, isDone: $isDone, createdAt: $createdAt}) RETURN a',
        {
            id,
            description,
            isDone,
            createdAt
        });
};

/**
 * Creates a user with the given parameters
 * @param id The user's unique Id
 * @param name The user's Name (non unique)
 */
const createUser = (id: string, name: string) => {
    return session.run(
        'CREATE (a:User {id: $id, name: $name}) RETURN a',
        {
            id,
            name
        });
};

/**
 * Creates a relationship from a todo to a user
 * @todo relationship assignment is still hard coded
 * @param userId the user in question
 * @param todoId the todo in question
 * @param relationship the relationship type
 */

const createRelation = (userId: string, todoId: string, relationship: string) => {
    return session.run(
        'MATCH (a:User),(b:Todo)' +
        'WHERE a.id =' + '\"' + userId + '\"' + ' AND b.id = ' + '\"' + todoId + '\"' +
        'CREATE(a) - [r: ' + relationship + '] -> (b)' +
        'RETURN type(r)',
    );
};

const deleteAllData = () => {
    return session.run(
        'MATCH (n) DETACH DELETE (n)'
    );
};
/**
 * Seed routine for testing
 */

;(function () {
    return deleteAllData().then(() => {

        // 1. Creating Todos
        createTodo('1', 'Clean Room', false, Date.now()).then(() => {
            createTodo('2', 'Do Homework', false, Date.now()).then(() => {
                createTodo('3', 'Walk the Dog', true, Date.now()).then(() => {
                    createTodo('4', 'Prepare Dinner', false, Date.now()).then(() => {
                        createTodo('5', 'Do Taxes', false, Date.now()).then(() => {
                            console.log('All Todos done! Seeding Users...');

                            // 2. Creating Users
                            createUser('1', 'Nelly').then(() => {
                                createUser('2', 'Fernando').then(() => {
                                    createUser('3', 'Barack').then(() => {
                                        createUser('4', 'Alice').then(() => {
                                            createUser('5', 'Anderson').then(() => {
                                                console.log('All Users done! Creating relationships...');

                                                // 3. Creating relationships
                                                createRelation('1', '3', 'assignedTo').then((result) => {
                                                    createRelation('1', '2', 'assignedTo').then(() => {
                                                        createRelation('2', '1', 'assignedTo').then(() => {
                                                            createRelation('3', '4', 'assignedTo').then(() => {
                                                                createRelation('4', '5', 'assignedTo').then(() => {
                                                                    session.close();
                                                                    console.log('All seeding done!')
                                                                })

                                                            })
                                                        })
                                                    })
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }).catch((error) => {
        console.log(`Something went wrong while seeding: ${JSON.stringify(error)} `);
    });
})();
