"use client";

import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";

type FormValues = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  websiteUrl: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

type FlodeskHandler = ((event: string, options: { formId: string; rootEl: string }) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: FlodeskHandler;
  }
}

const FORM_ID = "6ae04e2547d831c4dac10213";
const ROOT_SELECTOR = `.ff-${FORM_ID}`;
const FORM_ACTION = `https://form.flodesk.com/forms/${FORM_ID}/submit`;
const FLODESK_CONFIG =
  "eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJyZWRpcmVjdCIsIm1lc3NhZ2UiOiIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vY29uc3VsdC5kaWdpZ3Jvd3NoZXJpbmUuY29tL3RoYW5rLXlvdSJ9LCJjb2kiOmZhbHNlLCJzaG93Rm9yUmV0dXJuVmlzaXRvcnMiOnRydWUsIm5vdGlmaWNhdGlvbiI6ZmFsc2UsImdkcHIiOnsiYWNjZXB0c01hcmtldGluZyI6ZmFsc2UsInByaXZhY3lQb2xpY3kiOnsiZW5hYmxlZCI6ZmFsc2UsIm1hbmRhdG9yeSI6ZmFsc2V9fSwidHJhY2tpbmdDb25maWciOnsibWV0YVBpeGVsSWQiOiIiLCJjb29raWVCYW5uZXJFbmFibGVkIjpmYWxzZSwiZ29vZ2xlQW5hbHl0aWNzSWQiOiIifX0=";

