var express = require('express'),
  server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
  server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  server = express();

server.use(express.static('target'));

server.listen(server_port, server_ip_address, function() {
  console.log("Listening on " + server_ip_address + ", server_port " + server_port);
});
