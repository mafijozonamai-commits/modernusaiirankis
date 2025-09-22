import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, AlertTriangle } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-background overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb-effect w-64 h-64 -top-32 -left-32 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="orb-effect w-48 h-48 top-1/2 -right-24 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="orb-effect w-56 h-56 bottom-1/4 left-1/6 animate-float" style={{animationDelay: '4s'}}></div>
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
            <h1 className="text-xl font-semibold text-gradient">Privatumo politika</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slideInUp">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient">
              Privatumo politika
            </h1>
            <p className="text-lg text-muted-foreground">
              Paskutinį kartą atnaujinta: 2024 m. rugsėjo 18 d.
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 card-3d border-0 bg-gradient-glow shadow-glow hover:shadow-floating transition-all duration-500 animate-slideInUp" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground shadow-3d">
                  <Shield className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl font-bold">Įvadas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Mes, Skaitmeninės Debatų Trenerės komanda, vertiname jūsų privatumą ir įsipareigojame 
                apsaugoti jūsų asmens duomenis. Ši privatumo politika paaiškina, kaip renkame, 
                naudojame ir saugome jūsų informaciją naudojantis mūsų platforma.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8 card-3d border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500 animate-slideInUp" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-learning text-primary-foreground shadow-3d">
                  <Eye className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Kokius duomenis renkame</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-4">
                <h4 className="font-bold text-xl text-gradient">Automatiškai renkami duomenys:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base">
                  <li>IP adresas ir naršyklės informacija</li>
                  <li>Naudojimo statistika ir veiklos duomenys</li>
                  <li>Slapukai (cookies) ir panašūs sekimo įrankiai</li>
                  <li>Įrenginio tipas ir operacinė sistema</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-xl text-gradient">Savanoriškai pateikiami duomenys:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base">
                  <li>Registracijos metu pateikta informacija (jei pasirenkate registruotis)</li>
                  <li>Kontaktiniai duomenys susisiekimo formose</li>
                  <li>Debatų tekstai ir argumentai</li>
                  <li>Grįžtamojo ryšio komentarai</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Remaining cards with similar pattern - keeping existing content but with new styling */}
          <Card className="mb-8 card-3d border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500 animate-slideInUp" style={{animationDelay: '0.4s'}}>
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold">Kaip naudojame duomenis</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ul className="list-disc list-inside text-muted-foreground space-y-3 text-base">
                <li>Platformos funkcionalumo užtikrinimui ir gerinimui</li>
                <li>Personalizuotos mokymosi patirties kūrimui</li>
                <li>Pažangos ir pasiekimų sekimui</li>
                <li>Techninio palaikymo teikimui</li>
                <li>Saugumo užtikrinimui ir piktnaudžiavimo prevencijai</li>
                <li>Analitikai ir platformos tobulinimui</li>
                <li>Komunikacijai (tik gavus sutikimą)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="mb-8 card-3d border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500 animate-slideInUp" style={{animationDelay: '0.5s'}}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-hero text-primary-foreground shadow-3d">
                  <Lock className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Duomenų apsauga</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <p className="text-muted-foreground text-base leading-relaxed">
                Naudojame šiuolaikinius saugumo metodus jūsų duomenų apsaugai:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 text-base">
                <li>SSL šifravimas visoms duomenų perdavimo operacijoms</li>
                <li>Saugūs serveriai su reguliariais saugumo atnaujinimais</li>
                <li>Prieigos kontrolė ir autentifikavimas</li>
                <li>Reguliarūs duomenų atsarginiai kopijavimas</li>
                <li>Darbuotojų mokymas duomenų apsaugos srityje</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="card-3d border-0 bg-gradient-mesh shadow-glow hover:shadow-floating transition-all duration-500 animate-slideInUp" style={{animationDelay: '0.8s'}}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground shadow-3d">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Susisiekite su mumis</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                Jei turite klausimų apie šią privatumo politiką ar savo duomenų tvarkymą:
              </p>
              <div className="space-y-3 text-base">
                <p><strong>El. paštas:</strong> privatumas@debatu-trenere.lt</p>
                <p><strong>Pašto adresas:</strong> Gedimino pr. 1, LT-01103 Vilnius, Lietuva</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;