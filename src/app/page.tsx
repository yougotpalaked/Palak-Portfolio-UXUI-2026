import { Card } from "../components/ui/card";
import { Eyes } from "../components/Eyes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center">
        {/* Centered Eyes component with increased size */}
        <div className="flex justify-center items-center mb-16 w-full" style={{ transform: 'scale(1.5)', minHeight: '25vh' }}>
          <Eyes />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Card
            href="/about"
            title="About"
            description="Learn more about me, my background, and my skills."
          />
          <Card
            href="/projects"
            title="Projects"
            description="Check out some of the projects I've worked on."
          />
          <Card
            href="/contact"
            title="Contact"
            description="Get in touch with me for collaborations or opportunities."
          />
          <Card
            href="/blog"
            title="Blog"
            description="Read my thoughts on technology, design, and more."
          />
        </div>
      </div>
    </main>
  );
}