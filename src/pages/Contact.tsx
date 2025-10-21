import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const subject = String(fd.get("subject") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      toast({ title: "Please fill the required fields", description: "Name, email and message are required.", variant: "destructive" });
      return;
    }

    setLoading(true);

    // Fallback: open default mail client with prefilled data
    const to = import.meta.env.VITE_CONTACT_EMAIL || "info@hafilatguide.com";
    const mailto = new URL(`mailto:${to}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      subject ? `Subject: ${subject}` : undefined,
      "",
      message,
    ].filter(Boolean);
    mailto.searchParams.set("subject", subject || `Contact from ${name}`);
    mailto.searchParams.set("body", bodyLines.join("\n"));

    // Small delay for UX and toast
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Opening your mail app…", description: "If nothing happens, copy the details and email us." });
      window.location.href = mailto.toString();
      e.currentTarget.reset();
    }, 300);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us — Hafilat Guide</title>
        <meta name="description" content="Contact Hafilat Guide. Send us your questions about Abu Dhabi Hafilat Card, recharges, locations and routes." />
      </Helmet>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>We usually reply within 1–2 business days.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1">Name</label>
                      <Input id="name" name="name" placeholder="Your full name" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-1">Email</label>
                      <Input id="email" type="email" name="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm mb-1">Subject</label>
                    <Input id="subject" name="subject" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm mb-1">Message</label>
                    <Textarea id="message" name="message" rows={6} placeholder="Write your message…" required />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted about your inquiry.</p>
                    <Button type="submit" disabled={loading}>
                      <Send className="h-4 w-4 mr-2" />
                      {loading ? "Sending…" : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Other ways to reach us</CardTitle>
                <CardDescription>Prefer email or phone? We’ve got you covered.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || "info@hafilatguide.com"}`} className="underline">
                    {import.meta.env.VITE_CONTACT_EMAIL || "info@hafilatguide.com"}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">+971 800 4235</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

