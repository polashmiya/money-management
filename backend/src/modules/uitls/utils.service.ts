import { ResponceData } from './../../model/responce-data.model';
import { responceData } from './../../utils/responce-data.util';
import { EmailDTO } from './dto/sendEmail.dto';
import { HttpStatus, Injectable } from '@nestjs/common';

// import * as fs from 'fs';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class UitlsService {
  sendEmail(body: EmailDTO): Promise<ResponceData> {
    console.log(body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // const filePath = 'test.pdf';
    // const attachment = fs.readFileSync(filePath).toString('base64');

    const message = {
      to: body.to,
      from: 'masbha@appxify.com',
      subject: body.subject,
      text: body.text,
      html: body.html,

      // attachments: [
      //   {
      //     content: attachment,
      //     filename: 'attachment.pdf',
      //     type: 'application/pdf',
      //     disposition: 'attachment',
      //   },
      // ],

      // the line commented above will be available when i will implements file upload functionality
      // i tested those line those are working fine now
    };

    return sgMail
      .send(message)
      .then(() => {
        return responceData('Email Sent', HttpStatus.OK, message);
      })
      .catch((error) => {
        return error;
      });
  }
}
