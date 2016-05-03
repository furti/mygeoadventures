var express = require('express'),
  fallback = require('express-history-api-fallback'),
  server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
  server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  server = express(),
  projectService = require('./server/ProjectService').instance,
  rootFolder = 'target';

server.get('/data/projects', function(req, resp) {
  resp.send(projectService.getProjects());
});

server.use(express.static(rootFolder));
server.use(fallback('index.html', {
  root: rootFolder
}));

server.listen(server_port, server_ip_address, function() {
  console.log("Listening on " + server_ip_address + ", server_port " + server_port);
});
