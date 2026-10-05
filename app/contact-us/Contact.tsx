"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { SendMessage } from "./action";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "../contexts/modalContexts";

const initialState = {
  msg: "",
  err: "",
};

function ContactUs() {
  const [state, action, pending] = useActionState(SendMessage, initialState);
  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();
  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);
  return (
    <div className="contact">
      <section>
        <h3>we'd love to hear from you</h3>
        <p>
          whether you are a nursing student looking for help, have a suggestion
          for improving the platform, want to report an issue, or simply want to
          reach out, you can contact us using the methods below
        </p>
      </section>

      <div className="contact-us">
        <div className="email">
          <h3>send us an email</h3>
          <p>For collaboration, partnership and sponsorship?</p>

          <div>
            <i> Reach out to us via email.</i>
            <Link href="mailto:Nursingpastco@gmail.com">
              Email Now <Mail />
            </Link>
          </div>
        </div>

        <form action={action}>
          <div>
            <h3>send us a message</h3>
            <p>for complaint or requests?</p>
          </div>
          <i>You can send us a direct message.</i>
          <label>
            <input type="name" name="fullname" placeholder="enter fullname" />
          </label>
          <label>
            <input type="email" name="email" placeholder="enter email" />
          </label>
          <label>
            <textarea name="message" placeholder="enter your message" />
          </label>
          <button type="submit">
            {pending ? "sending..." : "send"}
            {pending && <ClipLoader size={25} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
