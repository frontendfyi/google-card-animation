import "./index.css";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function App() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [animationState, setAnimateState] = useState<
    "idle" | "opening" | "closing"
  >("idle");

  useEffect(() => {
    if (animationState === "closing") {
      setTimeout(() => {
        setActiveCard(null);
        setAnimateState("idle");
      }, 1000);
    }
  }, [animationState]);

  return (
    <div className="grid">
      <div className="grid h-screen grid-cols-2 place-items-center overflow-hidden bg-blue-500 [grid-area:1/1] [perspective:500px]">
        <div className="peer/next blob-left group relative flex h-full w-full items-end pb-8 pr-[80px] md:items-center md:pb-0">
          <ActionButton direction="left" text="Next card" />
        </div>
        <div className="peer/show blob-right group relative flex h-full w-full items-end pb-8 pl-[80px] md:items-center md:pb-0">
          <ActionButton
            onClick={(ev) => {
              setAnimateState("opening");
              setActiveCard("fake-id");
              ev.currentTarget.blur();
            }}
            text="Show me!"
            direction="right"
          />
        </div>

        <Card className="rotate-[1deg] [grid-area:1/1]" />
        <Card className="-rotate-[1deg] [grid-area:1/1]" />
        <Card
          className="rotate-[1.5deg] [grid-area:1/1]"
          title="You will be amazed"
        />

        <Card
          className={twMerge(
            "peer-hover/next:card--to-left peer-focus-within/next:card--to-left peer-hover/show:card--to-right peer-focus-within/show:card--to-right [grid-area:1/1]",
            animationState === "opening" && "animate-card-visible",
            animationState === "closing" && "animate-card-hidden",
          )}
          title="Animate so many things with just CSS!"
        />
      </div>

      {activeCard && (
        <div className="content-container absolute inset-0 flex justify-center overflow-auto pb-20">
          <div
            className={twMerge(
              "pointer-events-none relative top-[5vh] mb-20 min-h-screen w-full bg-white px-16 py-16 opacity-0 md:rounded-[4.5rem]",
              animationState === "opening" && "animate-card-details",
              animationState === "closing" && "animate-card-details-hidden",
            )}
          >
            <button
              onClick={() => setAnimateState("closing")}
              className="absolute right-8 top-8 flex h-20 w-20 items-center justify-center rounded-full bg-black text-4xl"
            >
              👋
            </button>
            <h1 className="text-4xl leading-[1.1] [white-space:balance] md:text-[120px]">
              Animate so many things with just CSS
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

const Card = ({ className, title }: { className?: string; title?: string }) => (
  <div
    className={twMerge(
      "pointer-events-none absolute grid aspect-[3/4] w-[65vw] transition-transform duration-1000 [transform-style:preserve-3d] md:w-[30vw]",
      className,
    )}
  >
    <div className="pointer-events-none rounded-3xl bg-gray-300 [grid-area:1/1] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:translateZ(-5px)] md:-mb-[5px] md:-mt-[5px] md:[transform:translateZ(-10px)]" />
    <div className="pointer-events-none absolute flex h-full w-full flex-col items-start rounded-3xl bg-gray-100 p-8 shadow-2xl [grid-area:1/1]">
      <p className="mb-2 rounded-full bg-blue-400 px-5 py-1 text-xs text-white md:text-sm">
        The web can
      </p>
      {title && (
        <p className="font-medium leading-tight md:text-4xl">{title}</p>
      )}

      <div className="mx-auto mt-auto h-[40%] w-[80%] rounded-[80px] bg-blue-200 text-[0px]">
        The place for a nice illustration
      </div>
    </div>
    <div className="pointer-events-none rounded-3xl bg-white [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]" />
  </div>
);

const ActionButton = ({
  onClick,
  direction,
  text,
}: {
  onClick?: (ev: React.PointerEvent<HTMLButtonElement>) => void;
  direction: "left" | "right";
  text: string;
}) => (
  <button
    onClick={onClick}
    className={twMerge(
      "relative flex w-full items-center justify-center font-bold text-[rgba(0,0,0,.6)] transition-[transform,color] duration-500 focus-visible:text-white group-hover:text-white md:text-4xl",
      direction === "right" &&
        "focus-visible:translate-x-36 group-hover:translate-x-36",
      direction === "left" &&
        "focus-visible:-translate-x-36 group-hover:-translate-x-36",
    )}
  >
    <span
      className={twMerge(
        "button-underline relative block",
        direction === "right" && "[--from:-30px] [--to:0px]",
        direction === "left" && "[--from:0] [--to:-30px]",
      )}
    >
      {text}
    </span>
  </button>
);

export default App;
