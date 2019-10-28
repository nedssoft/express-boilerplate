require('dotenv').config();

const MailGen = require('mailgen');
// eslint-disable-next-line import/prefer-default-export
export const mailGenerator = new MailGen({
  theme: 'salted',
  product: {
    name: process.env.APP_NAME || 'Awesome App',
    link: process.env.APP_LINK || 'http://example.com',
  },
});