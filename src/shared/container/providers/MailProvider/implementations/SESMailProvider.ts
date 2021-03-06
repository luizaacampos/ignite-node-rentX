import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { SES } from 'aws-sdk'
import Handlebars from 'handlebars';
import fs from "fs";

class SESMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({ 
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION,
             }),
        });
    }
    async sendMail(
        to: string, 
        subject: string, 
        variables: any, 
        path: string
        ): Promise<void> {
            const templateFileContent = fs.readFileSync(path).toString("utf-8");

            const templateParse = Handlebars.compile(templateFileContent);

            const templateHTML = templateParse(variables)
            
        await this.client.sendMail({
            to,
            from: "Rentx <noreply@emilvalido.com.br>",
            subject,
            html: templateHTML,
        });
    }

}

export { SESMailProvider };