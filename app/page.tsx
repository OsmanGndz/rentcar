import Image from "next/image";
import Hero from "../components/hero";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <section className="w-full h-screen relative">
        <Hero/>
      </section>
      <section>advantages part</section>
    </div>
  );
}
