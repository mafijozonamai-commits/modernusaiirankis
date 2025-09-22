import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, ExternalLink, Search, CheckCircle, AlertCircle } from 'lucide-react';

interface Source {
  title: string;
  url: string;
  snippet: string;
  reliability: 'high' | 'medium' | 'low';
  type: 'academic' | 'news' | 'government' | 'organization' | 'other';
}

interface CitationCheckerProps {
  topic: string;
  argument: string;
  onSourcesFound?: (sources: Source[]) => void;
}

export const CitationChecker: React.FC<CitationCheckerProps> = ({
  topic,
  argument,
  onSourcesFound
}) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock source data - in real app this would connect to research APIs
  const generateMockSources = (query: string): Source[] => {
    const mockSources: Source[] = [
      {
        title: 'Educational Technology Research Study 2024',
        url: 'https://example.edu/research/edtech-2024',
        snippet: 'Comprehensive analysis of smartphone usage in educational settings shows mixed results on learning outcomes...',
        reliability: 'high',
        type: 'academic'
      },
      {
        title: 'Student Performance Report - Department of Education',
        url: 'https://education.gov/reports/student-performance',
        snippet: 'Government study reveals correlation between mobile device policies and academic achievement...',
        reliability: 'high',
        type: 'government'
      },
      {
        title: 'Teachers Union Survey on Classroom Technology',
        url: 'https://teachersunion.org/tech-survey',
        snippet: 'Survey of 5,000 teachers reveals perspectives on mobile device usage in classrooms...',
        reliability: 'medium',
        type: 'organization'
      },
      {
        title: 'BBC News: Schools Debate Phone Policies',
        url: 'https://bbc.com/news/education-phones',
        snippet: 'Recent developments in school phone policies across different countries and their outcomes...',
        reliability: 'medium',
        type: 'news'
      },
      {
        title: 'Harvard Education Review: Digital Distraction',
        url: 'https://harvard.edu/education/digital-distraction',
        snippet: 'Peer-reviewed research on the impact of digital devices on student attention and learning...',
        reliability: 'high',
        type: 'academic'
      }
    ];

    // Filter based on search query relevance
    return mockSources.filter(source => 
      source.title.toLowerCase().includes(query.toLowerCase()) ||
      source.snippet.toLowerCase().includes(query.toLowerCase()) ||
      query.split(' ').some(word => 
        source.title.toLowerCase().includes(word.toLowerCase()) ||
        source.snippet.toLowerCase().includes(word.toLowerCase())
      )
    );
  };

  const searchSources = async (query: string) => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundSources = generateMockSources(query);
    setSources(foundSources);
    onSourcesFound?.(foundSources);
    setIsSearching(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchSources(searchQuery);
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    searchSources(query);
  };

  useEffect(() => {
    // Auto-search based on topic when component mounts
    if (topic) {
      const autoQuery = topic.replace(/[?]/g, '').split(' ').slice(0, 3).join(' ');
      setSearchQuery(autoQuery);
      searchSources(autoQuery);
    }
  }, [topic]);

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return '🎓';
      case 'government': return '🏛️';
      case 'news': return '📰';
      case 'organization': return '🏢';
      default: return '📄';
    }
  };

  const suggestedSearches = [
    'research studies',
    'statistics data',
    'expert opinions',
    'case studies',
    'government reports'
  ];

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold">Source Finder</h3>
        <Badge variant="outline" className="text-xs">
          {sources.length} sources found
        </Badge>
      </div>

      {/* Search Interface */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Textarea
            placeholder="Search for sources related to your argument..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <Button 
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="shrink-0"
          >
            {isSearching ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Quick searches:</span>
          {suggestedSearches.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className="text-xs h-6 px-2"
              onClick={() => handleQuickSearch(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-3">
        {isSearching && (
          <div className="text-center py-4">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Searching for relevant sources...</p>
          </div>
        )}

        {sources.length === 0 && !isSearching && (
          <div className="text-center py-4 text-muted-foreground">
            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No sources found. Try a different search term.</p>
          </div>
        )}

        {sources.map((source, index) => (
          <Card key={index} className="p-3 border-l-4 border-l-blue-500">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm">{getTypeIcon(source.type)}</span>
                  <h4 className="font-medium text-sm leading-tight">{source.title}</h4>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getReliabilityColor(source.reliability)}`}
                  >
                    {source.reliability === 'high' ? <CheckCircle className="h-3 w-3 mr-1" /> : 
                     source.reliability === 'medium' ? <AlertCircle className="h-3 w-3 mr-1" /> : 
                     <AlertCircle className="h-3 w-3 mr-1" />}
                    {source.reliability}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                {source.snippet}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {source.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6 px-2"
                  onClick={() => window.open(source.url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Source
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Usage Tips */}
      {sources.length > 0 && (
        <Card className="p-3 bg-blue-50 border-blue-200">
          <div className="text-xs space-y-1">
            <p className="font-medium text-blue-900">💡 Using Sources Effectively:</p>
            <ul className="text-blue-800 space-y-0.5 ml-4">
              <li>• Reference specific data or quotes from high-reliability sources</li>
              <li>• Combine multiple sources to strengthen your argument</li>
              <li>• Always verify information from news sources with academic research</li>
              <li>• Use government data for factual claims and statistics</li>
            </ul>
          </div>
        </Card>
      )}
    </Card>
  );
};