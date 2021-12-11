import { responceData } from './responce-data.util';
import * as sgMail from '@sendgrid/mail';
import { HttpStatus } from '@nestjs/common';

export function trimObject(object: Object): Object {
  Object.keys(object).forEach((key) => {
    object[key] = object[key].trim();
  });
  return object;
}

export function deleteEmptyObjectProperty(object: Object): Object {
  Object.keys(object).forEach((key) => {
    if (!object[key].trim()) {
      delete object[key];
    }
  });
  return object;
}

export async function sendEmail(payload: any) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.send(payload);
    return responceData('Email Sent', HttpStatus.OK, payload);
  } catch (error) {
    return error;
  }
}
