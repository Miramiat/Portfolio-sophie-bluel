
const urlL = 'http://localhost:5678/api/users/login';

const submitbtn = document.getElementById("submitbtn");
const errorMessage = document.getElementById("errorMessage");

submitbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!email || !password) {
        errorMessage.textContent = "Veuillez remplir tous les champs";
        return;
    }

    const loginData = {
        email: email,
        password: password
    };

    fetch(urlL, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        })
        .then(authResponse => {
            console.log("authResponse: ", authResponse);
            if (authResponse.status === 200) {
                return authResponse.json();
            } else if (authResponse.status === 401) {
                errorMessage.textContent = "Accès non autorisé";
            } else if (authResponse.status === 404) {
                errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
            } else {
                errorMessage.textContent = `Error: ${authResponse.status}`;
            }
        })

        .then((userData) => {
            console.log("userData: ", userData);
            if (userData) {
                const token = userData.token;
                sessionStorage.setItem("isAdminConnected", JSON.stringify(true)); // Indicateur de connexion d'administrateur
                sessionStorage.setItem("token", token);
                window.location.replace("index.html");
                
            }
        })
        .catch((error) => console.error(error));
});





