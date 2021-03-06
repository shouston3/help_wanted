const express = require('express');
const morgan = require('morgan');
require('env2')('config.env');

const githubOauth = require('./github_login.js');
const orgs = require('./get_orgs.js');
const repos = require('./get_repos.js');
const issues = require('./get_issues.js');
const startIssue = require('./start_issue.js');
const stopIssue = require('./stop_issue.js');
const authCheck = require('./auth_check.js');

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));

app.get('/login', githubOauth.login);
app.get('/welcome', githubOauth.welcome);
app.get('/orgs', [authCheck, orgs]);
app.get('/repos/:orgName', [authCheck, repos]);
app.get('/issues/:orgName/:repoName', [authCheck, issues]);
app.get('/start/:orgName/:repoName/:issueNumber', [authCheck, startIssue]);
app.get('/stop/:orgName/:repoName/:issueNumber', [authCheck, stopIssue]);

module.exports = app;
