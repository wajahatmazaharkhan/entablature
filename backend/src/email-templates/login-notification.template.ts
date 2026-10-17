import juice from "juice";
import fs from "fs";
import path from "path";
import { createRequire } from "module";

interface LoginNotificationParams {
  loginTime: string;
  ipAddress: string;
  userAgent: string;
}

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (ch) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[ch] as string,
  );

const require = createRequire(import.meta.url);

const bootstrapCss = fs.readFileSync(
  require.resolve("bootstrap/dist/css/bootstrap.min.css"),
  "utf-8",
);
const buildLoginNotificationMarkup = ({
  loginTime,
  ipAddress,
  userAgent,
}: LoginNotificationParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Sign-in Notification | Entablature</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif; color: #111111;">

  <div class="container py-5" style="width: 100%; padding: 40px 0;">

    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7"
           style="width: 100%; max-width: 640px; margin: 0 auto;">

        <!-- Main Email Card -->
        <div class="bg-white rounded-3 shadow-sm overflow-hidden"
             style="background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <div class="d-flex justify-content-between align-items-center px-4 px-md-5 py-4 border-bottom"
               style="padding: 24px 36px; border-bottom: 1px solid #e5e5e5;">

            <span class="fs-4 fw-bold text-dark"
                  style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #111111;">
              Entablature Portal
            </span>
          </div>

          <!-- Email Content -->
          <div class="px-4 px-md-5 py-5"
               style="padding: 40px 36px;">

            <!-- Notification Label -->
            <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 1.8px; color: #666666; text-transform: uppercase;">
              Security Notification
            </p>

            <h1 class="fw-bold text-dark"
                style="margin: 0 0 20px; font-size: 28px; line-height: 1.3; font-weight: 700; color: #111111;">
              New sign-in detected
            </h1>

            <p style="margin: 0 0 14px; font-size: 15px; line-height: 1.8; color: #444444;">
              A new sign-in to your Entablature portal account was recorded. For your
              security, we are sharing the details of this activity with you.
            </p>

            <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.8; color: #444444;">
              <strong style="color: #111111;">No action is required</strong> if you
              initiated this sign-in. If you do not recognise this activity,
              please contact our support team promptly for assistance.
            </p>

            <!-- Sign-in Details -->
            <div style="margin: 0 0 28px; border: 1px solid #e5e5e5; border-radius: 6px; overflow: hidden;">

              <div style="padding: 16px 18px; background-color: #111111;">
                <h2 style="margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 0.8px; color: #ffffff; text-transform: uppercase;">
                  Sign-in Details
                </h2>
              </div>

              <table role="presentation"
                     width="100%"
                     cellpadding="0"
                     cellspacing="0"
                     border="0"
                     style="width: 100%; border-collapse: collapse;">

                <tbody>
                  <tr>
                    <td width="35%"
                        style="padding: 15px 18px; border-bottom: 1px solid #eeeeee; font-size: 13px; color: #666666; vertical-align: top;">
                      Time
                    </td>
                    <td style="padding: 15px 18px; border-bottom: 1px solid #eeeeee; font-size: 13px; font-weight: 600; line-height: 1.6; color: #111111; word-break: break-word;">
                      ${escapeHtml(loginTime)}
                    </td>
                  </tr>

                  <tr>
                    <td width="35%"
                        style="padding: 15px 18px; border-bottom: 1px solid #eeeeee; font-size: 13px; color: #666666; vertical-align: top;">
                      IP Address
                    </td>
                    <td style="padding: 15px 18px; border-bottom: 1px solid #eeeeee; font-size: 13px; font-weight: 600; line-height: 1.6; color: #111111; word-break: break-word;">
                      ${escapeHtml(ipAddress)}
                    </td>
                  </tr>

                  <tr>
                    <td width="35%"
                        style="padding: 15px 18px; font-size: 13px; color: #666666; vertical-align: top;">
                      Device / Browser
                    </td>
                    <td style="padding: 15px 18px; font-size: 13px; font-weight: 600; line-height: 1.6; color: #111111; word-break: break-word;">
                      ${escapeHtml(userAgent)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Support Guidance -->
            <div style="padding: 18px 20px; background-color: #f8f8f8; border-left: 3px solid #111111; margin-bottom: 28px;">
              <p style="margin: 0 0 6px; font-size: 14px; font-weight: 700; color: #111111;">
                Do you have a security concern?
              </p>
              <p style="margin: 0; font-size: 13px; line-height: 1.8; color: #555555;">
                If this sign-in was not initiated by you, contact Entablature support
                team so they can guide you through the appropriate security steps.
              </p>
            </div>

            <p style="margin: 0; font-size: 13px; line-height: 1.8; color: #666666;">
              This is an automated security notification. You do not need to reply
              to this email.
            </p>

          </div>

          <!-- Footer -->
          <div style="padding: 24px 36px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">

            <p style="margin: 0 0 10px; font-size: 12px; line-height: 1.8; color: #666666;">
              You are receiving this notification to help keep your Entablature
              account informed about sign-in activity.
            </p>

            <p style="margin: 0 0 6px; font-size: 12px; line-height: 1.7; color: #666666;">
              &copy; 2026 Entablature. All rights reserved.
            </p>

            <p style="margin: 0; font-size: 12px; line-height: 1.7; color: #666666;">
              New Delhi - 110019, India
            </p>

          </div>
        </div>

        <!-- Bottom Brand Line -->
        <div style="padding: 20px 10px 0; text-align: center;">
          <p style="margin: 0; font-size: 11px; line-height: 1.7; letter-spacing: 0.5px; color: #777777;">
            Entablature &nbsp;|&nbsp; ACCOUNT SECURITY
          </p>
        </div>

      </div>
    </div>
  </div>

</body>
</html>
`;

export const loginNotificationTemplate = (
  params: LoginNotificationParams,
): string => {
  const rawHtml = buildLoginNotificationMarkup(params);

  return juice.inlineContent(rawHtml, bootstrapCss, {
    removeStyleTags: true,
    preserveMediaQueries: true,
    applyStyleTags: true,
    xmlMode: false,
  });
};
