type ContactNotificationInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
};

const wrapper = (title: string, body: string) => `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F6F8FB;font-family:Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:20px;overflow:hidden;border:1px solid #EAECF0;">
            <tr>
              <td style="background:#0A0A0B;padding:28px 32px;">
                <span style="color:#FFFFFF;font-size:18px;font-weight:700;letter-spacing:-0.01em;">Famezop <span style="color:#3D7BFF;">Technologies</span></span> <!-- logo: /logo.svg -->
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;font-size:20px;color:#0A0A0B;">${title}</h1>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#F6F8FB;color:#6B7280;font-size:12px;">
                Famezop Technologies · Kathmandu · Bengaluru · Dubai
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export function contactNotificationEmail(input: ContactNotificationInput) {
  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "—"],
    ["Phone", input.phone || "—"],
    ["Service interest", input.serviceInterest || "—"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 0;color:#6B7280;font-size:13px;width:140px;">${label}</td><td style="padding:6px 0;color:#0A0A0B;font-size:14px;">${value}</td></tr>`
    )
    .join("");

  return wrapper(
    "New lead from the website",
    `<table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
     <p style="margin:20px 0 0;color:#0A0A0B;font-size:14px;line-height:1.6;white-space:pre-wrap;">${input.message}</p>`
  );
}

export function contactConfirmationEmail(name: string) {
  return wrapper(
    `Thanks for reaching out, ${name}`,
    `<p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">
      We've received your message and a member of our team will get back to you within one business day.
      In the meantime, feel free to explore our <a href="https://www.famezop.com/portfolio" style="color:#0052FF;">recent work</a>.
    </p>`
  );
}

export function newsletterConfirmationEmail() {
  return wrapper(
    "You're subscribed",
    `<p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">
      You'll now get occasional updates from Famezop Technologies on new case studies, engineering deep-dives, and product launches. No spam, ever.
    </p>`
  );
}
