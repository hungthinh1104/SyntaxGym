import { Seo } from "../../../components/Seo";
import { ui } from "../../../lib/ui";
import { Link } from "react-router-dom";

export function RustEnumMatchPractice() {
  const faqs = [
    {
      question: "Why do enum and match syntax matter in Rust?",
      answer: "In Rust, enums are not just integers; they are powerful algebraic data types that can contain data. Pattern matching with the 'match' keyword is the primary way to extract and safely handle that data.",
    },
    {
      question: "What are the common syntax mistakes when typing match statements?",
      answer: "Common mistakes include forgetting the fat arrow (=>), forgetting commas between match arms, or stumbling over the syntax for binding variables within the match arm patterns.",
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
        title="Rust Enum & Match Typing Practice | SyntaxGym"
        description="Master Rust's enum and pattern matching syntax. Practice typing match arms, destructuring, and the fat arrow operator to build muscle memory."
        canonicalPath="/docs/rust-enum-match-practice"
        jsonLd={jsonLd}
      />

      <header>
        <h1 className={ui.heading + " text-display leading-display tracking-display mb-16"}>
          Rust Enum & Match Practice
        </h1>
        <div className={ui.softPanel}>
          <p className={ui.body + " font-medium text-sst-ink"}>
            Pattern matching via <code className="font-ibm-plex-mono text-code-teal">match</code> and algebraic data types (<code className="font-ibm-plex-mono text-code-teal">enum</code>) form the backbone of Rust's safety and expressiveness. Unlike C-style switches, Rust's <code className="font-ibm-plex-mono text-code-teal">match</code> is exhaustive and requires precise syntax like the fat arrow (<code className="font-ibm-plex-mono text-code-plum">=&gt;</code>) and comma-separated arms.
          </p>
        </div>
      </header>

      <section>
        <h2 className={ui.heading + " mb-16"}>Tokens to Practice</h2>
        <ul className="flex flex-wrap gap-8">
          {["enum", "match", "=>", "Some(", "None", "_"].map((token) => (
            <li key={token} className="px-12 py-4 bg-lavender-mist font-ibm-plex-mono text-body text-sst-ink rounded-md">
              {token}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={ui.heading + " mb-16"}>Code Example</h2>
        <div className={ui.codeBlock}>
<pre><code>enum Message &#123;
    Quit,
    Move &#123; x: i32, y: i32 &#125;,
    Write(String),
    ChangeColor(i32, i32, i32),
&#125;

fn process_message(msg: Message) &#123;
    match msg &#123;
        Message::Quit =&gt; println!("Quitting"),
        Message::Move &#123; x, y &#125; =&gt; println!("Moving to &#123;&#125;, &#123;&#125;", x, y),
        Message::Write(text) =&gt; println!("Text: &#123;&#125;", text),
        _ =&gt; println!("Other message"),
    &#125;
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
