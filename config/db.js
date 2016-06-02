// try to pick the db host and port from the followng sources in order:
// - a legacy docker LINK env variable (used by AWS)
// - a user defined env variable (may be overridden in docker run etc)
// - hard coded values (used by docker-compose and configured in docker-compose.yml)
var db_host = process.env.DB_PORT_27017_TCP_ADDR || process.env.DB_HOST || 'db';
var db_port = process.env.DB_PORT_27017_TCP_PORT || process.env.DB_PORT || 27017;

module.exports = {
  db_uri: 'mongodb://' + db_host + ':' + db_port + '/attendance-calendar'
};
