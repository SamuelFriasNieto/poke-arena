# PokeArena

Una aplicación en React para construir equipos de Pokémon y simular batallas usando la PokeAPI.

**Live Demo**: [Poke-Arena Web](https://poke-arena-pink.vercel.app/)


### Versiones utilizadas

- **Node.js**: v18
- **npm**: v9

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/SamuelFriasNieto/poke-arena.git
cd poke-arena
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Stack Tecnológico

### Gestión de Estado y Fetching de Datos

- **Zustand** - Gestion de estado global
- **TanStack Query** - gestion de estado asyncrono

### UI e Drag and Drop

- **@dnd-kit** - Funcionalidad de arrastrar y soltar
- **React Icons** - Librería de iconos
- **React Toastify** - Notificaciones toast
- **TailwindCSS** - Estilos

### Testing

- **Jest** - Framework de testing
- **React Testing Library** - Utilidades para testing de componentes

## Estructura del Proyecto

```
src/
├── __tests__
├── api/                    # Capa API - Instancias de Axios y endpoints
│   └── pokemonApi.js
│
├── components/             # Componentes compartidos/globales
│   ├── ui/                # Primitivas UI reutilizables (shadcn)
│   ├── NavBar.jsx
│   └── AppAlertDialog.jsx
│
├── config/                 # Archivos de configuración y constantes
│   └── pokemons.config.js # Tipos, colores y stats de Pokémon
│
├── features/              # Módulos basados en features
│   ├── team-builder/     # Feature de construcción de equipos
│   │   ├── components/   # Componentes específicos del feature
│   │   ├── hooks/        # Custom hooks específicos del feature
│   │   └── TeamBuilder.jsx
│   │
│   └── battle/           # Feature de simulación de batallas
│       ├── components/
│       └── Battle.jsx
│
├── hooks/                 # Custom hooks compartidos
│   ├── useDebounce.js
│   └── usePokemon.js     # Hooks para fetching de datos de Pokémon
│
├── lib/                   # Funciones de utilidad puras
│   ├── battleLogic.js    # Lógica de simulación de batallas
│   └── utils.js          # Utilidades generales
│
├── store/                 # Estado global de Zustand
│   └── useTeamStore.js   # Store de gestión de equipos
│
└── App.jsx               
```

## Funcionalidades

### Constructor de Equipos
- Buscar y filtrar Pokémon por nombre y tipo
- Añadir hasta 6 Pokémon por equipo
- Arrastrar y soltar para reordenar el equipo
- Ordenar equipo por estadísticas (HP, Ataque, Defensa, Velocidad) o aleatoriamente
- Guardar y editar equipos
- Almacenamiento persistente usando el middleware persist de Zustand

### Arena de Batalla
- Seleccionar dos equipos guardados para el combate
- Resultados de batalla con desglose de rondas
- Editar o eliminar equipos desde la pantalla de batalla

### Responsive
- La web es totalmente responsive y está optimizada para dispositivos móviles

### Siguientes pasos
- Hacer que el resultado de la batalla no sea directo, si no con control de turnos
- Añadir multiidioma con i18n
