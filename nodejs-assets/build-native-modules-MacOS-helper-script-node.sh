#!/bin/bash
      # Helper script for Gradle to call node on macOS in case it is not found
      export PATH=$PATH:/Users/luandrovieira/Sites/swaraj/projects/app-hub-mobile/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/luandrovieira/.config/yarn/link/node_modules/.bin:/Users/luandrovieira/Sites/swaraj/projects/app-hub-mobile/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/luandrovieira/.config/yarn/link/node_modules/.bin:/Users/luandrovieira/.nvm/versions/node/v8.10.0/libexec/lib/node_modules/npm/bin/node-gyp-bin:/Users/luandrovieira/.nvm/versions/node/v8.10.0/lib/node_modules/npm/bin/node-gyp-bin:/Users/luandrovieira/.nvm/versions/node/v8.10.0/bin/node_modules/npm/bin/node-gyp-bin:/usr/local/bin:/usr/local/sbin:/Users/luandrovieira/.nvm/versions/node/v8.10.0/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/git/bin:/Users/luandrovieira/Library/Android/sdk/tools:/Users/luandrovieira/Library/Android/sdk/platform-tools:/usr/local/go/bin
      node $@
    