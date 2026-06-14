import { Link } from "react-router-dom";
import { Seo } from "../../../components/Seo";
import { ui } from "../../../lib/ui";

export function RustCollectionsDsaPractice() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why practice Data Structures and Algorithms in Rust?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Practicing DSA in Rust reinforces your understanding of its collections, memory management, and iteration models. It prepares you for technical interviews and systems-level problem solving."
          }
        },
        {
          "@type": "Question",
          "name": "What collections does SyntaxGym cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SyntaxGym includes snippets featuring Vec, HashMap, HashSet, VecDeque, and string manipulation techniques."
          }
        }
      ]
    }
  ];

  return (
    <article className="flex flex-col gap-32">
      <Seo
        title="Rust Collections & DSA Typing Practice | SyntaxGym"
        description="Practice typing Rust Data Structures and Algorithms. Build muscle memory for HashMap, Vec, and complex iteration syntax."
        canonicalPath="/docs/rust-collections-dsa-practice"
        jsonLd={jsonLd}
      />

      <header>
        <h1 className={ui.heading + " text-display leading-display tracking-display mb-16"}>
          Rust Collections & DSA Practice
        </h1>
        <div className={ui.softPanel}>
          <p className={ui.body + " font-medium text-sst-ink"}>
            Technical interviews and competitive programming often rely heavily on Data Structures and Algorithms (DSA). In Rust, manipulating collections like <code className="font-ibm-plex-mono text-code-teal">HashMap</code> or <code className="font-ibm-plex-mono text-code-teal">VecDeque</code> requires precise syntax for insertions, iteration, and ownership management. Practice our DSA snippets to fluidly type common algorithmic patterns.
          </p>
        </div>
      </header>

      <section>
        <h2 className={ui.heading + " mb-16"}>Tokens to Practice</h2>
        <ul className="flex flex-wrap gap-8">
          {["HashMap::new()", "Vec::with_capacity", "push", "insert", "entry", "or_insert"].map(t => (
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
            <dt className={ui.headingSm}>Why practice Data Structures and Algorithms in Rust?</dt>
            <dd className={ui.body}>Practicing DSA in Rust reinforces your understanding of its collections, memory management, and iteration models. It prepares you for technical interviews and systems-level problem solving.</dd>
          </div>
          <div className="flex flex-col gap-4">
            <dt className={ui.headingSm}>What collections does SyntaxGym cover?</dt>
            <dd className={ui.body}>SyntaxGym includes snippets featuring Vec, HashMap, HashSet, VecDeque, and string manipulation techniques.</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
