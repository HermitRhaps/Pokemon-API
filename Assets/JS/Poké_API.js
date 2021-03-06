const api_url = "https://pokeapi.co/api/v2/pokemon?limit=151";
var table = document.querySelector(".table");
var pagination = document.querySelector(".pagination");

(async function api_connect() {
  let connect_request = await fetch(api_url);
  let connect_output = await connect_request.json();
  let pokemons = [];

  for (let i = 0; i < connect_output.results.length; i++) {
    let pokemon_request = await fetch(connect_output.results[i].url);
    let pokemon_output = await pokemon_request.json();

    let pokemon_types = [];
    let pokemon_abilities = [];
    let pokemon_stats = [];

    pokemon_output.types.forEach(types => {
      pokemon_types.push(types.type.name);
    });

    pokemon_output.abilities.forEach(abilities => {
      pokemon_abilities.push(abilities.ability.name);
    });

    pokemon_output.stats.forEach(stats => {
      pokemon_stats.push(stats.base_stat + " " + stats.stat.name);
    });

    let pokemon = {
      id: pokemon_output.id,
      name: pokemon_output.name,
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
        pokemon_output.id +
        ".png",
      types: pokemon_types,
      abilities: pokemon_abilities,
      stats: pokemon_stats,
      weight: pokemon_output.weight,
      height: pokemon_output.height
    };

    pokemons.push(pokemon);
  }

  draw_table(pokemons);
})();

function draw_table(pokemons) {
  for (let i = 0; i < pokemons.length; i++) {
    table.innerHTML +=
      "<tbody>" +
      "<tr>" +
      "<td>" +
      pokemons[i].id +
      "</td>" +
      "<td>" +
      pokemons[i].name +
      "</td>" +
      "<td>" +
      '<img src="' +
      pokemons[i].sprite +
      '"/>' +
      "</td>" +
      "<td>" +
      pokemons[i].abilities +
      "</td>" +
      "<td>" +
      pokemons[i].stats +
      "</td>" +
      "<td>" +
      pokemons[i].weight +
      "</td>" +
      "<td>" +
      pokemons[i].height +
      "</td>" +
      "<td>" +
      pokemons[i].types +
      "</td>" +
      "</tr>" +
      "</tbody>";
  }
}
