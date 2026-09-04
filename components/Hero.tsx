import Link from "next/link";
import { Button } from "@/components/ui/button";
import HowToUseButton from "@/components/HowToUseButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Box,
  BarChart3,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">Orion WMS</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#solutions"
              className="hover:text-foreground transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="inline-flex">
                Log in
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
            ✨ Introducing Orion WMS 2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl text-foreground mb-6">
            Warehouse operations,{" "}
            <span className="text-primary">simplified.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            Take control of your inventory, automate inbound routing, and ship
            orders faster with a modern warehouse management system built for
            speed and scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/unfinished">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Book a Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <HowToUseButton />
          </div>

          {/* Abstract Dashboard Mockup */}
          <div className="mt-16 w-full max-w-5xl rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden ring-1 ring-border/50">
            <div className="flex items-center border-b px-4 py-3 bg-muted/50">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
            </div>
            <div className="aspect-[16/9] md:aspect-[21/9] bg-muted/20 p-8 flex flex-col gap-4">
              <div className="flex gap-4 w-full h-24">
                <div className="flex-1 rounded-lg bg-muted/50 border border-border/50 animate-pulse" />
                <div className="flex-1 rounded-lg bg-muted/50 border border-border/50 animate-pulse hidden sm:block" />
                <div className="flex-1 rounded-lg bg-muted/50 border border-border/50 animate-pulse hidden md:block" />
              </div>
              <div className="flex-1 rounded-lg bg-muted/30 border border-border/50 w-full" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted/30 py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Everything you need to scale
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Powerful features designed specifically to reduce manual data
                entry, prevent stockouts, and keep your floor moving.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <Card className="border-border/50 bg-background/50 shadow-none">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Real-Time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monitor inventory levels as they change instantly across
                    multiple locations and zones.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="border-border/50 bg-background/50 shadow-none">
                <CardHeader>
                  <Box className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Smart Inbound</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically route incoming pallets to optimal putaway
                    locations based on velocity and size.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="border-border/50 bg-background/50 shadow-none">
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Actionable Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Identify bottlenecks and forecast stock requirements with
                    dynamic visual reporting.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof / Trust Section */}
        <section className="py-24 border-t">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <ShieldCheck className="h-16 w-16 text-muted-foreground/30 mx-auto mb-8" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">
              Trusted by modern logistics teams
            </h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
              {/* Replace these with actual logos */}
              <div className="text-xl font-bold">Acme Corp</div>
              <div className="text-xl font-bold">Global Freight</div>
              <div className="text-xl font-bold">Swift Logistics</div>
              <div className="text-xl font-bold">Apex Supply</div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 md:px-8 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to optimize your warehouse?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl">
              Join thousands of operations managers who have cut picking times
              by 30% and eliminated manual inventory checks.
            </p>
            <Link href="/unfinished">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-primary font-semibold"
              >
                Contact us
              </Button>
            </Link>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> No credit card required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> 14-day free trial
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t bg-background py-10">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold tracking-tight">
              Orion WMS
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Orion Logistics Software. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/unfinished" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/unfinished" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/unfinished" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
