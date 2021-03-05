const inputs = Array.from(document.querySelectorAll('.content-inputs input'));
const target = document.querySelector('#target');
let characters;
let search = "";
let image = "";

//get data
let arrayId ;
let arrayName;
let arrayDescription;
let arraySmDescription;


//variables modale 
const modalBtn = document.querySelector("#btn-modale");
const closeModale = document.querySelector(".modale-close");
const overlay = document.querySelector(".modale-overlay");
const modaleCreateChar = document.querySelector(".modale");


const fetchCharacters = async () =>{
    try{
        characters = await fetch ('https://character-database.becode.xyz/characters')
        .then(res =>(
            res.json()
        ))
    } catch(e){
        console.error(e);
    };
};


const getData = async () =>{
    arrayId = new Array();
    arrayName = new Array();
    arrayDescription = new Array();
    arraySmDescription = new Array();

    characters.forEach(character => {
        arrayId.push(character.id);
        arrayName.push(character.name);
        arrayDescription.push(character.description);
        arraySmDescription.push(character.shortDescription);
        // arrayImg.push(character.image);
    });
};

const printCharacters = async () => {
    await fetchCharacters();
    target.innerHTML = (
        characters
        .filter(character => character.name.toLowerCase().includes(search.toLowerCase()
        ))
        .map(character => (

                `<div class="col s12 m4">
                <div class="card  card large hoverable white-text blue-grey darken-4">
                    <div class="card-image">
                        <img src="data:image/*;base64,${character.image}" alt="card-img" class="img-card img-hero">
                    </div>
                    <div class="morebtn">
                        <a class="btn-floating waves-effect light-blue activator pulse"><i
                                class="material-icons">add</i></a>
                    </div>
                    <div class="center-align charactername">
                        <span class="card-title">${character.name}</span>
                    </div>
                    <div class="card-content">
                        <p>${character.shortDescription}</p>
                    </div>
                    <div class="card-action edit-delete-btns">

                        <button class="btn light-blue waves-effect edit editBtn " type="submit" name="action">
                            Edit
                        </button>
                        <button class="btn red waves-effect delBtn" type="submit" name="action">
                            Delete
                        </button>

                    </div>

                    <div class="card-reveal pink blue-grey darken-4">
                        <span class="card-title white-text reveal-span">
                            <p class="card-title-reveal">${character.name}</p>
                            <i class="material-icons waves-effect white-text right red leave-btn">close</i>
                        </span>
                        <p class="card-description white-text">${character.description}</p>
                    </div>
                </div>
            </div>`
                
        )).join('')
    );

    getData()
    deleteCharacter();
    updateCharacter();
};



const deleteCharacter = () => {
    Array.from(document.querySelectorAll('.delBtn')).forEach((btn,i) => {
        btn.addEventListener('click', async () => {
            
            const confirmDelete = confirm("Really want to delete this Hero ? They're all kinda unique...");

            if(confirmDelete){
                const id = arrayId[i];
                try{
                    const response = await fetch (`https://character-database.becode.xyz/characters/${id}`,{
                        method : 'DELETE',
                        headers : {
                            "Content-Type": "application/json"
                        },
                    })
                    printCharacters();

                } catch(e) {
                    console.error(e);
                };
            };
        }); 
    });
};


const updateCharacter = () => {
    Array.from(document.querySelectorAll('.editBtn')).forEach( (btn,i)=> {
        btn.addEventListener("click", () => {

            
            const editConfirm = confirm('Do want edit this Hero ?');
            if(editConfirm){
                const getValues = [arrayName[i], arraySmDescription[i], arrayDescription[i]];

                for (let i=0; i<getValues.length; i++){
                    inputs[i].value =  getValues[i]
                }
                
                modaleCreateChar.classList.add("modale-active");
                overlay.classList.add("modale-overlay-active");
                
                document.querySelector('#add').addEventListener('click',  async () =>{
                    const values = inputs.map(({value}) => value.trim());
                    const [name, shortDescription, description] = values;
                    const id = arrayId[i]

                    if (values.some((value) => value === "")) {
                        alert("Invalid form");
                        return;
                    }
                    
                    try{
                        const response = await fetch (`https://character-database.becode.xyz/characters/${id}`,{
                            method : 'PUT',
                            headers : {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name,
                                shortDescription,
                                description,
                                image,
                            })
                        });

                        document.location.reload()

                    } catch(err){
                        console.err(err)
                    }
                });  
            };
        });
    }); 
};

const addCharacter = () => {
    modalBtn.addEventListener("click", () => {
        modaleCreateChar.classList.add("modale-active");
        overlay.classList.add("modale-overlay-active");

        document.querySelector('#add').addEventListener('click', async () => {
            console.log('Add character')
            const values = inputs.map(({
                value
            }) => value.trim());
            const [name, shortDescription, description] = values;


            if (values.some((value) => value === "")) {
                alert("Invalid form");
                return;
            }

            try {
                const response = await fetch('https://character-database.becode.xyz/characters', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        shortDescription,
                        description,
                        image
                    }),
                })
                await response.json();
                document.location.reload();

            } catch (err) {
                console.error(err)
            };
        });
    });
};

//Search Input
document.querySelector('#search').addEventListener('input', (e) => {
    search = e.target.value;
    printCharacters();
});

//Convert image
document.querySelector('#card-img').addEventListener("change",(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        image = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(file)
});

//CloseModale
closeModale.addEventListener("click", () => {
    overlay.classList.remove("modale-overlay-active");
    modaleCreateChar.classList.remove("modale-active");
});

printCharacters();
addCharacter();