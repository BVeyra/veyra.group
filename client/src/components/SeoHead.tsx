import { useEffect } from "react";

const SITE_NAME = "Veyra Group";
const DEFAULT_IMAGE = "https://veyragroup.ai/og-image.png";

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoHeadProps = {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  canonicalPath?: string;
  robots?: string;
  structuredData?: StructuredData;
};

function upsertMeta(
  selector: string,
  attrName: "name" | "property",
  attrValue: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function SeoHead({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = "website",
  canonicalPath,
  robots,
  structuredData,
}: SeoHeadProps) {
  useEffect(() => {
    const absoluteUrl = `https://veyragroup.ai${canonicalPath ?? window.location.pathname}`;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    upsertMeta(`meta[name="description"]`, "name", "description", description);
    upsertMeta(`meta[name="robots"]`, "name", "robots", robots ?? "index, follow");
    upsertMeta(`meta[property="og:title"]`, "property", "og:title", fullTitle);
    upsertMeta(`meta[property="og:description"]`, "property", "og:description", description);
    upsertMeta(`meta[property="og:type"]`, "property", "og:type", type);
    upsertMeta(`meta[property="og:url"]`, "property", "og:url", absoluteUrl);
    upsertMeta(`meta[property="og:image"]`, "property", "og:image", image);
    upsertMeta(`meta[name="twitter:card"]`, "name", "twitter:card", "summary_large_image");
    upsertMeta(`meta[name="twitter:title"]`, "name", "twitter:title", fullTitle);
    upsertMeta(`meta[name="twitter:description"]`, "name", "twitter:description", description);
    upsertMeta(`meta[name="twitter:image"]`, "name", "twitter:image", image);

    const payloads = structuredData
      ? Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      : [];
    const scriptIds: string[] = [];

    payloads.forEach((payload, index) => {
      const id = `seo-structured-data-${index}`;
      scriptIds.push(id);
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(payload);
    });

    let canonical = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = absoluteUrl;

    return () => {
      scriptIds.forEach((id) => {
        document.getElementById(id)?.remove();
      });

      if (!robots) {
        document.head.querySelector(`meta[name="robots"]`)?.remove();
      }
    };
  }, [canonicalPath, description, image, robots, structuredData, title, type]);

  return null;
}
