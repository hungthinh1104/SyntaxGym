import { createTypingSession, applyInput } from "./packages/typing-core/src/index.ts";
import { calculateScore } from "./packages/typing-core/src/calculate-score.ts";

let session = createTypingSession({ snippetId: "test", source: "abc" });
session = applyInput(session, { kind: "character", value: "z", timestamp: 100 });
session = applyInput(session, { kind: "backspace", timestamp: 200 });
session = applyInput(session, { kind: "character", value: "a", timestamp: 300 });

console.log("Mistakes:", session.mistakes.length);
console.log("Accuracy:", calculateScore(session).accuracy);
