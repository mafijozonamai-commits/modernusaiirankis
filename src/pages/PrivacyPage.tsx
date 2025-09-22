import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, AlertTriangle } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Grįžti
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Privatumo politika</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-learning bg-clip-text text-transparent">
              Privatumo politika
            </h1>
            <p className="text-lg text-muted-foreground">
              Paskutinį kartą atnaujinta: 2024 m. rugsėjo 18 d.
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 bg-gradient-glow border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Įvadas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Mes, Skaitmeninės Debatų Trenerės komanda, vertiname jūsų privatumą ir įsipareigojame 
                apsaugoti jūsų asmens duomenis. Ši privatumo politika paaiškina, kaip renkame, 
                naudojame ir saugome jūsų informaciją naudojantis mūsų platforma.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Kokius duomenis renkame</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Automatiškai renkami duomenys:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>IP adresas ir naršyklės informacija</li>
                  <li>Naudojimo statistika ir veiklos duomenys</li>
                  <li>Slapukai (cookies) ir panašūs sekimo įrankiai</li>
                  <li>Įrenginio tipas ir operacinė sistema</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Savanoriškai pateikiami duomenys:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Registracijos metu pateikta informacija (jei pasirenkate registruotis)</li>
                  <li>Kontaktiniai duomenys susisiekimo formose</li>
                  <li>Debatų tekstai ir argumentai</li>
                  <li>Grįžtamojo ryšio komentarai</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Kaip naudojame duomenis</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
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
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Duomenų apsauga</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Naudojame šiuolaikinius saugumo metodus jūsų duomenų apsaugai:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>SSL šifravimas visoms duomenų perdavimo operacijoms</li>
                <li>Saugūs serveriai su reguliariais saugumo atnaujinimais</li>
                <li>Prieigos kontrolė ir autentifikavimas</li>
                <li>Reguliarūs duomenų atsarginiai kopijavimas</li>
                <li>Darbuotojų mokymas duomenų apsaugos srityje</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Jūsų teisės</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pagal BDAR (Bendrąjį duomenų apsaugos reglamentą) turite šias teises:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Prieiga prie duomenų</h4>
                  <p className="text-sm text-muted-foreground">Teisė sužinoti, kokie duomenys apie jus yra renkami</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Duomenų taisymas</h4>
                  <p className="text-sm text-muted-foreground">Teisė reikalauti neteisingų duomenų pataisymo</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Duomenų ištrynimas</h4>
                  <p className="text-sm text-muted-foreground">Teisė reikalauti duomenų ištrynimo</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Duomenų perkeliamumas</h4>
                  <p className="text-sm text-muted-foreground">Teisė gauti savo duomenis struktūrizuotu formatu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third Parties */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Trečiosios šalys</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Galime dalintis duomenimis su trečiosiomis šalimis tik šiais atvejais:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Gavus jūsų aiškų sutikimą</li>
                <li>Teisės aktų reikalavimu</li>
                <li>Su paslaugų teikėjais (techninis palaikymas, analitika)</li>
                <li>Platformos saugumo užtikrinimui</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Slapukai (Cookies)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Naudojame slapukus šiems tikslams:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Sesijos palaikymui</li>
                <li>Nustatymų įsiminimui</li>
                <li>Analitikai ir platformos tobulinimui</li>
                <li>Personalizacijos funkcijoms</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Galite kontroliuoti slapukų naudojimą naršyklės nustatymuose.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8 bg-gradient-glow border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Susisiekite su mumis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Jei turite klausimų apie šią privatumo politiką ar savo duomenų tvarkymą:
              </p>
              <div className="space-y-2">
                <p><strong>El. paštas:</strong> privatumas@debatu-trenere.lt</p>
                <p><strong>Pašto adresas:</strong> Gedimino pr. 1, LT-01103 Vilnius, Lietuva</p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Politikos atnaujinimai</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ši privatumo politika gali būti atnaujinama. Apie reikšmingus pakeitimus 
                informuosime el. paštu arba platformoje. Rekomenduojame periodiškai peržiūrėti 
                šį dokumentą.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;