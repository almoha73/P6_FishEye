import { fetchPhotographers } from "../pages/api";
import { displayPhotographerHeader } from "../pages/photographer";

export async function contactForm() {
  await displayPhotographerHeader();
  //const articles = await fetchPhotographers();
  //Variables du formulaire
  const formModal = document.querySelector("#contact_modal"); //formulaire
  const contactBtn = document.querySelector("button.contact"); //ouverture
  const titreForm = document.querySelector("h1");
  const closeModal = document.querySelector(".close-modal"); //fermeture
  let inputField = document.querySelectorAll("input.input-control"); // inputs
  const body = document.querySelector("body");
  //ouverture du formulaire
  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.style.display = "inline-block";
    formModal.setAttribute("aria-modal", true);
    titreForm.focus();
    focusBlur();
  });

  ///FONCTION GARDE DU FOCUS DANS LE FORMULAIRE
  const focusInModal = function (e) {
    e.preventDefault();
    const focusablesForm = Array.from(document.querySelectorAll(".modalForm"));
    let index = focusablesForm.findIndex(
      (elt) => elt === formModal.querySelector(":focus")
    );

    if (e.shiftKey === true) {
      index--;
    } else {
      index++;
    }

    if (index >= focusablesForm.length) {
      index = 0;
    }
    if (index < 0) {
      index = focusablesForm.length - 1;
    }

    focusablesForm[index].focus();
  };
  // TABULATION A L'INTERIEUR DU FORMAULAIRE EN BOUCLE
  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && formModal.style.display === "inline-block") {
      e.preventDefault();
      focusInModal(e);
    }
  });

  //FERMETURE DU FORMULAIRE AVEC TOUCHE ECHAP
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && formModal.style.display === "inline-block") {
      body.style.backgroundColor = "transparent";
      setTimeout(() => {
        formModal.style.display = "none";
        

        resetField();
      }, 1000);
      contactBtn.focus();
    }
  });

  ///FERMETURE DU FORMULAIRE AU CLIC
  closeModal.addEventListener("click", (e) => {
    body.style.backgroundColor = "transparent";
    setTimeout(() => {
      formModal.style.display = "none";
      

      resetField();
    }, 500);
    contactBtn.focus();
  });

  // Fonction RESET apr??s envoi du formulaire
  function resetField() {
    for (let i = 0; i < inputField.length; i++) {
      let paragraphe = inputField[i].nextElementSibling;
      inputField[i].value = "";
      okMessageRemove(paragraphe, inputField[i]);
      errorMessage(paragraphe, ``, inputField[i]);
      inputField[i].classList.remove("redBorder");
      inputField[i].classList.remove("greenBorder");
      paragraphe.classList.remove("red");
      paragraphe.classList.remove("green");
      inputField[i].nextElementSibling.innerHTML = "";
    }
    contactBtn.focus();
  }

  function focusBlur() {
    for (let i = 0; i < inputField.length; i++) {
      inputField[i].addEventListener("focus", addColor);
      inputField[i].addEventListener("blur", removeColor);

      function addColor() {
        inputField[i].classList.add("blueBorder");
      }

      function removeColor() {
        inputField[i].classList.remove("blueBorder");
      }
    }
  }

  // AFFICHAGE DYNAMIQUE DU NOM --> photographer.js

  //VALIDATION DES CHAMPS

  function valideForm() {
    let error = 0;
    for (let i = 0; i < inputField.length; i++) {
      const type = inputField[i].getAttribute("id");
      let paragraphe = inputField[i].nextElementSibling;

      switch (type) {
        case "first":
          if (inputField[i].value === "") {
            error = error + 1;
            inputField[i].classList.remove("blueBorder");
            okMessageRemove(paragraphe, inputField[i]);
            errorMessage(
              paragraphe,
              `Veuillez inscrire votre pr??nom`,
              inputField[i]
            );
          } else if (
            /^[a-zA-Z???? ]+[\-]?[a-zA-Z???? ]+$/.test(
              inputField[i].value.trim()
            ) &&
            inputField[i].value.length >= 2
          ) {
            inputField[i].classList.remove("blueBorder");
            okMessageRemove(paragraphe, inputField[i]);
            okMessage(paragraphe, `Le pr??nom est valide`, inputField[i]);
            inputField[i + 1].focus();
            console.log(inputField[i].value);
          } else {
            error = error + 1;
            console.log(error);
            inputField[i].classList.remove("blueBorder");
            okMessageRemove(paragraphe, inputField[i]);
            errorMessage(paragraphe, `Le pr??nom est invalide`, inputField[i]);
          }

          break;

        case "last":
          if (inputField[i].value === "") {
            okMessageRemove(paragraphe, inputField[i]);
            errorMessage(
              paragraphe,
              `Veuillez renseigner votre nom`,
              inputField[i]
            );
            error = error + 1;
          } else if (
            /^[a-zA-Z???? ]+[\-]?[a-zA-Z???? ]+$/.test(
              inputField[i].value.trim()
            ) &&
            inputField[i].value.length >= 2
          ) {
            inputField[i].classList.remove("blueBorder");
            okMessageRemove(paragraphe, inputField[i]);
            okMessage(paragraphe, `Nom valide`, inputField[i]);
            inputField[i + 1].focus();
            console.log(inputField[i].value);
          } else {
            inputField[i].classList.remove("blueBorder");
            okMessageRemove(paragraphe, inputField[i]);
            errorMessage(paragraphe, `Nom invalide`, inputField[i]);
            error = error + 1;
          }

          break;

        case "mail":
          if (inputField[i].value === "") {
            okMessageRemove(paragraphe, inputField[i]);
            errorMessage(paragraphe, `Le mail est obligatoire`, inputField[i]);
            error = error + 1;
          } else if (
            /^\w+([\.-]?\w+)*@\w+([\-]?\w+)*\.(\w{2,3})+$/.test(
              inputField[i].value.trim()
            )
          ) {
            inputField[i].classList.remove("blueBorder");
            okMessageRemove(paragraphe, inputField[i]);
            okMessage(paragraphe, `Mail valide`, inputField[i]);
            inputField[i + 1].focus();
            console.log(inputField[i].value);
          } else {
            inputField[i].classList.remove("blueBorder");
            okMessageRemove(paragraphe, inputField[i]);
            errorMessage(paragraphe, `Le mail est invalide`, inputField[i]);
            error = error + 1;
          }

          break;

        case "text":
          if (inputField[i].value === "") {
            inputField[i].classList.remove("blueBorder");
            errorMessage(paragraphe, `Quel est votre message ?`, inputField[i]);
            error = error + 1;
          } else if (inputField[i].value.trim()) {
            inputField[i].classList.remove("blueBorder");
            okMessageRemove(paragraphe, inputField[i]);
            okMessage(paragraphe, `Merci !`, inputField[i]);
            //sendButton.focus();
            console.log(inputField[i].value);
          }
      }
    }
    return error <= 0;
  }

  function errorMessage(nodeElt, message, input) {
    nodeElt.innerHTML = message;
    nodeElt.classList.add("red");
    input.classList.add("redBorder");
  }

  function okMessage(nodeElt, message, input) {
    nodeElt.innerHTML = message;
    nodeElt.classList.add("green");
    input.classList.add("greenBorder");
  }

  function okMessageRemove(nodeElt, input) {
    nodeElt.classList.remove("green");
    input.classList.remove("greenBorder");
  }

  formModal.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valideForm()) {
      setTimeout(() => {
        formModal.style.display = "none";
        resetField();
      }, 500);
      contactBtn.focus();
    }
  });
}