const initialValues: FormValues = {
  fullName: "",
  email: "",
  whatsapp: "",
  businessName: "",
  websiteUrl: "",
  message: "",
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Please enter your active email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  const digits = values.whatsapp.replace(/\D/g, "");
  if (!values.whatsapp.trim()) errors.whatsapp = "Please enter your WhatsApp number.";
  else if (digits.length < 8 || digits.length > 15) errors.whatsapp = "Please enter a valid WhatsApp number.";
  if (!values.businessName.trim()) errors.businessName = "Please enter your business name.";
  if (values.websiteUrl.trim()) {
    try {
      new URL(/^https?:\/\//i.test(values.websiteUrl) ? values.websiteUrl : `https://${values.websiteUrl}`);
    } catch {
      errors.websiteUrl = "Please enter a valid website or Facebook URL.";
    }
  }
  return errors;
}

function installFlodeskHandler() {
  window.FlodeskObject = "fd";

  if (!window.fd) {
    const queuedHandler = ((...args: unknown[]) => {
      queuedHandler.q = queuedHandler.q || [];
      queuedHandler.q.push(args);
    }) as FlodeskHandler;
    window.fd = queuedHandler;
  }

  if (!document.querySelector('script[data-flodesk-universal="module"]')) {
    const version = `?v=${Math.floor(Date.now() / 120000) * 60}`;
    const moduleScript = document.createElement("script");
    moduleScript.async = true;
    moduleScript.type = "module";
    moduleScript.src = `https://assets.flodesk.com/universal.mjs${version}`;
    moduleScript.dataset.flodeskUniversal = "module";
    document.head.appendChild(moduleScript);

    const fallbackScript = document.createElement("script");
    fallbackScript.async = true;
    fallbackScript.noModule = true;
    fallbackScript.src = `https://assets.flodesk.com/universal.js${version}`;
    fallbackScript.dataset.flodeskUniversal = "fallback";
    document.head.appendChild(fallbackScript);
  }

  window.fd("form:handle", { formId: FORM_ID, rootEl: ROOT_SELECTOR });
}

export default function ConsultationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    installFlodeskHandler();
  }, []);

  const setField = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  function validateSubmission(event: FormEvent<HTMLFormElement>) {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) event.preventDefault();
  }

  const input = (
    field: keyof FormValues,
    flodeskId: string,
    flodeskName: string,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
    optional = false,
  ) => (
    <div className={`field-group ff-${FORM_ID}__field fd-form-group ${field === "websiteUrl" ? "full" : ""}`}>
      <label htmlFor={flodeskId}>{label} {optional ? <span className="optional">(optional)</span> : <span aria-hidden>*</span>}</label>
      <input
        id={flodeskId}
        name={flodeskName}
        className={`ff-${FORM_ID}__control fd-form-control`}
        value={values[field]}
        onChange={setField(field)}
        aria-invalid={Boolean(errors[field])}
        aria-describedby={errors[field] ? `${field}-error` : undefined}
        maxLength={255}
        {...props}
      />
      {errors[field] && <p className="field-error" id={`${field}-error`}>{errors[field]}</p>}
    </div>
  );

  return (
    <div
      className={`ff-${FORM_ID}`}
      data-ff-el="root"
      data-ff-version="3"
      data-ff-type="inline"
      data-ff-name="inlineNoImage"
      data-ff-stage="default"
    >
      <div data-ff-el="config" data-ff-config={FLODESK_CONFIG} hidden />
      <form
        className={`consultation-form ff-${FORM_ID}__form`}
        action={FORM_ACTION}
        method="post"
        data-ff-el="form"
        onSubmitCapture={validateSubmission}
        noValidate
      >
        <div className={`ff-${FORM_ID}__content fd-form-content`} data-ff-el="content">
          <div className={`field-grid ff-${FORM_ID}__fields`} data-ff-el="fields">
            {input(
              "fullName",
              `ff-${FORM_ID}-firstName`,
              "firstName",
              "Full Name",
              { placeholder: "Your full name", autoComplete: "name", required: true, "data-ff-tab": "firstName::email" } as React.InputHTMLAttributes<HTMLInputElement>,
            )}
            {input(
              "email",
              `ff-${FORM_ID}-email`,
              "email",
              "Active Email",
              { type: "email", placeholder: "you@example.com", autoComplete: "email", inputMode: "email", required: true, "data-ff-tab": "email:firstName:fields." } as React.InputHTMLAttributes<HTMLInputElement>,
            )}
            {input(
              "whatsapp",
              `ff-${FORM_ID}-AuZYEjIxkD`,
              "fields.",
              "WhatsApp Number",
              { type: "tel", placeholder: "+977 98XXXXXXXX", autoComplete: "tel", inputMode: "tel", required: true, "data-ff-tab": "fields.:email:fields." } as React.InputHTMLAttributes<HTMLInputElement>,
            )}
            {input(
              "businessName",
              `ff-${FORM_ID}-nvBL8dIzBn`,
              "fields.",
              "Business Name",
              { placeholder: "Your business name", autoComplete: "organization", required: true, "data-ff-tab": "fields.:email:fields." } as React.InputHTMLAttributes<HTMLInputElement>,
            )}
            {input(
              "websiteUrl",
              `ff-${FORM_ID}-8V3PWvAL8X`,
              "fields.",
              "Website or Facebook URL",
              { placeholder: "facebook.com/yourpage", inputMode: "url", autoCapitalize: "none", "data-ff-tab": "fields.:email:fields." } as React.InputHTMLAttributes<HTMLInputElement>,
              true,
            )}
            <div className={`field-group full ff-${FORM_ID}__field fd-form-group`}>
              <label htmlFor={`ff-${FORM_ID}-KXwqqsHnn9`}>Anything You Want to Say <span className="optional">(optional)</span></label>
              <textarea
                id={`ff-${FORM_ID}-KXwqqsHnn9`}
                name="fields."
                className={`ff-${FORM_ID}__control fd-form-control`}
                value={values.message}
                onChange={setField("message")}
                placeholder="Tell us what you are struggling with"
                maxLength={1500}
                data-ff-tab="fields.:email:fields."
              />
            </div>
            <input type="text" maxLength={255} name="confirm_email_address" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          </div>
          <div className={`ff-${FORM_ID}__footer`} data-ff-el="footer">
            <button className={`submit-button ff-${FORM_ID}__button fd-btn`} type="submit" data-ff-el="submit" data-ff-tab="submit">
              Book Your FREE Consultation
            </button>
          </div>
        </div>
        <div className={`form-error ff-${FORM_ID}__error fd-form-error`} data-ff-el="error" role="alert" />
        <p className="privacy"><LockKeyhole size={13} /> We respect your privacy. No spam.</p>
      </form>
    </div>
  );
}
