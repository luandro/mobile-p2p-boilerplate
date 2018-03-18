const ContactMessage = `
  type ContactMessage implements Message {
    contact: User!
    content: String
    following: Boolean!
    key: String!
    sequence: Int!
    timestamp: Float!
    type: String!
  }
`
module.exports = () => [ContactMessage]