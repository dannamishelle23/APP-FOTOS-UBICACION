# Implementacion de splash screen 

### 1. Instalar el Capacitor de Splash Screen

Se ejecuta el comando: npm install @capacitor/splash-screen

<img width="723" height="200" alt="image" src="https://github.com/user-attachments/assets/f94d5214-226e-4043-b22b-fcf83e164f13" />

Este comando instala el plugin oficial de Capacitor que maneja la pantalla de carga o inicio (el splash screen) de la aplicación creada con Ionic.

### 2. Instalar Capacitor Assets

Se ejecuta el comando: npm install @capacitor/assets --save-dev

<img width="814" height="333" alt="image" src="https://github.com/user-attachments/assets/45978760-7bb1-4bbd-8bf4-c55200ab4382" />

Esto sirve para generar automáticamente todos los tamaños de íconos y splash screen para Android e iOS a partir de las imágenes principales. 

### 3. Generar los Assets

Dentro del proyecto se crea una carpeta llamada resources/ y se agregan las imágenes (icon.png) y (splash.png)

<img width="186" height="224" alt="image" src="https://github.com/user-attachments/assets/ffdab283-b293-46ea-be06-f87f7e200e2e" />

Luego ejecutar:

npx @capacitor/assets generate

<img width="809" height="468" alt="image" src="https://github.com/user-attachments/assets/eed85066-11e4-45d5-a569-45e391d3db54" />

Esto va a generar automáticamente las versiones para Android e iOS con los tamaños correctos.

### 4. Configurar capacitor.config.ts

<img width="669" height="375" alt="image" src="https://github.com/user-attachments/assets/7f941b37-084c-4b45-b6b3-5bfbbab67722" />

Se le añaden funcionalidades como las siguientes:
- launchShowDuration: Duración del splash al iniciar la app, en milisegundos (3 segundos).
- backgroundColor: Color de fondo del splash mientras se carga la app.
- showSpinner: Decide si mostrar o no el spinner (círculo de carga) en el splash.

### 5. Configurar app.component.ts

<img width="664" height="472" alt="image" src="https://github.com/user-attachments/assets/8c54a194-0497-4ca8-a5e0-e1132df4c015" />

Las funcionalidades que se agregaron fueron las siguientes:
- showDuration: mantiene el splash visible 5 segundos.
- autoHide: Se oculta solo después de ese tiempo o cuando la app termine de cargar.

Esto permite controlar cuánto dura el splash según la carga real de la app. Es útil para mostrar animaciones o cargar datos iniciales antes de que el usuario vea la app.

### Sincronizar cambios 
Cada vez que se actualicen los assets o config ejecutar: npx cap sync para copiar íconos, splash y configuración a Android e iOS.

### Verificar los assets generados

Los assets generados (icon, splash) se guardan en las siguientes rutas:
android/app/src/main/res/mipmap-hdpi/icon.png
android/app/src/main/res/drawable/splash.png

A veces las imágenes no se generan correctamente por lo que es necesario forzar la regeneración eliminando los archivos antiguos del proyecto y volviendo a compilar la aplicación.

En la raíz del proyecto ejecutar en Windows Powershell:
- Remove-Item -Recurse -Force android\app\src\main\res\mipmap-*
- Remove-Item -Recurse -Force android\app\src\main\res\drawable-*

Y se vuelve a ejecutar: npx @capacitor/assets generate

### Configurar AndroidManifest.xml

<img width="802" height="500" alt="image" src="https://github.com/user-attachments/assets/a978f987-6bdf-436c-8a99-4174e40209b8" />

Este AndroidManifest.xml define el ícono de la app y el nombre que se muestra. 
- Aplica un tema general que incluye cómo se ve el splash screen por defecto.
- Usa un tema especial (NoActionBarLaunch) para mostrar el Splash Screen en pantalla completa.
- Mantiene la orientación y configuración de pantalla sin reiniciarse al girar el teléfono.
- Permite que el sistema Android la reconozca como “launcher” para abrir la app desde el icono.

### Funcionamiento de la aplicación
Al crear la APK con Android Studio el resultado que dio fue el siguiente:

- En los widgets, la aplicación se carga con el ícono respectivo.
![Imagen de WhatsApp 2025-10-20 a las 20 25 48_07ec16db](https://github.com/user-attachments/assets/ca4187a3-2357-4b4d-9e97-972053de1df4)

- Al abrir la app, se muestra un splash que es el fondo negro con el ícono personalizado.
![Imagen de WhatsApp 2025-10-20 a las 20 25 47_63e790d3](https://github.com/user-attachments/assets/64a10f7d-526a-48ee-8c22-cec9bcc13110)
![Imagen de WhatsApp 2025-10-20 a las 20 25 47_779a0c97](https://github.com/user-attachments/assets/a51a5395-f68b-4eb4-8499-635c0bfd227d)
