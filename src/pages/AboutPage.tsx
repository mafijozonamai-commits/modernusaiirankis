import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Target, Users, Lightbulb, Award } from "lucide-react";

const AboutPage = () => {
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
            <h1 className="text-xl font-semibold">Apie mus</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-learning bg-clip-text text-transparent">
            Apie Skaitmeninę Debatų Trenerę
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Mūsų misija - padėti mokiniams ir studentams tobulinti kritinio mąstymo, argumentavimo 
            ir viešo kalbėjimo įgūdžius naudojant pažangią dirbtinio intelekto technologiją.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                  <Target className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Mūsų misija</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Kuriame modernius sprendimus, kurie padeda jaunimui ugdyti kritinio mąstymo gebėjimus, 
                būtinus šiuolaikiniame pasaulyje. Tikime, kad debatavimo įgūdžiai formuoja stipresnius 
                ir labiau informuotus visuomenės narius.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Mūsų vizija</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Tapti pirmaujančia debatų mokymo platforma Lietuvoje ir regione, suteikiant 
                kiekvienam moksleiviui galimybę tobulinti savo argumentavimo ir analitinio mąstymo 
                gebėjimus modernioje skaitmeninėje aplinkoje.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-learning bg-clip-text text-transparent">
            Kodėl pasirinkti mūsų platformą?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-card border-border/50">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary text-primary-foreground w-fit">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle>Personalizuotas mokymasis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI asistentas prisitaiko prie jūsų lygio ir mokymosi tempo, suteikdamas 
                  individualų grįžtamąjį ryšį kiekvienam argumentui.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card border-border/50">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary text-primary-foreground w-fit">
                  <Award className="h-8 w-8" />
                </div>
                <CardTitle>Motyvuojanti sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Pasiekimų sistema ir pažangos sekimas padeda išlaikyti motyvaciją ir 
                  aiškiai matyti savo tobulėjimą debatavimo srityje.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card border-border/50">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary text-primary-foreground w-fit">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle>Lietuviška aplinka</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Specialiai sukurta lietuvių kalbai ir švietimo sistemai, su aktualiomis 
                  temomis ir kultūriškai relevantiškais pavyzdžiais.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-glow border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Mūsų vertybės</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Prieinamumas</h4>
                  <p className="text-muted-foreground">
                    Tikime, kad kiekvienas mokinys turi teisę į kokybišką debatų mokymą, 
                    nepriklausomai nuo geografinės padėties ar mokyklos išteklių.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Inovacijos</h4>
                  <p className="text-muted-foreground">
                    Nuolat ieškome naujų būdų, kaip technologijos gali pagerinti mokymosi 
                    procesą ir padaryti jį įdomesnį bei efektyvesnį.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Kokybė</h4>
                  <p className="text-muted-foreground">
                    Užtikriname aukščiausią mokymo turinio ir technologijos kokybę, 
                    kad kiekvienas naudotojas gautų maksimalią naudą.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Bendruomeniškumas</h4>
                  <p className="text-muted-foreground">
                    Kuriame palaikančią mokymosi bendruomenę, kur kiekvienas gali 
                    dalintis patirtimi ir tobulėti kartu.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Pasiruošę pradėti?</h3>
          <p className="text-muted-foreground mb-6">
            Prisijunkite prie mūsų bendruomenės ir pradėkite tobulinti savo debatavimo įgūdžius šiandien.
          </p>
          <Button asChild size="lg" className="shadow-button">
            <Link to="/app">Pradėti mokytis</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;