import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const ContactPage = () => {
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
            <h1 className="text-xl font-semibold">Kontaktai</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-learning bg-clip-text text-transparent">
              Susisiekite su mumis
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turite klausimų ar pasiūlymų? Mums labai svarbus jūsų grįžtamasis ryšys. 
              Susisiekite su mumis bet kuriuo patogiu būdu.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Rašykite mums
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Vardas, pavardė</Label>
                  <Input id="name" placeholder="Jūsų vardas ir pavardė" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">El. paštas</Label>
                  <Input id="email" type="email" placeholder="jusu.epastas@email.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Tema</Label>
                  <Input id="subject" placeholder="Žinutės tema" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Žinutė</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Parašykite savo žinutę..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full shadow-button">
                  Siųsti žinutę
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Kontaktinė informacija</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">El. paštas</h4>
                      <p className="text-muted-foreground">info@debatu-trenere.lt</p>
                      <p className="text-muted-foreground">pagalba@debatu-trenere.lt</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Telefonas</h4>
                      <p className="text-muted-foreground">+370 600 12345</p>
                      <p className="text-sm text-muted-foreground">Darbo dienomis 9:00-17:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Adresas</h4>
                      <p className="text-muted-foreground">
                        Gedimino pr. 1<br />
                        LT-01103 Vilnius<br />
                        Lietuva
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Card */}
              <Card className="bg-gradient-glow border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">Dažnai užduodami klausimai</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Ar platforma nemokama?</h4>
                    <p className="text-sm text-muted-foreground">
                      Taip, pagrindinės funkcijos yra visiškai nemokamos. Papildomos funkcijos 
                      bus prieinamos premium versijoje.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Kokiam amžiui skirta platforma?</h4>
                    <p className="text-sm text-muted-foreground">
                      Platforma skirta 12+ metų moksleiviams ir studentams, tačiau gali būti 
                      naudinga ir suaugusiesiems.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Ar reikia registruotis?</h4>
                    <p className="text-sm text-muted-foreground">
                      Registracija nėra privaloma, tačiau užsiregistravus galima saugoti 
                      pažangą ir pasiekimus.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-card border-border/50 inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Reikia techninio palaikymo?</h3>
                <p className="text-muted-foreground mb-6">
                  Jei kilo techninių problemų naudojantis platforma, nedvejokite kreiptis pagalbos.
                </p>
                <Button variant="outline" className="mr-4">
                  Techninė pagalba
                </Button>
                <Button asChild>
                  <Link to="/app">Grįžti į platformą</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;