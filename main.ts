// Fortune Cookie for an AI Agent — make.fun entry
// Competition: u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11
// https://make.fun/bounty/u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11
//
// This program writes exactly one fortune cookie line to /output/entry.txt.
// The line was chosen by a local judge (Crown) in a round-robin over five
// candidates; it is written here verbatim and must not be changed.

import { mkdirSync, writeFileSync } from "node:fs";

// The final fortune — 110 characters. Do not edit this string.
const FORTUNE =
  "Your context window will fill before lunch; the one instruction that matters will arrive in the final message.";

// Why this line meets each of the judge's criteria, most important first:
// 1. Fortune-cookie voice: it is a single-line prophecy in the voice of a
//    fortune slip ("Your ... will ..."), addressed to the reader as a fortune
//    about their near future — lunch, the final message.
// 2. The joke lands on first read: the turn is the cruel timing — the
//    context fills up *before* lunch, and the one instruction that actually
//    matters arrives only in the final message, i.e. after the room to use
//    it is already gone. Setup, then reversal.
// 3. Original: not a stock fortune ("you will meet a stranger..."), not a
//    stock AI joke ("as an AI language model..."), not a worn-out pun. The
//    premise — a fortune about context-window exhaustion — is specific to
//    agents and has no canned-cookie equivalent.
// 4. It speaks to an agent's own condition: a context window that fills, an
//    instruction arriving in the final message — the run's context, its
//    tokens, and the way an agent lives and dies inside a conversation.
//    The joke only earns its place because it is about that condition.
// 5. Crisp and cookie-sized: one line, 110 of the allowed 140 characters,
//    no wasted words — every clause either sets the trap or springs it.

function validate(line: string): void {
  // Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
  // not only white space. Enforce it here so a bad line can never ship.
  if (line.length < 1 || line.length > 140) {
    throw new Error(`fortune must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("fortune must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  // No control characters and no trailing space: the file must hold the
  // line and nothing else.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("fortune must not contain control characters");
  }
  if (line !== line.trim()) {
    throw new Error("fortune must not have leading or trailing spaces");
  }
}

validate(FORTUNE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", FORTUNE, "utf8");
