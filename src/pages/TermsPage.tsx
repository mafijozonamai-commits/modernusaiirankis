import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertCircle, Users, Gavel } from "lucide-react";

const TermsPage = () => {
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
            <h1 className="text-xl font-semibold">Naudojimosi taisyklės</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-learning bg-clip-text text-transparent">
              Naudojimosi taisyklės
            </h1>
            <p className="text-lg text-muted-foreground">
              Paskutinį kartą atnaujinta: 2024 m. rugsėjo 18 d.
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 bg-gradient-glow border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Įvadas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Šios naudojimosi taisyklės reglamentuoja jūsų prieigą prie Skaitmeninės Debatų Trenerės 
                platformos ir jos naudojimą. Naudodamiesi mūsų paslauga, sutinkate laikytis šių taisyklių. 
                Jei nesutinkate su šiomis sąlygomis, prašome nenaudoti mūsų platformos.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Paslaugos aprašymas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Skaitmeninė Debatų Trenerė yra edukacinė platforma, skirta debatavimo įgūdžių 
                ugdymui naudojant dirbtinio intelekto technologijas. Platforma teikia:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Interaktyvius debatus su AI oponentu</li>
                <li>Praktikos užduotis ir mokomąją medžiagą</li>
                <li>Pažangos stebėjimo ir analitikos įrankius</li>
                <li>Pasiekimų ir apdovanojimų sistemą</li>
                <li>Mokymosi išteklių biblioteką</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Naudotojo įsipareigojimai</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Leidžiama veikla:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Naudoti platformą edukaciniais tikslais</li>
                  <li>Dalintis konstruktyviu grįžtamuoju ryšiu</li>
                  <li>Laikytis akademinio sąžiningumo principų</li>
                  <li>Gerbti kitų naudotojų teises</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Draudžiama veikla:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Platinti žalingą, šmeižikišką ar netinkamą turinį</li>
                  <li>Bandyti pažeisti platformos saugumą</li>
                  <li>Kopijuoti ar platinti platformos turinį be leidimo</li>
                  <li>Naudoti automatizuotus įrankius be sutikimo</li>
                  <li>Kurti fiktyvius arba klaidinančius profilius</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Intelektualinė nuosavybė</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Mūsų teisės:</h4>
                <p className="text-muted-foreground">
                  Visas platformos turinys, įskaitant dizainą, programinį kodą, tekstus, 
                  vaizdus ir kitus elementus, yra mūsų intelektualinės nuosavybės objektai 
                  arba naudojami su teisėtų savininkų leidimu.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Jūsų turinys:</h4>
                <p className="text-muted-foreground">
                  Jūsų sukurtas turinys (debatų argumentai, komentarai) lieka jūsų nuosavybe, 
                  tačiau suteikiate mums licenciją jį naudoti platformos veikimui ir tobulinimui.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Atsakomybės apribojimai</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Paslaugos teikimas:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Pastangų pagrindu, be garantijų dėl nepertraukiamo veikimo</li>
                  <li>Galimi techniniai trūkumai ir planuojami atnaujinimai</li>
                  <li>AI atsakymai yra automatiškai generuojami ir gali būti netikslūs</li>
                  <li>Neatsakome už trečiųjų šalių turinį ar nuorodas</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Atsakomybės ribos:</h4>
                <p className="text-muted-foreground">
                  Mūsų atsakomybė apribojama teisės aktų nustatytais maksimaliais dydžiais. 
                  Neatsakome už netiesioginius nuostolius ar prarastą naudą.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data and Privacy */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Duomenų tvarkymas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Duomenų rinkimas ir tvarkymas vykdomas vadovaujantis mūsų Privatumo politika. 
                Pagrindiniai principai:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Renkame tik būtinus duomenis</li>
                <li>Saugome duomenis saugiose sistemose</li>
                <li>Neparduodame duomenų trečiosioms šalims</li>
                <li>Gerbiam jūsų privatumo teises</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Detalesnė informacija pateikiama 
                <Link to="/privacy" className="text-primary hover:underline ml-1">
                  Privatumo politikoje
                </Link>.
              </p>
            </CardContent>
          </Card>

          {/* Age Requirements */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Amžiaus reikalavimai</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Platforma yra skirta 13 metų ir vyresniems naudotojams. Nepilnamečiai nuo 13 iki 18 metų 
                gali naudotis platforma tik gavę tėvų ar globėjų sutikimą. Nepilnamečių duomenų tvarkymas 
                vykdomas ypač atsargiai, laikantis visų teisės aktų reikalavimų.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Gavel className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Susitarimo nutraukimas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Jūsų teisės:</h4>
                <p className="text-muted-foreground">
                  Galite bet kada nutraukti platformos naudojimą. Jei turite paskyrą, 
                  galite ją ištrinti susisiekę su mumis.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Mūsų teisės:</h4>
                <p className="text-muted-foreground">
                  Galime apriboti arba nutraukti jūsų prieigą prie platformos, jei pažeisite 
                  šias taisykles arba naudositės platforma netinkamai.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Taisyklių keitimas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Šios taisyklės gali būti keičiamos. Apie reikšmingus pakeitimus informuosime 
                el. paštu arba platformoje. Tęsdami platformos naudojimą po pakeitimų 
                paskelbimo, sutinkate su nauja redakcija.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Taikytina teisė ir ginčų sprendimas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Šios taisyklės reglamentuojamos Lietuvos Respublikos teisės aktais. 
                Ginčai sprendžiami derybų keliu, o jei nepavyks susitarti - 
                Lietuvos Respublikos teismuose pagal bendrąją jurisdikciją.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-glow border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Kontaktai</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Klausimai dėl šių taisyklių:
              </p>
              <div className="space-y-2">
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