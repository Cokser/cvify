import nodemailer from 'nodemailer';

const options = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(options);
export const sendActivationMail = async (email: string, link: string) => {
  await transporter.sendMail({
    to: email,
    from: options.auth.user,
    subject: 'Account activation for CVify',
    text: '',
    html:
    `
    <div>
      <h1>To Activate your account, click on link below</h1>
      <a href="${link}">${link}</a>
    </div>
    `
  })
};
