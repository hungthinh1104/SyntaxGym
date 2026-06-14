import { Link } from "react-router-dom";
import { Seo } from "../../../components/Seo";
import { ui } from "../../../lib/ui";

export function RustBorrowingPractice() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is Rust borrowing hard to type?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rust's strict ownership model requires explicit borrowing syntax like '&', '&mut', and lifetimes. This can be jarring for developers coming from garbage-collected languages."
          }
        },
        {
          "@type": "Question",
          "name": "How does SyntaxGym help with borrowing syntax?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "By repeatedly typing borrowing tokens in context, you build muscle memory. Your fingers learn exactly when and where to place '&mut' without breaking your flow."
          }
        }
      ]
    }
  ];

  return (
    <article className="flex flex-col gap-32">
      <Seo
        title="Rust Borrowing & Ownership Typing Practice | SyntaxGym"
        description="Master Rust's borrowing, references, and ownership syntax. Practice typing &mut and lifetime annotations to build muscle memory."
        canonicalPath="/docs/rust-borrowing-practice"
        jsonLd={jsonLd}
      />

      <header>
        <h1 className={ui.heading + " text-display leading-display tracking-display mb-16"}>
          Rust Borrowing Practice
        </h1>
        <div className={ui.softPanel}>
          <p className={ui.body + " font-medium text-sst-ink"}>
            Ownership and borrowing are Rust's most defining features. Typing <code className="font-ibm-plex-mono text-code-teal">&amp;</code>, <code className="font-ibm-plex-mono text-code-teal">&amp;mut</code>, and lifetime annotations like <code className="font-ibm-plex-mono text-code-plum">'a</code> often trips up beginners. SyntaxGym helps you build the specific muscle memory required to type these references fluently.
          </p>
        </div>
      </header>

      <section>
        <h2 className={ui.heading + " mb-16"}>Tokens to Practice</h2>
        <ul className="flex flex-wrap gap-8">
          {["&", "&mut", "'a", "ref", "Rc", "Arc", "Box"].map(t => (
            <li key={t} className="px-12 py-4 bg-lavender-mist font-ibm-plex-mono text-body text-sst-ink rounded-md">
              {t}
            </li>
          ))}
        </ul>
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
          <div className="flex flex-col gap-4">
            <dt className={ui.headingSm}>Why is Rust borrowing hard to type?</dt>
            <dd className={ui.body}>Rust's strict ownership model requires explicit borrowing syntax like '&', '&mut', and lifetimes. This can be jarring for developers coming from garbage-collected languages.</dd>
          </div>
          <div className="flex flex-col gap-4">
            <dt className={ui.headingSm}>How does SyntaxGym help with borrowing syntax?</dt>
            <dd className={ui.body}>By repeatedly typing borrowing tokens in context, you build muscle memory. Your fingers learn exactly when and where to place '&mut' without breaking your flow.</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
