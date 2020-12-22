# Exercise #6

| Deadline             | Date                |
| -------------------- | ------------------- |
| **Due date**         | **All optional :)** |

## Goal

In this Christmas exercise, it is time to plug frontend, backend and database
together and finally deploy your application to show it to your friends
and families!

## Instructions

1. Install `vue-apollo` in your frontend and call the backend from there.
Refactor your frontend code so that all data comes from your backend. Certain
groups have already [implemented this](https://github.com/Systems-Development-and-Frameworks/lichtow/tree/origin/main/webapp)
in previous exercises.

2. Build your frontend and upload the files to a static webhoster. E.g. you
could use [Netlify](https://www.netlify.com/) or [Surge](https://surge.sh/).

3. Build your backend for production. You could e.g. use [Heroku](https://dashboard.heroku.com/apps)
or deploy your backend as a [Serverless](https://www.serverless.com/) function.
There is documentation how to setup `apollo-server` to run on [Heroku](https://www.apollographql.com/docs/apollo-server/deployment/heroku/)
or on a [lambda function](https://www.apollographql.com/docs/apollo-server/deployment/lambda/).

4. Use a managed [Neo4J](https://neo4j.com/cloud/) database or a remote GraphQL
API for persistency. If you deploy your backend as a lambda function, I suggest
to use [serverless-dotenv-plugin](https://github.com/colynb/serverless-dotenv-plugin)
to manage credentials. Other helpful plugins are [serverless-offline](https://github.com/dherault/serverless-offline)
for local development and [serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle)
for ES6 and typescript support.

5. Add automatic deployments to your CI/CD pipeline.

6. Show-off to your friends and your family!

**Merry christmas!**

           *             ,
                       _/^\_
                      <     >
     *                 /.-.\         *
              *        `/&\`                   *
                      ,@.*;@,
                     /_o.I %_\    *
        *           (`'--:o(_@;
                   /`;--.,__ `')             *
                  ;@`o % O,*`'`&\
            *    (`'--)_@ ;o %'()\      *
                 /`;--._`''--._O'@;
                /&*,()~o`;-.,_ `""`)
     *          /`,@ ;+& () o*`;-';\
               (`""--.,_0 +% @' &()\
               /-.,_    ``''--....-'`)  *
          *    /@%;o`:;'--,.__   __.'\
              ;*,&(); @ % &^;~`"`o;@();         *
              /(); o^~; & ().o@*&`;&%O\
        jgs   `"="==""==,,,.,="=="==="`
           __.----.(\-''#####---...___...-----._
         '`         \)_`"""""`
                 .--' ')
               o(  )_-\
                 `"""` `
