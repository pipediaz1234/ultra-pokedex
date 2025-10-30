// Variables globales
const input = document.getElementById('pokemon-name');
const searchBtn = document.getElementById('search-btn');
const pokemonInfo = document.getElementById('pokemon-info');
const loading = document.getElementById('loading');
const comparisonSection = document.getElementById('comparison-section');
const addToCompareBtn = document.getElementById('add-to-compare');
const clearComparisonBtn = document.getElementById('clear-comparison');
const battleBtn = document.getElementById('battle-btn');
const battleResult = document.getElementById('battle-result');
const musicBanner = document.getElementById('music-banner');

// Variables para comparación
let pokemon1 = null;
let pokemon2 = null;
let currentPokemon = null;

const MAX_STAT = 255;

const statNames = {
  'hp': 'HP',
  'attack': 'ATTACK',
  'defense': 'DEFENSE',
  'special-attack': 'SP. ATK',
  'special-defense': 'SP. DEF',
  'speed': 'SPEED'
};

const popularPokemon = [
  'pikachu', 'charizard', 'mewtwo', 'lucario', 'greninja', 
  'garchomp', 'dragonite', 'tyranitar', 'blaziken', 'gengar',
  'rayquaza', 'gyarados', 'umbreon', 'alakazam', 'machamp'
];

// Configuración de audio con YouTube
let musicEnabled = false;
let soundEnabled = true;
let audioInitialized = false;
let youtubePlayer = null;

// Inicializar el reproductor de YouTube
function onYouTubeIframeAPIReady() {
  youtubePlayer = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: 'UtAdtH2QBeY', // ID del video de YouTube
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'disablekb': 1,
      'enablejsapi': 1,
      'fs': 0,
      'iv_load_policy': 3,
      'loop': 1,
      'modestbranding': 1,
      'playsinline': 1,
      'rel': 0,
      'showinfo': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log("Reproductor de YouTube listo");
  // El reproductor está listo, pero no reproducimos hasta que el usuario interactúe
}

function onPlayerStateChange(event) {
  // Manejar cambios de estado del reproductor si es necesario
}

// Función para inicializar audio después de interacción del usuario
function initializeAudio() {
  if (audioInitialized) return;
  
  audioInitialized = true;
  musicEnabled = true;
  
  // Ocultar banner
  musicBanner.style.display = 'none';
  
  // Reproducir música
  playMusic();
  
  // Actualizar botón de música
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.textContent = '🎵';
  }
}

// Función para reproducir música de YouTube
function playMusic() {
  if (!musicEnabled || !audioInitialized || !youtubePlayer) return;
  
  try {
    youtubePlayer.playVideo();
    console.log("Reproduciendo música de YouTube");
  } catch (error) {
    console.log("Error reproduciendo YouTube:", error);
    // Si hay error, intentar de nuevo después de un tiempo
    setTimeout(playMusic, 1000);
  }
}

// Función para pausar música de YouTube
function pauseMusic() {
  if (!youtubePlayer) return;
  
  try {
    youtubePlayer.pauseVideo();
  } catch (error) {
    console.log("Error pausando YouTube:", error);
  }
}

// Inicializar controles de audio
document.addEventListener('DOMContentLoaded', function() {
  const musicToggle = document.getElementById('music-toggle');
  const soundToggle = document.getElementById('sound-toggle');
  
  // Configurar banner de música
  musicBanner.addEventListener('click', initializeAudio);
  
  // Configurar botón de búsqueda para inicializar audio
  searchBtn.addEventListener('click', function() {
    if (!audioInitialized) {
      initializeAudio();
    }
  });
  
  // Configurar botón de música
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (!audioInitialized) {
        initializeAudio();
        return;
      }
      
      musicEnabled = !musicEnabled;
      if (musicEnabled) {
        playMusic();
        musicToggle.textContent = '🎵';
      } else {
        pauseMusic();
        musicToggle.textContent = '🔇';
      }
    });
  }

  // Configurar botón de sonido
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
    });
  }

  // Inicializar audio con cualquier clic en la página
  document.addEventListener('click', function initAudioOnClick() {
    if (!audioInitialized) {
      initializeAudio();
    }
  });
  
  // También inicializar audio con cualquier tecla presionada
  document.addEventListener('keydown', function initAudioOnKey() {
    if (!audioInitialized) {
      initializeAudio();
    }
  });
});

