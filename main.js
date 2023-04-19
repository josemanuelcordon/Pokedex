const pokemonContainer = document.querySelector('.pokemon-container')
const botonGeneracion = document.querySelectorAll('.boton-generacion')
const buscador = document.getElementById('buscador')
const colores = {
    fire: '#A8A8C0',
    grass: '#78C850',
    poison: '#B058A0',
    normal: '#A8A090',
    water: '#3899F8',
    bug: '#A8B820',
    ground: '#E9D6A4',
    electric: '#F8D030',
    flying: '#98A8F0',
    rock: '#B8A058',
    ghost: '#6060B0',
    ice: '#58C8E0',
    psychic: '#F870A0',
    fighting: '	#A05038',
    fairy: '#E79FE7',
    dragon: '#7860E0',
    dark: '#7A5848',
    steel: '#A8A8C0'
}
//steel
async function fetchPokemon(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => createPokemon(data))
}

async function fetchPokemons(number) {
    for (let i = 1; i <= number; i++) {
        await fetchPokemon(i)
    }
}

function createPokemon(pokemon) {
    const card = document.createElement('div')
    card.classList.add('pokemon-block');
    
    let tipo1, tipo2
    if (pokemon.types.length > 1) {
        tipo1 = pokemon.types[0].type.name
        tipo2 = pokemon.types[1].type.name
        const color1 = colores[tipo1]
        const color2 = colores[tipo2]
        card.style.background = `linear-gradient(${color1}, ${color2})`
    } else {
        tipo1 = pokemon.types[0].type.name
        card.style.backgroundColor = colores[tipo1]
    }
    

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container')

    const sprite = document.createElement('img')
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite)

    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p')
    name.classList.add('name')
    name.textContent = pokemon.name

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)

    pokemonContainer.appendChild(card)
}
fetchPokemons(780)

//name -> etiqueta del nombre del pokemon



document.addEventListener('keyup', e => {
    if (e.target.matches("#buscador")) {
        const nombres_pokemon = document.querySelectorAll('.name')
        const pokemon_container = document.querySelectorAll("pokemon-block")
        nombres_pokemon.forEach(pokemon => {
            console.log(pokemon.textContent.toLowerCase())
            pokemon.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?pokemon.parentElement.classList.remove("filtro")
            :pokemon.parentElement.classList.add("filtro")
        })
            
            
        
    }
})
