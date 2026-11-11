// Learn more https://docs.expo.dev/guides/customizing-metro
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// json-server rewrites server/db.json on every POST/DELETE (e.g. toggling a favorite).
const serverDir = path.resolve(__dirname, 'server').replace(/[/\\]/g, '[/\\\\]');
const existing = config.resolver.blockList;
config.resolver.blockList = [
  ...(Array.isArray(existing) ? existing : existing ? [existing] : []),
  new RegExp(`${serverDir}[/\\\\].*`),
];

module.exports = config;
 