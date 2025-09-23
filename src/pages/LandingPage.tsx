import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedButton } from "@/components/ui/animated-button";
import GlassCard from "@/components/ui/glass-card";
import { 
  ArrowRight, 
  Brain, 
  BarChart3, 
  Target, 
  Sparkles, 
  MessageSquare, 
  Trophy, 
  BookOpen,
  Mic,
  Users,
  Award,
  Zap,
  Globe,
  Star,
  TrendingUp,
  Lightbulb,
  Shield
} from "lucide-react";
import { translations } from "@/lib/translations";

const LandingPage = () => {
  const { landing, nav } = translations;

  return (
    <div className="min-h-screen bg-gradient-background overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb-effect w-96 h-96 -top-48 -left-48 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="orb-effect w-64 h-64 top-1/4 -right-32 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="orb-effect w-80 h-80 bottom-1/4 left-1/4 animate-float" style={{animationDelay: '4s'}}></div>
        <div className="orb-effect w-56 h-56 bottom-0 right-1/3 animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b glass-morphism sticky top-0">
        <motion.div 
          className="container mx-auto px-4 py-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="p-2 rounded-xl bg-gradient-primary shadow-3d"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <span className="text-2xl font-bold text-gradient">
                Echo Debate
              </span>
            </motion.div>
            <motion.nav 
              className="hidden md:flex items-center gap-8"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
              >
                {nav.about}
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
              >
                {nav.contact}
              </Link>
              <AnimatedButton asChild variant="outline" morph3d shimmer>
                <Link to="/app">{nav.getStarted}</Link>
              </AnimatedButton>
            </motion.nav>
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 mesh-gradient">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badges */}
            <div className="flex items-center justify-center gap-4 mb-8 animate-bounceIn">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold shadow-floating">
                <Sparkles className="w-4 h-4 mr-2" />
                {landing.beta}
              </Badge>
              <Badge className="px-4 py-2 text-sm font-semibold bg-gradient-primary text-primary-foreground border-0 shadow-glow">
                <Zap className="w-4 h-4 mr-2" />
                {landing.aiIntegration}
              </Badge>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 animate-slideInUp">
              <span className="text-gradient leading-tight block">
                {landing.title}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-3xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto animate-slideInUp" style={{animationDelay: '0.2s'}}>
              {landing.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
              <Button asChild size="lg" className="text-xl px-10 py-8 morph-button shadow-floating bg-gradient-primary border-0">
                <Link to="/app">
                  {landing.cta.primary}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-xl px-10 py-8 morph-button shadow-card glass-morphism">
                <Link to="/about">{landing.cta.secondary}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-slideInUp" style={{animationDelay: '0.6s'}}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">500+</div>
                <div className="text-muted-foreground">Mokiniai</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">98%</div>
                <div className="text-muted-foreground">Pagerėjimas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">50+</div>
                <div className="text-muted-foreground">Temos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
                <div className="text-muted-foreground">Prieiga</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-2 bg-accent/10 text-accent border-accent/20">
              <Star className="w-4 h-4 mr-2" />
              Funkcijos
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              {landing.features.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pažangūs AI sprendimai, padėsiantys tobulinti debatavimo ir pristatymų įgūdžius
            </p>
          </div>
          
          {/* Feature Cards Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              {
                icon: Brain,
                title: landing.features.aiOpponent.title,
                description: landing.features.aiOpponent.description,
                gradient: "bg-gradient-primary"
              },
              {
                icon: Sparkles,
                title: landing.features.realTime.title,
                description: landing.features.realTime.description,
                gradient: "bg-gradient-learning"
              },
              {
                icon: BarChart3,
                title: landing.features.analytics.title,
                description: landing.features.analytics.description,
                gradient: "bg-gradient-hero"
              },
              {
                icon: Target,
                title: landing.features.topics.title,
                description: landing.features.topics.description,
                gradient: "bg-gradient-orb"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <GlassCard 
                  key={index}
                  hover 
                  animation="float"
                  className="group border-0 shadow-card"
                >
                  <CardHeader className="text-center pb-4">
                    <motion.div 
                      className={`mx-auto mb-6 p-4 rounded-2xl ${feature.gradient} text-primary-foreground w-fit shadow-3d`}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="h-10 w-10" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </GlassCard>
              );
            })}
          </motion.div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-3d hover:shadow-floating transition-all duration-500 border-0 bg-gradient-card shadow-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-xl bg-secondary text-secondary-foreground w-fit">
                  <Mic className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Balso analizė</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  AI analizuoja jūsų balso toną, tempą ir aiškumą realiu laiku
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-floating transition-all duration-500 border-0 bg-gradient-card shadow-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-xl bg-accent text-accent-foreground w-fit">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Grupės sesijos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Dalyvauk grupės debatuose ir mokykis iš kitų dalyvių
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-3d hover:shadow-floating transition-all duration-500 border-0 bg-gradient-card shadow-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-xl bg-gradient-primary text-primary-foreground w-fit">
                  <Award className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Pasiekimų sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Gauk apdovanojimus ir sek savo pažangą debatavimo kelionėje
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-mesh relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Kodėl rinktis Echo Debate?
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground shadow-3d">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Greitai pagerėk</h3>
                    <p className="text-muted-foreground">Gauk tiesioginį grįžtamąjį ryšį ir matyk pažangą jau po kelių sesijų</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-learning text-primary-foreground shadow-3d">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Personalizuotas mokymasis</h3>
                    <p className="text-muted-foreground">AI prisitaiko prie tavo lygio ir siūlo tinkamus iššūkius</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-hero text-primary-foreground shadow-3d">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Saugi aplinka</h3>
                    <p className="text-muted-foreground">Mokykis be baimės klysti draugiškoje AI aplinkoje</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-secondary text-secondary-foreground shadow-3d">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Prieinama visur</h3>
                    <p className="text-muted-foreground">Mokykis bet kada ir bet kur su mūsų mobilia platforma</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-orb rounded-3xl shadow-floating animate-float"></div>
                <div className="absolute inset-8 bg-gradient-card rounded-2xl shadow-3d flex items-center justify-center">
                  <div className="text-center">
                    <Trophy className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                    <h3 className="text-2xl font-bold text-gradient mb-2">Pažangūs rezultatai</h3>
                    <p className="text-muted-foreground">Mokiniai pagerina savo debatavimo įgūdžius vidutiniškai per 2 savaites</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="card-3d border-0 bg-gradient-glow shadow-glow hover:shadow-floating transition-all duration-500">
              <CardHeader className="pb-8 pt-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-3d animate-float">
                    <MessageSquare className="h-12 w-12" />
                  </div>
                </div>
                <CardTitle className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                  Pradėkite tobulinti savo debatavimo įgūdžius šiandien
                </CardTitle>
                <CardDescription className="text-xl text-muted-foreground leading-relaxed">
                  Prisijunkite prie šimtų mokinių, kurie jau tobulina savo argumentavimo ir kritinio mąstymo gebėjimus.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-12">
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="text-xl px-10 py-8 morph-button shadow-floating bg-gradient-primary border-0">
                    <Link to="/app">
                      {landing.cta.primary}
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-xl px-10 py-8 morph-button shadow-card">
                    <Link to="/about">Sužinok daugiau</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t glass-morphism relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-primary shadow-3d">
                  <MessageSquare className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-gradient">Echo Debate</span>
              </div>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                AI debatų ir pristatymų treneris, skirtas ruoštis akademiniams ginčams, pristatymams ir debatams.
              </p>
              <div className="flex gap-4">
                <Badge variant="secondary" className="px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  4.9/5 vertinimas
                </Badge>
                <Badge variant="outline" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                  <Users className="w-3 h-3 mr-1" />
                  500+ vartotojų
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-gradient">Nuorodos</h4>
              <div className="space-y-4">
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1">
                  {nav.about}
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1">
                  {nav.contact}
                </Link>
                <Link to="/app" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Pradėti naudoti
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-gradient">Teisinė informacija</h4>
              <div className="space-y-4">
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Privatumo politika
                </Link>
                <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Naudojimosi taisyklės
                </Link>
                <Link to="/cookies" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1">
                  Slapukų politika
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground">&copy; 2024 Echo Debate. Visos teisės saugomos.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="text-muted-foreground text-sm">Sukurta su</span>
              <span className="text-red-500 text-lg">❤️</span>
              <span className="text-muted-foreground text-sm">Lietuvoje</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;