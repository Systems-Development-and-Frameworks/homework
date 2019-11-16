import { ServerInfo } from 'apollo-server';

import { makeServerWithMiddlewares } from './apollo';
import { DEFAULT_TODOS, DEFAULT_USERS } from './data';

async function bootstrap() {
  const server = makeServerWithMiddlewares({
    todos: [...DEFAULT_TODOS],
    users: [...DEFAULT_USERS],
  });
  return server.listen();
}

bootstrap()
  .then((info: ServerInfo) => {
    console.log(`Server listening at ${info.url}`);
  })
  .catch((e) => {
    console.error('Could not start apollo-server! ', e.stack || e.description);
  });
