import juice from "juice";
import fs from "fs";
import path from "path";
import { createRequire } from "module";

interface BlogStatusUpdateParams {
  recipientName: string;
  blogTitle: string;
  status: "DRAFT" | "PENDING" | "APPROVED" | "PUBLISHED" | "REJECTED";
  feedbackNotes?: string;
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

// Maps each status to a heading, supporting copy, and a badge color
// so the template stays purely data-driven per status.
const statusCopy: Record<
  BlogStatusUpdateParams["status"],
  { heading: string; message: string; badgeClass: string; badgeLabel: string }
> = {
  DRAFT: {
    heading: "Your document was moved to draft",
    message:
      "Your document has been moved back to draft. You can continue editing it and resubmit whenever you're ready.",
    badgeClass: "bg-secondary",
    badgeLabel: "Draft",
  },
  PENDING: {
    heading: "Your document is pending review",
    message:
      "Your document has been submitted and is now pending review by our editorial team. We'll notify you as soon as a decision is made.",
    badgeClass: "bg-warning text-dark",
    badgeLabel: "Pending Review",
  },
  APPROVED: {
    heading: "Your document has been approved",
    message:
      "Good news — your document has been approved by our editorial team and is on track to be published.",
    badgeClass: "bg-primary",
    badgeLabel: "Approved",
  },
  PUBLISHED: {
    heading: "Your document is now live",
    message:
      "Your document has been reviewed and published. It's now visible to readers on Entablature.",
    badgeClass: "bg-success",
    badgeLabel: "Published",
  },
  REJECTED: {
    heading: "Your document was not approved",
    message:
      "After review, your document was not approved for publishing. Please see the feedback below for details on what to revise.",
    badgeClass: "bg-danger",
    badgeLabel: "Rejected",
  },
};

const buildBlogStatusUpdateMarkup = ({
  recipientName,
  blogTitle,
  status,
  feedbackNotes,
}: BlogStatusUpdateParams): string => {
  const { heading, message, badgeClass, badgeLabel } = statusCopy[status];

  const feedbackBlock = feedbackNotes?.trim()
    ? `
      <div class="text-start bg-light border rounded-3 p-3 p-md-4 mb-4">
        <p class="text-muted small text-uppercase fw-bold mb-2">Editorial Feedback</p>
        <p class="text-dark small mb-0" style="white-space: pre-wrap;">${escapeHtml(
          feedbackNotes,
        )}</p>
      </div>
    `
    : "";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document Status Update</title>
  </head>
  <body class="bg-light">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7">

          <div class="bg-white rounded-3 shadow-sm overflow-hidden">

            <div class="d-flex justify-content-between align-items-center px-4 px-md-5 pt-4 pb-3 border-bottom border-2 border-dark">
              <span class="fs-4 fw-bold text-dark">Entablature</span>
            </div>

            <div class="text-center px-4 px-md-5 py-5">

              <span class="badge ${badgeClass} px-3 py-2 mb-4 text-uppercase">${badgeLabel}</span>

              <h1 class="fw-semibold text-dark mb-4">${escapeHtml(heading)}</h1>

              <p class="text-secondary mb-1">
                Hi ${escapeHtml(recipientName)},
              </p>
              <p class="text-secondary mb-4">
                ${escapeHtml(message)}
              </p>

              <table class="table table-borderless table-sm w-auto mx-auto text-start mb-4">
                <tbody>
                  <tr>
                    <td class="text-muted small pe-3">Document</td>
                    <td class="text-dark small fw-semibold">${escapeHtml(blogTitle)}</td>
                  </tr>
                  <tr>
                    <td class="text-muted small pe-3">Status</td>
                    <td class="text-dark small fw-semibold">${badgeLabel}</td>
                  </tr>
                </tbody>
              </table>

              ${feedbackBlock}

              <a href="https://entablature.in/desk" class="btn btn-dark btn-lg px-4 py-3 fw-semibold mb-3">
                View document
              </a>

              <p class="text-secondary small mb-0">
                If you believe this was a mistake, please contact the editorial team.
              </p>
            </div>
          </div>

          <div class="text-center px-4 py-4">
            <p class="text-muted small mb-2">
              You're receiving this email because you are listed as an author or co-author
              on this document on Entablature.
            </p>
            <p class="text-muted small mb-1">&copy; 2026. Entablature. All rights reserved.</p>
            <p class="text-muted small mb-0">Delhi, India</p>
          </div>

          <div class="d-flex justify-content-between align-items-center px-2 pt-3">
            <a href="#" class="text-muted small text-decoration-underline">Unsubscribe</a>
            <span class="text-muted small">Secured by Entablature</span>
          </div>

        </div>
      </div>
    </div>
  </body>
  </html>
`;
};

export const blogStatusUpdateTemplate = (
  params: BlogStatusUpdateParams,
): string => {
  const rawHtml = buildBlogStatusUpdateMarkup(params);

  return juice.inlineContent(rawHtml, bootstrapCss, {
    removeStyleTags: true,
    preserveMediaQueries: true,
    applyStyleTags: true,
    xmlMode: false,
  });
};
