import Image from "next/image";
import Hero from "../components/home/hero";
import Advantage from "../components/home/advantage";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-15">
      <section className="w-full h-[660px] relative">
        <Hero/>
      </section>
      <section className="w-full">
        <Advantage/>
      </section>
    </div>
  );
}
