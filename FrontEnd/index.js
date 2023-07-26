const urlW = "http://localhost:5678/api/works";
const urlC = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const boutons = document.querySelector(".boutons");
const boutonTout = document.getElementById("tout");
const objets = document.getElementById("objets");
const appartements = document.getElementById("appartements");
const hotelsRestaurants = document.getElementById("hotelsRestaurants");

const getWorks = () => {
    fetch(urlW)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Efface le contenu actuel de la galerie
            gallery.innerHTML = '';

            // Parcourir le tableau de travaux
            data.forEach((work) => {
                // Créer un nouvel élément figure
                const figure = document.createElement('figure');

                // Création d'un nouvel élément img
                const img = document.createElement('img');
                img.src = work.imageUrl; // Utiliser l'URL de l'image provenant de l'API
                img.alt = work.title; // Utiliser le titre de l'image provenant de l'API

                // Création d'un nouvel élément figcaption
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = work.title; // Utiliser le titre de l'image provenant de l'API

                // Ajout de l'élément img à l'élément figure
                figure.appendChild(img);

                // Ajout de l'élément figcaption à l'élément figure
                figure.appendChild(figcaption);

                // Ajout de l'élément figure à la galerie
                gallery.appendChild(figure);
            });
        });
};
getWorks();

// Gestion des boutons
boutonTout.addEventListener("click", function () {
    getWorks();
});

// Fonction pour filtrer les travaux par catégorie
const filterWorksByCategory = (categoryId) => {
    fetch(urlW)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Efface le contenu actuel de la galerie
            gallery.innerHTML = '';

            // Filtrer les travaux en fonction de la catégorie
            const filteredWorks = data.filter((work) => work.categoryId === categoryId);

            // Parcourir les travaux filtrés
            filteredWorks.forEach((work) => {
                // Créer un nouvel élément figure
                const figure = document.createElement('figure');

                // Création d'un nouvel élément img
                const img = document.createElement('img');
                img.src = work.imageUrl; // Utiliser l'URL de l'image provenant de l'API
                img.alt = work.title; // Utiliser le titre de l'image provenant de l'API

                // Création d'un nouvel élément figcaption
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = work.title; // Utiliser le titre de l'image provenant de l'API

                // Ajout de l'élément img à l'élément figure
                figure.appendChild(img);

                // Ajout de l'élément figcaption à l'élément figure
                figure.appendChild(figcaption);

                // Ajout de l'élément figure à la galerie
                gallery.appendChild(figure);
            });
        });
};

// Gestion des boutons
objets.addEventListener("click", function () {
    const categoryId = 1; // L'ID de la catégorie "Objets"
    filterWorksByCategory(categoryId);
});

appartements.addEventListener("click", function () {
    const categoryId = 2; // L'ID de la catégorie "Appartements"
    filterWorksByCategory(categoryId);
});

hotelsRestaurants.addEventListener("click", function () {
    const categoryId = 3; // L'ID de la catégorie "Hôtels & restaurants"
    filterWorksByCategory(categoryId);
});



// Appeler la fonction pour récupérer les travaux
getWorks();

// Récupère l'indicateur de connexion depuis localStorage
const isLoggedIn = localStorage.getItem("isLoggedIn");

// Vérifie si l'utilisateur est connecté
if (isLoggedIn) {
    // Utilisateur connecté : effectuez les modifications d'affichage nécessaires
    var divModifier = document.getElementById("modifier");
    var divModifierImg = document.getElementById("modifier_img");
    var divGerer = document.getElementById("gerer");
    var divProjets = document.getElementById("projets");

    // Supprimez la classe "hide" pour afficher les éléments
    divModifier.classList.remove("hide");
    divModifierImg.classList.remove("hide");
    divGerer.classList.remove("hide");

    // Vérifiez si l'élément "divProjets" existe avant de le supprimer
    if (divProjets) {
        divProjets.remove();

    } else {
        divProjets.add();

    }
}

const modifWorks = () => {
    const modalGallery = document.getElementById("modal-gallery"); // Récupérez la galerie de la modal

    fetch(urlW)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Efface le contenu actuel de la galerie de la modal
            modalGallery.innerHTML = '';

            // Parcourir le tableau de travaux
            data.forEach((work) => {
                // Créer un nouvel élément figure
                const figure = document.createElement('figure');

                figure.classList.add('gallery-figure');


                // Création d'un nouvel élément img
                const img = document.createElement('img');
                img.src = work.imageUrl; // Utiliser l'URL de l'image provenant de l'API
                img.alt = work.title; // Utiliser le titre de l'image provenant de l'API

                // Création d'un nouvel élément figcaption
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = "editer"; // Utiliser le titre de l'image provenant de l'API

                // Ajout de l'élément img à l'élément figure
                figure.appendChild(img);

                // Ajout de l'élément figcaption à l'élément figure
                figure.appendChild(figcaption);

                // Ajout de l'élément figure à la galerie de la modal
                modalGallery.appendChild(figure);

                //Ajout de l'icone poubelle
                const trashIcon = document.createElement("div");
                trashIcon.classList.add("deletePhoto");
                trashIcon.innerHTML =
                    '<i class="fa-solid fa-trash-can"></i>';
                const arrowIcon = document.createElement("i")
                // pour créez l'élément d'icône arrow-up-down
                arrowIcon.className = 'fa-solid fa-arrows-up-down-left-right arrows hide';
                // Ajoutez un gestionnaire d'événements pour afficher/cacher l'icône pendant le survol
                figure.addEventListener('mouseenter', function () {
                    arrowIcon.classList.remove('hide');
                });

                figure.addEventListener('mouseleave', function () {
                    arrowIcon.classList.add('hide');
                });
                // Ajout des élément icône de poubelle à l'élément figure
                figure.appendChild(arrowIcon);
                figure.appendChild(trashIcon);
                figure.setAttribute('data-id', work.id);
                trashIcon.addEventListener("click", deleteImage);
            });
        });
};

