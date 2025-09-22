import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Target, Users, Lightbulb, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-background overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb-effect w-80 h-80 -top-40 -left-40 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="orb-effect w-56 h-56 top-1/4 -right-28 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="orb-effect w-64 h-64 bottom-1/4 left-1/4 animate-float" style={{animationDelay: '4s'}}></div>
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
            <h1 className="text-xl font-semibold text-gradient">Apie mus</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-slideInUp">
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-gradient">
            Apie Skaitmeninę Debatų Trenerę
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Mūsų misija - padėti mokiniams ir studentams tobulinti kritinio mąstymo, argumentavimo 
            ir viešo kalbėjimo įgūdžius naudojant pažangią dirbtinio intelekto technologiją.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <Card className="card-3d border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500">
            <CardHeader>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground shadow-3d">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl font-bold">Mūsų misija</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg leading-relaxed">
                Kuriame modernius sprendimus, kurie padeda jaunimui ugdyti kritinio mąstymo gebėjimus, 
                būtinus šiuolaikiniame pasaulyje. Tikime, kad debatavimo įgūdžiai formuoja stipresnius 
                ir labiau informuotus visuomenės narius.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card-3d border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500">
            <CardHeader>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-learning text-primary-foreground shadow-3d">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl font-bold">Mūsų vizija</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg leading-relaxed">
                Tapti pirmaujančia debatų mokymo platforma Lietuvoje ir regione, suteikiant 
                kiekvienam moksleiviui galimybę tobulinti savo argumentavimo ir analitinio mąstymo 
                gebėjimus modernioje skaitmeninėje aplinkoje.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-20 animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            Kodėl pasirinkti mūsų platformą?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-3d text-center border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="mx-auto mb-6 p-4 rounded-2xl bg-gradient-primary text-primary-foreground w-fit shadow-3d">
                  <Users className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl font-bold">Personalizuotas mokymasis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  AI asistentas prisitaiko prie jūsų lygio ir mokymosi tempo, suteikdamas 
                  individualų grįžtamąjį ryšį kiekvienam argumentui.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-3d text-center border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="mx-auto mb-6 p-4 rounded-2xl bg-gradient-hero text-primary-foreground w-fit shadow-3d">
                  <Award className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl font-bold">Motyvuojanti sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Pasiekimų sistema ir pažangos sekimas padeda išlaikyti motyvaciją ir 
                  aiškiai matyti savo tobulėjimą debatavimo srityje.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-3d text-center border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="mx-auto mb-6 p-4 rounded-2xl bg-secondary text-secondary-foreground w-fit shadow-3d">
                  <Target className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl font-bold">Lietuviška aplinka</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Specialiai sukurta lietuvių kalbai ir švietimo sistemai, su aktualiomis 
                  temomis ir kultūriškai relevantiškais pavyzdžiais.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-5xl mx-auto mb-20 animate-slideInUp" style={{animationDelay: '0.6s'}}>
          <Card className="card-3d border-0 bg-gradient-glow shadow-glow hover:shadow-floating transition-all duration-500">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Mūsų vertybės</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-gradient mb-3">Prieinamumas</h4>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Tikime, kad kiekvienas mokinys turi teisę į kokybišką debatų mokymą, 
                    nepriklausomai nuo geografinės padėties ar mokyklos išteklių.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-gradient mb-3">Inovacijos</h4>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Nuolat ieškome naujų būdų, kaip technologijos gali pagerinti mokymosi 
                    procesą ir padaryti jį įdomesnį bei efektyvesnį.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-gradient mb-3">Kokybė</h4>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Užtikriname aukščiausią mokymo turinio ir technologijos kokybę, 
                    kad kiekvienas naudotojas gautų maksimalią naudą.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-gradient mb-3">Bendruomeniškumas</h4>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Kuriame palaikančią mokymosi bendruomenę, kur kiekvienas gali 
                    dalintis patirtimi ir tobulėti kartu.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slideInUp" style={{animationDelay: '0.8s'}}>
          <Card className="card-3d border-0 bg-gradient-mesh shadow-floating hover:shadow-glow transition-all duration-500 inline-block">
            <CardContent className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Pasiruošę pradėti?</h3>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl">
                Prisijunkite prie mūsų bendruomenės ir pradėkite tobulinti savo debatavimo įgūdžius šiandien.
              </p>
              <Button asChild size="lg" className="text-xl px-10 py-8 morph-button shadow-floating bg-gradient-primary border-0">
                <Link to="/app">Pradėti mokytis</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;