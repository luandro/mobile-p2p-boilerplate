const DefaultMessage = `
  type DefaultMessage implements Message {
    content: String
    key: String!
    sequence: Int!
    timestamp: Float!
    type: String!
  }
`
module.exports = () => [DefaultMessage]