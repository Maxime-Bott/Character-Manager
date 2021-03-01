(() => {
const inputs = Array.from(document.querySelectorAll('input'));
console.log(inputs)

const call = async () => {
    try {
        const response = await fetch('https://character-database.becode.xyz/characters');
        const characters = await response.json();
         console.log(characters)
    }
    catch(err){
        console.error(err)
    }
}
call()

document.querySelector('#add').addEventListener('click',  async () =>{
    const values = inputs.map(({value}) => value.trim());
    const [name, shortDescription, description, image] = values

    const response = await fetch('https://character-database.becode.xyz/characters', {
        method: 'POST',
        headers: {
            "Content-Type" : 'application/json',
        },
        body: JSON.stringify({
            name,
            shortDescription,
            description,
            image
        })
    })
    const newResponse = await response.json();
    console.log(newResponse)
});

})();


