// USER - cederdorff
// GITHUB - https://github.com/cederdorff/mdu-e19front/tree/master/spa-modules


class SpaService {
  constructor(defaultPage) {
    this.defaultPage = defaultPage;
    this.pages = document.querySelectorAll(".page");
    this.navItems = document.querySelectorAll(".sidenav a");
    this.pageChange();
  }

  // hide all pages
  hideAllPages() {
    for (let page of this.pages) {
      page.style.display = "none";
    }
  }

  // show page or tab
  showPage(pageId) {
    this.hideAllPages();
    document.querySelector(`#${pageId}`).style.display = "block";
    this.setActiveTab(pageId);
  }

  // sets active tabbar/ menu item
  setActiveTab(pageId) {
    for (let navItem of this.navItems) {
      if (`#${pageId}` === navItem.getAttribute("href")) {
        navItem.classList.add("picked");
        this.sidePanel(navItem)
      } else {
        navItem.classList.remove("picked");
      }
    }

  }

  // navigate to a new view/page by changing href
  navigateTo(pageId) {
    window.location.href = `#${pageId}`;½
  }

  // set default page or given page by the hash url
  // function is called 'onhashchange'
  pageChange() {
    let page = this.defaultPage;
    if (window.location.hash) {
      page = window.location.hash.slice(1);
    }
    this.showPage(page);
  }

  // Sidepanel marker change - Lasse
  sidePanel(navElement) {
    const selection = document.getElementById('sidePanelMenu')
    const selectedRect = navElement.getBoundingClientRect()
    selection.style.transform = `translateY(${selectedRect.y - 100 + 'px'})`
    selection.style.transition = 'transform .3s ease, width .4s ease'
    
}
}
