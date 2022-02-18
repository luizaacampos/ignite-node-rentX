import { container } from 'tsyringe';
import { SESMailProvider } from './implementations/SESMailProvider';
import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    SES: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);