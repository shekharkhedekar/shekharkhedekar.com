const Deploy = require('../../scripts/deployBase').default;

const deployClient = new Deploy({
  localRoot: `${__dirname}/../build`,
  remoteRoot: '/wgirankings/update/',
});

deployClient.deploy();
