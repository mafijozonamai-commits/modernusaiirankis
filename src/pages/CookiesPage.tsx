import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cookie, Settings, BarChart3, Shield } from "lucide-react";

const CookiesPage = () => {
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
            <h1 className="text-xl font-semibold">Slapukų politika</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-learning bg-clip-text text-transparent">
              Slapukų politika
            </h1>
            <p className="text-lg text-muted-foreground">
              Paskutinį kartą atnaujinta: 2024 m. rugsėjo 18 d.
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 bg-gradient-glow border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Kas yra slapukai?</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Slapukai (angl. "cookies") yra maži tekstiniai failai, kuriuos svetainės saugo 
                jūsų įrenginyje (kompiuteryje, planšetėje ar telefone). Jie padeda svetainėms 
                „atsiminti" jūsų veiksmus ir nuostatas per tam tikrą laiką, todėl jums nereikia 
                jų įvesti iš naujo kaskart aplankius svetainę ar naršant tarp puslapių.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Kokius slapukus naudojame</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Būtini slapukai</h4>
                  <Badge variant="destructive">Privalomi</Badge>
                </div>
                <p className="text-muted-foreground mb-2">
                  Šie slapukai yra būtini svetainės veikimui ir negali būti išjungti.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Sesijos valdymas ir saugumas</li>
                  <li>Naudotojo nustatymų išsaugojimas</li>
                  <li>Formos duomenų laikinas saugojimas</li>
                  <li>CSRF apsauga</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-secondary pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-5 w-5 text-secondary" />
                  <h4 className="font-semibold">Funkcijos slapukai</h4>
                  <Badge variant="outline">Pasirinktini</Badge>
                </div>
                <p className="text-muted-foreground mb-2">
                  Šie slapukai pagerina jūsų naršymo patirtį.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Kalbos ir regiono nustatymai</li>
                  <li>Temos pasirinkimas (šviesi/tamsi)</li>
                  <li>Mokymosi pažangos sekimas</li>
                  <li>Personalizuoti nustatymai</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-accent pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold">Analitikos slapukai</h4>
                  <Badge variant="outline">Pasirinktini</Badge>
                </div>
                <p className="text-muted-foreground mb-2">
                  Padeda mums suprasti, kaip naudojate platformą ir ją tobulinti.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Puslapių peržiūrų statistika</li>
                  <li>Naudotojų veiklos analizė</li>
                  <li>Veiklos našumo matavimai</li>
                  <li>Funkcijų naudojimo dažnumas</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Details */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Detali slapukų informacija</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Pavadinimas</th>
                      <th className="text-left py-2 px-3 font-semibold">Tipas</th>
                      <th className="text-left py-2 px-3 font-semibold">Trukmė</th>
                      <th className="text-left py-2 px-3 font-semibold">Paskirtis</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 px-3 font-mono text-sm">session_id</td>
                      <td className="py-2 px-3">Būtinas</td>
                      <td className="py-2 px-3">Sesija</td>
                      <td className="py-2 px-3">Naudotojo sesijos valdymas</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-mono text-sm">csrf_token</td>
                      <td className="py-2 px-3">Būtinas</td>
                      <td className="py-2 px-3">Sesija</td>
                      <td className="py-2 px-3">Saugumo apsauga</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-mono text-sm">user_preferences</td>
                      <td className="py-2 px-3">Funkcijos</td>
                      <td className="py-2 px-3">1 metai</td>
                      <td className="py-2 px-3">Naudotojo nustatymai</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-mono text-sm">analytics_id</td>
                      <td className="py-2 px-3">Analitikos</td>
                      <td className="py-2 px-3">2 metai</td>
                      <td className="py-2 px-3">Anonimiškas naudojimo sekimas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Third Party Cookies */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Trečiųjų šalių slapukai</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Mūsų svetainėje gali būti naudojami šių paslaugų teikėjų slapukai:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Google Analytics</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Naudojama svetainės statistikai ir naudotojų elgsenos analizei.
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Daugiau informacijos: 
                    <a href="https://policies.google.com/privacy" 
                       className="text-primary hover:underline ml-1" 
                       target="_blank" 
                       rel="noopener noreferrer">
                      Google privatumo politika
                    </a>
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Cloudflare</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Naudojama svetainės saugumui ir našumui užtikrinti.
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Daugiau informacijos: 
                    <a href="https://www.cloudflare.com/privacypolicy/" 
                       className="text-primary hover:underline ml-1" 
                       target="_blank" 
                       rel="noopener noreferrer">
                      Cloudflare privatumo politika
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Management */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Slapukų valdymas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Naršyklės nustatymai</h4>
                <p className="text-muted-foreground mb-4">
                  Galite kontroliuoti slapukus savo naršyklės nustatymuose. Štai kaip tai padaryti 
                  populiariausiose naršyklėse:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded">
                    <h5 className="font-medium mb-1">Google Chrome</h5>
                    <p className="text-sm text-muted-foreground">
                      Nustatymai → Privatumas ir saugumas → Slapukai
                    </p>
                  </div>
                  <div className="p-3 border rounded">
                    <h5 className="font-medium mb-1">Mozilla Firefox</h5>
                    <p className="text-sm text-muted-foreground">
                      Nustatymai → Privatumas ir saugumas → Slapukai
                    </p>
                  </div>
                  <div className="p-3 border rounded">
                    <h5 className="font-medium mb-1">Safari</h5>
                    <p className="text-sm text-muted-foreground">
                      Nuostatos → Privatumas → Slapukai ir svetainių duomenys
                    </p>
                  </div>
                  <div className="p-3 border rounded">
                    <h5 className="font-medium mb-1">Microsoft Edge</h5>
                    <p className="text-sm text-muted-foreground">
                      Nustatymai → Slapukai ir svetainės leidimai
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Slapukų sutikimo valdymas</h4>
                <p className="text-muted-foreground mb-4">
                  Galite bet kada pakeisti savo slapukų sutikimo nustatymus:
                </p>
                <Button variant="outline" className="mb-4">
                  Valdyti slapukų nustatymus
                </Button>
                <p className="text-sm text-muted-foreground">
                  Atminkite, kad išjungus tam tikrus slapukus, gali sutrikti svetainės veikimas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Politikos atnaujinimai</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ši slapukų politika gali būti keičiama. Apie reikšmingus pakeitimus informuosime 
                svetainėje arba el. paštu. Rekomenduojame periodiškai peržiūrėti šį dokumentą, 
                kad būtumėte informuoti apie tai, kaip naudojame slapukus.
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
                Klausimai dėl slapukų naudojimo:
              </p>
              <div className="space-y-2">
                <p><strong>El. paštas:</strong> slapukai@debatu-trenere.lt</p>
                <p><strong>Pašto adresas:</strong> Gedimino pr. 1, LT-01103 Vilnius, Lietuva</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;