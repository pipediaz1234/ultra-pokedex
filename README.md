# ⚡ Pokédex Ultra Pro

Una **aplicación web interactiva** inspirada en el universo Pokémon, diseñada con un enfoque futurista y experiencia *gaming*.
Permite **buscar, visualizar, comparar y simular batallas** entre Pokémon en tiempo real, integrando efectos visuales dinámicos, música y animaciones para una experiencia inmersiva.

##  Descripción General

**Pokédex Ultra Pro** es un proyecto web que combina **diseño UI/UX moderno** con **funcionalidad técnica avanzada**.
Fue desarrollada utilizando **HTML5, CSS3 y JavaScript (ES6+)**, e integra la **PokeAPI** como fuente de datos para obtener información detallada de cada Pokémon.
El diseño destaca por su estética **neón futurista**, su fluidez visual y su adaptabilidad en diferentes dispositivos.

---

## ⚙️ Funcionalidades Principales

* 🔍 **Búsqueda inteligente** por nombre o número de Pokémon.
* 📊 **Visualización de estadísticas, tipos y habilidades.**
* ⚔️ **Comparación de Pokémon** con indicadores visuales de rendimiento.
* 🧠 **Simulador de batallas** con análisis de ventajas por tipo.
* 🎧 **Música y efectos** integrados mediante APIs multimedia.
* 📱 **Diseño responsive** adaptable a cualquier dispositivo.

---

## 🛠️ Tecnologías Utilizadas

| Categoría        | Herramientas                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Frontend**     | HTML5, CSS3 (Grid, Flexbox, Animaciones)                                                                         |
| **Programación** | JavaScript (ES6+, Async/Await, Fetch API)                                                                        |
| **APIs**         | [PokeAPI](https://pokeapi.co/), [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) |
| **Despliegue**   | [Netlify](https://www.netlify.com/)                                                                              |
| **Diseño UX/UI** | Paleta neón, transiciones suaves, partículas interactivas                                                        |

---

## 🎨 Diseño y Experiencia

* 🌈 **Estética futurista** con efectos neón y gradientes dinámicos.
* 🎮 Interfaz tipo videojuego con ambientación sonora y visual.
* ⚡ **Transiciones fluidas** y animaciones en tiempo real.
* 🧩 **Interacción visual** optimizada para una experiencia intuitiva.

---

## 📁 Estructura del Proyecto

```
pokedex-ultra-pro/
├── index.html          # Estructura base
├── style.css           # Estilos y animaciones
├── script.js           # Lógica de la aplicación
└── README.md           # Documentación
```

---

## 🧠 Código Destacado

```javascript
// Búsqueda dinámica de Pokémon
async function searchPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  const data = await response.json();
  displayPokemon(data);
}
```

---

## 🌐 Visualiza el Proyecto

🔗 **Demo en vivo:** [pokedex-interactivo.netlify.app](https://pokedex-interactivo.netlify.app/)

---

## 👨‍💻 Autor

**Andrés Felipe Díaz Campos**
💼 *Ingeniero de Sistemas en formación | Desarrollador Web*
📎 [GitHub](https://github.com/pipediaz1234) • [LinkedIn](https://linkedin.com/in/andres-felipe-diaz-campos-398245207)

---

## 📄 Licencia

Distribuido bajo la **Licencia MIT**.
Consulta el archivo `LICENSE` para más detalles.

---

<div align="center">

### ⚡ “Explora, compara y vive la experiencia Pokémon con estilo.” ⚡

[![Ver Demo](https://img.shields.io/badge/VER_DEMO-POKÉDEX_ULTRA_PRO-ff00de?style=for-the-badge\&logo=netlify)](https://pokedex-interactivo.netlify.app)

**⭐ Si te gusta este proyecto, apóyalo con una estrella en GitHub ⭐**

</div>
