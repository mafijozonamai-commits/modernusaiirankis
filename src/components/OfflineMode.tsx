import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  WifiOff, 
  Wifi, 
  Download, 
  Upload, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OfflineData {
  debates: any[];
  responses: any[];
  analytics: any;
  lastSync: Date;
}

interface OfflineModeProps {
  onDataSync?: (data: OfflineData) => void;
}

export const OfflineMode: React.FC<OfflineModeProps> = ({ onDataSync }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [pendingUploads, setPendingUploads] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back Online",
        description: "Connection restored. Syncing data...",
      });
      syncOfflineData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Offline Mode",
        description: "You're now offline. Data will be saved locally.",
        variant: "destructive"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline data from localStorage
    loadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineData = () => {
    try {
      const stored = localStorage.getItem('debateCoach_offlineData');
      if (stored) {
        const data = JSON.parse(stored);
        setOfflineData(data);
        setPendingUploads(data.debates?.length || 0);
      }
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  };

  const saveOfflineData = (data: Partial<OfflineData>) => {
    try {
      const currentData = offlineData || {
        debates: [],
        responses: [],
        analytics: {},
        lastSync: new Date()
      };

      const updatedData = { ...currentData, ...data, lastSync: new Date() };
      localStorage.setItem('debateCoach_offlineData', JSON.stringify(updatedData));
      setOfflineData(updatedData);
    } catch (error) {
      console.error('Failed to save offline data:', error);
      toast({
        title: "Storage Error",
        description: "Failed to save offline data",
        variant: "destructive"
      });
    }
  };

  const syncOfflineData = async () => {
    if (!isOnline || !offlineData || isSyncing) return;

    setIsSyncing(true);
    
    try {
      // Simulate API sync - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear offline data after successful sync
      localStorage.removeItem('debateCoach_offlineData');
      setOfflineData(null);
      setPendingUploads(0);
      
      onDataSync?.(offlineData);
      
      toast({
        title: "Sync Complete",
        description: "All offline data has been synchronized",
      });
    } catch (error) {
      console.error('Sync failed:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync offline data. Will retry later.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const clearOfflineData = () => {
    localStorage.removeItem('debateCoach_offlineData');
    setOfflineData(null);
    setPendingUploads(0);
    toast({
      title: "Data Cleared",
      description: "All offline data has been cleared"
    });
  };

  const downloadOfflineData = () => {
    if (!offlineData) return;

    const dataStr = JSON.stringify(offlineData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `debate-coach-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Complete",
      description: "Offline data backup downloaded"
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-600" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-600" />
          )}
          Connection Status
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Alert */}
        <Alert className={isOnline ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {isOnline ? (
              "You're connected to the internet. All features are available."
            ) : (
              "You're offline. Debates will be saved locally and synced when connection is restored."
            )}
          </AlertDescription>
        </Alert>

        {/* Offline Data Summary */}
        {offlineData && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Offline Data</h4>
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{offlineData.debates?.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Saved Debates</p>
                </div>
              </Card>
              <Card className="p-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{offlineData.responses?.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Responses</p>
                </div>
              </Card>
            </div>
            
            {offlineData.lastSync && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Last saved: {new Date(offlineData.lastSync).toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* Sync Controls */}
        {pendingUploads > 0 && (
          <Alert>
            <Upload className="h-4 w-4" />
            <AlertDescription>
              {pendingUploads} item(s) waiting to sync
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          {isOnline && pendingUploads > 0 && (
            <Button 
              onClick={syncOfflineData}
              disabled={isSyncing}
              className="flex items-center gap-2"
            >
              {isSyncing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {isSyncing ? "Syncing..." : "Sync Now"}
            </Button>
          )}
          
          {offlineData && (
            <>
              <Button 
                variant="outline" 
                onClick={downloadOfflineData}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Backup
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearOfflineData}
                className="flex items-center gap-2"
              >
                Clear Data
              </Button>
            </>
          )}
        </div>

        {/* Offline Features */}
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold mb-2">Offline Features</h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              Practice Mode Available
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              Argument Analysis
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              Local Data Storage
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3 w-3 text-orange-600" />
              AI Responses Limited
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};