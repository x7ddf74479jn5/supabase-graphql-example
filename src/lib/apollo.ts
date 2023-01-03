import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { supabase, supabaseAnonKey, supabaseUrl } from "./supabase";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${supabaseUrl}/graphql/v1`,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const session = (await supabase.auth.getSession()).data.session;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${session ? session.access_token : supabaseAnonKey}`,
      apikey: supabaseAnonKey,
    },
  };
});

export const apolloClient = new ApolloClient({
  uri: `${supabaseUrl}/graphql/v1`,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
