import { ProfileDto } from '../user/dto/profile.dto';

export default ({ _id, firstName, lastName }: ProfileDto) => {
  return `
    <h3>Hello,</h3>
    <br />
    <p>${[firstName, lastName].join(' ')} has invited you to join their network on the Mediashare app.</p>
    <p>Please click the following link to <a href="${process.env['INVITATION_REQUEST_URL'].replace('{{userId}}', _id)}" style="text-decoration: underline">open the invitation</a> in the Mediashare app.</p>
  `;
};
