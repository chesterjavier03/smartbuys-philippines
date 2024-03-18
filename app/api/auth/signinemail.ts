import { createTransport } from "nodemailer"
import path from "path"
import ejs from 'ejs'

export const CustomsendVerificationRequest = async(params: any) => {
  const { identifier, url, provider } = params
  const { host } = new URL(url)
  const transport = createTransport(provider.server)
  const jsonDirectory = path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'static' : 'public' + '/email-templates');
  
  let template = await ejs.renderFile(jsonDirectory + '/login.ejs', {url, host});
  const result = await transport.sendMail({
    to: identifier,
    from: process.env.EMAIL_FROM,
    subject: `Sign in to SmartBuys Philippines`,
    text: text({ url, host }),
    html: template,
  })

  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

const text = ({ url, host }: { url: string; host: string }) => {
  return `Sign in to SmartBuys Philippines\n${url}\n\n`
}