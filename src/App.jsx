import './App.css';
import { useState } from 'react';
import PokeCards from './PokeCards.jsx';

const pokemons = [
  { id: 1, name: 'Bulbasaur', type: 'Grass', hp: 45, attack: 49 },
  { id: 4, name: 'Charmander', type: 'Fire', hp: 39, attack: 52 },
  { id: 7, name: 'Squirtle', type: 'Water', hp: 44, attack: 48 },
  { id: 25, name: 'Pikachu', type: 'Electric', hp: 35, attack: 55 },
  { id: 6, name: 'Charizard', type: 'Fire', hp: 78, attack: 84 },
  { id: 9, name: 'Blastoise', type: 'Water', hp: 79, attack: 83 },
  { id: 3, name: 'Venusaur', type: 'Grass', hp: 80, attack: 82 },
  { id: 150, name: 'Mewtwo', type: 'Psychic', hp: 106, attack: 110 },
  { id: 39, name: 'Jigglypuff', type: 'Normal', hp: 115, attack: 45 },
  { id: 143, name: 'Snorlax', type: 'Normal', hp: 160, attack: 110 },
  { id: 94, name: 'Gengar', type: 'Ghost', hp: 60, attack: 65 },
  { id: 131, name: 'Lapras', type: 'Water', hp: 130, attack: 85 },
  { id: 133, name: 'Eevee', type: 'Normal', hp: 55, attack: 55 },
  { id: 149, name: 'Dragonite', type: 'Dragon', hp: 91, attack: 134 },
  { id: 59, name: 'Arcanine', type: 'Fire', hp: 90, attack: 110 },
  { id: 65, name: 'Alakazam', type: 'Psychic', hp: 55, attack: 50 },
  { id: 68, name: 'Machamp', type: 'Fighting', hp: 90, attack: 130 },
  { id: 76, name: 'Golem', type: 'Rock', hp: 80, attack: 120 },
  { id: 130, name: 'Gyarados', type: 'Water', hp: 95, attack: 125 },
  { id: 148, name: 'Dragonair', type: 'Dragon', hp: 61, attack: 84 },
];

const pokemonTypeColors = {
  Grass: '#7AC74C',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#F7D02C',
  Psychic: '#F95587',
  Normal: '#A8A77A',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Fighting: '#C22E28',
  Rock: '#B6A136',
};

// Sprite image URL pattern:
// `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

function App() {
  const [activeType, setActiveType] = useState(null);
  const visiblePokemons = activeType
    ? pokemons.filter((pokemon) => pokemon.type === activeType)
    : pokemons;
  const pokemonTypes = Object.keys(pokemonTypeColors);

  return (
    <div>
      <h1>Pokemon</h1>

      <div className="pokemon-layout">
        <aside className="type-selector" aria-label="Filter by Pokémon type">
          {pokemonTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={activeType === type ? 'active' : ''}
              style={{ '--button-type-color': pokemonTypeColors[type] }}
              onClick={() =>
                setActiveType((currentType) =>
                  currentType === type ? null : type,
                )
              }
            >
              {type}
            </button>
          ))}
        </aside>

        <div className="pokemon-grid">
          {visiblePokemons.map((pokemon) => (
            <PokeCards
              key={pokemon.id}
              name={pokemon.name}
              color={pokemonTypeColors[pokemon.type]}
              hp={pokemon.hp}
              attack={pokemon.attack}
              onClick={() =>
                setActiveType((currentType) =>
                  currentType === pokemon.type ? null : pokemon.type,
                )
              }
              image={
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
