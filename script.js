(() => {  // aller chercher 
    const inputs = Array.from(document.querySelectorAll('.content-inputs input'));
    const tpl = document.querySelector('#tpl-card');
    const target = document.querySelector('#target');
    let image = ""


    //Print characters  READ
    const call = async () => {
        try {
            const response = await fetch('https://character-database.becode.xyz/characters');
            const characters = await response.json();
            characters.forEach(({ name, shortDescription, image, description }) => {
                const elt = tpl.cloneNode(true).content;

                elt.querySelector('.img-card').src = "data:image/*;base64," + image;
                elt.querySelector('.card-title').textContent = name;
                elt.querySelector('.card-title-reveal').textContent = name;
                elt.querySelector('.card-content').textContent = shortDescription;
                elt.querySelector('.card-description').textContent = description;
                target.appendChild(elt);

            });
            console.log(characters)
        }
        catch (err) {
            console.error(err)
        }
    }

    call()


    //Convert IMG to dataURI
    document.querySelector('#card-img').addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            image = reader.result.replace('data:', '').replace(/^.+,/, '');
        };
        reader.readAsDataURL(file)
    });


    // Add character
    document.querySelector('#add').addEventListener('click', async () => {
        const values = inputs.map(({ value }) => value.trim());
        let [name, shortDescription, description] = values;

        if (values.some((value) => value === "")) {
            alert("There's an empty input!");
            return;
        }

        const response = await fetch('https://character-database.becode.xyz/characters', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                name,
                shortDescription,
                description,
                image,
            })
        })
        document.location.reload();
        if (!response.ok) {
            console.error(response.status)
        }
    });

    // // Update characters
    // delBtn.addEventListener('click', () =>{

    // })

})();


