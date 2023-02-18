import nodemailer, { getTestMessageUrl } from "nodemailer";

//configure and send email

const sendEmail = async (emailBody) => {
  try {
    //config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //send Email
    const info = await transporter.sendMail(emailBody);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer);
    getTestMessageUrl(info);
  } catch (error) {
    console.log(error);
  }
};

//make email template and data ready
export const newAccountEmailVerificationEmail = (link, obj) => {
  const emailBody = {
    from: `"Programming with Shital", <$ {obj.email} >`,
    to: process.env.EMAIL_USER,
    subject: "Verify Your Email",
    text: "Please follow the link to verify your account" + link,
    html: `
    <p>Hello ${obj.fName} !!</p>
    <br>
    <p>
    Please folllow the link tp verify your account</p>
    <br>
    <p>
    Hi <a href=${link} > ${link}</a>
    </p>
    <br>
    <p>
    Regards,
    <br>
    Programming with Shital Support Team
    </p>
    `,
  };
};

//email verification notification

export const emailVerificationNotification = ({ fName, email }) => {
  const emailBody = {
    from: `"Programming with Shital", <${process.env.EMAIL_USER} > `,
    to: email,
    subject: "Account Verified",
    text: "Your account has been verified. You may login now.",
    html: `
            <p>Hello ${fName}</p>
            <br>
            <p>
            Your account has been verified. You may login now.
            </p>
            <br>
            <p> 
            Hi <a href = "${process.env.FRONTEND_ROOT_URL}" style = "background: green; color:white; padding:1rem 2.5px" >Login</a>
            </p>
            <br>
            <p>
            Regards,
            <br>
            Programming with Shital Support Team
            </p>
            `,
  };
  sendEmail(emailBody);
};
