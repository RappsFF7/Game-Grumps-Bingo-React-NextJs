import { Suspense } from "react";
import Gameboard from "@/app/_components/gameboard";

export default function Home() {
  return (
    <main>
      <Suspense>
        <Gameboard />
      </Suspense>
    </main>
  );
}
