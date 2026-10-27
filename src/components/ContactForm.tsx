"use client";

import { useState } from "react";

const labelClass = "block font-display text-[13px] font-extrabold uppercase tracking-[0.1em] text-ink";
const inputClass =
  "focus-ring mt-2 w-full border-2 border-line bg-paper px-4 py-3.5 text-base text-ink transition-colors focus:border-ink";

type Status = "idle" | "submitting" | "success" | "error";

// Formulaire géré par Netlify Forms : détecté au build grâce aux attributs
// name/data-netlify sur le <form> (Netlify scanne le HTML généré), puis
// soumis en AJAX ici pour rester sur la page. Les envois sont consultables
// dans l'onglet "Forms" du site Netlify ; les notifications par e-mail vers
// l'adresse du bureau (TODO: VALIDATION CLIENT : adresse à confirmer) se
// configurent aussi là-bas (aucune clé/API à gérer côté code).
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    try {
      const response = await fetch("/contact/", {
        method: "POST",
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`Statut ${response.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="border-l-4 border-accent bg-offwhite p-6 text-base text-ink">
        Merci, votre message a bien été envoyé. Nous vous répondons rapidement.
      </p>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Ne pas remplir ce champ <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Nom" name="name" required autoComplete="name" />
        <Field label="Entreprise" name="company" autoComplete="organization" />
        <Field label="Téléphone" name="phone" type="tel" required autoComplete="tel" />
        <Field label="E-mail" name="email" type="email" required autoComplete="email" />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-accent-ink">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-steel">
        <input type="checkbox" required className="focus-ring mt-1 h-4 w-4 border-line" />
        <span>
          J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément à
          la{" "}
          <a href="/confidentialite/" className="underline hover:text-accent-ink">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 text-[15px] font-bold text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-60"
      >
        {status === "submitting" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>

      {status === "error" ? (
        <p role="alert" className="text-sm text-accent-ink">
          Une erreur est survenue lors de l&apos;envoi. Merci de réessayer, ou de nous contacter
          directement par téléphone ou e-mail (coordonnées ci-contre).
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label} {required ? <span className="text-accent-ink">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  );
}
