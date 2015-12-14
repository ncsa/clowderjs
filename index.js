#!/usr/bin/env node
process.env['NODE_ENV'] = process.env['NODE_ENV'] || 'local';
module.exports = require('./lib/');
