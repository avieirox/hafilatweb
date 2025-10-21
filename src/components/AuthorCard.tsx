import React from "react";

export type AuthorCardProps = {
  name: string;
  url: string;
  jobTitle: string;
  country?: string;
  imageSrc: string;
  imageAlt?: string;
  datePublished?: string; // ISO date (YYYY-MM-DD)
  dateModified?: string; // ISO date (YYYY-MM-DD)
  description?: string;
};

export function AuthorCard({
  name,
  url,
  jobTitle,
  country,
  imageSrc,
  imageAlt = "Author photo",
  datePublished,
  dateModified,
  description,
}: AuthorCardProps) {
  // Helper to format ISO dates into a readable form (e.g., August 3, 2025)
  const formatDate = (iso?: string) => {
    if (!iso) return undefined;
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (_) {
      return iso;
    }
  };

  const humanPublished = formatDate(datePublished);
  const humanModified = formatDate(dateModified);

  return (
    <section
      className="w-full max-w-xl mx-auto border border-border/70 rounded-xl p-4 sm:p-6 bg-background/50"
      aria-labelledby="author-heading"
    >
      <div
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
        className="flex items-start gap-4"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border border-border"
          itemProp="image"
          loading="lazy"
          width={80}
          height={80}
        />
        <div className="flex-1 min-w-0">
          <p id="author-heading" className="text-sm text-muted-foreground">
            By{" "}
            <a
              href={url}
              target="_blank"
              rel="noopener"
              itemProp="url"
              className="font-medium text-foreground hover:underline"
            >
              <span itemProp="name">{name}</span>
            </a>{" "}
            – <span itemProp="jobTitle">{jobTitle}</span>
            {country ? <>, {country}</> : null}
          </p>

          {(humanPublished || humanModified) && (
            <div className="mt-1 text-xs text-muted-foreground">
              {humanPublished && (
                <>
                  <time itemProp="datePublished" dateTime={datePublished}>
                    {humanPublished}
                  </time>
                </>
              )}
              {humanPublished && humanModified ? " • Updated " : null}
              {!humanPublished && humanModified ? "Updated " : null}
              {humanModified && (
                <time itemProp="dateModified" dateTime={dateModified}>
                  {humanModified}
                </time>
              )}
            </div>
          )}

          {description && (
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// Convenience builder to quickly render a predefined author, with optional overrides
export function buildAuthor(overrides?: Partial<AuthorCardProps>) {
  const base: AuthorCardProps = {
    name: "Ghaada Almain",
    url: "https://www.clippings.me/ghaadaalmain",
    jobTitle: "Copywriter Freelance",
    country: "United Arab Emirates",
    imageSrc: "/Ghaada-150x150.jpg.webp",
    imageAlt: "Ghaada Almain",
    datePublished: "2025-08-03",
    dateModified: "2025-10-20",
    description:
      "Hello, I’m Ghaada Almain — a multilingual legal professional turned copywriter, offering clear, practical guidance for UAE residents and visitors.",
  };
  return <AuthorCard {...base} {...overrides} />;
}

// Named preset component for direct use
export const GhaadaAuthorCard: React.FC<Partial<AuthorCardProps>> = (props) => {
  return buildAuthor(props);
};
