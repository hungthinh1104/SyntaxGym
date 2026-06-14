import type { WeakToken } from "./token-report";

export type RetrySnippetBase = {
  id: string;
  title: string;
  description: string;
  language: "rust";
  topic: string;
  dsaPattern: "none";
  difficulty: "medium";
  source: "built_in";
  tags: string[];
  code: string;
  createdAt: string;
  updatedAt: string;
};

export function generateRetrySnippet(
  weakTokens: WeakToken[], 
  idSuffix: string = Date.now().toString(),
  currentTimeIso: string = new Date().toISOString()
): RetrySnippetBase | null {
  if (weakTokens.length === 0) return null;
  
  const sorted = [...weakTokens].sort((a, b) => b.misses - a.misses || a.token.localeCompare(b.token));
  const topToken = sorted[0]!.token;
  
  let code = "";
  
  switch (topToken) {
    case "=>":
      code = `fn describe(value: Option<i32>) -> &'static str {\n    match value {\n        Some(_) => "some",\n        None => "none",\n    }\n}`;
      break;
    case "Result<":
      code = `fn parse_count(input: &str) -> Result<i32, String> {\n    match input.parse::<i32>() {\n        Ok(value) => Ok(value),\n        Err(_) => Err("invalid count".to_string()),\n    }\n}`;
      break;
    case "&mut":
      code = `fn push_name(names: &mut Vec<String>, name: String) {\n    names.push(name);\n}`;
      break;
    case "Option<":
      code = `fn find_user(id: u32) -> Option<User> {\n    if id == 1 {\n        Some(User::new())\n    } else {\n        None\n    }\n}`;
      break;
    case "&self":
      code = `impl User {\n    fn get_name(&self) -> &str {\n        &self.name\n    }\n}`;
      break;
    case "match":
      code = `fn process(status: Status) {\n    match status {\n        Status::Active => println!("active"),\n        Status::Pending => println!("pending"),\n    }\n}`;
      break;
    case "::":
      code = `fn new_user() -> std::sync::Arc<User> {\n    std::sync::Arc::new(User::default())\n}`;
      break;
    default:
      code = `fn generic_drill(value: Option<i32>) -> Result<i32, &'static str> {\n    match value {\n        Some(v) => Ok(v),\n        None => Err("missing"),\n    }\n}`;
  }

  // Find a second weak token to include in the title if available and reasonable
  let titleTokens = topToken;
  if (sorted.length > 1) {
    titleTokens += `, ${sorted[1]!.token}`;
  }

  return {
    id: `retry-${idSuffix}`,
    title: `Weak Token Retry: ${titleTokens}`,
    description: "A generated drill to practice your weakest tokens from the last session.",
    language: "rust",
    topic: "Syntax Drill",
    dsaPattern: "none",
    difficulty: "medium",
    source: "built_in",
    tags: ["retry", topToken],
    code,
    createdAt: currentTimeIso,
    updatedAt: currentTimeIso,
  };
}
