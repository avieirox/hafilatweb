import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const HafilatBalanceOnline = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Check Hafilat Card Balance Online – Quick Guide</title>
        <meta
          name="description"
          content="Check your Hafilat card balance online quickly. Follow the simple steps and find direct links to the official portal."
        />
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold">Check Hafilat Balance Online</h1>
        <p className="text-muted-foreground">
          You can check your Hafilat card balance online in seconds via the official portal. No login required.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Steps</CardTitle>
            <CardDescription>Simple flow to view your current balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Go to the official portal: {" "}
                <a
                  href="https://hafilat.darb.ae/"
                  target="_blank"
                  rel="noopener"
                  className="underline"
                >
                  hafilat.darb.ae
                </a>
              </li>
              <li>Click on "Recharge Card".</li>
              <li>Enter your Hafilat card number and submit.</li>
              <li>Your current balance will be displayed instantly.</li>
            </ol>
            <p className="text-sm text-muted-foreground">
              Tip: If you need to add funds, see {" "}
              <Link to="/bus-card-recharge" className="underline">
                Bus Card Recharge
              </Link>{" "}
              or find {" "}
              <Link to="/locations-hafilat-recharge" className="underline">
                Recharge Locations
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HafilatBalanceOnline;

