
// eventListener for the buttons instead of onClick 
document.querySelector('.fetchButton')
  .addEventListener('click', () => {
    fetchData();    
  });
 // want to press Pokemon on pressing "q" in the body
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      fetchData();}})


    async function fetchData(){
        try{
   // Take the input , convert it to lowercase so the URL we fetch works        
          const pokemonNameInput = document.querySelector(".pokemonName") ;
          const pokemonName = pokemonNameInput.value.toLowerCase();
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
   // reponse is an object we fetch, if it is ok then our URL was correct  AKA pokemon in the input exists.       
          if (!response.ok){
            throw new Error("Incorrect Pokemon Name");
          }
        
          const data = await response.json();

  // get the front image of the pokemon
          const pokemonSprite = data.sprites.front_default;          
          const pokeImageFront = document.querySelector(".pokemonImage");
          pokeImageFront.src = pokemonSprite;
          pokeImageFront.style.display ="inline";
// get the back image of the pokemon
          const pokemonSpriteBack = data.sprites.back_default;          
          const pokeImageBack = document.querySelector(".pokemonImageBack");
          pokeImageBack.src = pokemonSpriteBack;
          pokeImageBack.style.display ="inline";
  // get the type of the pokemon
          const pokemonTypes=[];
          pokemonTypes.push(data.types[0].type.name);
          if (data.types.length > 1){
            pokemonTypes.push(data.types[1].type.name);
          }  
          let typesString;
          if (pokemonTypes.length > 1){
            typesString = pokemonTypes.join(' and ');
          }else {typesString = pokemonTypes[0]};     
          let pokeType = document.querySelector(".pokemonType");
   // change first character to UpperCase to look cooler       
          const pokeUpper = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
           pokeType.innerHTML = `${pokeUpper}'s type = ${typesString}`;
           pokeType.style.display= "block";    
       } 
        catch(error){
          console.error(error);
        }
        
      }
