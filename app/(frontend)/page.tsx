import BlurIn from "@/components/magicui/blur-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center gap-20">
      <BlurIn word="Welcome to Patient AI" className="bg-gradient-to-tr from-primary/50 via-purple-600/70 to-primary/60 bg-clip-text text-transparent"/>

      <div className="w-full flex items-center justify-center gap-10">
          <Link href="/login">
            <Button>
              Create Patient 
            </Button>
            
          </Link>
          <Link href="/login">
            <Button variant={'ghost'}>
              Fetch Patient
            </Button>
           </Link>
      </div>
    </main>
  );
}
