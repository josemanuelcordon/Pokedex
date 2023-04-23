//Pokemon wrapper
const pokemonContainer = document.querySelector('.pokemon-container')
//Botones cambio de generación
const botonGeneracion = document.querySelectorAll('.boton-generacion')
//Buscador de pokemons
const buscador = document.getElementById('buscador')
//El spinner no se va a ver a no ser que haya problemas al fetchewar los datos
const spinner = document.querySelector("#spinner")
//Objeto colores-tipos pokemon
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

//Timeout que permite fetchear todos los datos
/*setTimeout(() => {
    spinner.style.display = "none"
    buscador.style.display = "block"
},15000)*/

async function fetchPokemon(id) {
    buscador.style.display = "none"
    spinner.style.display = "block"
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data)
        console.log(data)
    })
    buscador.style.display = "block"
    spinner.style.display = "none"
}

async function fetchPokemons(number) {
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
    cardBack.appendChild(progressBars(pokemon.stats))

    let tipo1, tipo2
    if (pokemon.types.length > 1) {
        tipo1 = pokemon.types[0].type.name
        tipo2 = pokemon.types[1].type.name
        const color1 = colores[tipo1]
        const color2 = colores[tipo2]
        card.style.background = `linear-gradient(${color1}, ${color2})`
        cardBack.style.background = `linear-gradient(${color1}, ${color2})`
        
    } else {
        tipo1 = pokemon.types[0].type.name
        card.style.backgroundColor = colores[tipo1]
        cardBack.style.backgroundColor = colores[tipo1]
    }

    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)
    pokemonContainer.appendChild(flipcard)
}
fetchPokemons(151)

function progressBars(stats) {
    //100 px de barra
    const statsContainer = document.createElement('div')
    statsContainer.classList.add('pokemon-block2');
    for (let i = 0; i < 3; i++) {
        const stat = stats[i];
        const statPercentWidth = ((stat.base_stat * 100)/255) + "%"

        const statContainer = document.createElement('div')
        statContainer.classList.add("stat-container")
        
        const statName = document.createElement("div")
        statName.textContent = stat.stat.name.toUpperCase()

        const progressContainer = document.createElement("div")
        progressContainer.classList.add("progress-bar-container")

        const progressBar = document.createElement("div")
        progressBar.classList.add("progress_bar")

        progressContainer.appendChild(progressBar)
        progressBar.style.width = `${statPercentWidth}`

        
        statContainer.appendChild(statName)
        statContainer.appendChild(progressContainer)
        statsContainer.appendChild(statContainer)
    }
    return statsContainer
}

//statContainer -> malla grid
//statName -> nombre stat
//progressContainer -> Contenedor de la barra
//progressBar

document.addEventListener('keyup', e => {
    const pokemon_container = document.querySelectorAll(".flip-card")
    const nombres_pokemon = document.querySelectorAll('.name')
    if (e.target.matches("#buscador")) {
            esconderPokemons(e)
        }   
    })


function esconderPokemons(event) {
     const pokemon_container = document.querySelectorAll(".flip-card")
    const nombres_pokemon = document.querySelectorAll('.name')
    for( let i = 0; i < pokemon_container.length; i++ ) {
        let nombrePokemon = nombres_pokemon[i]
        let contenedorPokemon = pokemon_container[i]
        if (nombrePokemon.textContent.toLowerCase().includes(event.target.value.toLowerCase())) {
            contenedorPokemon.classList.remove("filtro")
        } else {
            contenedorPokemon.classList.add("filtro")
        }
    }
}