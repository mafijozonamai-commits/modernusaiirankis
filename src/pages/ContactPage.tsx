import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-background overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb-effect w-72 h-72 -top-36 -left-36 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="orb-effect w-48 h-48 top-1/3 -right-24 animate-float" style={{animationDelay: '2.5s'}}></div>
        <div className="orb-effect w-60 h-60 bottom-1/4 left-1/5 animate-float" style={{animationDelay: '1s'}}></div>
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
            <h1 className="text-xl font-semibold text-gradient">Kontaktai</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-slideInUp">
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-gradient">
              Susisiekite su mumis
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Turite klausimų ar pasiūlymų? Mums labai svarbus jūsų grįžtamasis ryšys. 
              Susisiekite su mumis bet kuriuo patogiu būdu.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Contact Form */}
            <Card className="card-3d border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500 animate-slideInLeft">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-bold flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-primary text-primary-foreground shadow-3d">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  Rašykite mums
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-base font-semibold">Vardas, pavardė</Label>
                  <Input 
                    id="name" 
                    placeholder="Jūsų vardas ir pavardė" 
                    className="glass-morphism border-0 shadow-card text-base py-6"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-semibold">El. paštas</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="jusu.epastas@email.com" 
                    className="glass-morphism border-0 shadow-card text-base py-6"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-base font-semibold">Tema</Label>
                  <Input 
                    id="subject" 
                    placeholder="Žinutės tema" 
                    className="glass-morphism border-0 shadow-card text-base py-6"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-base font-semibold">Žinutė</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Parašykite savo žinutę..."
                    className="glass-morphism border-0 shadow-card min-h-[150px] text-base"
                  />
                </div>
                
                <Button className="w-full text-lg py-6 morph-button shadow-floating bg-gradient-primary border-0">
                  Siųsti žinutę
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 animate-slideInRight">
              <Card className="card-3d border-0 bg-gradient-card shadow-floating hover:shadow-glow transition-all duration-500">
                <CardHeader className="pb-6">
                  <CardTitle className="text-3xl font-bold">Kontaktinė informacija</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground shadow-3d">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">El. paštas</h4>
                      <p className="text-muted-foreground text-base">info@debatu-trenere.lt</p>
                      <p className="text-muted-foreground text-base">pagalba@debatu-trenere.lt</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="p-3 rounded-xl bg-gradient-learning text-primary-foreground shadow-3d">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Telefonas</h4>
                      <p className="text-muted-foreground text-base">+370 600 12345</p>
                      <p className="text-sm text-muted-foreground">Darbo dienomis 9:00-17:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="p-3 rounded-xl bg-gradient-hero text-primary-foreground shadow-3d">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Adresas</h4>
                      <p className="text-muted-foreground text-base">
                        Gedimino pr. 1<br />
                        LT-01103 Vilnius<br />
                        Lietuva
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Card */}
              <Card className="card-3d border-0 bg-gradient-glow shadow-glow hover:shadow-floating transition-all duration-500">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold">Dažnai užduodami klausimai</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg text-gradient">Ar platforma nemokama?</h4>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Taip, pagrindinės funkcijos yra visiškai nemokamos. Papildomos funkcijos 
                      bus prieinamos premium versijoje.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg text-gradient">Kokiam amžiui skirta platforma?</h4>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Platforma skirta 12+ metų moksleiviams ir studentams, tačiau gali būti 
                      naudinga ir suaugusiesiems.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg text-gradient">Ar reikia registruotis?</h4>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Registracija nėra privaloma, tačiau užsiregistravus galima saugoti 
                      pažangą ir pasiekimus.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Section */}
          <div className="text-center animate-slideInUp" style={{animationDelay: '0.6s'}}>
            <Card className="card-3d border-0 bg-gradient-mesh shadow-floating hover:shadow-glow transition-all duration-500 inline-block">
              <CardContent className="p-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Reikia techninio palaikymo?</h3>
                <p className="text-muted-foreground mb-8 text-lg max-w-2xl">
                  Jei kilo techninių problemų naudojantis platforma, nedvejokite kreiptis pagalbos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="text-lg px-8 py-6 morph-button shadow-card">
                    Techninė pagalba
                  </Button>
                  <Button asChild className="text-lg px-8 py-6 morph-button shadow-floating bg-gradient-primary border-0">
                    <Link to="/app">Grįžti į platformą</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;