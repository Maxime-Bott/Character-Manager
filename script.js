(() => {  // CREATE 
    const inputs = Array.from(document.querySelectorAll('.content-inputs input'));
    const tpl = document.querySelector('#tpl-card');
    const target = document.querySelector('#target');
    const delBtn = document.querySelector('button #delBtn')
    
    
    //Print characters  READ
    const call = async () => {
        try {
            const response = await fetch('https://character-database.becode.xyz/characters');
            const characters = await response.json();
            characters.forEach(({name, shortDescription, image, description}) => {
                const elt = tpl.cloneNode(true).content;
                
                elt.querySelector('.img-card').src = "data:image/*;base64," + image;
                elt.querySelector('.card-title').textContent = name;
                elt.querySelector('.card-title-reveal').textContent = name;
                elt.querySelector('.card-content').textContent = shortDescription;
                elt.querySelector('.card-description').textContent = description;
                target.appendChild(elt);
                
            });
        }
        catch(err){
            console.error(err)
        }
    }
    
    call()
    
    // Add character UPDATE 
    document.querySelector('#add').addEventListener('click',  async () =>{
        const values = inputs.map(({value}) => value.trim());
        const [name, shortDescription, description, image] = values;
        // const img = document.querySelector("#card-img").value
        // console.log(img)

        const response = await fetch('https://character-database.becode.xyz/characters', {
            method: 'POST',
            headers: {
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify({
                name,
                shortDescription,
                description,
                image,
            })
        })
        document.location.reload();
    });

    // Update characters
    delBtn.addEventListener('click', () =>{
        
    })

})();


