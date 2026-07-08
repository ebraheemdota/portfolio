import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FieldWork from "@/components/FieldWork";
import Experience from "@/components/Experience";
import SideProjects from "@/components/SideProjects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative z-[1001]">
      <Nav />
      <Hero />
      <FieldWork />
      <Experience />
      <SideProjects />
      <About />
      <Contact />
    </div>
  );
}