function playSound(type) {
  if (!soundEnabled) return;
  
  // Crear sonidos simples usando Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch(type) {
    case 'click':
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
      break;
    case 'battle':
      oscillator.frequency.value = 300;
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      break;
    case 'victory':
      // Melodía de victoria
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do alto
      notes.forEach((freq, index) => {
        setTimeout(() => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.3, audioContext.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
          osc.start(audioContext.currentTime);
          osc.stop(audioContext.currentTime + 0.3);
        }, index * 200);
      });
      break;
    case 'pokemon':
      oscillator.frequency.value = 600;
      oscillator.type = 'triangle';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
  }
}

function showLoading(show) {
  if (show) {
    loading.classList.add('active');
  } else {
    loading.classList.remove('active');
  }
}

function showError(message) {
  pokemonInfo.innerHTML = `
    <div class="error-box">
      <h3>⚠️ ERROR</h3>
      <p>${message}</p>
    </div>
  `;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatName(name) {
  return name.split('-').map(capitalizeFirst).join(' ');
}

async function searchPokemon(name) {
  if (!name.trim()) {
    showError('Por favor, ingresa el nombre de un Pokémon');
    return;
  }

  showLoading(true);
  playSound('click');

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('¡Pokémon no encontrado! Verifica el nombre e intenta de nuevo.');
      }
      throw new Error('Error al conectar con el servidor. Intenta más tarde.');
    }

    const data = await response.json();
    currentPokemon = data;
    displayPokemon(data);
    playSound('pokemon');
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

