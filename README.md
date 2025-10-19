## Implementacion de splash screen 

# 1. Instalar el Capacitor de Splash Screen

Se ejecuta el comando: npm install @capacitor/splash-screen

<img width="723" height="200" alt="image" src="https://github.com/user-attachments/assets/f94d5214-226e-4043-b22b-fcf83e164f13" />

Este comando instala el plugin oficial de Capacitor que maneja la pantalla de carga o inicio (el splash screen) de la aplicación creada con Ionic.

# 2. Instalar Capacitor Assets

Se ejecuta el comando: npm install @capacitor/assets --save-dev

<img width="814" height="333" alt="image" src="https://github.com/user-attachments/assets/45978760-7bb1-4bbd-8bf4-c55200ab4382" />

Esto sirve para generar automáticamente todos los tamaños de íconos y splash screen para Android e iOS a partir de las imágenes principales. 

# 3. Generar los Assets

Dentro del proyecto se crea una carpeta llamada resources/ y se agregan las imágenes (icon.png) y (splash.png)

<img width="186" height="224" alt="image" src="https://github.com/user-attachments/assets/ffdab283-b293-46ea-be06-f87f7e200e2e" />

Luego ejecutar:

npx @capacitor/assets generate

<img width="809" height="468" alt="image" src="https://github.com/user-attachments/assets/eed85066-11e4-45d5-a569-45e391d3db54" />

Esto va a generar automáticamente las versiones para Android e iOS con los tamaños correctos.

# 4. Configurar capacitor.config.ts

<img width="726" height="443" alt="image" src="https://github.com/user-attachments/assets/6db0d542-758e-4082-9555-e89bf34fcc1a" />

Se le añaden funcionalidades como las siguientes:
- launchShowDuration: Duración del splash al iniciar la app, en milisegundos (3 segundos).
- backgroundColor: Color de fondo del splash mientras se carga la app.
- showSpinner: Decide si mostrar o no el spinner (círculo de carga) en el splash.
