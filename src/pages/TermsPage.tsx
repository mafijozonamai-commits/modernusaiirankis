import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertCircle, Users, Gavel } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-background overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb-effect w-64 h-64 -top-32 -left-32 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="orb-effect w-48 h-48 top-1/2 -right-24 animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Header */}
      <header className="glass-morphism border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 animate-slideInLeft">
            <Button asChild variant="outline" size="sm" className="morph-button shadow-card">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Grįžti
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gradient">Naudojimosi taisyklės</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slideInUp">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient">
              Naudojimosi taisyklės
            </h1>
            <p className="text-lg text-muted-foreground">
              Paskutinį kartą atnaujinta: 2024 m. rugsėjo 18 d.
            </p>
          </div>

          {/* Cards with modern styling */}
          <Card className="mb-8 card-3d border-0 bg-gradient-glow shadow-glow hover:shadow-floating transition-all duration-500 animate-slideInUp" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground shadow-3d">
                  <FileText className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl font-bold">Įvadas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Šios naudojimosi taisyklės reglamentuoja jūsų prieigą prie Skaitmeninės Debatų Trenerės 
                platformos ir jos naudojimą. Naudodamiesi mūsų paslauga, sutinkate laikytis šių taisyklių.
              </p>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="card-3d border-0 bg-gradient-mesh shadow-glow hover:shadow-floating transition-all duration-500 animate-slideInUp" style={{animationDelay: '0.8s'}}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Kontaktai</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6 text-base">
                Klausimai dėl šių taisyklių:
              </p>
              <div className="space-y-3">
                <p><strong>El. paštas:</strong> info@debatu-trenere.lt</p>
                <p><strong>Pašto adresas:</strong> Gedimino pr. 1, LT-01103 Vilnius, Lietuva</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;