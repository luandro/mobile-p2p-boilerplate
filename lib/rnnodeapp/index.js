"use strict";
/**
 * MMMMM is a mobile app for Secure Scuttlebutt networks
 *
 * Copyright (C) 2017 Andre 'Staltz' Medeiros
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const os = require('os');
const path = require('path');
const ssbKeys = require('ssb-keys');
const mkdirp = require('mkdirp');
const manifest = require("./manifest");
const rootsPlugin = require("./roots");
const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = `
  type Query {
    hello: String!
  }

  type Counter {
    count: Int!
    countStr: String
  }

  type Subscription {
    counter: Counter!
  }
`;
const ssbPath = path.resolve(os.homedir(), '.ssb');
if (!fs.existsSync(ssbPath)) {
    mkdirp.sync(ssbPath);
}
const keys = ssbKeys.loadOrCreateSync(path.join(ssbPath, '/secret'));
const config = require('ssb-config/inject')();
config.path = ssbPath;
config.keys = keys;
config.manifest = manifest;
require('scuttlebot/index')
    .use(require('scuttlebot/plugins/plugins'))
    .use(require('scuttlebot/plugins/master'))
    .use(require('scuttlebot/plugins/gossip'))
    .use(require('scuttlebot/plugins/replicate'))
    .use(require('ssb-friends'))
    .use(require('ssb-blobs'))
    .use(require('ssb-serve-blobs'))
    .use(require('ssb-backlinks'))
    .use(require('ssb-private'))
    .use(require('ssb-about'))
    .use(require('ssb-contacts'))
    .use(require('ssb-query'))
    .use(rootsPlugin)
    .use(require('scuttlebot/plugins/invite'))
    .use(require('scuttlebot/plugins/block'))
    .use(require('scuttlebot/plugins/local'))
    .use(require('scuttlebot/plugins/logging'))
    .call(null, config);
const resolvers = {
    Query: {
        hello: () => `Hello`,
    },
    Counter: {
        countStr: counter => `Current count: ${counter.count}`,
    },
    Subscription: {
        counter: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = Math.random().toString(36).substring(2, 15); // random channel name
                let count = 0;
                setInterval(() => pubsub.publish(channel, { counter: { count: count++ } }), 2000);
                return pubsub.asyncIterator(channel);
            },
        }
    },
};
const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(() => console.log('Server is running on localhost:4000'));
//# sourceMappingURL=index.js.map