"use client";

import { useState } from "react";

const projectTypes = [
  "Transport",
  "Terrassement",
  "Génie civil",
  "Maçonnerie",
  "Aménagement extérieur",
  "Démolition",
  "Revalorisation",
  "Déneigement",
  "Pelle araignée",
  "Cours d'eau",
  "Sentier",
  "Autre",
];

type Status = "idle" | "submitting" | "success" | "error";

// Formulaire géré par Netlify Forms : détecté au build grâce aux attributs
// name/data-netlify sur le <form> (Netlify scanne le HTML généré), puis
// soumis en AJAX ici pour rester sur la page. Les envois (et les pièces
// jointes) sont consultables dans l'onglet "Forms" du site Netlify ; les
// notifications par e-mail se configurent aussi là-bas, dans les réglages
// du site (aucune clé/API à gérer côté code).
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
      <p role="status" className="border border-line bg-offwhite p-6 text-sm text-ink">
        Merci, votre demande a bien été envoyée. Nous revenons vers vous dans les meilleurs
        délais.
      </p>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
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
        <label htmlFor="projectType" className="block text-sm font-semibold text-ink">
          Type de projet <span className="text-accent-ink">*</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          className="focus-ring mt-2 w-full border border-line bg-paper px-4 py-3 text-sm text-ink"
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <Field label="Lieu du projet" name="location" />

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink">
          Message <span className="text-accent-ink">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="focus-ring mt-2 w-full border border-line bg-paper px-4 py-3 text-sm text-ink"
        />
      </div>

      <div>
        <label htmlFor="attachments" className="block text-sm font-semibold text-ink">
          Photos, PDF ou plans (facultatif)
        </label>
        <input
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept="image/*,.pdf"
          className="focus-ring mt-2 w-full text-sm text-concrete file:mr-4 file:border file:border-ink file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-concrete">
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
        className="focus-ring inline-flex items-center justify-center bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink hover:bg-accent-dark disabled:opacity-60"
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
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label} {required ? <span className="text-accent-ink">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="focus-ring mt-2 w-full border border-line bg-paper px-4 py-3 text-sm text-ink"
      />
    </div>
  );
}
