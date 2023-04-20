//Pokemon wrapper
const pokemonContainer = document.querySelector('.pokemon-container')
//Botones cambio de generación
const botonGeneracion = document.querySelectorAll('.boton-generacion')
//Buscador de pokemons
const buscador = document.getElementById('buscador')
//El spinner no se va a ver a no ser que haya problemas al fetchewar los datos
const spinner = document.querySelector("#spinner")
//Objeto colo
const colores = {
    fire: '#F05030',
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
console.log(typeof(colores))

async function fetchPokemon(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data)
        spinner.style.display = "none"
    })
}

async function fetchPokemons(number) {
    spinner.style.display = "block"
    for (let i = 1; i <= number; i++) {
        await fetchPokemon(i)
    }
}

function createPokemon(pokemon) {
    const flipcard = document.createElement('div')
    flipcard.classList.add("flip-card")

    const cardContainer = document.createElement('div')
    cardContainer.classList.add("card-container")

    flipcard.appendChild(cardContainer)

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

    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemon-block-back')
    cardBack.textContent = pokemon.name//prueba

    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)
    pokemonContainer.appendChild(flipcard)
}
fetchPokemons(780)




document.addEventListener('keyup', e => {
    if (e.target.matches("#buscador")) {
        let contador = 0
        const nombres_pokemon = document.querySelectorAll('.name')
        const pokemon_container = document.querySelectorAll(".flip-card")
        console.log(pokemon_container.length)
        nombres_pokemon.forEach(pokemon => {
            if (pokemon.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                pokemon_container[contador].classList.remove("filtro")
            }
            else {
                pokemon_container[contador].classList.add("filtro")
            }
            contador++
        })   
    }
})
