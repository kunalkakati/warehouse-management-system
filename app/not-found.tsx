// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hammer, ArrowLeft, Wrench } from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";

export default async function NotFound() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center bg-background text-foreground font-sans">
      <div className="relative flex items-center justify-center mb-8">
        {/* Animated Background Blob */}
        <div className="absolute w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />

        {/* Icons */}
        <div className="relative flex gap-4 text-primary">
          <Wrench className="w-12 h-12 -rotate-12" />
          <Hammer className="w-12 h-12 animate-bounce rotate-12" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
        We&apos;re still building this.
      </h1>

      <p className="text-lg text-muted-foreground max-w-md mb-8">
        This route is currently under active development. We&apos;re laying the
        digital bricks, so check back soon!
      </p>

      <Link href="/">
        <Button size="lg" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>
      {!session && (
        <p className="text-sm mt-3 text-red-500 max-w-md mb-8">
          * Please click log-in, demo-credentials are listed there. you can use
          it to explore.
        </p>
      )}
    </div>
  );
}
