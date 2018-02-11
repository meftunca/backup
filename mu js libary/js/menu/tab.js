let tabContent = document.querySelectorAll(".tab-group");
Array.prototype.forEach.call(tabContent, function(targetItem) {
  let contentGroup = targetItem.querySelector(".content-group"),
    tabGroup = targetItem.querySelector(".tab"),
    linkItem = tabGroup.querySelectorAll(".tab-item");
  /**default Settings */
  if (!tabGroup.querySelector(".tab-item.active")) {
    tabGroup.firstElementChild.classList.add("active");
  }
  if (!contentGroup.querySelector(".tab-content.active")) {
    contentGroup.firstElementChild.classList.add("active");
  }
  Array.prototype.forEach.call(linkItem, function(link) {
    link.addEventListener("click", function(e) {
      let href = this.getAttribute("data-href"),
        tabGroup = this.closest(".tab"),
        contentGroups = tabGroup.nextSibling;
      /** remove active class */
      if (tabGroup.querySelector(".tab-item.active")) {
        let href2 = tabGroup.querySelector(".tab-item.active").getAttribute("data-href");
        tabGroup.querySelector(".tab-item.active").classList.remove("active");
        this.closest(".tab-group").querySelector(".tab-content[data-id=" + href2 + "]").classList.remove("active");
      }
      /** add active class */
      this.classList.add("active");
      contentGroup.querySelector(".tab-content[data-id=" + href + "]").classList.add("active");
    });
  });
});
