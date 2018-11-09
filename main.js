const request = require('request');
const yaml = require('js-yaml');
const fs = require('fs');

function getChannelMessages() {
  const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

  const options = {
    url: `https://slack.com/api/channels.history?token=${config.token}&channel=${config.channel}&count=1000`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  request(options, (error, response, body) => {
    const res = JSON.parse(body);
    const messages = res.messages;
    messages.reverse().forEach((message) => {
      console.log(message);
    });
  });
}

getChannelMessages();
