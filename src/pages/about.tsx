import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import cvMarkdown from "./CV_EN.md?raw";

type TerminalOutput = {
  href?: string;
  text: string;
};

type TerminalLine =
  | {
      id: number;
      kind: "command";
      command: string;
    }
  | ({
      id: number;
      kind: "output";
    } & TerminalOutput);

const terminalUser = "dyssi@dyslexic_goegrapher.be";
const terminalRoot = "~/";
const typingDelay = 20;
const outputDelay = 1000;
const nextCommandDelay = 350;

const terminalSteps = [
  {
    command: "whoami",
    output: [
      {
        href: "https://sifa.id/p/dyslexic-goegrapher.be",
        text: "dyssi",
      },
    ],
  },
  {
    command: "ls skills/",
    output: [{ text: "gis.md web_dev.md" }],
  },
  {
    command: "code resume.md",
    output: [],
  },
];

function TerminalPrompt() {
  return (
    <>
      <span className="text-[#88b369]">{terminalUser}</span>
      <span className="text-[#6a9fb5]">:{terminalRoot}</span>$
    </>
  );
}

export default function About() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [activeCommandId, setActiveCommandId] = useState<number | null>(null);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const timeouts: number[] = [];

    const wait = (duration: number) =>
      new Promise<void>((resolve) => {
        const timeout = window.setTimeout(resolve, duration);
        timeouts.push(timeout);
      });

    const runTerminalSession = async () => {
      for (const [stepIndex, step] of terminalSteps.entries()) {
        const commandId = stepIndex * 10;

        setTerminalLines((currentLines) => [
          ...currentLines,
          { command: "", id: commandId, kind: "command" },
        ]);
        setActiveCommandId(commandId);

        for (
          let characterIndex = 1;
          characterIndex <= step.command.length;
          characterIndex += 1
        ) {
          await wait(typingDelay);

          if (isCancelled) {
            return;
          }

          setTerminalLines((currentLines) =>
            currentLines.map((line) =>
              line.id === commandId && line.kind === "command"
                ? { ...line, command: step.command.slice(0, characterIndex) }
                : line,
            ),
          );
        }

        await wait(outputDelay);

        if (isCancelled) {
          return;
        }

        setActiveCommandId(null);

        if (step.output.length > 0) {
          setTerminalLines((currentLines) => [
            ...currentLines,
            ...step.output.map((output, outputIndex) => ({
              id: commandId + outputIndex + 1,
              kind: "output" as const,
              ...output,
            })),
          ]);
        }

        await wait(nextCommandDelay);

        if (isCancelled) {
          return;
        }
      }

      setShowResume(true);
    };

    runTerminalSession();

    return () => {
      isCancelled = true;
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return (
    <main className="w-full max-w-4xl overflow-x-auto text-left">
      <div className="rounded-sm bg-[#232831] p-4 font-mono text-sm leading-5 text-[#d5d7dd]">
        {terminalLines.map((line) => {
          if (line.kind === "output") {
            return (
              <p key={line.id}>
                {line.href ? (
                  <a
                    className="underline underline-offset-2 hover:text-[#3794ff]"
                    href={line.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {line.text}
                  </a>
                ) : (
                  line.text
                )}
              </p>
            );
          } else {
            return (
              <p key={line.id}>
                <TerminalPrompt /> {line.command}
                {activeCommandId === line.id ? (
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[#ffffff]" />
                ) : null}
              </p>
            );
          }
        })}
      </div>

      {showResume ? (
        <article className="mt-8 max-w-4xl rounded-md border border-[#3c3c3c] bg-[#1e1e1e] p-6 text-left text-[#d4d4d4] shadow-xl md:p-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-6 text-4xl font-bold text-[#569cd6]">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-10 mb-4 border-b border-[#3c3c3c] pb-2 text-2xl font-semibold text-[#4ec9b0]">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 mb-3 text-lg font-semibold text-[#c586c0]">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="mt-6 mb-2 text-base font-semibold text-[#dcdcaa]">
                  {children}
                </h4>
              ),
              p: ({ children }) => <p className="my-3 leading-7">{children}</p>,
              a: ({ children, href }) => (
                <a
                  className="text-[#3794ff] underline decoration-[#3794ff]/50 underline-offset-2 hover:text-[#4fc1ff]"
                  href={href}
                  rel="noreferrer"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-[#dcdcaa]">
                  {children}
                </strong>
              ),
              ul: ({ children }) => (
                <ul className="my-3 list-disc space-y-1 pl-6 marker:text-[#6a9955]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-3 list-decimal space-y-1 pl-6 marker:text-[#6a9955]">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="leading-7">{children}</li>,
              table: ({ children }) => (
                <div className="my-5 overflow-x-auto rounded border border-[#3c3c3c]">
                  <table className="w-full border-collapse text-left text-sm">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border-b border-[#3c3c3c] bg-[#252526] px-4 py-2 font-semibold text-[#9cdcfe]">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-[#3c3c3c] px-4 py-2 align-top">
                  {children}
                </td>
              ),
            }}
          >
            {cvMarkdown}
          </ReactMarkdown>
        </article>
      ) : null}
    </main>
  );
}
