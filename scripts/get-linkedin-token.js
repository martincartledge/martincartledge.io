#!/usr/bin/env node

/**
 * LinkedIn OAuth Token Generator
 *
 * This script helps you get a LinkedIn OAuth access token
 * by starting a local server and walking through the OAuth flow.
 *
 * Usage:
 * 1. Set environment variables:
 *    export LINKEDIN_CLIENT_ID=your_client_id
 *    export LINKEDIN_CLIENT_SECRET=your_client_secret
 * 2. Run: node scripts/get-linkedin-token.js
 * 3. Follow the instructions in your browser
 */

import http from 'http';
import { parse } from 'url';
import open from 'open';

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8080/callback';
const PORT = 8080;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Missing required environment variables:');
  console.error('   LINKEDIN_CLIENT_ID');
  console.error('   LINKEDIN_CLIENT_SECRET');
  console.error('');
  console.error('Get these from: https://www.linkedin.com/developers/apps');
  process.exit(1);
}

async function exchangeCodeForToken(code) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
  });

  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

async function getUserProfile(accessToken) {
  const response = await fetch('https://api.linkedin.com/v2/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get user profile: ${error}`);
  }

  return response.json();
}

const server = http.createServer(async (req, res) => {
  const { pathname, query } = parse(req.url, true);

  if (pathname === '/callback') {
    const { code, error, error_description } = query;

    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body>
            <h1>❌ Authorization Failed</h1>
            <p>Error: ${error}</p>
            <p>Description: ${error_description}</p>
          </body>
        </html>
      `);
      server.close();
      process.exit(1);
    }

    try {
      console.log('🔄 Exchanging code for access token...');
      const tokenData = await exchangeCodeForToken(code);

      console.log('🔄 Getting user profile...');
      const profile = await getUserProfile(tokenData.access_token);

      const personUrn = `urn:li:person:${profile.id}`;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                line-height: 1.6;
              }
              .success {
                background: #d4edda;
                border: 1px solid #c3e6cb;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .code-block {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                padding: 15px;
                border-radius: 5px;
                font-family: 'Monaco', 'Courier New', monospace;
                font-size: 14px;
                overflow-x: auto;
              }
              .warning {
                background: #fff3cd;
                border: 1px solid #ffeeba;
                padding: 15px;
                border-radius: 5px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="success">
              <h1>✅ Success!</h1>
              <p>Authorization complete. Save these credentials:</p>
            </div>

            <h2>1. Access Token</h2>
            <div class="code-block">
              ${tokenData.access_token}
            </div>

            <h2>2. Person URN</h2>
            <div class="code-block">
              ${personUrn}
            </div>

            <h2>3. Expires In</h2>
            <p>${tokenData.expires_in} seconds (~${Math.round(tokenData.expires_in / 86400)} days)</p>

            <div class="warning">
              <h3>⚠️ Important:</h3>
              <ul>
                <li>Save these credentials securely</li>
                <li>Add them to your GitHub Secrets or .env file</li>
                <li>The access token will expire - you'll need to regenerate it</li>
                <li>Never commit these to version control</li>
              </ul>
            </div>

            <h2>Add to GitHub Secrets:</h2>
            <div class="code-block">
LINKEDIN_ACCESS_TOKEN=${tokenData.access_token}
LINKEDIN_PERSON_URN=${personUrn}
            </div>

            <h2>Or add to .env file:</h2>
            <div class="code-block">
echo "LINKEDIN_ACCESS_TOKEN=${tokenData.access_token}" >> .env
echo "LINKEDIN_PERSON_URN=${personUrn}" >> .env
            </div>

            <p style="margin-top: 40px; color: #666;">
              You can close this window now.
            </p>
          </body>
        </html>
      `);

      console.log('');
      console.log('✅ SUCCESS! Your credentials:');
      console.log('');
      console.log('LINKEDIN_ACCESS_TOKEN=' + tokenData.access_token);
      console.log('LINKEDIN_PERSON_URN=' + personUrn);
      console.log('');
      console.log('⏰ Token expires in:', Math.round(tokenData.expires_in / 86400), 'days');
      console.log('');

      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 1000);

    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body>
            <h1>❌ Error</h1>
            <pre>${error.message}</pre>
          </body>
        </html>
      `);
      console.error('Error:', error);
      server.close();
      process.exit(1);
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=w_member_social%20r_liteprofile`;

  console.log('');
  console.log('🚀 LinkedIn OAuth Token Generator');
  console.log('');
  console.log('📝 Opening LinkedIn authorization page...');
  console.log('');
  console.log('If the browser doesn\'t open automatically, visit:');
  console.log(authUrl);
  console.log('');
  console.log('Waiting for authorization...');

  open(authUrl).catch(() => {
    console.log('Could not open browser automatically.');
  });
});
