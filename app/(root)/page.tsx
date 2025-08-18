import Image from "next/image";
import Hero from "../../components/home/hero";
import Advantage from "../../components/home/advantage";
import CarShowCase from "../../components/home/carShowCase";
import Numbers from "../../components/home/numbers";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-15">
      <section className="w-full h-[660px] relative">
        <Hero />
      </section>
      <section className="w-full">
        <Advantage />
      </section>
      <section className="w-full">
        <CarShowCase />
      </section>
      <section className="w-full h-[486px] my-15">
        <Numbers />
      </section>
    </div>
  );
}
