const AboutMessage = `
  type AboutMessage implements Message {
    content: String
    key: String!
    name: String
    sequence: Int!
    timestamp: Float!
    type: String!
  }
`
module.exports = () => [AboutMessage]