# Implementacion de una APK de fotos + ubicación donde fue tomada 

### 1. Instalar el Capacitor de Geolocalización

Se instala con el siguiente comando: npm install @capacitor/geolocation

![alt text](image.png)

### 2. Modificar location.ts

Este módulo se encargará de todo lo relacionado con el GPS.

1. Primero, verifica si la aplicación tiene permiso para acceder a la ubicación y, si no los tiene, los pide.
2. Obtiene la posición GPS exacta en un momento específico.
3. Informa de cualquier cambio en la posición (útil para navegación en tiempo real).
4. Detiene el seguimiento cuando ya no es necesario. 

#### Código

![alt text](image-1.png)

