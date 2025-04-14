'use client'
import dynamic from "next/dynamic";

const Stats = dynamic(() => import("./StatsClient"), {
  ssr: false
});

export default function Page() {
  return <Stats/>;
}
