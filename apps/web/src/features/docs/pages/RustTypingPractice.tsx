import { Seo } from "../../../components/Seo";
import { ui } from "../../../lib/ui";

export function RustTypingPractice() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to practice Rust syntax by typing code",
      "step": [
        {
          "@type": "HowToStep",
          "text": "Pick one small Rust syntax pattern."
        },
        {
          "@type": "HowToStep",
          "text": "Type the snippet exactly."
        },
        {
          "@type": "HowToStep",
          "text": "Review weak tokens."
        },
        {
          "@type": "HowToStep",
          "text": "Repeat the same snippet until accuracy is stable."
        },
        {
          "@type": "HowToStep",
          "text": "Change variable names and type again."
        },
        {
          "@type": "HowToStep",
          "text": "Move to DSA snippets only after syntax stops blocking flow."
        }
      ]
    }
  ];

  return (
    <article className="flex flex-col gap-32">
      <Seo
        title="Rust Typing Practice | How to Memorize Rust Syntax"
        description="Learn the fastest way to practice Rust syntax by typing code. Repeat Option, Result, and enum snippets to build syntax muscle memory."
        canonicalPath="/docs/rust-typing-practice"
        jsonLd={jsonLd}
      />

      <header>
        <h1 className={ui.heading + " text-display leading-display tracking-display mb-16"}>
          Rust Typing Practice
        </h1>
        <div className={ui.softPanel}>
          <p className={ui.body + " font-medium text-sst-ink"}>
            The fastest way to practice Rust syntax by typing code is to repeat small, correct snippets and measure the exact tokens that break your flow. Start with enum and match, then Option&lt;T&gt;, Result&lt;T, E&gt;, borrowing, impl blocks, and finally DSA patterns such as HashMap and two pointers. The goal is not high WPM first; the goal is accurate repetition of Rust-specific tokens like <code className="font-ibm-plex-mono text-code-plum">::</code>, <code className="font-ibm-plex-mono text-code-plum">=&gt;</code>, <code className="font-ibm-plex-mono text-code-teal">&amp;self</code>, <code className="font-ibm-plex-mono text-code-teal">Some</code>, <code className="font-ibm-plex-mono text-code-teal">None</code>, <code className="font-ibm-plex-mono text-code-teal">Ok</code>, and <code className="font-ibm-plex-mono text-code-teal">Err</code>.
          </p>
        </div>
      </header>

      <section>
        <h2 className={ui.heading + " mb-16"}>Step-by-step Process</h2>
        <ol className="flex flex-col gap-16 list-decimal list-inside text-body text-slate leading-body">
          <li>Pick one small Rust syntax pattern.</li>
          <li>Type the snippet exactly.</li>
          <li>Review weak tokens in the result summary.</li>
          <li>Repeat the same snippet until accuracy is stable.</li>
          <li>Change variable names and type again.</li>
          <li>Move to DSA snippets only after syntax stops blocking flow.</li>
        </ol>
      </section>

      <section>
        <h2 className={ui.heading + " mb-16"}>Code Examples</h2>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <h3 className={ui.headingSm}>Enum + Match</h3>
            <div className={ui.codeBlock}>
<pre><code>enum Status &#123;
    Active,
    Pending,
&#125;

match status &#123;
    Status::Active =&gt; true,
    Status::Pending =&gt; false,
&#125;</code></pre>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className={ui.headingSm}>Option&lt;T&gt;</h3>
            <div className={ui.codeBlock}>
<pre><code>fn find_user(id: u32) -&gt; Option&lt;User&gt; &#123;
    if id == 1 &#123;
        Some(User::new())
    &#125; else &#123;
        None
    &#125;
&#125;</code></pre>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className={ui.headingSm}>Result&lt;T, E&gt;</h3>
            <div className={ui.codeBlock}>
<pre><code>fn read_file(path: &amp;str) -&gt; Result&lt;String, io::Error&gt; &#123;
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&amp;mut contents)?;
    Ok(contents)
&#125;</code></pre>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
