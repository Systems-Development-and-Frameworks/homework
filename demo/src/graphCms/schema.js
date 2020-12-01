import { fetch } from 'cross-fetch';
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { print } from 'graphql';
import { GRAPH_CMS_API_TOKEN, GRAPH_CMS_ENDPOINT } from '../config';

const executor = async ({ document, variables }) => {
  const query = print(document);
  const headers = { 'Content-Type': 'application/json' };
  if (GRAPH_CMS_API_TOKEN) headers.Authorization = `Bearer ${GRAPH_CMS_API_TOKEN}`;

  const fetchResult = await fetch(GRAPH_CMS_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });
  return fetchResult.json();
};

export default async () => wrapSchema({
  schema: await introspectSchema(executor),
  executor,
});
