import { Seo } from "../../../components/Seo";
import { ui } from "../../../lib/ui";

export function WhatIsSyntaxGym() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "SyntaxGym",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "description": "SyntaxGym is a local-first code typing trainer for developers.",
      "url": "https://syntaxgym.online",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is SyntaxGym a Rust course?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, SyntaxGym is a code typing trainer focused on muscle memory, not a conceptual course."
          }
        },
        {
          "@type": "Question",
          "name": "Is SyntaxGym a LeetCode clone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. We do not test your logic or compile your code. We focus purely on typing speed, accuracy, and flow."
          }
        },
        {
          "@type": "Question",
          "name": "How is SyntaxGym different from Monkeytype?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Monkeytype is for general text or custom plain text. SyntaxGym parses code tokens, scores your Rust accuracy (like missing '::' or '&'), and tracks weak syntax."
          }
        },
        {
          "@type": "Question",
          "name": "Does SyntaxGym require login?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. It is fully local-first. All history is stored in your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Does SyntaxGym scrape LeetCode?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The snippets are curated or manually pasted by users."
          }
        }
      ]
    }
  ];

  return (
    <article className="flex flex-col gap-32">
      <Seo
        title="What is SyntaxGym? Code Typing Trainer vs Monkeytype"
        description="SyntaxGym is a local-first code typing trainer for developers. Learn how it compares to Monkeytype and Rustlings for Rust syntax practice."
        canonicalPath="/docs/what-is-syntaxgym"
        jsonLd={jsonLd}
      />

      <header>
        <h1 className={ui.heading + " text-display leading-display tracking-display mb-16"}>
          What is SyntaxGym?
        </h1>
        <div className={ui.softPanel}>
          <p className={ui.body + " font-medium text-sst-ink"}>
            SyntaxGym is a local-first code typing trainer for developers who want to build syntax muscle memory, especially in Rust. Instead of practicing random words, users type real code snippets and receive feedback on code-specific mistakes such as `::`, `=&gt;`, `Option&lt;T&gt;`, `Result&lt;T, E&gt;`, `match`, and `HashMap`. SyntaxGym is not a LeetCode clone; it stores user-pasted solutions locally and focuses on typing accuracy, weak tokens, and recall.
          </p>
        </div>
      </header>

      <section>
        <h2 className={ui.heading + " mb-16"}>SyntaxGym vs Monkeytype vs Rustlings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-lavender-mist">
                <th className={ui.eyebrow + " py-8 pr-16"}>Tool</th>
                <th className={ui.eyebrow + " py-8 pr-16"}>Primary use</th>
                <th className={ui.eyebrow + " py-8 pr-16"}>Best for</th>
                <th className={ui.eyebrow + " py-8"}>Limitation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-lavender-mist">
                <td className={ui.body + " font-semibold text-sst-ink py-16 pr-16"}>SyntaxGym</td>
                <td className={ui.body + " py-16 pr-16"}>Code typing, weak-token analytics, custom snippets</td>
                <td className={ui.body + " py-16 pr-16"}>Rust/DSA syntax practice</td>
                <td className={ui.body + " py-16"}>Not a compiler or conceptual course</td>
              </tr>
              <tr className="border-b border-lavender-mist">
                <td className={ui.body + " font-semibold text-sst-ink py-16 pr-16"}>Monkeytype</td>
                <td className={ui.body + " py-16 pr-16"}>General typing/custom text</td>
                <td className={ui.body + " py-16 pr-16"}>Raw WPM speed/accuracy</td>
                <td className={ui.body + " py-16"}>Not code-aware, no token diagnostics</td>
              </tr>
              <tr className="border-b border-lavender-mist">
                <td className={ui.body + " font-semibold text-sst-ink py-16 pr-16"}>Rustlings</td>
                <td className={ui.body + " py-16 pr-16"}>Rust exercises/compiler feedback</td>
                <td className={ui.body + " py-16 pr-16"}>Learning Rust concepts</td>
                <td className={ui.body + " py-16"}>Not a typing trainer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className={ui.heading + " mb-16"}>Frequently Asked Questions</h2>
        <dl className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <dt className={ui.headingSm}>Is SyntaxGym a Rust course?</dt>
            <dd className={ui.body}>No, SyntaxGym is a code typing trainer focused on muscle memory, not a conceptual course.</dd>
          </div>
          <div className="flex flex-col gap-4">
            <dt className={ui.headingSm}>Is SyntaxGym a LeetCode clone?</dt>
            <dd className={ui.body}>No. We do not test your logic or compile your code. We focus purely on typing speed, accuracy, and flow.</dd>
          </div>
          <div className="flex flex-col gap-4">
            <dt className={ui.headingSm}>How is SyntaxGym different from Monkeytype?</dt>
            <dd className={ui.body}>Monkeytype is for general text or custom plain text. SyntaxGym parses code tokens, scores your Rust accuracy (like missing `::` or `&`), and tracks weak syntax.</dd>
          </div>
          <div className="flex flex-col gap-4">
            <dt className={ui.headingSm}>Does SyntaxGym require login?</dt>
            <dd className={ui.body}>No. It is fully local-first. All history is stored in your browser.</dd>
          </div>
          <div className="flex flex-col gap-4">
            <dt className={ui.headingSm}>Does SyntaxGym scrape LeetCode?</dt>
            <dd className={ui.body}>No. The snippets are curated or manually pasted by users.</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
