// portfolio variable
const projectList = document.querySelector("[data-project-list]");
const filterList = document.querySelector("[data-filter-list]");
const filterSelect = document.querySelector("[data-filter-select]");


// Load XLSX data
fetch("../assets/data/projects.xlsx")
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    // Parse the XLSX data
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Create a set to store unique categories
    const uniqueCategories = new Set(); // dibujo, pintura, técnicas mixtas, escultura, grabado, retrato

    // Shuffle the projects array
    const shuffledProjects = shuffle(jsonData);

    // Generate the HTML elements for each project
    shuffledProjects.forEach(project => {

      const categories = project.category.split(", ");

      if(project.onSale === "true") {
        categories.push("en venta");
      }
      if(project.awarded !== "false") {
        categories.push("premiadas");
      }

      categories.forEach(category => uniqueCategories.add(category));

      const listItem = document.createElement("li");
      listItem.classList.add("portfolio__project__item", "active");
      listItem.setAttribute("data-project-item", "");
      listItem.setAttribute("data-category", categories.join(", "));

      const aItem = document.createElement("a");
      aItem.href = `./media/full/${project.category}/${project.image}.jpg`;
      aItem.setAttribute("data-project-title", project.title);
      aItem.setAttribute("data-project-date", project.date);
      aItem.setAttribute("data-project-technique", project.technique);
      aItem.setAttribute("data-project-dimensions", project.dimensions);
      aItem.setAttribute("data-project-series", project.series);
      aItem.setAttribute("data-project-on-sale", project.onSale);
      aItem.setAttribute("data-project-awarded", project.awarded);
      aItem.setAttribute("data-pswp-width", project.width);
      aItem.setAttribute("data-pswp-height", project.height);
      aItem.setAttribute("target", "_blank");

      const image = document.createElement("img");
      image.classList.add("portfolio__project__item__img", "lazyload");
      image.alt = `${project.title}. ${project.technique}`;
      image.src = `./media/low/${project.category}/${project.image}-low.jpg`;
      image.setAttribute("data-sizes", "auto");
      image.setAttribute("data-srcset", `
        ./media/small/${project.category}/${project.image}-small.webp 420w,
        ./media/medium/${project.category}/${project.image}-medium.webp 1024w,
        ./media/full/${project.category}/${project.image}.webp 1920w
      `);
      image.setAttribute("data-srcset", `
        ./media/small/${project.category}/${project.image}-small.jpg 420w,
        ./media/medium/${project.category}/${project.image}-medium.jpg 1024w,
        ./media/full/${project.category}/${project.image}.jpg 1920w
      `);
      image.setAttribute("data-project-title", project.title);
      image.setAttribute("data-project-date", project.date);
      image.setAttribute("data-project-technique", project.technique);
      image.setAttribute("data-project-dimensions", project.dimensions);
      image.setAttribute("data-project-series", project.series);
      image.setAttribute("data-project-on-sale", project.onSale);
      image.setAttribute("data-project-awarded", project.awarded);

      if(project.onSale === "false") {
        const soldItem = document.createElement("div");
        soldItem.classList.add("portfolio__project__item--sold");
        const spanItem = document.createElement("span");
        spanItem.textContent = "Vendida";
        soldItem.appendChild(spanItem);
        listItem.appendChild(soldItem);
      }

      if(project.awarded !== "false") {
        const awardedItem = document.createElement("div");
        awardedItem.classList.add("portfolio__project__item--awarded", "down");
        const pItem = document.createElement("p");
        pItem.innerHTML = project.awarded.split(". ")[0].toUpperCase().replace(" ", "<br>");
        awardedItem.appendChild(pItem);
        listItem.appendChild(awardedItem);
      }

      aItem.appendChild(image);
      listItem.appendChild(aItem);
      projectList.appendChild(listItem);
    });

    // Convert uniqueCategories set to an array and sort alphabetically
    const sortedCategories = Array.from(uniqueCategories).sort();

    // Move the category "en venta" to position 0
    const indexEnVenta = sortedCategories.indexOf("en venta");
    if (indexEnVenta > -1) {
      sortedCategories.splice(indexEnVenta, 1);
      sortedCategories.push("en venta");
    }

    // Move the category "premiadas" to position 1
    const indexPremiadas = sortedCategories.indexOf("premiadas");
    if (indexPremiadas > -1) {
      sortedCategories.splice(indexPremiadas, 1);
      sortedCategories.unshift("premiadas");
    }

    // Generate the HTML elements for category buttons
    sortedCategories.forEach(category => {
      const categoryItemList = document.createElement("li");
      categoryItemList.classList.add("portfolio__filter-list__item");
      const categoryBtnList = document.createElement("button");
      categoryBtnList.setAttribute("data-filter-btn", "");
      categoryBtnList.textContent = category;
      categoryItemList.appendChild(categoryBtnList);
      filterList.appendChild(categoryItemList);

      const categoryItemSelect = document.createElement("li");
      categoryItemSelect.classList.add("portfolio__filter-select__list__item");
      const categoryBtnSelect = document.createElement("button");
      categoryBtnSelect.setAttribute("data-select-item", "");
      categoryBtnSelect.textContent = category;
      categoryItemSelect.appendChild(categoryBtnSelect);
      filterSelect.appendChild(categoryItemSelect);
    });

  })
  .catch(error => {
    console.log("Error al cargar los proyectos:", error);
});


// Function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
