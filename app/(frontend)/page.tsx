import BlurIn from "@/components/magicui/blur-in";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen w-screen flex items-center justify-between gap-0 relative">
     <section className="w-full h-full flex flex-col items-center justify-center gap-20">
      <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-tr from-primary/60 via-purple-500 to-primary/60 bg-clip-text text-transparent">
        Welcome to Patient AI
      </h1>
        <div className="w-full flex items-center justify-center gap-10">
            <Link href="/create-patient">
              <Button>
                Create Patient 
              </Button>
              
            </Link>
            <Link href="/get-patient">
              <Button variant={'ghost'} className="text-primary">
                Fetch Patient
              </Button>
            </Link>
        </div>
        <span className="text-sm absolute bottom-5">
          Developed by <Link href="https://www.linkedin.com/in/abhinandan-verma/" target="_blank" className="text-primary/70 hover:text-primary">Abhinandan</Link>
        </span>
     </section>
    </main>
  );
}
