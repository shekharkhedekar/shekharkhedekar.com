const Deploy = require('../../deploy-base/build/deployBase').default;

const deployClient = new Deploy({
    localRoot: `${__dirname}/../build`,
    remoteRoot: '/shekharkhedekar/',
    url: 'https://shekharkhedekar.com',
    // deleteRemote: true,
    uploadNewFilesOnly: true,
});

deployClient.deploy();
