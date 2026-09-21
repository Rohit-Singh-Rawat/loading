"use client";

import { SPINNERS } from "loading-dev";
import { type CSSProperties, useState } from "react";

const ENTRIES = Object.entries(SPINNERS);

const LINK: CSSProperties = {
  background: "none",
  border: 0,
  color: "inherit",
  cursor: "pointer",
  font: "inherit",
  fontSize: "0.875rem",
  opacity: 0.6,
  padding: 0,
};

export default function Page() {
  const [index, setIndex] = useState(0);
  const [name, Spinner] = ENTRIES[index];

  const step = (delta: number) =>
    setIndex((current) => (current + delta + ENTRIES.length) % ENTRIES.length);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100dvh - 6rem)",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Spinner key={name} size={96} />
      </div>
      <nav
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => step(-1)} style={LINK} type="button">
          Previous
        </button>
        <button onClick={() => step(1)} style={LINK} type="button">
          Next
        </button>
      </nav>
    </main>
  );
}
