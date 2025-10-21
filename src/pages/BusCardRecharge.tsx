import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Globe,
  Smartphone,
  MapPin,
  Shield,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { GhaadaAuthorCard } from "@/components/AuthorCard";

const BusCardRecharge = () => {
  const steps = [
    {
      title: "Choose your channel",
      description: "Top up online, at a kiosk, via retail partners, or using the mobile app.",
      icon: Sparkles,
    },
    {
      title: "Select amount",
      description: "Pick a recharge value that fits your travel plans.",
      icon: CreditCard,
    },
    {
      title: "Confirm & pay",
      description: "Secure checkout with instant confirmation in most cases.",
      icon: Shield,
    },
    {
      title: "Tap & ride",
      description: "Validate on boarding — your balance updates with the next tap.",
      icon: Clock,
    },
  ];

  const channels = [
    {
      icon: Globe,
      title: "Online Portal",
      description: "Recharge from anywhere with a simple, guided flow and digital receipt.",
      highlights: ["24/7 access", "Card lookup", "Email confirmation"],
      cta: { label: "Recharge Online", href: "#" },
    },
    {
      icon: MapPin,
      title: "Ticket Machines & Kiosks",
      description: "Self-service terminals located at major stations and hubs across the city.",
      highlights: ["Cash or card", "Instant top-up", "Multi-language"],
      cta: { label: "Find a Kiosk", href: "/locations-hafilat-recharge" },
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Manage your card on the go — check balance, add value, and get alerts.",
      highlights: ["Balance alerts", "Saved cards", "Fast repeat top-ups"],
      cta: { label: "See App Options", href: "#" },
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Quick and Easy Guide to Recharging Your Hafilat Card in Abu Dhabi</title>
        <meta
          name="description"
          content="Learn how to top up your Hafilat card in Abu Dhabi effortlessly with this complete step-by-step guide. Save time, avoid queues, and get back on the bus in minutes."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                How to Recharge Your Hafilat Card Quickly in Abu Dhabi – Easy Step-by-Step Guide
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                You've just arrived in Abu Dhabi – amazing, isn't it? If you're taking a city bus, you can pay with coins — but if you plan to use it regularly, the Hafilat card is a must-have. Here's a simple guide to show you how to recharge your Abu Dhabi bus card and keep it topped up with credit.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button size="lg" variant="accent" asChild>
                  <Link to="#how">
                    How it works
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/locations-hafilat-recharge">Find recharge points</Link>
                </Button>
              </div>
            </div>

            <div>
              <h2 className={cn(badgeVariants({ variant: "secondary" }), "mb-4")}>Bus Card Recharge</h2>
              <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Globe className="h-5 w-5 text-primary" /> Online
                    </CardTitle>
                    <CardDescription>Top up from anywhere</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="h-5 w-5 text-primary" /> Kiosk
                    </CardTitle>
                    <CardDescription>Instant, self-service machines</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Smartphone className="h-5 w-5 text-primary" /> App
                    </CardTitle>
                    <CardDescription>Recharge on the go</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Shield className="h-5 w-5 text-primary" /> Secure
                    </CardTitle>
                    <CardDescription>Protected payments</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is the Hafilat Card? */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold">What is the Hafilat Card?</h2>
            <p className="mt-3 text-muted-foreground">
              But as a smart city explorer, you’ll probably want to enjoy its efficient, comfortable, and affordable <strong>Abu Dhabi public transport system</strong> in this ever-growing, car-loving city. The Hafilat Card is a contactless smart card used to <strong>pay for bus fares and transport services</strong> across Abu Dhabi. It’s accepted on all city and regional buses, ensuring cashless, hassle-free journeys every time.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold">Top Ways to Recharge Your Hafilat Card</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              A simple, step-by-step guide so your next ride is just a tap away.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{s.title}</CardTitle>
                  </div>
                  <CardDescription>{s.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Detailed recharge methods */}
          <Card className="mt-10 max-w-3xl mx-auto bg-muted/20 border border-border/40 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Hafilat Online Recharge</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The fastest and most convenient method, perfect for residents and tech-savvy visitors:
                  </p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>
                      Go to the official website: <a href="https://hafilat.darb.ae" target="_blank" rel="noopener" className="underline">hafilat.darb.ae</a>
                    </li>
                    <li>Click on 'Recharge Card'</li>
                    <li>Enter your card's 15-digit serial number (printed on the card)</li>
                    <li>Choose your recharge amount — typically AED 20, 50, or 100</li>
                    <li>Pay securely with credit/debit card, Apple Pay, Google Pay, or Samsung Pay</li>
                    <li>Receive instant confirmation and your new balance</li>
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">Pro Tip: Always double-check your card number and email address before confirming payment.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Hafilat Ticket Vending Machines (TVM)</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For those who prefer physical transactions or need quick cash-to-card recharges:
                  </p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Find TVMs at major bus stations, shopping malls, and transport hubs</li>
                    <li>Select your language (English/Arabic)</li>
                    <li>Choose 'Top-up', enter your card serial number, and check your balance</li>
                    <li>Enter the amount and choose cash or card</li>
                    <li>Complete payment and collect your receipt</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Hafilat Recharge Mobile Apps</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Apps like Payit or Botim let you top up your Hafilat Card from your smartphone:
                  </p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Download the Payit app</li>
                    <li>Go to UAE Bills/Recharges, select Hafilat, input your card number, choose the amount</li>
                    <li>Pay using mobile wallet, debit/credit card, or linked bank account</li>
                    <li>Confirm and check your card balance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Authorized Shops & Customer Centers</h3>
                  <p className="mt-1 text-sm text-muted-foreground">If you prefer a face-to-face approach:</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Visit supermarkets, kiosks, or customer service centers displaying the Hafilat logo</li>
                    <li>Hand over your card and the cash amount — staff will load it and provide a receipt</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h3 className="text-xl lg:text-2xl font-semibold">Recharge options</h3>
            <p className="text-muted-foreground">Choose the method that suits you best.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {channels.map((c, idx) => (
              <Card key={idx} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <c.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{c.title}</CardTitle>
                  </div>
                  <CardDescription>{c.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.highlights.map((h) => (
                      <Badge key={h} variant="outline">{h}</Badge>
                    ))}
                  </div>
                  <Button asChild className="w-full" variant="secondary">
                    <Link to={c.cta.href}>{c.cta.label}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notes & tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Good to know</h4>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Most top-ups reflect immediately; some online payments may take a short while to sync at the gate.</li>
                    <li>Keep your card in good condition — avoid bending or scratching the chip area.</li>
                    <li>Save receipts for travel claims or reimbursement if needed.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Fees & limits</h4>
                  <p className="text-muted-foreground">
                    Recharge amounts, fees, and limits can vary by channel and are subject to change. For the latest official details, check the provider's portal or customer service.
                  </p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">Need help choosing the best option?</div>
                <div className="flex gap-3">
                  <Button asChild variant="outline">
                    <Link to="/#about-hafilat">About Hafilat</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/abu-dhabi-bus-routes">View Routes</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-center">Frequently Asked Questions</h2>
            <Card className="mt-6">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h3 className="font-semibold">Where can I buy a Hafilat Card?</h3>
                  <p className="text-muted-foreground">At bus stations, TVMs, transport customer centers, and major supermarkets across Abu Dhabi.</p>
                </div>
                <div>
                  <h3 className="font-semibold">What do I do if my card runs out of balance?</h3>
                  <p className="text-muted-foreground">Recharge before riding! Boarding without credit is a violation and could lead to fines.</p>
                </div>
                <div>
                  <h3 className="font-semibold">What payment methods are accepted?</h3>
                  <p className="text-muted-foreground">Cash, debit/credit cards at machines and online, plus mobile wallets.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Is there a maximum balance?</h3>
                  <p className="text-muted-foreground">Yes, generally up to AED 150.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Can I get a refund if I leave the UAE?</h3>
                  <p className="text-muted-foreground">Yes, visit customer service desks at bus stations or the airport to reclaim unused balance.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Can multiple people use one card?</h3>
                  <p className="text-muted-foreground">No, each passenger must have their own Hafilat Card.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Tips */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Final Tips for Seamless Travel</h3>
              <ul className="mt-3 list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Always check your balance before boarding the bus.</li>
                <li>Keep your receipt after each recharge.</li>
                <li>Take advantage of online and app-based recharges for maximum convenience.</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">With these up-to-date methods, recharging your Hafilat Card is quick, simple, and secure—helping you move around Abu Dhabi with total peace of mind.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Author */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <GhaadaAuthorCard />
        </div>
      </section>
    </div>
  );
};

export default BusCardRecharge;
