"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AiPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBlocking = async () => {
    setIsGenerating(true);
    await fetch("/api/ai", { method: "POST" });
    setIsGenerating(false);
  };

  return (
    <div>
      <main>
        <h1>Ai Page</h1>
        <Button onClick={handleBlocking}>
          {isGenerating ? "Generating..." : "Generate Text"}
        </Button>
      </main>
    </div>
  );
}
