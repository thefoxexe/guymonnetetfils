"use client";

import { useState } from "react";
import { company } from "@/data/company";

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

// TODO: backend nécessaire pour l'envoi réel du formulaire (API route + service
// d'e-mail transactionnel). En l'absence de service configuré, le formulaire
// prépare un e-mail pré-rempli vers l'adresse de contact de l'entreprise.
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `Nom : ${data.get("name")}`,
      `Entreprise : ${data.get("company") || "-"}`,
      `Téléphone : ${data.get("phone")}`,
      `E-mail : ${data.get("email")}`,
      `Type de projet : ${data.get("projectType")}`,
      `Lieu du projet : ${data.get("location") || "-"}`,
      "",
      String(data.get("message") || ""),
    ];
    const subject = encodeURIComponent(`Demande de devis — ${data.get("projectType")}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
        <p className="mt-1 text-xs text-concrete">
          TODO: contenu client nécessaire — les pièces jointes ne sont pas transmises tant
          qu&apos;un service d&apos;envoi n&apos;est pas configuré ; merci de les joindre à
          l&apos;e-mail qui s&apos;ouvrira après l&apos;envoi.
        </p>
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
        className="focus-ring inline-flex items-center justify-center bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink hover:bg-accent-dark"
      >
        Envoyer ma demande
      </button>

      {submitted ? (
        <p role="status" className="text-sm text-concrete">
          Votre messagerie va s&apos;ouvrir avec les informations pré-remplies. Vous pouvez aussi
          nous joindre directement à{" "}
          <a href={`mailto:${company.email}`} className="underline hover:text-accent-ink">
            {company.email}
          </a>
          .
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
