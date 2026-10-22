import * as React from "react";

export function SubscribedEmailTemplate() {
  return (
    <div>
      <h1>Welcome!</h1>
      <h3>
        Thank you for subscribing to our newsletter. We're glad to have you with
        us.
      </h3>
      <h4>
        From time to time, we'll send you useful notifications updates, and
        other content we think you'll find valuable. We appreciate you being
        here and look forward to staying connected.
      </h4>
      <p>Best regards, The Nursingpastco Team</p>
      <p>© ${new Date().getFullYear()} nursingpastco. All rights reserved.</p>
    </div>
  );
}

export function UnsubscribedEmailTemplate() {
  return (
    <div>
      <h2>You have been unsubscribed to our newsletter successfully</h2>

      <h3>
        From now on, you will no longer recieve email notifications from us. if
        you want to subscribe again in the future, you can do so at any time.
      </h3>
      <p>Best regards, The Nursingpastco Team</p>
      <p>© {new Date().getFullYear()} nursingpastco. All rights reserved.</p>
    </div>
  );
}
