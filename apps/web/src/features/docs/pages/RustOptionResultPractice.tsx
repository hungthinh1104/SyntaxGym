import { Seo } from "../../../components/Seo";
import { ui } from "../../../lib/ui";
import { Link } from "react-router-dom";

export function RustOptionResultPractice() {
  const faqs = [
    {
      question: "Why do Option and Result cause syntax friction in Rust?",
      answer: "Option and Result are heavily used in Rust instead of null or exceptions. The friction comes from repeatedly typing the angle brackets < >, the variants (Some, None, Ok, Err), and pattern matching on them.",
    },
    {
      question: "What is the best way to practice Option and Result syntax?",
      answer: "The best way is to repeatedly type real code snippets that unwrap or match on Option and Result, building muscle memory for the specific tokens rather than raw typing speed.",
    }
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    }
  ];

  return (
    <article className="flex flex-col gap-32">
      <Seo
        title="Rust Option & Result Typing Practice | SyntaxGym"
        description="Build muscle memory for Rust's Option and Result types. Practice typing Some, None, Ok, Err, and pattern matching syntax."
        canonicalPath="/docs/rust-option-result-practice"
        jsonLd={jsonLd}
      />

      <header>
        <h1 className={ui.heading + " text-display leading-display tracking-display mb-16"}>
          Rust Option & Result Practice
        </h1>
        <div className={ui.softPanel}>
          <p className={ui.body + " font-medium text-sst-ink"}>
            In Rust, <code className="font-ibm-plex-mono text-code-teal">Option&lt;T&gt;</code> and <code className="font-ibm-plex-mono text-code-teal">Result&lt;T, E&gt;</code> are pervasive. Because Rust does not have null or exceptions, you will constantly be typing angle brackets, matching on variants, and handling control flow. This frequent context switching is a major syntax bottleneck for new Rust developers.
          </p>
        </div>
      </header>

      <section>
        <h2 className={ui.heading + " mb-16"}>Tokens to Practice</h2>
        <ul className="flex flex-wrap gap-8">
          {["Option<", "Result<", "Some(", "None", "Ok(", "Err(", "match", "=>"].map((token) => (
            <li key={token} className="px-12 py-4 bg-lavender-mist font-ibm-plex-mono text-body text-sst-ink rounded-md">
              {token}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={ui.heading + " mb-16"}>Code Example</h2>
        <div className={ui.codeBlock}>
<pre><code>fn divide(numerator: f64, denominator: f64) -&gt; Option&lt;f64&gt; &#123;
    if denominator == 0.0 &#123;
        None
    &#125; else &#123;
        Some(numerator / denominator)
    &#125;
&#125;

match divide(10.0, 2.0) &#123;
    Some(result) =&gt; println!("Result: &#123;&#125;", result),
    None =&gt; println!("Cannot divide by zero"),
&#125;</code></pre>
        </div>
      </section>

      <section>
        <div className={ui.panel + " flex flex-col sm:flex-row gap-16 justify-between items-center bg-lavender-mist/30"}>
          <div>
            <h3 className={ui.headingSm + " mb-4"}>Ready to build muscle memory?</h3>
            <p className={ui.body}>Jump into the typing trainer or browse the snippet library.</p>
          </div>
          <div className="flex gap-16">
            <Link to="/practice" className={`${ui.ghostButton} bg-sst-ink text-paper hover:bg-sst-ink/90`}>
              Start Practice
            </Link>
            <Link to="/snippets" className={ui.ghostButton}>
              View Snippets
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className={ui.heading + " mb-16"}>Frequently Asked Questions</h2>
        <dl className="flex flex-col gap-16">
          {faqs.map((faq, index) => (
            <div key={index} className="flex flex-col gap-4">
              <dt className={ui.headingSm}>{faq.question}</dt>
              <dd className={ui.body}>{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
