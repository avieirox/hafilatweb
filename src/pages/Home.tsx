import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  CreditCard, 
  MapPin, 
  Clock, 
  DollarSign, 
  Shield, 
  Smartphone,
  Bus,
  CheckCircle,
  ArrowRight,
  Globe,
  IdCard,
  GraduationCap,
  UserRound,
  Receipt,
  PiggyBank,
  Lightbulb
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import heroBg from "@/assets/hero-bg.jpg";
// Using public image for hero visual

const Home = () => {
  const features = [
    {
      icon: CreditCard,
      title: "Smart Payment",
      description: "Contactless payment for all Abu Dhabi public transport"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Save money with discounted fares compared to cash payments"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Advanced security features protect your balance and data"
    },
    {
      icon: Smartphone,
      title: "Easy Management",
      description: "Check balance, recharge, and manage your card digitally"
    }
  ];

  const quickActions = [
    {
      title: "Check Balance",
      description: "View your current Hafilat Card balance",
      icon: CreditCard,
      href: "/#check-hafilat-balance",
      variant: "hero" as const
    },
    {
      title: "Find Recharge Locations",
      description: "Locate nearest recharge points",
      icon: MapPin,
      href: "/locations-hafilat-recharge",
      variant: "accent" as const
    },
    {
      title: "View Routes",
      description: "Browse bus routes and schedules",
      icon: Bus,
      href: "/routes",
      variant: "outline" as const
    }
  ];

  const benefits = [
    "No need to carry exact change",
    "Faster boarding and reduced waiting times",
    "Track your travel expenses easily",
    "Refillable and reusable card",
    "Works on all public transport in Abu Dhabi"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Complete
                <span className="block text-accent"> Hafilat Card</span>
                Guide
              </h1>
              <p className="text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed">
                Everything you need to know about Abu Dhabi's smart transportation card. From buying to recharging, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <a href="#check-hafilat-balance">
                  <Button size="lg" variant="hero" className="w-full sm:w-auto text-lg px-8 py-6">
                    Check Balance
                  </Button>
                </a>
                <a href="https://hafilat.darb.ae/" target="_blank" rel="noopener nofollow">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                    Official Site
                    <Globe className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl overflow-hidden bg-primary-foreground transform hover:scale-105 transition-spring p-2 sm:p-3">
                <img
                  src="/hafilat-card.png"
                  alt="Hafilat card illustration"
                  className="w-full h-auto object-contain rounded-md"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Hafilat Card?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the benefits of Abu Dhabi's smart transportation solution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-card hover:shadow-hero transition-spring">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-hero rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Recharge Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How to Recharge Your Hafilat Card
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Keep your card topped up with multiple convenient recharge options available across Abu Dhabi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Bus Stations & Metro Stations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Use the self-service kiosks available at all major bus stations and metro stations. Accept cash and credit cards.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">ADCB ATMs</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Recharge at any Abu Dhabi Commercial Bank (ADCB) ATM across the emirate. Available 24/7 for your convenience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Retail Outlets</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Visit authorized retailers including supermarkets, pharmacies, and convenience stores throughout Abu Dhabi.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Mobile App & Online</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Use the official Hafilat app or website to recharge your card online using your credit or debit card.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="shadow-card border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-accent" />
                    <span>Minimum Recharge</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-accent mb-2">AED 10</p>
                  <p className="text-muted-foreground">Minimum amount for each recharge transaction</p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-success/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <DollarSign className="h-6 w-6 text-success" />
                    <span>Maximum Balance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-success mb-2">AED 500</p>
                  <p className="text-muted-foreground">Maximum balance you can store on your card</p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <span>Instant Top-up</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Your card balance is updated immediately after successful recharge</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Link to="/locations-hafilat-recharge">
              <Button size="lg" variant="hero" className="text-lg px-8 py-6">
                Find Recharge Locations Near You
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need at your fingertips
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card key={index} className="group hover:shadow-card transition-spring cursor-pointer border-border/50">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-muted rounded-full w-fit group-hover:bg-gradient-hero transition-spring">
                    <action.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-smooth" />
                  </div>
                  <CardTitle className="text-xl">{action.title}</CardTitle>
                  <CardDescription className="text-base">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to={action.href}>
                    <Button variant={action.variant} className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Travel Smart with Hafilat
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join thousands of commuters who have made their daily travel easier and more convenient with the Hafilat Card.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <a href="#about-hafilat">
                  <Button size="lg" variant="hero">
                    Learn More About Hafilat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Clock className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Save Time</CardTitle>
                      <CardDescription>Faster boarding process</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Secure Payment</CardTitle>
                      <CardDescription>Protected transactions</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Cost Savings</CardTitle>
                      <CardDescription>Discounted fare rates</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Hafilat (imported from About) */}
      <section id="about-hafilat" className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">What is the Hafilat Card?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The Hafilat Card is Abu Dhabi's smart payment card for public transportation, making your daily commute faster, easier, and more convenient.
            </p>
          </div>

          {/* Overview */}
          <section className="mb-20">
            <div className="shadow-card border-0 bg-gradient-card rounded-xl">
              <div className="text-center pb-8 pt-8 px-6">
                <div className="mx-auto mb-4 p-4 bg-gradient-hero rounded-full w-fit">
                  <CreditCard className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold">Smart Transportation Solution</h3>
              </div>
              <div className="px-6 pb-8 space-y-6">
                <p className="text-lg text-muted-foreground text-center leading-relaxed">
                  The Hafilat Card is a contactless smart card that allows you to pay for all public transportation services in Abu Dhabi, including buses and future metro services. It's designed to make your travel experience seamless and efficient.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Faster Travel</h4>
                    <p className="text-sm text-muted-foreground">Quick tap-and-go payment</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-3">
                      <DollarSign className="h-6 w-6 text-success" />
                    </div>
                    <h4 className="font-semibold mb-2">Cost Effective</h4>
                    <p className="text-sm text-muted-foreground">Discounted fare rates</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-3">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <h4 className="font-semibold mb-2">Secure</h4>
                    <p className="text-sm text-muted-foreground">Protected transactions</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Convenient</h4>
                    <p className="text-sm text-muted-foreground">Rechargeable and reusable</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Buy */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Steps */}
              <div className="shadow-card rounded-xl">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">How to Buy a Hafilat Card</h3>
                  <p className="text-muted-foreground mb-6">Follow these simple steps to get your card</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center text-primary">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="text-2xl font-bold text-primary">1</div>
                      </div>
                      <h4 className="font-semibold mt-3">Visit a Sales Point</h4>
                      <p className="text-sm text-muted-foreground">Go to any authorized Hafilat Card sales location including bus stations and retail outlets.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center text-primary">
                          <IdCard className="h-5 w-5" />
                        </div>
                        <div className="text-2xl font-bold text-primary">2</div>
                      </div>
                      <h4 className="font-semibold mt-3">Provide Documents</h4>
                      <p className="text-sm text-muted-foreground">Bring a valid Emirates ID or passport. Students need a student ID.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center text-primary">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div className="text-2xl font-bold text-primary">3</div>
                      </div>
                      <h4 className="font-semibold mt-3">Pay the Fee</h4>
                      <p className="text-sm text-muted-foreground">Pay AED 5 for the card (refundable when returned in good condition).</p>
                    </div>
                    <div className="p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center text-primary">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div className="text-2xl font-bold text-primary">4</div>
                      </div>
                      <h4 className="font-semibold mt-3">Load Credit</h4>
                      <p className="text-sm text-muted-foreground">Add at least AED 10 to start using public transport immediately.</p>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a href="#purchase-locations" className="text-sm underline">Where to Buy</a>
                    <Link to="/bus-card-recharge" className="text-sm underline">How to Recharge</Link>
                  </div>
                </div>
              </div>

              {/* Card types */}
              <div className="shadow-card rounded-xl">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Card Types</h3>
                  <p className="text-muted-foreground mb-6">Choose the option that fits you</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold">Regular Hafilat Card</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">AED 5 (refundable)</p>
                      <ul className="mt-2 text-sm text-muted-foreground list-disc pl-4">
                        <li>Rechargeable</li>
                        <li>Transferable</li>
                        <li>5-year validity</li>
                      </ul>
                    </div>
                    <div className="p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold">Student Card</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">AED 5 (refundable)</p>
                      <ul className="mt-2 text-sm text-muted-foreground list-disc pl-4">
                        <li>50% discount</li>
                        <li>Valid student ID required</li>
                        <li>Academic year validity</li>
                      </ul>
                    </div>
                    <div className="p-5 rounded-xl border border-border/60 bg-background/60 hover:shadow-md transition-smooth">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserRound className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold">Senior Citizen Card</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">AED 5 (refundable)</p>
                      <ul className="mt-2 text-sm text-muted-foreground list-disc pl-4">
                        <li>Discounted fares</li>
                        <li>Age verification required</li>
                        <li>5-year validity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Purchase Locations */}
          <section id="purchase-locations" className="mb-20">
            <div className="shadow-card rounded-xl">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Where to Buy</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
                    <p><span className="font-medium text-foreground">Customer Happiness Offices:</span> Purchase personalized cards at these offices located at bus stations and the airport.</p>
                    <p><span className="font-medium text-foreground">Authorized Retailers:</span> Buy anonymous cards at authorized retailers such as Lulu Hypermarket, Lulu Exchange, and SPAR/Al Ain Cooperative Society.</p>
                  </div>
                  <div className="space-y-4">
                    <Link to="/locations-hafilat-recharge" className="underline text-sm">See recharge locations</Link>
                    <Link to="/bus-card-recharge" className="underline text-sm">How to recharge</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="mb-4">
            <div className="shadow-card bg-muted rounded-xl">
              <div className="text-center p-8">
                <h3 className="text-3xl font-bold mb-2">Key Benefits</h3>
                <p className="text-lg text-muted-foreground">Why millions choose Hafilat Card for their daily commute</p>
              </div>
              <div className="px-6 pb-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">No Exact Change Required</h4>
                        <p className="text-muted-foreground">Never worry about having the right amount of cash again.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Faster Boarding</h4>
                        <p className="text-muted-foreground">Quick tap-and-go system reduces boarding time.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Discounted Fares</h4>
                        <p className="text-muted-foreground">Save money compared to cash payments.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Track Your Spending</h4>
                        <p className="text-muted-foreground">Monitor your travel expenses easily.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Reusable & Eco-Friendly</h4>
                        <p className="text-muted-foreground">Rechargeable card reduces paper waste.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Wide Acceptance</h4>
                        <p className="text-muted-foreground">Works on all public transport in Abu Dhabi.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Check Balance */}
      <section id="check-hafilat-balance" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold">How to Check Your Hafilat Card Balance</h2>
            <p className="mt-3 text-muted-foreground">
              Keeping an eye on your Hafilat card balance helps you avoid surprises at the gate and plan top-ups ahead of time.
            </p>
          </div>

          {/* Compact benefits strip */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-xl border border-border/40 bg-muted/20 p-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">Avoid gate surprises</span>
            </div>
            <div className="rounded-xl border border-border/40 bg-muted/20 p-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">Plan top-ups ahead</span>
            </div>
            <div className="rounded-xl border border-border/40 bg-muted/20 p-4 flex items-center gap-3">
              <Receipt className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">Track spending</span>
            </div>
            <div className="rounded-xl border border-border/40 bg-muted/20 p-4 flex items-center gap-3">
              <PiggyBank className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">Be ready for emergencies</span>
            </div>
          </div>

          {/* Steps */}
          <div className="shadow-card rounded-xl border border-border/50 bg-background/70 p-5 md:p-6">
              <h3 className="text-lg font-semibold mb-1">Step-by-Step: Online Balance Check</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">It takes less than a minute:</p>

              <div className="space-y-6 md:space-y-7">
                {/* Step 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">1</div>
                    <h4 className="text-base font-semibold">Visit the Official Hafilat Website</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Go to the official portal: <a href="https://hafilat.darb.ae/" target="_blank" rel="noopener nofollow" className="underline">https://hafilat.darb.ae/</a>. This is the verified site where you can check your balance and recharge.</p>
                  <div className="mt-2 rounded-lg overflow-hidden border border-border/60 bg-muted/20 p-2 shadow-sm max-w-3xl mx-auto">
                    <img src="/hafilat-balance-check.png" alt="Hafilat website homepage screenshot" className="w-full aspect-video object-cover rounded-md" loading="lazy" />
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">2</div>
                    <h4 className="text-base font-semibold">Click on "Recharge Card"</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">On the homepage, select <em>"Recharge Card."</em> New users may need to create an account; existing users can continue without logging in.</p>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">3</div>
                    <h4 className="text-base font-semibold">Enter Your Card Details</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">On the balance check page, enter your <strong>Hafilat card serial number</strong> (found on the back of your card).</p>
                  <div className="mt-2 rounded-lg overflow-hidden border border-border/60 bg-muted/20 p-2 shadow-sm max-w-3xl mx-auto">
                    <img src="/hafilat-balance-check2.png" alt="Hafilat enter card number field screenshot" className="w-full aspect-video object-cover rounded-md" loading="lazy" />
                  </div>
                </div>

                {/* Step 4 */}
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">4</div>
                    <h4 className="text-base font-semibold">Verify and Submit</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Click <em>"OK"</em> or <em>"Submit"</em> to process your request. The system will display your balance within seconds.</p>
                </div>

                {/* Step 5 */}
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">5</div>
                    <h4 className="text-base font-semibold">View Your Balance</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Your available balance will appear instantly. If it's low, you can recharge your card from the same page.</p>
                  <div className="mt-2 rounded-lg overflow-hidden border border-border/60 bg-muted/20 p-2 shadow-sm max-w-3xl mx-auto">
                    <img src="/hafilat-balance-check3.png" alt="Hafilat balance result screenshot" className="w-full aspect-video object-cover rounded-md" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>

          {/* Quick Recap */}
          <div className="max-w-4xl mx-auto mt-10">
            <h3 className="text-xl font-semibold mb-3 text-center">Quick Recap</h3>
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Step</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      Go to <a href="https://hafilat.darb.ae/" target="_blank" rel="noopener nofollow" className="underline">hafilat.darb.ae</a>
                    </TableCell>
                    <TableCell>Access the official website</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Click "Recharge Card"</TableCell>
                    <TableCell>Open balance check section</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>Enter card number</TableCell>
                    <TableCell>Identify your card</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>Click "OK / Submit"</TableCell>
                    <TableCell>Process the inquiry</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell>View balance</TableCell>
                    <TableCell>Recharge if needed</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Final tips */}
          <Card className="max-w-3xl mx-auto mt-10 border border-primary/30 bg-primary/5 rounded-2xl shadow-sm"> 
            <CardHeader className="pb-2 text-center">
              <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Lightbulb className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Final Tips for Travelers</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="mx-auto max-w-prose list-disc pl-5 space-y-1 text-sm text-foreground/85 text-left"> 
                <li>Always check your balance before your journey, especially during peak hours.</li>
                <li>Bookmark the Hafilat website or save it on your phone for quick access.</li>
                <li>Use the Darbi mobile app if you prefer checking on the go.</li>
                <li>If your card doesn't load online, visit a bus station kiosk or customer service counter for help.</li>
              </ul>
              <div className="mt-3 text-center text-sm text-muted-foreground"> 
                <strong>Official Website:</strong> <a href="https://hafilat.darb.ae/" target="_blank" rel="noopener nofollow" className="underline">hafilat.darb.ae</a> • <strong>Related:</strong> <Link to="/locations-hafilat-recharge" className="underline">Where to Recharge Hafilat Card in Abu Dhabi</Link>
              </div>
            </CardContent>
          </Card>

          {/* JSON-LD FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  { "@type": "Question", name: "How can I check my Hafilat card balance online?", acceptedAnswer: { "@type": "Answer", text: "Visit hafilat.darb.ae, click on 'Recharge Card', enter your card number, and click 'Submit'. Your current balance will appear instantly on screen." } },
                  { "@type": "Question", name: "Do I need an account to check my Hafilat balance?", acceptedAnswer: { "@type": "Answer", text: "No, you can check your balance directly without logging in. Simply click 'Recharge Card' and enter your card number." } },
                  { "@type": "Question", name: "Can I recharge my Hafilat card from the same page?", acceptedAnswer: { "@type": "Answer", text: "Yes. Once your balance appears, you can select a recharge amount and complete the payment from the same page." } },
                  { "@type": "Question", name: "What if the website doesn't show my balance?", acceptedAnswer: { "@type": "Answer", text: "If your card details don't load, check your number again or visit a nearby Hafilat kiosk or customer service counter for assistance." } },
                  { "@type": "Question", name: "Can I use my Hafilat Card in Dubai?", acceptedAnswer: { "@type": "Answer", text: "No. Hafilat is valid only in Abu Dhabi. For Dubai, use the NOL Card. The systems are not integrated." } },
                  { "@type": "Question", name: "What happens if my card balance is too low for a journey?", acceptedAnswer: { "@type": "Answer", text: "You cannot board with insufficient balance. There is no negative balance allowance. Keep at least 10 AED to avoid disruptions; traveling without enough balance may result in fines." } },
                  { "@type": "Question", name: "Can multiple people use the same Hafilat Card?", acceptedAnswer: { "@type": "Answer", text: "No. Each traveler needs their own card. Sharing a card is not permitted and the system tracks individual journeys." } },
                  { "@type": "Question", name: "What if I forget to tap my card when exiting the bus?", acceptedAnswer: { "@type": "Answer", text: "You may be charged the maximum fare for that route. This matters mainly for distance-based fares on intercity/suburban routes. Always tap in and out." } },
                  { "@type": "Question", name: "Can I get a refund if I no longer need my Hafilat Card?", acceptedAnswer: { "@type": "Answer", text: "Yes. Request a refund at customer service centers. Bring the physical card and ID. Personalized cards are refunded more easily; anonymous card refunds are at the authority's discretion. Card fee (5–10 AED) is typically non-refundable." } },
                  { "@type": "Question", name: "How do I transfer my balance if my card is damaged?", acceptedAnswer: { "@type": "Answer", text: "For personalized cards, visit a customer service center with ID to transfer the remaining balance to a new card (replacement fee applies). For anonymous cards, balances generally cannot be recovered." } },
                  { "@type": "Question", name: "Are there any discounts for children?", acceptedAnswer: { "@type": "Answer", text: "Children under 5 travel free. Ages 5–10 can use a standard Hafilat Card (some routes may have discounts). Students under 18 should apply for the Student Hafilat Card for maximum discounts." } },
                  { "@type": "Question", name: "Can tourists get temporary Hafilat Cards?", acceptedAnswer: { "@type": "Answer", text: "Yes. Temporary cards (valid 14–30 days) are available at the airport, major bus stations, and some hotels. Tourists can also buy an anonymous card (no expiry) for ~10 AED." } },
                  { "@type": "Question", name: "What's the maximum amount I can load onto my Hafilat Card?", acceptedAnswer: { "@type": "Answer", text: "The maximum balance is 1,000 AED for all card types. Attempts to load more will be declined." } },
                  { "@type": "Question", name: "How can I check the history of my card usage?", acceptedAnswer: { "@type": "Answer", text: "For personalized cards, register on the DARB portal or visit customer service for transaction history. For anonymous cards, only the current balance is available at TVMs or service centers." } },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Hafilat Card?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the benefits of Abu Dhabi's smart transportation solution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-card hover:shadow-hero transition-spring">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-hero rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Recharge Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How to Recharge Your Hafilat Card
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Keep your card topped up with multiple convenient recharge options available across Abu Dhabi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Bus Stations & Metro Stations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Use the self-service kiosks available at all major bus stations and metro stations. Accept cash and credit cards.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">ADCB ATMs</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Recharge at any Abu Dhabi Commercial Bank (ADCB) ATM across the emirate. Available 24/7 for your convenience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Retail Outlets</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Visit authorized retailers including supermarkets, pharmacies, and convenience stores throughout Abu Dhabi.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Mobile App & Online</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Use the official Hafilat app or website to recharge your card online using your credit or debit card.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="shadow-card border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-accent" />
                    <span>Minimum Recharge</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-accent mb-2">AED 10</p>
                  <p className="text-muted-foreground">Minimum amount for each recharge transaction</p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-success/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <DollarSign className="h-6 w-6 text-success" />
                    <span>Maximum Balance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-success mb-2">AED 500</p>
                  <p className="text-muted-foreground">Maximum balance you can store on your card</p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <span>Instant Top-up</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Your card balance is updated immediately after successful recharge</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Link to="/locations-hafilat-recharge">
              <Button size="lg" variant="hero" className="text-lg px-8 py-6">
                Find Recharge Locations Near You
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need at your fingertips
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card key={index} className="group hover:shadow-card transition-spring cursor-pointer border-border/50">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-muted rounded-full w-fit group-hover:bg-gradient-hero transition-spring">
                    <action.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-smooth" />
                  </div>
                  <CardTitle className="text-xl">{action.title}</CardTitle>
                  <CardDescription className="text-base">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to={action.href}>
                    <Button variant={action.variant} className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Travel Smart with Hafilat
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join thousands of commuters who have made their daily travel easier and more convenient with the Hafilat Card.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <a href="#about-hafilat">
                  <Button size="lg" variant="hero">
                    Learn More About Hafilat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Clock className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Save Time</CardTitle>
                      <CardDescription>Faster boarding process</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Secure Payment</CardTitle>
                      <CardDescription>Protected transactions</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Cost Savings</CardTitle>
                      <CardDescription>Discounted fare rates</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Your Hafilat Card?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start your journey with Abu Dhabi's smart transportation system today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#about-hafilat">
              <Button size="lg" variant="accent" className="text-lg px-8 py-6">
                How to Buy
              </Button>
            </a>
            <Link to="/locations-hafilat-recharge">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                How to Recharge
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* FAQs */}
      <section id="faqs" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to the most common questions about Hafilat.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>Can I use my Hafilat Card in Dubai?</AccordionTrigger>
                <AccordionContent>
                  No. Hafilat works only in Abu Dhabi. For Dubai, use the NOL Card.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>What happens if my balance is too low?</AccordionTrigger>
                <AccordionContent>
                  You cannot board with insufficient balance. Keep at least 10 AED to avoid disruptions; traveling without enough balance may result in fines.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Can multiple people use the same card?</AccordionTrigger>
                <AccordionContent>
                  No. Each traveler must use their own card.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>What if I forget to tap out?</AccordionTrigger>
                <AccordionContent>
                  You may be charged the maximum route fare, especially on distance‑based routes. Always tap when boarding and alighting.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger>Can I get a refund if I no longer need my card?</AccordionTrigger>
                <AccordionContent>
                  Yes. Request at customer service centers with your card and ID. Card fee (5–10 AED) is typically non‑refundable.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q6">
                <AccordionTrigger>How do I transfer balance if my card is damaged?</AccordionTrigger>
                <AccordionContent>
                  Personalized cards: transfer at customer service (replacement fee applies). Anonymous cards: balances generally cannot be recovered.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q7">
                <AccordionTrigger>Are there discounts for children?</AccordionTrigger>
                <AccordionContent>
                  Under 5 ride free. Ages 5–10 can use a standard card; students under 18 should apply for the Student Hafilat Card.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q8">
                <AccordionTrigger>Can tourists get temporary cards?</AccordionTrigger>
                <AccordionContent>
                  Yes. Temporary cards (14–30 days) are available at the airport and major stations; tourists may also buy an anonymous card (~10 AED).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q9">
                <AccordionTrigger>What’s the maximum balance?</AccordionTrigger>
                <AccordionContent>
                  1,000 AED for all card types.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q10">
                <AccordionTrigger>How can I check my usage history?</AccordionTrigger>
                <AccordionContent>
                  Personalized cards: DARB portal or customer service. Anonymous cards: only current balance at TVMs or service centers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;







