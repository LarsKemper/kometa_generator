// Drag and Drop
const Left = document.getElementById("drag-left");
const Right = document.getElementById("drop-right");


new Sortable(Left, {
  group: {
      name: 'shared',
      pull: 'clone',
      put: false // Do not allow items to be put into this list
  },
  animation: 150,
  sort: false // To disable sorting: set sort to false
});

new Sortable(Right, {
  group: 'shared',
  animation: 150
});

// Filter
const filters = document.querySelectorAll(".filter");

filters.forEach((filter) => {
  filter.addEventListener("click", function () {
    let selectedFilter = filter.getAttribute("data-filter");
    let itemsToHide = document.querySelectorAll(
      `.projects .project:not([data-filter='${selectedFilter}'])`
    );
    let itemsToShow = document.querySelectorAll(
      `.projects [data-filter='${selectedFilter}']`
    );

    if (selectedFilter == "all") {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll(".projects [data-filter]");
    }

    itemsToHide.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("show");
    });

    itemsToShow.forEach((el) => {
      el.classList.remove("hide");
      el.classList.add("show");
    });
  });
});
