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

let img_container

//Función asíncrona de fetcheo de un pokemon por su id
async function fetchPokemon(id) {
    //ocultamos el buscador y mostramos el spinner cada vez que fetchea un pokemon
    buscador.style.display = "none"
    spinner.style.display = "block"
    //fetcheamos la url con la id pasada como parámetro, la respuesta la convertimos a un json, y por cada objeto del json creamos un pokemon
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data)
    })
    //ocultamos el spinner y mostramos el buscador cuando acaba de fetchear un pokemon,
    //de forma que cuando fetchee el último pokemon el buscador quedará visible.
    buscador.style.display = "block"
    spinner.style.display = "none"
}

//función asíncrona que fetchea un número de pokemon pasado como parámetro
async function fetchPokemons(number) {
    for (let i = 1; i <= number; i++) {
        await fetchPokemon(i)
    }
    img_container = document.querySelectorAll(".img-container")
}

//función que crea un pokemon por cada objeto json pasado como parámetro
function createPokemon(pokemon) {
    //por cada objeto del json creamos un div que será el contenedor de nuestro pokemon (tanto parte de atrás como parte de delante)
    const flipcard = document.createElement('div')
    flipcard.classList.add("flip-card")

    //Es lo mismo que flipcard, la única utilidad que nos da esque el hover lo haremos sobre la flipcard y le afectará a este contenedor
    //ya que al rotarse hay un punto en el que la tarjeta deja de poder ser tarjeteada, poir lo que necesitamos dos contenedores iguales, uno dentro del otro
    const cardContainer = document.createElement('div')
    cardContainer.classList.add("card-container")
    flipcard.appendChild(cardContainer)
    

    //Esta es la parte delantera de nuestra tarjeta
    const card = document.createElement('div')
    card.classList.add('pokemon-block');
    card.addEventListener("click", () => {
        cardContainer.style.transform = "rotateY(180deg)"
    })

    //Contenedor que contendrá la imagen del pokemon
    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container')

    //Imagen del pokemon
    const sprite = document.createElement('img')
    sprite.classList.add('img-pokemon')
    sprite.src = pokemon.sprites.front_default
    spriteContainer.appendChild(sprite)
    sprite.addEventListener("mouseover", () => {
        sprite.src = pokemon.sprites.front_shiny
    })
    sprite.addEventListener("mouseleave", () => {
        sprite.src = pokemon.sprites.front_default
    })

    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p')
    name.classList.add('name')
    name.textContent = pokemon.name

    //En la parte frontal irán el contenedor de la imagen (con la imagen), el número, y el nombre del pokemon
    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)

    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemon-block-back')
    cardBack.appendChild(progressBars(pokemon.stats))
    cardBack.addEventListener("click", () => {
        cardContainer.style.transform = ""
    })

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
fetchPokemons(1000)

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

buscador.addEventListener('keyup', e => {
    const pokemon_container = document.querySelectorAll(".flip-card")
    const nombres_pokemon = document.querySelectorAll('.name')
    esconderPokemons(e)
})


function esconderPokemons(event) {
     const pokemon_container = document.querySelectorAll(".flip-card")
    const nombres_pokemon = document.querySelectorAll('.name')
    for( let i = 0 ; i < pokemon_container.length ; i++ ) {
        let nombrePokemon = nombres_pokemon[i]
        let contenedorPokemon = pokemon_container[i]
        if (nombrePokemon.textContent.toLowerCase().includes(buscador.value.toLowerCase())) {
            contenedorPokemon.classList.remove("filtro")
        } else {
            contenedorPokemon.classList.add("filtro")
        }
    }
}


