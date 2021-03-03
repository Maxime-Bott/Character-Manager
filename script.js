(() => {  // aller chercher 
    const inputs = Array.from(document.querySelectorAll('.content-inputs input'));
    const tpl = document.querySelector('#tpl-card');
    const target = document.querySelector('#target');
    const arrayId = new Array()
    

    //Print characters  READ
    const call = async () => {
        try {
            const response = await fetch('https://character-database.becode.xyz/characters');
            const characters = await response.json();
            characters.forEach(({name, shortDescription, image, description, id}, i) => {
                const elt = tpl.cloneNode(true).content;

                elt.querySelector('.img-card').src = "data:image/*;base64," + image;
                elt.querySelector('.card-title').textContent = name;
                elt.querySelector('.card-title-reveal').textContent = name;
                elt.querySelector('.card-content').textContent = shortDescription;
                elt.querySelector('.card-description').textContent = description;
                target.appendChild(elt);

                arrayId.push(id)
            });

            //Delete Character
            Array.from(document.querySelectorAll('.delBtn')).forEach((btn,i) => {
                btn.addEventListener('click', async () => {
                    const confirmDelete = confirm('Delete ?');
                    if(confirmDelete){
                        const id = arrayId[i]
                        const response = await fetch (`https://character-database.becode.xyz/characters/${id}`,{
                            method : 'DELETE',
                            headers : {
                                "Content-Type": "application/json"
                            },
                        })
                        const deleteCharacter = await response.json();
                        document.location.reload();

                        if(!response.ok){
                            console.error(response.status)
                        }
                    }
                }) 
            });
            //Update Character

        }
        catch (err) {
            console.error(err)
        }
      }
    call()

    //Convert IMG to dataURI
    let image = ""
    document.querySelector('#card-img').addEventListener("change",(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            image = reader.result.replace('data:', '').replace(/^.+,/, '');
        };
        reader.readAsDataURL(file)
    });


    // Add character
    document.querySelector('#add').addEventListener('click',  async () =>{
        const values = inputs.map(({value}) => value.trim());
        const [name, shortDescription, description] = values;
        console.log(values)
        
        if (values.some((value) => value === "")) {
            alert("Invalid form");
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
        console.log(values)
        document.location.reload();
        if (!response.ok) {
            console.error(response.status)
        }
    });

    // // Update characters



    // })


    // modale add character 
    let modalBtn = document.querySelector("#btn-modale")
    let closeModale = document.querySelector(".modale-close");
    let overlay = document.querySelector(".modale-overlay");
    let modaleCreateChar = document.querySelector(".modale");

    modalBtn.addEventListener("click", () => {
        modaleCreateChar.classList.add("modale-active");
        overlay.classList.add("modale-overlay-active");
    });

    closeModale.addEventListener("click", () => {
        overlay.classList.remove("modale-overlay-active");
        modaleCreateChar.classList.remove("modale-active");
    });

    

})();


