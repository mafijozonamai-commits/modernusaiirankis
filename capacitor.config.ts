import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.efd59dca91ec4b13b52bb956ffed69d1',
  appName: 'echo-debate-78',
  webDir: 'dist',
  server: {
    url: 'https://efd59dca-91ec-4b13-b52b-b956ffed69d1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    }
  }
};

export default config;