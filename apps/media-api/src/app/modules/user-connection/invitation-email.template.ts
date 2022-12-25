import { ProfileDto } from '../user/dto/profile.dto';

/**
 * Problem: Some email clients (i.e Outlook) only recognize the
 * http:// or https:// protocol and NOT the mobile app protocol
 * (i.e exampleapp://).
 *
 * Moreover, these email clients usually strip away the value in hrefs or
 * remove the <a> tag altogether due to security concerns.
 * This prevents the user from clicking on the link and thus the whole
 * redirection process from email to mobile app is halted.
 */

export default ({ _id, firstName, lastName }: ProfileDto, email) => {
  const invitationRequestUrl = process.env['INVITATION_REQUEST_URL'];
  const emailUnsubscribeUrl = process.env['EMAIL_UNSUBSCRIBE_URL'];
  const emailPreferencesUrl = process.env['EMAIL_PREFERENCES_URL'];
  const fullName = [firstName, lastName].join(' ');
  const formAction = invitationRequestUrl
    .replace('{{userId}}', _id)
  return `
    <html>
      <body>
        <form action="${formAction}" method="get">
          <p>Hello,</p>
          <p>${fullName} has invited you to join their network on Mediashare.</p>
          <p>To accept this invitation, please click the button below to open the invitation in the Mediashare app.</p>
          <p><input type="submit" value="Open in App" /></p>
          <hr />
          <p>
            <small>
              This invitation was intended for <b>${email}</b> and was sent on behalf of ${fullName} using the Mediashare app.
              If you suspect that you've received a "phishing" email impersonating Mediashare, or to report any suspected abuse, please forward the entire email to report-abuse@bluecollardev.com.
            </small>
          </p>
          <p>
            <small>
              If you don't want to receive these emails from Mediashare in the future, you can
              <a href="${emailPreferencesUrl.replace('{{userId}}', _id)}">edit your profile</a> or
              <a href="${emailUnsubscribeUrl.replace('{{userId}}', _id)}">unsubscribe</a>.
             </small>
          </p>
        </form>
      </body>
    </html>
  `;
};
