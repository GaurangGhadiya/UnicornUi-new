const protocol = 'https';
// const host = 'development.api.unicornui.com';
const host = 'development.api.unicornui.com';
const port = '';
const trailUrl = '';

// const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
// const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

// .env
// REACT_APP_ENDPOINT=https://development.api.unicornui.com

const endpoint = process.env.REACT_APP_ENDPOINT;

const config = {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: endpoint
};
export default config;
