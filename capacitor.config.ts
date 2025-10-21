import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gallery.photoapp',
  appName: 'Photo Gallery',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,       // duración del splash
      launchAutoHide: true,           // se oculta automáticamente al cargar la app
      backgroundColor: '#ffffffff',   // color de fondo
      androidSplashResourceName: 'splash', // nombre del recurso generado
      showSpinner: false,             // sin círculo de carga
      splashFullScreen: true,         // ocupa toda la pantalla
    }
  }
};

export default config;
