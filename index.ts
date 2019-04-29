import {
  ApolloConfig,
  GraphQLClientProject,
  LoadingHandler,
  ClientIdentity,
  ClientConfig
} from "apollo-language-server";
import {
  printWithReducedWhitespace,
  sortAST,
  hideStringAndNumericLiterals,
  dropUnusedDefinitions
} from "apollo-graphql/lib/transforms";
// @ts-ignore
import config = require('./apollo.config.js');
import URI from 'vscode-uri';

class MockLoadingHandler implements LoadingHandler {
  constructor() {}
  async handle<T>(_message: string, value: Promise<T>): Promise<T> {
    return value;
  }
  handleSync<T>(_message: string, value: () => T): T {
    return value();
  }
  showError(_message: string) {}
}

// Not used at all, but has to be defined.
const clientIdentity: ClientIdentity = {
  name: "Airbnb Build Tool",
  version: '0',
};

const project = new GraphQLClientProject({
  config: new ApolloConfig(config) as ClientConfig,
  loadingHandler: new MockLoadingHandler(),
  rootURI: URI.file(__dirname),
  clientIdentity
});

const manifest = Object.entries(
  project.mergedOperationsAndFragmentsForService
).map(([operationName, operationAST]) => {
  const hash = printWithReducedWhitespace(
    sortAST(
      hideStringAndNumericLiterals(
        dropUnusedDefinitions(operationAST, operationName)
      )
    )
  );

  return { operationName, hash };
});

console.log(manifest);