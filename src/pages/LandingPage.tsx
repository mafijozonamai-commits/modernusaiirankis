import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, BarChart3, Target, Sparkles, MessageSquare, Trophy, BookOpen } from "lucide-react";
import { translations } from "@/lib/translations";

const LandingPage = () => {
  const { landing, nav } = translations;

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-learning bg-clip-text text-transparent">
                Echo Debate
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                {nav.about}
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                {nav.contact}
              </Link>
              <Button asChild variant="outline">
                <Link to="/app">{nav.getStarted}</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="px-3 py-1">
                {landing.beta}
              </Badge>
              <Badge variant="outline" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                {landing.aiIntegration}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-learning bg-clip-text text-transparent">
                {landing.title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {landing.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 shadow-button">
                <Link to="/app">
                  {landing.cta.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/about">{landing.cta.secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-learning bg-clip-text text-transparent">
              {landing.features.title}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary text-primary-foreground w-fit">
                  <Brain className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{landing.features.aiOpponent.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {landing.features.aiOpponent.description}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary text-primary-foreground w-fit">
                  <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{landing.features.realTime.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {landing.features.realTime.description}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary text-primary-foreground w-fit">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{landing.features.analytics.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {landing.features.analytics.description}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary text-primary-foreground w-fit">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{landing.features.topics.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {landing.features.topics.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="bg-gradient-glow border-primary/20 shadow-glow">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                  Pradėkite tobulinti savo debatavimo įgūdžius šiandien
                </CardTitle>
                <CardDescription className="text-lg">
                  Prisijunkite prie šimtų mokinių, kurie jau tobulina savo argumentavimo ir kritinio mąstymo gebėjimus.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="lg" className="text-lg px-8 py-6 shadow-button">
                  <Link to="/app">
                    {landing.cta.primary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Echo Debate</span>
              </div>
              <p className="text-muted-foreground mb-4">
                AI debatų ir pristatymų treneris, skirtas ruoštis akademiniams ginčams, pristatymams ir debatams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Nuorodos</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                  {nav.about}
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                  {nav.contact}
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Teisinė informacija</h4>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privatumo politika
                </Link>
                <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Naudojimosi taisyklės
                </Link>
                <Link to="/cookies" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Slapukų politika
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Echo Debate. Visos teisės saugomos.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;