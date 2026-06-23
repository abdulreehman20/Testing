"use client";

import { Button } from "@/components/ui/button";

export default function SentryPage() {
  const handleClick = () => {
    alert("Test error");
    throw new Error("Test error");
  };
  return (
    <div>
      <main>Sentry Test Page</main>
      <Button onClick={handleClick}>Test Error</Button>
    </div>
  );
}
