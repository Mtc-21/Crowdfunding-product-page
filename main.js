  const closeModal = document.querySelector("#modal");
    const modalMsg = document.querySelector(".modalsuccess");
    const parentModal = document.querySelector(".modal");
    const closeMsg = document.querySelector(".close-msg");
    const selectionModal = document.querySelectorAll(".modal .card-modal:not(:last-child)");
    const selectionMain = document.querySelectorAll(".btn");
    const forms = document.querySelectorAll(".form-pledge");
    const blookmark = document.querySelector(".blookmark");

    // blookmarked
    blookmark.addEventListener("click", () => {
      let text = blookmark.lastElementChild;
      blookmark.classList.toggle("blookmarkChange");
      if (text.textContent === "Blookmark") {
        text.textContent = "Blookmarked";
      } else {
        text.textContent = "Blookmark";
      }
    });
    //close modal main
    closeModal.addEventListener("click", (e) => {
      parentModal.classList.toggle("closeModal");
    });
    //close modal msg
    closeMsg.addEventListener("click", () => {
      modalMsg.classList.toggle("closeModal");
      parentModal.classList.toggle("closeModal");
    });

    //selection main
    selectionMain.forEach(elem => {
      elem.addEventListener("click", () => {
        parentModal.classList.toggle("closeModal");
        selectionModal.forEach(element => {
          if (elem.parentElement.classList.contains("card")) {
            if (element.children[1].textContent === elem.parentElement.firstElementChild.textContent) {
              bookmark(element);
            } else {
              unCheck(element);
            }
          } else {
            unCheck(element);
          }
        });

      })
    });

    // selection modal
    selectionModal.forEach(element => {
      element.addEventListener("click", (e) => {
        let current = element;
        selectionModal.forEach(elem => {
          if (elem !== current) {
            unCheck(elem);
          }
        });
        bookmark(element);
      });
    });

    function bookmark(card) {
      card.classList.add("optionSelect");
      card.children[0].checked = true;
      if (card.lastElementChild.classList.contains("form-pledge")) {
        card.lastElementChild.classList.remove("hide");
      } else {
        setTimeout(() => {
          modalMsg.classList.toggle("closeModal");
        }, 500);
      }
    }
    function unCheck(card) {
      card.classList.remove("optionSelect");
      if (card.children[0].checked) card.children[0].checked = false;
      if (card.lastElementChild.classList.contains("form-pledge")) {
        card.lastElementChild.classList.add("hide");
      }
    }
    //validate form

    forms.forEach(form => {
      form.addEventListener("click", (e) => {
        e.stopPropagation();
      })
      form.children[1].addEventListener("input", (e) => {
        validateInput(e.target)
      })
      form.lastElementChild.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateInput(form.children[1]))
          modalMsg.classList.toggle("closeModal");
      });
    });
    // validate input
    function validateInput(elem) {
      let minValue = 0;
      elem.parentElement.parentElement.children[1].textContent.includes("Bamboo") ? minValue = 25 : minValue = 75;
      if (!elem.value.startsWith("0") && parseInt(elem.value) >= minValue) {
        elem.classList.remove("alert");
        return true
      } else {
        elem.classList.add("alert");
        return false
      }
    }