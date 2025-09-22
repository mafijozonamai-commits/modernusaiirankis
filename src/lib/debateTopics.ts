export interface DebateTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  suggestedSources?: string[];
  keyPoints: {
    pro: string[];
    con: string[];
  };
}

export const DEBATE_CATEGORIES = [
  { id: 'education', name: 'Švietimas ir mokymasis', icon: '🎓' },
  { id: 'technology', name: 'Technologijos ir AI', icon: '💻' },
  { id: 'environment', name: 'Aplinka ir klimatas', icon: '🌍' },
  { id: 'social', name: 'Socialiniai klausimai', icon: '👥' },
  { id: 'ethics', name: 'Etika ir filosofija', icon: '⚖️' },
  { id: 'politics', name: 'Politika ir valdžia', icon: '🏛️' },
  { id: 'health', name: 'Sveikata ir medicina', icon: '🏥' },
  { id: 'economics', name: 'Ekonomika ir verslas', icon: '💼' }
];

export const DEBATE_TOPICS: DebateTopic[] = [
  // Education Category
  {
    id: 'school-phones',
    title: 'Ar mokyklose turėtų būti uždrausti išmanieji telefonai?',
    description: 'Diskutuokite apie mobiliųjų įrenginių poveikį mokymuisi ir socialiniam vystymuisi',
    category: 'education',
    difficulty: 'beginner',
    keyPoints: {
      pro: ['Sumažina dėmesio blaškymą', 'Gerina tiesioginio bendravimo įgūdžius', 'Geriau sutelkia dėmesį į mokymąsi'],
      con: ['Skubus komunikavimas', 'Edukacinės programėlės ir ištekliai', 'Skaitmeninių gebėjimų ugdymas']
    }
  },
  {
    id: 'homework-weekend',
    title: 'Ar savaitgaliais turėtų būti duodami namų darbai?',
    description: 'Tyrinėkite mokinių darbo ir poilsio pusiausvyrą bei mokymosi efektyvumą',
    category: 'education',
    difficulty: 'beginner',
    keyPoints: {
      pro: ['Stiprina mokymąsi', 'Ugdo laiko valdymo įgūdžius', 'Palaiko akademinį tempą'],
      con: ['Šeimos laiko svarba', 'Poilsio ir pramogų poreikis', 'Streso mažinimas']
    }
  },
  {
    id: 'standardized-testing',
    title: 'Ar standartizuoti testai efektyviai matuoja mokinių gebėjimus?',
    description: 'Išnagrinėkite standartizuotų testų vaidmenį šiuolaikiniame švietime',
    category: 'education',
    difficulty: 'intermediate',
    keyPoints: {
      pro: ['Objektyvus vertinimas', 'Priėmimo į aukštąsias mokyklas standartai', 'Švietimo pažangos sekimas'],
      con: ['Mokymasis testui', 'Kultūrinis šališkumas', 'Siauras gebėjimų vertinimas']
    }
  },

  // Technology Category
  {
    id: 'ai-education',
    title: 'Ar AI įrankiai kaip ChatGPT turėtų būti leidžiami klasėse?',
    description: 'Diskutuokite apie AI technologijų integraciją švietimo aplinkoje',
    category: 'technology',
    difficulty: 'intermediate',
    keyPoints: {
      pro: ['Padidinta mokymosi efektyvumas', 'Personalizuotas švietimas', 'Ateities įgūdžių ruošimas'],
      con: ['Akademinio sąžiningumo rūpesčiai', 'Kritinio mąstymo mažėjimas', 'Priklausomybės problemos']
    }
  },
  {
    id: 'social-media-regulation',
    title: 'Ar socialiniai tinklai turėtų būti reguliuojami vyriausybės?',
    description: 'Tyrinėkite pusiausvyrą tarp žodžio laisvės ir platformų atsakomybės',
    category: 'technology',
    difficulty: 'advanced',
    keyPoints: {
      pro: ['Naudotojų privatumo apsauga', 'Dezinformacijos kovos', 'Žalingo turinio prevencija'],
      con: ['Žodžio laisvės rūpesčiai', 'Inovacijų stabdymas', 'Vyriausybės perdėtas įsitraukimas']
    }
  },

  // Environment Category
  {
    id: 'plastic-bags',
    title: 'Ar plastiko maišeliai turėtų būti visiškai uždrausti?',
    description: 'Išnagrinėkite poveikį aplinkai ir praktinius aspektus',
    category: 'environment',
    difficulty: 'beginner',
    keyPoints: {
      pro: ['Taršos mažinimas', 'Jūrų gyvūnų apsauga', 'Daugkartinio naudojimo alternatyvų skatinimas'],
      con: ['Ekonominis poveikis verslui', 'Vartotojų patogumas', 'Alternatyvių šalinimo problemos']
    }
  },
  {
    id: 'nuclear-energy',
    title: 'Ar branduolinė energija yra klimato kaitos sprendimas?',
    description: 'Diskutuokite apie švarios energijos alternatyvas ir jų kompromisus',
    category: 'environment',
    difficulty: 'advanced',
    keyPoints: {
      pro: ['Mažas anglies pėdsako našumas', 'Patikima bazinė energija', 'Išbandyta technologija'],
      con: ['Radioaktyvių atliekų saugojimas', 'Avarijų rizika', 'Aukštos statybos sąnaudos']
    }
  },

  // Social Issues Category
  {
    id: 'four-day-workweek',
    title: 'Ar standartinė darbo savaitė turėtų būti keturių dienų?',
    description: 'Tyrinėkite darbo ir asmeninio gyvenimo pusiausvyrą šiuolaikiniame visuomenėje',
    category: 'social',
    difficulty: 'intermediate',
    keyPoints: {
      pro: ['Geresnė darbo ir gyvenimo pusiausvyra', 'Padidėjęs produktyvumas', 'Mažesnis pervargimas'],
      con: ['Klientų aptarnavimo spragos', 'Ekonominio produktyvumo rūpesčiai', 'Pramonės suderinamumas']
    }
  },
  {
    id: 'universal-basic-income',
    title: 'Ar vyriausybės turėtų įgyvendinti visuotines bazines pajamas?',
    description: 'Diskutuokite apie ekonomikos politiką ir socialinės gerovės požiūrius',
    category: 'social',
    difficulty: 'advanced',
    keyPoints: {
      pro: ['Skurdo mažinimas', 'Ekonominis saugumas', 'Socialinės paramos sistemų supaprastinimas'],
      con: ['Aukštos sąnaudos mokesčių mokėtojams', 'Galima infliacija', 'Darbo motyvacijos mažėjimas']
    }
  },

  // Ethics Category
  {
    id: 'animal-testing',
    title: 'Ar gyvūnų bandymai turėtų būti uždrausti kosmetikos produktams?',
    description: 'Išnagrinėkite etinius aspektus produktų kūrime',
    category: 'ethics',
    difficulty: 'intermediate',
    keyPoints: {
      pro: ['Gyvūnų gerovės apsauga', 'Alternatyvūs metodai prieinami', 'Etiškas vartojimas'],
      con: ['Saugumo tyrimų būtinybė', 'Ekonominis poveikis pramonei', 'Mokslo pažanga']
    }
  },
  {
    id: 'genetic-editing',
    title: 'Ar žmogaus embrionų genetinis redagavimas turėtų būti leistinas?',
    description: 'Diskutuokite apie genetinės modifikacijos etiką ir žmogaus tobulinimą',
    category: 'ethics',
    difficulty: 'advanced',
    keyPoints: {
      pro: ['Genetinių ligų prevencija', 'Žmogaus tobulinimo potencialas', 'Medicinos pažanga'],
      con: ['Etiniai rūpesčiai', 'Genetinė nelygybė', 'Nežinomi ilgalaikiai poveikiai']
    }
  },

  // Lithuanian-specific topics
  {
    id: 'lithuanian-language',
    title: 'Ar lietuvių kalba turėtų būti privaloma visose Lietuvos mokyklose?',
    description: 'Diskutuokite apie kalbos politiką ir kultūrinio tapatumo išsaugojimą',
    category: 'education',
    difficulty: 'intermediate',
    keyPoints: {
      pro: ['Kultūrinio tapatumo išsaugojimas', 'Valstybinės kalbos prestižas', 'Integracijos skatinimas'],
      con: ['Mažumų teisės', 'Tarptautiškumas', 'Individualus pasirinkimas']
    }
  },
  {
    id: 'eu-integration',
    title: 'Ar Lietuva turėtų stiprinti integraciją su ES?',
    description: 'Tyrinėkite Lietuvos vaidmenį Europos Sąjungoje',
    category: 'politics',
    difficulty: 'advanced',
    keyPoints: {
      pro: ['Ekonominės naudos', 'Geopolitinis saugumas', 'Europos vertybių sklaida'],
      con: ['Nacionalinio suverenumo išsaugojimas', 'Kultūrinio savitumo apsauga', 'Sprendimų autonomija']
    }
  }
];

export const getTopicsByCategory = (categoryId: string): DebateTopic[] => {
  return DEBATE_TOPICS.filter(topic => topic.category === categoryId);
};

export const getTopicsByDifficulty = (difficulty: string): DebateTopic[] => {
  return DEBATE_TOPICS.filter(topic => topic.difficulty === difficulty);
};

export const getRandomTopic = (): DebateTopic => {
  return DEBATE_TOPICS[Math.floor(Math.random() * DEBATE_TOPICS.length)];
};