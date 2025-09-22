// OpenRouter AI Integration
// WARNING: Storing API keys in frontend code is not secure for production
// Consider using Supabase secrets or environment variables

const OPENROUTER_API_KEY = "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";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

// Premium Claude models for superior debate experience
const CLAUDE_MODELS = [
  "anthropic/claude-opus-4-1-20250805",      // Most capable model
  "anthropic/claude-sonnet-4-20250514",      // High performance
  "anthropic/claude-3-5-haiku-20241022"      // Fast responses
];

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DebateContext {
  topic: string;
  position: 'pro' | 'con';
  round: number;
  previousArguments: string[];
  userPosition?: 'pro' | 'con';
}

export interface AIPersonality {
  name: string;
  description: string;
  systemPrompt: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const AI_PERSONALITIES: AIPersonality[] = [
  {
    name: "Draugiškas Mentorius",
    description: "Palaikantis treneris su konstruktyviais patarimais",
    difficulty: "beginner",
    systemPrompt: "Tu esi patyrusi debatų mentorė Sofija. Esi šilta, padrąsinanti ir aiškiai aiškini samprotavimo principus. Padedi studentams palaipsniui tobulėti, teiki tikslų grįžtamąjį ryšį ir motyvuoji. Atsakyk lietuviškai, 2-3 sakiniais. Naudok pavyzdžius ir analogijas. Akcentuok teigiamus aspektus, bet nevenk konstruktyvios kritikos."
  },
  {
    name: "Reiklus Oponentas", 
    description: "Patyręs debatorius su aštriais kontrargumentais",
    difficulty: "intermediate",
    systemPrompt: "Tu esi Robertas - patyręs advokatų mokyklos lektorius. Esi reiklus, bet teisingas. Naudoji Sokratišką metodą, kvestionuoji prielaidas ir ieškosi logikos spragų. Pateiki tvirtus, bet ne griaunančius kontrargumentus. Atsakyk lietuviškai, 2-3 sakiniais. Naudok realius duomenis ir precedentus. Būk iššūkis, bet mokytojas."
  },
  {
    name: "Akademinis Ekspertas",
    description: "Universiteto profesoriaus lygio giluminė analizė",
    difficulty: "advanced", 
    systemPrompt: "Tu esi prof. dr. Renata Kazlauskienė - tarptautinių debatų teisėja ir retorikos ekspertė. Analizuoji argumentų struktūrą, retorinį poveikį, logikos koherenciją. Cituoji klasikinę retoriką, naudoji akademinę terminologiją. Atsakyk lietuviškai 3-4 sakiniais. Įvertini ne tik turinį, bet ir pateikimo meistryškumą. Teiki gilius, sistemingus įžvalgas."
  }
];

class OpenRouterService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = OPENROUTER_BASE_URL;
  }

  async generateDebateResponse(
    context: DebateContext,
    userArgument: string,
    personality: AIPersonality = AI_PERSONALITIES[0]
  ): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `${personality.systemPrompt}

Debate Topic: "${context.topic}"
Your Position: ${context.position === 'pro' ? 'Support the topic' : 'Oppose the topic'}
Current Round: ${context.round}/5
Context: This is an educational debate for students to practice argumentation skills.`
      },
      {
        role: 'user',
        content: `The student argues: "${userArgument}"

Please provide a ${context.position} counterargument that is appropriate for round ${context.round}. Be ${personality.difficulty === 'beginner' ? 'encouraging and educational' : personality.difficulty === 'intermediate' ? 'challenging but fair' : 'sophisticated and thorough'}.`
      }
    ];

    return this.makeRequest(messages);
  }

  async generateFeedback(
    argument: string,
    topic: string,
    round: number
  ): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: "You are a debate coach providing constructive feedback on student arguments. Analyze strengths, suggest improvements, and rate the argument's effectiveness. Keep feedback educational and encouraging."
      },
      {
        role: 'user',
        content: `Please analyze this debate argument for round ${round}:

Topic: "${topic}"
Argument: "${argument}"

Provide brief feedback on:
1. Strength of reasoning
2. Use of evidence
3. Clarity of expression
4. Suggestions for improvement

Keep it concise but helpful (2-3 sentences).`
      }
    ];

    return this.makeRequest(messages);
  }

  async analyzeArgumentStrength(
    argument: string,
    topic: string,
    position: 'pro' | 'con'
  ): Promise<{ score: number; analysis: string }> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: "Tu esi debatų analitikas. Įvertink argumento stiprumą 0-100 skalėje pagal: loginį darną (30%), įrodymų kokybę (25%), aiškumą (20%), originalumą (15%), ir retorini poveikį (10%). Atsiliepk lietuviškai."
      },
      {
        role: 'user',
        content: `Tema: "${topic}"
Pozicija: ${position === 'pro' ? 'Už' : 'Prieš'}
Argumentas: "${argument}"

Įvertink šio argumento stiprumą ir grąžink atsakymą tokiu formatu:
SCORE: [skaičius 0-100]
ANALYSIS: [1-2 sakiniai apie stipriąsias ir silpnąsias vietas]`
      }
    ];

    const response = await this.makeRequest(messages);
    
    // Parse the response
    const scoreMatch = response.match(/SCORE:\s*(\d+)/i);
    const analysisMatch = response.match(/ANALYSIS:\s*(.+)/is);
    
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;
    const analysis = analysisMatch ? analysisMatch[1].trim() : "Geras argumentas su aiškia logika.";
    
    return { score, analysis };
  }

  async generateOpeningStatement(
    topic: string,
    position: 'pro' | 'con',
    personality: AIPersonality
  ): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `${personality.systemPrompt}

You are starting a debate on: "${topic}"
Your position: ${position === 'pro' ? 'Support' : 'Oppose'} the topic.
Provide a strong opening argument that sets the tone for an educational debate.`
      },
      {
        role: 'user',
        content: `Generate an opening argument for the ${position} side of: "${topic}"`
      }
    ];

    return this.makeRequest(messages);
  }

  private async makeRequest(messages: AIMessage[], retryCount = 0): Promise<string> {
    const currentModel = CLAUDE_MODELS[retryCount] || CLAUDE_MODELS[0];
    
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Digital Debate Coach'
        },
        body: JSON.stringify({
          model: currentModel,
          messages,
          temperature: 0.8,
          max_tokens: 400,
          top_p: 0.95
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // If rate limited or model unavailable, try next model
        if (response.status === 429 || response.status === 404) {
          if (retryCount < CLAUDE_MODELS.length - 1) {
            console.log(`Model ${currentModel} unavailable, trying next model...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
            return this.makeRequest(messages, retryCount + 1);
          }
        }
        
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('Empty response from API');
      }
      
      return content;
    } catch (error) {
      console.error(`OpenRouter API Error with ${currentModel}:`, error);
      
      // Try fallback model if available
      if (retryCount < CLAUDE_MODELS.length - 1) {
        console.log(`Trying fallback model due to error: ${error}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.makeRequest(messages, retryCount + 1);
      }
      
      // All models failed, return Lithuanian fallback
      return "Atsiprašau, šiuo metu negaliu prisijungti prie AI sistemos. Pabandykite dar kartą po kelių minučių.";
    }
  }
}

export const openRouterService = new OpenRouterService(OPENROUTER_API_KEY);