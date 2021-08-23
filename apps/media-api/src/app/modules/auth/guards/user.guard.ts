import { CanActivate, Inject, ExecutionContext, Logger, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as jwkToPem from 'jwk-to-pem';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../../../../../../media-auth/src/app/auth/auth.service';
import * as jwtoken from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
export const accessKey = jwkToPem({
  // alg: 'RS256',
  e: 'AQAB',
  // kid: 'YAdhKEBqfI39XUppuTw2OQgUzEuKVq6TxJYmYt/r5/A=',
  kty: 'RSA',
  n:
    '38m8j3-pyq6BmAfCVBqScYxNrJm1YLvtJx0MYttXAOAatqTG4G0-A2r-NzCbybjaLocYB4SolZRtLO-ePqvZ_c4fw1kaN0s3if--6TdglR_fa1MEpPvePkkMQkSPZmCPct77Ri-uq2sf-2cYewZvcI8ckTG3J7NFWx-mM2dPBAp4nK-lKAb5fZLw36rhSKd5PpRSe9-pWIP1Bx0MV5cdPvj3EWYJOXjPJ5fh4LIASWa1BXOHEM9kHQW6NtIhGf_GG89Qjs2B129oYaiBb43Cd_5diyPWb2MFzPiHtV8zqp6059M9rceibrc8p_7qfWMMM-swjkxC6Aw7lPLyVlSM1Q'
  // use: 'sig'
});

const idKey = jwkToPem({
  e: 'AQAB',
  kty: 'RSA',
  n:
    'q8raVkj_EJ_UF3g1FQGjIRWoTlvofJ-EObVo5NuOgVmXxt9IgnMBMrJP8r8HfY1fVgYNIgXwdePmu-QALscq7MTEXrQ118ZBCEXnz6Z9lCVDXoX899tUoQqTZWGjqOlt7BJdWMrYYwx-dNY4C9MVQtL-1jQaIOeZD5bcyPzCaBbgpklpfnf4UYNOcqqNt9WU4dmjjXmIrXaujECNRehY0yr_vQ1j238P5_Wcp0xgq7V8mMHnInAoVfPqzegCZFNsUWQrPR22jrT6OgP5o8b1E3QM4pzMyBms8uXGkkOZ4i9QbdwFTjd5XHUIUVGPyvdNCI80s_zXqOUuBZtNX1uXdQ'
});
@Injectable()
export class UserGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log(req.headers);

    const { authorization } = req.headers;

    console.log(req.isAuthenticated(authorization.replace('Bearer', '').replace(' ', '')));
    jwtoken.verify(authorization.replace('Bearer', '').replace(' ', ''), accessKey, { algorithms: ['RS256'] }, function (err, decodedToken) {
      console.log('decodedToken ', decodedToken);
      // req.session.user = decodedToken;
    });

    // return res as any;
    return;
  }
}
