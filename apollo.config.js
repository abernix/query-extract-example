module.exports = {
  // Required to be defined, at least.  Your own configuration may already
  // have these set, but for the purposes of the example, I've left it empty.
  engine: {},
  client: {
    name: "my-app",
    // This could be a real schema, or some other configuration, but for this
    // example, I've left it empty.
    service: { localSchemaFile: './schema.graphql' },
    version: "v1",
    includes: ["./query*.graphql"],
    excludes: [],
    addTypename: false,
  }
};