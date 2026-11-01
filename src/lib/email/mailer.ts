import nodemailer from 'nodemailer'

interface OrganizerAlertParams {
  submissionId: string
  verificationToken?: string
  name: string
  email: string
  isKeywordCorrect: boolean
  isFirstBloodCandidate: boolean
  serverTime: Date
  ip: string
  userAgent?: string
}

interface StudentReceiptParams {
  name: string
  email: string
  serverTime: Date
}

interface StudentVerifiedParams {
  name: string
  email: string
  rank: number
  isFirstBlood: boolean
  serverTime: Date
}

function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT || '465', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

const getFromAddress = () =>
  process.env.SMTP_FROM || `"APPISTRY" <no-reply@appistry.com>`

/**
 * 1. Send submission alert email to the ORGANIZER with 1-click verify button
 */
export async function sendSubmissionNotification(params: OrganizerAlertParams): Promise<boolean> {
  const recipient =
    process.env.ORGANIZER_NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    'ravikumarkeshari307@gmail.com'

  const formattedTime = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  }).format(params.serverTime)

  const isoTime = params.serverTime.toISOString()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const verifyUrl = params.verificationToken
    ? `${siteUrl}/api/submissions/verify?id=${params.submissionId}&token=${params.verificationToken}`
    : `${siteUrl}/admin/dashboard`

  const keywordStatus = params.isKeywordCorrect
    ? 'Matches Official Keyword'
    : 'Did Not Match'

  const subject = `[New Submission] ${params.name} — The Hidden Key (${params.isKeywordCorrect ? 'Key Matched' : 'Key Incorrect'})`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040814; color: #e6edf8; margin: 0; padding: 24px 12px; }
          .card { max-width: 580px; margin: 0 auto; background: #081126; border: 1px solid rgba(0, 210, 255, 0.22); border-radius: 18px; padding: 32px 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
          .header { border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 16px; margin-bottom: 22px; }
          .brand { font-size: 18px; font-weight: 800; letter-spacing: 0.06em; color: #ffffff; }
          .subbrand { font-size: 10px; font-weight: 700; color: #ff007f; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 2px; }
          .pill { display: inline-block; padding: 5px 12px; border-radius: 9999px; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; background: ${params.isKeywordCorrect ? 'rgba(0, 210, 255, 0.12)' : 'rgba(239, 68, 68, 0.12)'}; color: ${params.isKeywordCorrect ? '#00d2ff' : '#f87171'}; border: 1px solid ${params.isKeywordCorrect ? 'rgba(0, 210, 255, 0.35)' : 'rgba(239, 68, 68, 0.35)'}; margin-bottom: 14px; }
          .title { font-size: 21px; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; }
          .desc { font-size: 13px; color: rgba(255, 255, 255, 0.7); line-height: 1.5; margin: 0 0 20px 0; }
          .table { width: 100%; border-collapse: collapse; margin: 16px 0; background: rgba(0, 0, 0, 0.35); border-radius: 10px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.06); }
          .table td { padding: 11px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; }
          .table tr:last-child td { border-bottom: none; }
          .table td.lbl { color: rgba(255, 255, 255, 0.45); width: 140px; font-family: monospace; font-size: 11px; text-transform: uppercase; }
          .table td.val { color: #ffffff; font-weight: 600; }
          .box { background: rgba(0, 210, 255, 0.08); border: 1px solid rgba(0, 210, 255, 0.3); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .btn { display: inline-block; background: #00d2ff; color: #040814 !important; font-weight: 800; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 10px; }
          .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: rgba(255, 255, 255, 0.35); text-align: center; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="brand">APPISTRY</div>
            <div class="subbrand">STC IIT PATNA HYBRID</div>
          </div>

          <div class="pill">${params.isKeywordCorrect ? 'Keyword Match' : 'Keyword Mismatch'}</div>
          <h1 class="title">New Submission Recorded</h1>
          <p class="desc">A participant has submitted their answer for The Hidden Key challenge. Here are the recorded details:</p>

          <table class="table">
            <tr>
              <td class="lbl">Participant</td>
              <td class="val">${params.name}</td>
            </tr>
            <tr>
              <td class="lbl">Student Email</td>
              <td class="val"><a href="mailto:${params.email}" style="color: #00d2ff; text-decoration: none;">${params.email}</a></td>
            </tr>
            <tr>
              <td class="lbl">Keyword Result</td>
              <td class="val" style="color: ${params.isKeywordCorrect ? '#00d2ff' : '#f87171'}; font-weight: 700;">
                ${keywordStatus}
              </td>
            </tr>
            <tr>
              <td class="lbl">Recorded Time (IST)</td>
              <td class="val">${formattedTime}</td>
            </tr>
            <tr>
              <td class="lbl">UTC Timestamp</td>
              <td class="val" style="font-family: monospace; font-size: 11px;">${isoTime}</td>
            </tr>
            <tr>
              <td class="lbl">Client IP</td>
              <td class="val" style="font-family: monospace; font-size: 11px;">${params.ip}</td>
            </tr>
          </table>

          ${params.isKeywordCorrect ? `
            <div class="box">
              <div style="font-size: 13px; font-weight: 700; color: #00d2ff; margin-bottom: 6px;">
                Review &amp; Leaderboard Verification
              </div>
              <p style="font-size: 12px; color: rgba(255,255,255,0.75); line-height: 1.5; margin: 0 0 16px 0;">
                Click below whenever you want to approve this solve. Once approved, the participant will officially appear on the Public Leaderboard based on their recorded timestamp.
              </p>
              <a href="${verifyUrl}" class="btn">
                Approve &amp; Publish on Leaderboard
              </a>
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 14px;">
            <a href="${siteUrl}/admin/dashboard" style="color: rgba(255,255,255,0.6); font-size: 12px; text-decoration: underline;">
              Open Admin Console
            </a>
          </div>

          <div class="footer">
            APPISTRY &bull; App Development Club, STC IIT Patna Hybrid
          </div>
        </div>
      </body>
    </html>
  `

  try {
    const transporter = getTransporter()
    if (!transporter) return false

    await transporter.sendMail({
      from: getFromAddress(),
      to: recipient,
      subject,
      html,
    })

    console.log(`[Mailer] Submission alert sent to organizer (${recipient}) for ${params.email}`)
    return true
  } catch (error) {
    console.error('[Mailer] Failed to send organizer alert:', error)
    return false
  }
}

/**
 * 2. Send automatic confirmation receipt to the STUDENT
 * Human, friendly, top-notch presentation from no-reply@appistry.com
 */
export async function sendStudentReceiptEmail(params: StudentReceiptParams): Promise<boolean> {
  const formattedTime = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  }).format(params.serverTime)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const subject = `We've received your submission for The Hidden Key | APPISTRY IIT Patna`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #040814;
            color: #e6edf8;
            margin: 0;
            padding: 24px 12px;
          }
          .card {
            max-width: 580px;
            margin: 0 auto;
            background: #081126;
            border: 1px solid rgba(0, 210, 255, 0.22);
            border-radius: 20px;
            padding: 36px 30px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.85);
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 18px;
            margin-bottom: 24px;
          }
          .brand {
            font-size: 20px;
            font-weight: 900;
            letter-spacing: 0.05em;
            color: #ffffff;
            margin: 0;
          }
          .subbrand {
            font-size: 10px;
            font-weight: 700;
            color: #ff007f;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            margin-top: 2px;
          }
          .badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: rgba(0, 210, 255, 0.12);
            color: #00d2ff;
            border: 1px solid rgba(0, 210, 255, 0.35);
            margin-bottom: 16px;
          }
          .heading {
            font-size: 22px;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 14px 0;
          }
          .message {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.85);
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin: 18px 0;
            background: rgba(0, 0, 0, 0.35);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.06);
          }
          .table td {
            padding: 12px 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 13px;
          }
          .table tr:last-child td {
            border-bottom: none;
          }
          .table td.lbl {
            color: rgba(255, 255, 255, 0.45);
            width: 140px;
            font-family: monospace;
            font-size: 11px;
            text-transform: uppercase;
          }
          .table td.val {
            color: #ffffff;
            font-weight: 600;
          }
          .info-box {
            background: rgba(0, 210, 255, 0.06);
            border-left: 3px solid #00d2ff;
            border-radius: 8px;
            padding: 16px 18px;
            margin: 24px 0;
          }
          .info-title {
            font-size: 12px;
            font-weight: 700;
            color: #00d2ff;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 6px;
          }
          .info-text {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.75);
            line-height: 1.6;
            margin: 0;
          }
          .btn-container {
            text-align: center;
            margin: 28px 0 12px 0;
          }
          .btn-link {
            display: inline-block;
            background: linear-gradient(90deg, #00d2ff 0%, #2563eb 100%);
            color: #ffffff !important;
            font-weight: 700;
            font-size: 13px;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 10px;
            letter-spacing: 0.02em;
          }
          .signature {
            margin-top: 24px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
          }
          .footer {
            margin-top: 28px;
            padding-top: 18px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            font-size: 11px;
            color: rgba(255, 255, 255, 0.35);
            text-align: center;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div>
              <div class="brand">APPISTRY</div>
              <div class="subbrand">STC IIT PATNA HYBRID</div>
            </div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.45); font-family: monospace;">THE HIDDEN KEY</div>
          </div>

          <div class="badge">SUBMISSION RECEIVED</div>
          <h1 class="heading">We've got your submission!</h1>

          <p class="message">
            Hi <strong>${params.name}</strong>,<br><br>
            Thank you for participating in <strong>The Hidden Key</strong>! We're writing to let you know that your submission has been safely received and logged on our server with an exact atomic timestamp.
          </p>

          <table class="table">
            <tr>
              <td class="lbl">Participant</td>
              <td class="val">${params.name}</td>
            </tr>
            <tr>
              <td class="lbl">Registered Email</td>
              <td class="val">${params.email}</td>
            </tr>
            <tr>
              <td class="lbl">Recorded Time (IST)</td>
              <td class="val">${formattedTime}</td>
            </tr>
            <tr>
              <td class="lbl">Status</td>
              <td class="val" style="color: #00d2ff;">Received &bull; Awaiting Review</td>
            </tr>
          </table>

          <div class="info-box">
            <div class="info-title">What happens next?</div>
            <p class="info-text">
              Once the event wraps up, our team will review all entries against the official secret keyword. If your submission is verified and you have one of the fastest solve times (or the First Blood solve!), we'll notify you directly via email and publish your official rank on the Public Leaderboard.
            </p>
          </div>

          <div class="btn-container">
            <a href="${siteUrl}/leaderboard" class="btn-link">
              View Public Leaderboard &rarr;
            </a>
          </div>

          <div class="signature">
            Best of luck,<br>
            <strong>Team APPISTRY</strong><br>
            <span style="font-size: 11px; color: rgba(255, 255, 255, 0.5);">App Development Club &bull; Student Technical Council (STC), IIT Patna Hybrid</span>
          </div>

          <div class="footer">
            This is an automated dispatch from no-reply@appistry.com. Please keep this email as your official participation receipt.
          </div>
        </div>
      </body>
    </html>
  `

  try {
    const transporter = getTransporter()
    if (!transporter) return false

    await transporter.sendMail({
      from: getFromAddress(),
      to: params.email,
      subject,
      html,
    })

    console.log(`[Mailer] Human acknowledgment receipt delivered to ${params.email}`)
    return true
  } catch (error) {
    console.error(`[Mailer] Failed to send receipt to student ${params.email}:`, error)
    return false
  }
}

/**
 * 3. Send congratulations email to the STUDENT when their solve is officially verified
 */
export async function sendStudentVerifiedEmail(params: StudentVerifiedParams): Promise<boolean> {
  const formattedTime = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  }).format(params.serverTime)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const subject = params.isFirstBlood
    ? `Congratulations! You've achieved First Blood on The Hidden Key | APPISTRY IIT Patna`
    : `Your solve has been verified! (Rank #${params.rank}) | APPISTRY The Hidden Key`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040814; color: #e6edf8; margin: 0; padding: 24px 12px; }
          .card { max-width: 580px; margin: 0 auto; background: #081126; border: 1px solid rgba(0, 210, 255, 0.35); border-radius: 20px; padding: 36px 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.85); }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 18px; margin-bottom: 24px; }
          .brand { font-size: 20px; font-weight: 900; letter-spacing: 0.05em; color: #ffffff; }
          .subbrand { font-size: 10px; font-weight: 700; color: #ff007f; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 2px; }
          .badge { display: inline-block; padding: 5px 12px; border-radius: 9999px; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; background: ${params.isFirstBlood ? 'rgba(255, 0, 85, 0.15)' : 'rgba(0, 210, 255, 0.15)'}; color: ${params.isFirstBlood ? '#ff0055' : '#00d2ff'}; border: 1px solid ${params.isFirstBlood ? 'rgba(255, 0, 85, 0.4)' : 'rgba(0, 210, 255, 0.4)'}; margin-bottom: 16px; }
          .heading { font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0; }
          .message { font-size: 14px; color: rgba(255, 255, 255, 0.85); line-height: 1.6; margin-bottom: 20px; }
          .rank-card { background: linear-gradient(180deg, rgba(0, 210, 255, 0.12) 0%, rgba(37, 99, 235, 0.06) 100%); border: 1px solid rgba(0, 210, 255, 0.35); border-radius: 14px; padding: 24px; text-align: center; margin: 22px 0; }
          .rank-number { font-size: 46px; font-weight: 900; color: #00d2ff; font-family: monospace; line-height: 1; margin: 8px 0; }
          .btn-link { display: inline-block; background: #00d2ff; color: #040814 !important; font-weight: 800; font-size: 13px; text-decoration: none; padding: 13px 30px; border-radius: 10px; }
          .footer { margin-top: 28px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: rgba(255, 255, 255, 0.35); text-align: center; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div>
              <div class="brand">APPISTRY</div>
              <div class="subbrand">STC IIT PATNA HYBRID</div>
            </div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.45); font-family: monospace;">THE HIDDEN KEY</div>
          </div>

          <div class="badge">${params.isFirstBlood ? 'First Blood Winner' : 'Officially Verified'}</div>
          <h1 class="heading">${params.isFirstBlood ? 'Outstanding Achievement — First Blood!' : 'Your solve has been verified!'}</h1>

          <p class="message">
            Hi <strong>${params.name}</strong>,<br><br>
            Great news! Your solution for <strong>The Hidden Key</strong> has been reviewed and officially verified by our team.
          </p>

          <div class="rank-card">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); text-transform: uppercase;">
              Official Leaderboard Standing
            </div>
            <div class="rank-number">#${params.rank}</div>
            <div style="font-size: 12px; color: rgba(255,255,255,0.7); font-family: monospace;">
              Recorded Solve Time: ${formattedTime}
            </div>
          </div>

          <div style="text-align: center; margin: 26px 0 10px 0;">
            <a href="${siteUrl}/leaderboard" class="btn-link">
              View Your Rank On Live Board &rarr;
            </a>
          </div>

          <div style="margin-top: 24px; font-size: 13px; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
            Congratulations on cracking the puzzle!<br>
            <strong>Team APPISTRY</strong><br>
            <span style="font-size: 11px; color: rgba(255, 255, 255, 0.5);">Student Technical Council (STC), IIT Patna Hybrid</span>
          </div>

          <div class="footer">
            Official certificate and event details will follow shortly.
          </div>
        </div>
      </body>
    </html>
  `

  try {
    const transporter = getTransporter()
    if (!transporter) return false

    await transporter.sendMail({
      from: getFromAddress(),
      to: params.email,
      subject,
      html,
    })

    console.log(`[Mailer] Student verified announcement delivered to ${params.email}`)
    return true
  } catch (error) {
    console.error(`[Mailer] Failed to send verified announcement to ${params.email}:`, error)
    return false
  }
}
