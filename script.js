(() => {  // CREATE 
    const inputs = Array.from(document.querySelectorAll('.content-inputs input'));
    const tpl = document.querySelector('#tpl-card');
    const target = document.querySelector('#target');
    const values = inputs.map(({value}) => value.trim());
    const [name, shortDescription, description, image] = values;
    

    //Print characters  READ
    const call = async () => {
        try {
            const response = await fetch('https://character-database.becode.xyz/characters');
            const characters = await response.json();
            characters.forEach(({name, shortDescription, image}) => {
                const elt = tpl.cloneNode(true).content;
                
                elt.querySelector('.img-card').src = image;
                elt.querySelector('.card-title').textContent = name;
                elt.querySelector('.card-content').textContent = shortDescription;
                
                target.appendChild(elt);
                
            });
            console.log(characters)
        }
        catch(err){
            console.error(err)
        }
    }

    call()

    // Add character UPDATE 
    document.querySelector('#add').addEventListener('click',  async () =>{
        const img = document.querySelector("#card-img").value
        console.log(img)

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
        call();
    });

    // Delete character DELETE

})();


