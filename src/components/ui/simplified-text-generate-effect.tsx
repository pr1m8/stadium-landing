"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [wordArray, setWordArray] = useState<string[]>([]);

  useEffect(() => {
    setWordArray(words.split(" "));
  }, [words]);

  const [generatedWords, setGeneratedWords] = useState<string[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const generate = () => {
      if (currentIndex < wordArray.length) {
        setGeneratedWords(wordArray.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(generate, 40);
      }
    };

    timeout = setTimeout(generate, 0);

    return () => clearTimeout(timeout);
  }, [wordArray]);

  return (
    <div className={cn("", className)}>
      {generatedWords.map((word, idx) => (
        <React.Fragment key={idx}>
          {word}
          {idx < generatedWords.length - 1 && " "}
        </React.Fragment>
      ))}
      {generatedWords.length < wordArray.length && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  );
};
