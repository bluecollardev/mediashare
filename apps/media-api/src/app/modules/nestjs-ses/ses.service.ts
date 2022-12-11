import { Injectable, Inject } from '@nestjs/common';
import { SES_MODULE_OPTIONS, SesModuleOptions } from './ses.struct';
import * as ses from 'node-ses';

export interface SesEmailOptions {
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  html?: string;
  cc?: string;
  bcc?: string[];
  text?: string;
}

@Injectable()
export class SesService {
  constructor(
    @Inject(SES_MODULE_OPTIONS) private readonly options: SesModuleOptions
  ) {
    this.ses = ses.createClient({
      amazon: `https://email.${options.region}.amazonaws.com`,
      key: options.akiKey,
      secret: options.secret,
    });

    console.log(`[SesService constructor] `);
    console.log(`[SesService] SesService SES client: ${JSON.stringify(this.ses)}`);
  }

  private readonly ses;

  public sendEmail(emailOptions: SesEmailOptions): Promise<boolean> {
    const email = {
      ...emailOptions,
      message: emailOptions.html,
      altText: emailOptions.text,
    };
    delete email.html;
    delete email.text;
    if (!email.message) {
      delete email.message;
    }
    if (!email.text) {
      delete email.text;
    }
    delete email.html;
    return new Promise((resolve, reject) => {
      this.ses.sendEmail(email, (err, data, res) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}
