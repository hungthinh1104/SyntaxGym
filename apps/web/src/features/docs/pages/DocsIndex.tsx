import { Link } from "react-router-dom";
import { Seo } from "../../../components/Seo";
import { ui } from "../../../lib/ui";

export function DocsIndex() {
  return (
    <div className="flex flex-col gap-16">
      <Seo
        title="Documentation | SyntaxGym"
        description="Learn how to practice Rust syntax, DSA typing, custom snippets, and weak-token analytics."
        canonicalPath="/docs"
      />
      <h1 className={ui.heading + " text-display leading-display tracking-display"}>Documentation</h1>
      <p className={ui.body}>
        SyntaxGym is designed to build syntax muscle memory for backend developers. Explore our guides below:
      </p>

      <div className="flex flex-col gap-16 mt-16">
        <Link to="/docs/what-is-syntaxgym" className={ui.panel + " hover:border-fog transition-colors"}>
          <h2 className={ui.headingSm + " mb-4"}>What is SyntaxGym?</h2>
          <p className={ui.body}>Read the definition, our target audience, and how we compare to Monkeytype or Rustlings.</p>
        </Link>
        <Link to="/docs/rust-typing-practice" className={ui.panel + " hover:border-fog transition-colors"}>
          <h2 className={ui.headingSm + " mb-4"}>Rust Typing Practice</h2>
          <p className={ui.body}>Learn the fastest way to memorize Rust syntax using targeted repetitive code typing.</p>
        </Link>
      </div>
    </div>
  );
}
