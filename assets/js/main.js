'use strict';

document.addEventListener("DOMContentLoaded", () => {
// window.onload = () => {

  // element toggle function
  const elementToggleFunc = (elem) => {
    elem.classList.toggle("active");
  }


  /* * ========== SIDEBAR ========== * */
  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  const sidebarSpanFirst = document.querySelector("[data-sidebar-span-first]");
  const sidebarSpanLast = document.querySelector("[data-sidebar-span-last]");

  // sidebar toggle functionality for mobile
  sidebarBtn.addEventListener("click", () => {

    elementToggleFunc(sidebar);

    if (sidebarSpanFirst.textContent === "Mostrar contactos") {
      sidebarSpanFirst.textContent = "Ocultar contactos";
      sidebarSpanLast.textContent = "Ocultar";
    } else {
      sidebarSpanFirst.textContent = "Mostrar contactos";
      sidebarSpanLast.textContent = "Mostrar";
    }

  });


  /* * ========== SERVICES ========== * */
  // services variables
  const servicesParagraphs = document.querySelectorAll("[data-service-list] p");
  const readMoreLessBtns = document.querySelectorAll("[data-service-list] button");

  readMoreLessBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      servicesParagraphs[index].classList.toggle('active');

      if (servicesParagraphs[index].classList.contains('active')) {
        btn.textContent = 'contraer';
      } else {
        btn.textContent = 'leer más';
      }

    });
  });


  /* * ========== TESTIMONIALS ========== * */
  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalDate = document.querySelector("[data-modal-date]");
  const modalProfession = document.querySelector("[data-modal-profession]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {

    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");

  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalDate.innerHTML = this.querySelector("[data-testimonials-date]").innerHTML;
      modalProfession.innerHTML = this.querySelector("[data-testimonials-profession]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();

    });

  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      modalContainer.classList.remove("active");
      overlay.classList.remove("active");
    }
  });


  /* * ========== FILTERS ========== * */
  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-project-item]");

  const filterFunc = (selectedValue) => {
    for (let i = 0; i < filterItems.length; i++) {
      const categoryList = filterItems[i].dataset.category.split(", ");
      if (selectedValue === "todas" || categoryList.includes(selectedValue)) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }


  /* * ========== CONTACT FORM ========== * */
  /*// contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // add event to all form input field
  for (let i = 0; i < formInputs.length; i++) {

    formInputs[i].addEventListener("input", () => {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });

  }*/


  /* * ========== NAVBAR ========== * */
  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // add event to all nav link
  for (let i = 0; i < navigationLinks.length; i++) {

    navigationLinks[i].addEventListener("click", function () {

      for (let i = 0; i < pages.length; i++) {

        if (this.dataset.navLink === pages[i].dataset.page) {
          pages[i].classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[i].classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }

      }

    });

  }


  // Hide loader after 5 seconds
  const loader = document.querySelector("[data-loader]");
  setTimeout(() => {
    loader.style.display = "none";
  }, 3000);
  
// }
})