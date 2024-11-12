let characters = [];  
let currentIndex = 0; 


async function getItemsAsyncAwait() {
    try {
        const resp = await fetch("https://dragonball-api.com/api/characters/");
        const respJson = await resp.json();
        return respJson.items; 
    } catch (error) {
        console.error("Error al obtener los personajes:", error);
        return [];
    }
}


const cardDragonBall = (personaje) => {
    return `
        <img src="${personaje.image}" class="card-img-top" style="height: 260px; width: 120px; margin: auto;"/>
        <h4>Nombre: ${personaje.name}</h4>
        <p>Ki: ${personaje.ki}</p>
        <p>Ki Máximo: ${personaje.maxKi}</p>
        <p>Raza: ${personaje.race}</p>
        <p>Descripción: ${personaje.description}</p>
    `;
};


function showCharacter(index) {
    if (characters.length === 0) return;

    const personaje = characters[index];
    const container = document.getElementById("carousel");
    container.innerHTML = cardDragonBall(personaje);
}


getItemsAsyncAwait().then(personajes => {
    characters = personajes;
    showCharacter(currentIndex);
});


document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % characters.length; 
    showCharacter(currentIndex);
});


document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length; 
    showCharacter(currentIndex);
});
