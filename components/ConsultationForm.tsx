"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

type FormValues = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  websiteUrl: string;
  message: string;
  nickname: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "", email: "", whatsapp: "", businessName: "", websiteUrl: "", message: "", nickname: "",
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
    try { new URL(/^https?:\/\//i.test(values.websiteUrl) ? values.websiteUrl : `https://${values.websiteUrl}`); }
    catch { errors.websiteUrl = "Please enter a valid website or Facebook URL."; }
  }
  return errors;
}

export default function ConsultationForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const setField = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Unable to submit consultation request");
      router.push("/thank-you");
    } catch {
      setSubmitError("We couldn't submit your request. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  const input = (field: keyof FormValues, label: string, props: React.InputHTMLAttributes<HTMLInputElement>, optional = false) => (
    <div className={`field-group ${field === "websiteUrl" ? "full" : ""}`}>
      <label htmlFor={field}>{label} {optional ? <span className="optional">(optional)</span> : <span aria-hidden>*</span>}</label>
      <input id={field} name={field} value={values[field]} onChange={setField(field)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : undefined} {...props} />
      {errors[field] && <p className="field-error" id={`${field}-error`}>{errors[field]}</p>}
    </div>
  );

  return (
    <form className="consultation-form" onSubmit={submit} noValidate>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="nickname">Nickname</label>
        <input id="nickname" name="nickname" tabIndex={-1} autoComplete="off" value={values.nickname} onChange={setField("nickname")} />
      </div>
      <div className="field-grid">
        {input("fullName", "Full Name", { placeholder: "Your full name", autoComplete: "name" })}
        {input("email", "Active Email", { type: "email", placeholder: "you@example.com", autoComplete: "email", inputMode: "email" })}
        {input("whatsapp", "WhatsApp Number", { type: "tel", placeholder: "+977 98XXXXXXXX", autoComplete: "tel", inputMode: "tel" })}
        {input("businessName", "Business Name", { placeholder: "Your business name", autoComplete: "organization" })}
        {input("websiteUrl", "Website or Facebook URL", { placeholder: "facebook.com/yourpage", inputMode: "url", autoCapitalize: "none" }, true)}
        <div className="field-group full">
          <label htmlFor="message">Anything You Want to Say <span className="optional">(optional)</span></label>
          <textarea id="message" name="message" value={values.message} onChange={setField("message")} placeholder="Tell us what you are struggling with" maxLength={1500} />
        </div>
      </div>
      {submitError && <p className="form-error" role="alert">{submitError}</p>}
      <button className="submit-button" type="submit" disabled={submitting}>{submitting ? "Booking your consultation…" : "Book Your FREE Consultation"}</button>
      <p className="privacy"><LockKeyhole size={13} /> We respect your privacy. No spam.</p>
    </form>
  );
}
