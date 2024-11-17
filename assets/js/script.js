const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
const load = document.getElementById("load");
let hpCharacters = [];
let no_image_available = "assets/img/No_Image_Available.jpg";
let chathams_blue = '#1A4B84';


function GetData(){
  try{

  load.classList.remove("d-none"); // Showing loading spinner
  
  fetch(`https://hp-api.herokuapp.com/api/characters`)
  .then(res => res.json())
  .then(chars => {
   hpCharacters = chars;
  //  console.log(hpCharacters)
   displayCharacters(chars);
  })
}catch(err){
  console.log(err);
}
}



searchBar.addEventListener('input', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((char) => {
      return (
          char.name.toLowerCase().includes(searchString) ||
          char.house.toLowerCase().includes(searchString) ||
          char.actor.toLowerCase().includes(searchString)
      );
  });
  displayCharacters(filteredCharacters);
});




function displayCharacters (characters) {
  load.classList.add("d-none"); // hiding loading spinner
  
  const htmlString = characters
  .map((character) => {
          return `
          <a href="${character.image}" target="_blank">
          <li class="character">
              <h2 id="name">${character.name}</h2>
              <p id="house">House: ${character.house}</p>
              <p id="actor">Actor: ${character.actor}</p>
              <p id="ancestry">Ancestry: ${character.ancestry}</p>
              <p id="dateOfBirth">Date of Birth: ${character.dateOfBirth}</p>
              <p id="dateOfBirth">Date of Birth: ${character.image}</p>
              <img src="${character.image || no_image_available}" alt="Image Not Found"></img>
          </li></a>
      `;
      })
      .join('');
      
  charactersList.innerHTML = htmlString;
};
GetData();

// Theme section
function setTheme(theme) {
    document.documentElement.style.setProperty('--primary-color', theme);
    localStorage.setItem('iss-theme', theme);
}

// Saving theme in local storage
setTheme(localStorage.getItem('iss-theme') || chathams_blue);
