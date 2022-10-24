import { ProfileDto } from '../user/dto/profile.dto';

export default ({ _id, firstName }: ProfileDto) => {
  return `
    <h3>Hello,</h3>
    <br />
    <p>${firstName} has invited you to join their network on the Mediashare app.</p>
    <p>Please click the following <a href="${process.env['INVITATION_REQUEST_URL'].replace('{{userId}}', _id)}">link</a>, or copy and paste the following URL
    <br />${process.env['INVITATION_REQUEST_URL'].replace('{{userId}}', _id)}<br />
    into your browser to create an account and / or join their network.
    </p>
  `;
};