const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
    // Remplir la galerie de la modal avec les figures et l'icône de poubelle
    modifWorks();
};

const token = localStorage.getItem("token");

function deleteImage() {
    const workId = this.parentNode.getAttribute("data-id"); // Récupérer l'ID du travail à supprimer

    fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(function (response) {
            if (response.ok) {
                console.log("L'image a été supprimée avec succès")
                // L'image a été supprimée avec succès
                // On peut actualiser la galerie.
                getWorks();
                modifWorks();

            } else {
                // La suppression de l'image a échoué
                // On peut afficher un message d'erreur.
                console.error("Erreur lors de la suppression de l'image");
            }
        })
        .catch(function (error) {
            // Une erreur s'est produite lors de la suppression de l'image
            console.error("Erreur lors de la suppression de l'image", error);
        });
};

// Fonctions au clic sur le bouton "Modifier"
const modifyButton = document.getElementById("modifier");
modifyButton.addEventListener("click", openModal);

modif.addEventListener("click", openModal);

// Fonction pour fermer la modale
const modal = document.querySelector(".modal");

function closeModal() {
    modal.style.display = 'none';
}
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
});

// Pour fermer la modal, au clic du bouton "Fermer".
const closeButton = document.querySelector(".close-icon");
closeButton.addEventListener("click", function () {
    modal.style.display = "none"; // On cache la modal en modifiant le style display
});

//Ouverture du 2éme Fenétre.
const btnAjouterPhoto = document.querySelector(".btn-ajouter-photo");
btnAjouterPhoto.addEventListener("click", function () {

    const divModalWraper = document.querySelector(".modal-wraper");
    const divModalContent = document.querySelector(".modal-content");
    divModalWraper.classList.remove("hide");
    divModalContent.classList.add("hide");
});

// Code JavaScript pour prévisualiser l'image sélectionnée
const imageInput = document.getElementById('image');
const previewImage = document.getElementById('preview');
const faImage = document.querySelector('.fa-image');
const typeImage = document.querySelector('.type-image');
const btnAddImg = document.querySelector('.btn-addImg');

imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
        previewImage.style.maxHeight = "100%";
        previewImage.style.width = "auto";
        faImage.style.display = 'none';
        typeImage.style.display = 'none';
        btnAddImg.style.display = 'none';


    };
    reader.readAsDataURL(file);
});

btnValider = document.getElementById("newImg");
btnValider.addEventListener('click', addImage);

function addImage(event) {
    event.preventDefault(); // Prevent form submission
    const token = localStorage.getItem("token");
    const title = document.getElementById("imageName").value;
    const category = document.getElementById("category").value;
    const imageFile = document.getElementById("image").files[0];
    const btnValider = document.getElementById("newImg");

    if (title.value !== '' && category.value !== '' && imageFile.value !== '') {
        btnValider.style.backgroundColor = '#1D6154';
    } else {
        btnValider.style.backgroundColor = '';
    }
    if (!title || !category || !image) {
        alert('Veuillez remplir tous les champs du formulaire.')
        return;
    }

    //check if the image does not exceed 4mo//
    if (image.size > 4 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 4 Mo.");
        return;
    }

    // Créez un nouvel objet FormData et ajoutez les données du formulaire
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("category", Number(category));

    fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(work => {
            // L'ajout de l'image a réussi, maintenant vous pouvez mettre à jour la galerie et la galerie modale

            // Mettez à jour la galerie principale
            const gallery = document.querySelector('.gallery');
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = work.imageUrl;
            img.alt = work.title;
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = work.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
            // Mettez à jour la galerie modale
            const modalGallery = document.getElementById('modal-gallery');
            const modalFigure = document.createElement('figure');
            modalFigure.classList.add('gallery-figure');
            const modalImg = document.createElement('img');
            modalImg.src = work.imageUrl;
            modalImg.alt = work.title;
            const modalFigcaption = document.createElement('figcaption');
            modalFigcaption.textContent = "editer";
            modalFigure.appendChild(modalImg);
            modalFigure.appendChild(modalFigcaption);
            modalGallery.appendChild(modalFigure);
            alert('Le nouvel travail a été ajouté avec succès.');
            getWorks();
            modifWorks();
            closeModal();
        })
        .catch(function (error) {
            console.error("Erreur lors de l'ajout de l'image", error);
        });
}
const closeModal2 = document.getElementById("closeModal2");
const backIcon = document.querySelector(".back-icon");
closeModal2.addEventListener("click", function () {
    modal.style.display = "none"; // On cache la modal en modifiant le style display
});
backIcon.addEventListener("click", function () {
    const divModalWraper = document.querySelector(".modal-wraper");
    const divModalContent = document.querySelector(".modal-content");
    divModalWraper.classList.add("hide");
    divModalContent.classList.remove("hide");

})