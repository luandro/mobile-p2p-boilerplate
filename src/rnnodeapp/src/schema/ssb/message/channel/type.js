const ChannelMessage = `
  type ChannelMessage implements Message {
    channel: String!
    content: String
    key: String!
    sequence: Int!
    subscribed: Boolean!
    timestamp: Float!
    type: String!
  }
`
module.exports = () => [ChannelMessage]