function displayPokemon(data) {
  const types = data.types.map(t => `
    <div class="type-chip type-${t.type.name}">
      ${capitalizeFirst(t.type.name)}
    </div>
  `).join('');

  const abilities = data.abilities.map(a => `
    <div class="ability-tag">
      ${formatName(a.ability.name)}
    </div>
  `).join('');

  const stats = data.stats.map(s => {
    const percentage = Math.min((s.base_stat / MAX_STAT) * 100, 100);
    const statClass = s.stat.name.replace('special-', 'special-');
    return `
      <div class="stat-bar-row">
        <div class="stat-name">${statNames[s.stat.name] || s.stat.name}</div>
        <div class="stat-bar-bg">
          <div class="stat-bar-fill stat-${statClass}" style="width: ${percentage}%"></div>
        </div>
        <div class="stat-number">${s.base_stat}</div>
      </div>
    `;
  }).join('');

  const sprite = data.sprites.other?.['official-artwork']?.front_default || 
                 data.sprites.other?.dream_world?.front_default ||
                 data.sprites.front_default || 
                 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

  const totalStats = data.stats.reduce((sum, s) => sum + s.base_stat, 0);

  pokemonInfo.innerHTML = `
    <div class="pokemon-card">
      <div class="card-grid">
        <div class="sprite-zone">
          <div class="sprite-display">
            <img src="${sprite}" alt="${data.name}" class="pokemon-sprite" />
          </div>
          <div class="pokemon-number">#${String(data.id).padStart(4, '0')}</div>
        </div>
        
        <div class="info-zone">
          <h2 class="pokemon-title">${formatName(data.name)}</h2>
          
          <div class="quick-stats">
            <div class="stat-badge">
              <div class="stat-label">Altura</div>
              <div class="stat-data">${(data.height / 10).toFixed(1)}m</div>
            </div>
            <div class="stat-badge">
              <div class="stat-label">Peso</div>
              <div class="stat-data">${(data.weight / 10).toFixed(1)}kg</div>
            </div>
            <div class="stat-badge">
              <div class="stat-label">EXP Base</div>
              <div class="stat-data">${data.base_experience || 'N/A'}</div>
            </div>
            <div class="stat-badge">
              <div class="stat-label">Total</div>
              <div class="stat-data">${totalStats}</div>
            </div>
          </div>

          <div>
            <div class="section-header">TIPOS</div>
            <div class="types-grid">${types}</div>
          </div>

          <div class="abilities-container">
            <div class="section-header">HABILIDADES</div>
            <div class="abilities-list">${abilities}</div>
          </div>

          <div>
            <div class="section-header">ESTADÍSTICAS</div>
            <div class="stats-container">${stats}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Trigger animation
  setTimeout(() => {
    const bars = document.querySelectorAll('.stat-bar-fill');
    bars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }, 100);
}

// Funciones para comparación
function addToComparison() {
  if (!currentPokemon) {
    alert('Primero busca un Pokémon para agregarlo a la comparación');
    return;
  }

  playSound('click');

  if (!pokemon1) {
    pokemon1 = currentPokemon;
    updateComparisonCard('pokemon1', pokemon1);
  } else if (!pokemon2) {
    pokemon2 = currentPokemon;
    updateComparisonCard('pokemon2', pokemon2);
    battleBtn.disabled = false;
  } else {
    alert('Ya tienes dos Pokémon en comparación. Limpia la comparación para agregar nuevos.');
    return;
  }

  comparisonSection.style.display = 'block';
  addToCompareBtn.disabled = (pokemon1 && pokemon2);
}

function updateComparisonCard(cardId, pokemon) {
  const card = document.getElementById(`${cardId}-card`);
  const name = document.getElementById(`${cardId}-name`);
  const number = document.getElementById(`${cardId}-number`);
  const sprite = document.getElementById(`${cardId}-sprite`);
  const stats = document.getElementById(`${cardId}-stats`);

  name.textContent = formatName(pokemon.name);
  number.textContent = `#${String(pokemon.id).padStart(4, '0')}`;
  
  const spriteUrl = pokemon.sprites.other?.['official-artwork']?.front_default || 
                    pokemon.sprites.other?.dream_world?.front_default ||
                    pokemon.sprites.front_default || 
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  sprite.src = spriteUrl;

  // Calcular estadísticas clave
  const hp = pokemon.stats.find(s => s.stat.name === 'hp').base_stat;
  const attack = pokemon.stats.find(s => s.stat.name === 'attack').base_stat;
  const defense = pokemon.stats.find(s => s.stat.name === 'defense').base_stat;
  const spAttack = pokemon.stats.find(s => s.stat.name === 'special-attack').base_stat;
  const spDefense = pokemon.stats.find(s => s.stat.name === 'special-defense').base_stat;
  const speed = pokemon.stats.find(s => s.stat.name === 'speed').base_stat;
  const total = hp + attack + defense + spAttack + spDefense + speed;

  stats.innerHTML = `
    <div class="comparison-stat">
      <div class="stat-label">HP</div>
      <div class="stat-value">${hp}</div>
    </div>
    <div class="comparison-stat">
      <div class="stat-label">ATK</div>
      <div class="stat-value">${attack}</div>
    </div>
    <div class="comparison-stat">
      <div class="stat-label">DEF</div>
      <div class="stat-value">${defense}</div>
    </div>
    <div class="comparison-stat">
      <div class="stat-label">SP.ATK</div>
      <div class="stat-value">${spAttack}</div>
    </div>
    <div class="comparison-stat">
      <div class="stat-label">SP.DEF</div>
      <div class="stat-value">${spDefense}</div>
    </div>
    <div class="comparison-stat">
      <div class="stat-label">VEL</div>
      <div class="stat-value">${speed}</div>
    </div>
    <div class="comparison-stat" style="grid-column: span 3;">
      <div class="stat-label">TOTAL</div>
      <div class="stat-value">${total}</div>
    </div>
  `;
}

function clearComparison() {
  playSound('click');
  pokemon1 = null;
  pokemon2 = null;
  comparisonSection.style.display = 'none';
  battleResult.style.display = 'none';
  addToCompareBtn.disabled = false;
  battleBtn.disabled = true;
  
  // Remover efecto de ganador
  document.getElementById('pokemon1-card').classList.remove('winner');
  document.getElementById('pokemon2-card').classList.remove('winner');
}

