import sgMail from '@sendgrid/mail';
import { mailGenerator } from '../config/mail';

/**
 *
 * Generates html email template for the email
 * @param {object} options - Info needed to generate the email template
 * @param { string } options['receiverName']  Name of the recipient
 * @param { string } options['intro'] The email salutation
 * @param { string } options['text']  The text for the email
 * @param { string } options['actionBtnText']  Action button text
 * @param { string } options['actionBtnLink']  Action button link
 * @param { string } options['footerText']  Text on the email footer
 * @param { boolean } options['hasAction'] whether the email has a call to action or not
 * @returns html
 */
export const generateMailTemplate = ({
  receiverName,
  intro,
  actionText = '',
  actionBtnText = '',
  actionBtnLink = '',
  footerText = null,
  hasAction = false,
}) => mailGenerator.generate({
  body: {
    name: receiverName,
    intro,
    ...(hasAction && {
      action: {
        instructions: actionText,
        button: {
          color: '#33b5e5',
          text: actionBtnText,
          link: actionBtnLink,
        },
      },
    }),
    ...(footerText && { outro: footerText }),
  },
});

/**
 *
 *
 * @param {object} msg Contains the email data
 * @param {string} msg['to'] - the recipient email address
 * @param {string} msg['from'] - the sender email address
 * @param {string} msg['subject'] - the email subject
 * @param {string} [msg['text']] - The text if only text is to be sent
 * @param {html} msg['html'] - the email html template
 * @returns
 */
export const sendMail = async msg => {
  try {
    const sgApiKey = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(sgApiKey);
    const sent = await sgMail.send(msg);
    return sent;
  } catch (error) {
    throw new Error(error);
  }
};
