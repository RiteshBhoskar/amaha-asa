"use client"

import { useEffect, useState, type FormEvent } from "react";
import {
  motion,
  AnimatePresence,
  useAnimate,
} from "motion/react";

const suggestions = [
  "Explore my projects",
  "Tell me about yourself",
  "Let's build something",
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AiAssistant() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (chatOpen) {
      setShowSuggestions(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowSuggestions(true);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [chatOpen]);

  useEffect(() => {
    if (!showSuggestions || chatOpen) return;

    let cancelled = false;

    async function runSequence() {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
      );

      if (cancelled) return;

      const pills =
        scope.current?.querySelectorAll("button[data-suggestion]") as
          | NodeListOf<HTMLButtonElement>
          | undefined;

      if (!pills?.length) return;

      const spring = {
        type: "spring" as const,
        stiffness: 380,
        damping: 27,
      };

      await Promise.all(
        Array.from(pills).map((pill, index) =>
          animate(
            pill,
            {
              opacity: 0,
              x: index === 0 ? 28 : 0,
              y: index === 0 ? 0 : 16,
              scale: 0.94,
            },
            { duration: 0 }
          )
        )
      );

      if (cancelled) return;

      await animate(
        pills[0],
        { opacity: 1, x: 0, y: 0, scale: 1 },
        spring
      );

      if (cancelled) return;

      if (pills[1]) {
        await animate(
          pills[1],
          { opacity: 1, x: 0, y: 0, scale: 1 },
          spring
        );
      }

      if (cancelled) return;

      if (pills[2]) {
        await animate(
          pills[2],
          { opacity: 1, x: 0, y: 0, scale: 1 },
          spring
        );
      }
    }

    runSequence();

    return () => {
      cancelled = true;
    };
  }, [showSuggestions, chatOpen, animate, scope]);

  function openChat(question?: string) {
    setShowSuggestions(false);
    setChatOpen(true);

    if (question) {
      setMessages([{ role: "user", content: question }]);
    } else {
      setMessages([]);
    }
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: text },
    ]);

    setInput("");
  }

  return (
    <>
      <div className="fixed bottom-10 right-10 z-[9999] isolate">
        <div
          ref={scope}
          className="pointer-events-none absolute bottom-0 right-[calc(100%+12px)] z-[9998]"
        >
          <div className="pointer-events-auto flex flex-col-reverse items-end gap-2">
            <AnimatePresence>
              {showSuggestions &&
                !chatOpen &&
                suggestions.map((question, index) => (
                  <motion.button
                    key={question}
                    data-suggestion
                    type="button"
                    onClick={() => openChat(question)}
                    style={{
                      opacity: 0,
                      x: index === 0 ? 28 : 0,
                      y: index === 0 ? 0 : 16,
                      scale: 0.94,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                      transition: { duration: 0.15 },
                    }}
                    className="pointer-events-auto relative cursor-pointer whitespace-nowrap rounded-t-full rounded-bl-full rounded-br-xl border border-black/5 bg-[#C54D56] px-[16px] py-[7px] text-sm text-neutral-900 shadow-lg"
                  >
                    {question}
                  </motion.button>
                ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          type="button"
          aria-label="Open AI assistant chat"
          aria-expanded={chatOpen}
          onClick={() => openChat()}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative z-[9999] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-orange-500 font-semibold text-white shadow-lg hover:bg-orange-600"
        >
          A
        </motion.button>
      </div>

      <AnimatePresence>
        {chatOpen && (
          <motion.section
            key="assistant-chat"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label="AI assistant chat"
            className="fixed bottom-24 right-6 z-[9999] flex h-[min(520px,calc(100dvh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 bg-white px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
                  A
                </div>

                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Amaha Assistant
                  </p>
                  <p className="text-xs text-neutral-500">
                    Let's talk
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setChatOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-neutral-50/70 p-4">
              {messages.length === 0 && (
                <div className="mt-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                    A
                  </div>

                  <h2 className="mb-1 text-lg font-semibold text-neutral-900">
                    Hey there!
                  </h2>

                  <p className="text-sm leading-6 text-neutral-600">
                    What would you like to know? Ask me about my projects,
                    background, or anything else.
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.role}`}
                  className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-5 ${
                    message.role === "user"
                      ? "self-end rounded-br-md bg-orange-500 text-white"
                      : "self-start rounded-bl-md border border-neutral-200 bg-white text-neutral-800"
                  }`}
                >
                  {message.content}
                </div>
              ))}

              {messages.length > 0 && (
                <p className="mt-2 text-center text-xs leading-5 text-neutral-400">
                  Chat interface preview — connect an AI API to enable responses.
                </p>
              )}
            </div>

            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2 border-t border-neutral-100 bg-white p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask me anything..."
                aria-label="Type a message"
                className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-orange-400 focus:bg-white"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M22 2 11 13" />
                  <path d="m22 2-7 20-4-9-9-4Z" />
                </svg>
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