function simulateBattle() {
  if (!pokemon1 || !pokemon2) {
    alert('Necesitas dos Pokémon para simular una batalla');
    return;
  }

  playSound('battle');

  // Calcular puntuación de batalla (simplificado)
  const pokemon1Score = calculateBattleScore(pokemon1);
  const pokemon2Score = calculateBattleScore(pokemon2);

  let winner, loser, winnerCard, loserCard;
  
  if (pokemon1Score > pokemon2Score) {
    winner = pokemon1;
    loser = pokemon2;
    winnerCard = document.getElementById('pokemon1-card');
    loserCard = document.getElementById('pokemon2-card');
  } else if (pokemon2Score > pokemon1Score) {
    winner = pokemon2;
    loser = pokemon1;
    winnerCard = document.getElementById('pokemon2-card');
    loserCard = document.getElementById('pokemon1-card');
  } else {
    // Empate
    battleResult.innerHTML = `
      <div class="battle-result">
        <h3>⚔️ ¡EMPATE! ⚔️</h3>
        <p>${formatName(pokemon1.name)} y ${formatName(pokemon2.name)} son igual de fuertes</p>
      </div>
    `;
    battleResult.style.display = 'block';
    return;
  }

  // Aplicar efectos visuales
  winnerCard.classList.add('winner');
  loserCard.classList.remove('winner');

  // Mostrar resultado
  battleResult.innerHTML = `
    <div class="battle-result">
      <h3>🏆 ¡GANADOR! 🏆</h3>
      <p>${formatName(winner.name)} vence a ${formatName(loser.name)}</p>
      <p style="margin-top: 15px; font-size: 1.2rem;">
        Puntuación: ${Math.max(pokemon1Score, pokemon2Score)} vs ${Math.min(pokemon1Score, pokemon2Score)}
      </p>
    </div>
  `;
  battleResult.style.display = 'block';

  playSound('victory');
}

function calculateBattleScore(pokemon) {
  // Puntuación basada en estadísticas y tipos
  let score = 0;
  
  // Sumar estadísticas base
  pokemon.stats.forEach(stat => {
    score += stat.base_stat;
  });
  
  // Bonus por tipos (simplificado)
  pokemon.types.forEach(type => {
    // Tipos considerados "fuertes" reciben bonus
    const strongTypes = ['dragon', 'psychic', 'legendary', 'mythical'];
    if (strongTypes.some(t => type.type.name.includes(t))) {
      score += 20;
    }
  });
  
  return score;
}

// Event Listeners
searchBtn.addEventListener('click', () => {
  searchPokemon(input.value);
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchPokemon(input.value);
  }
});

addToCompareBtn.addEventListener('click', addToComparison);
clearComparisonBtn.addEventListener('click', clearComparison);
battleBtn.addEventListener('click', simulateBattle);

// Focus effect con sugerencias
input.addEventListener('focus', () => {
  if (!input.value) {
    const random = popularPokemon[Math.floor(Math.random() * popularPokemon.length)];
    input.placeholder = `Intenta buscar: ${random}...`;
  }
});

input.addEventListener('blur', () => {
  input.placeholder = 'Escribe el nombre del Pokémon...';
});

// Button effects
searchBtn.addEventListener('mousedown', () => {
  searchBtn.style.transform = 'scale(0.95)';
});

searchBtn.addEventListener('mouseup', () => {
  searchBtn.style.transform = '';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    input.focus();
    input.select();
  }
  
  // Easter egg: Press R for random Pokemon
  if (e.key === 'r' && document.activeElement !== input) {
    const randomId = Math.floor(Math.random() * 898) + 1;
    searchPokemon(randomId.toString());
  }
  
  // Atajo para agregar a comparación
  if (e.key === 'c' && currentPokemon) {
    addToComparison();
  }
});

// Efecto hover en las pokebolas del header
document.querySelectorAll('.pokeball-logo').forEach(logo => {
  logo.addEventListener('click', () => {
    const randomPokemon = popularPokemon[Math.floor(Math.random() * popularPokemon.length)];
    input.value = randomPokemon;
    searchPokemon(randomPokemon);
  });
});

// Mensaje de bienvenida
console.log('%c🎮 POKÉDEX ULTRA PRO 🎮', 'font-size: 30px; color: #ff00de; font-weight: bold; text-shadow: 0 0 10px #00d4ff;');
console.log('%cPresiona R para un Pokémon aleatorio!', 'font-size: 16px; color: #00d4ff;');
console.log('%cCtrl+K para enfocar la búsqueda', 'font-size: 16px; color: #00d4ff;');
console.log('%cPresiona C para agregar a comparación', 'font-size: 16px; color: #ff00de;');
console.log('%cHaz clic en las Pokéballs para sorpresas!', 'font-size: 16px; color: #ff00de;');