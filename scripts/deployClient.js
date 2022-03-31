const Deploy = require("./deployBase").default;

const deployClient = new Deploy({
  localRoot: `${__dirname}/../build`,
  remoteRoot: "/shekharkhedekar/",
  url: "http://shekharkhedekar.com",
});

deployClient.deploy();
