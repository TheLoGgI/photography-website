// Navigation - Lasse


/**
 * Adds the classname to the selected element
 * @param  {Node} NavigationElement The container of navgation
 * @param  {String} className classname of the target/selected navigation element
 * @return {Node}       The element that contains the selected classname
 */
function seletedMenuItem(navElement, searchClassName) {
    // const navElement = document.getElementById(id)

    for (const element of navElement.children) {
        if (element.classList.contains(searchClassName)) {
            return element
        }
    }

    return null
}

/**
 * Transforms the underline to the target element
 * @param  {Node} NavigationElement The container of navgation
 * @return {null}       The element that contains the selected classname
 */
function moveSelection(navElement) {
    const selection = document.getElementById('navSelection')
    const selectedItem = seletedMenuItem(navElement, 'selected')
    const selectedRect = selectedItem.getBoundingClientRect()

    selection.style.transform = `translateX(${selectedRect.x + 5 + 'px'})`
    selection.style.transition = 'transform .3s ease'
    
}


/**
 * Adds the classname to the selected element
 * @param  {Node} Navigation The container of navgation 
 * @param  {String} className classname of the target/selected navigation element
 * @param  {function} callback function for translation or animation
 * @return {null}
 */
function navgationSelectionHandler(navElement, className , callback = null) {
    for (const element of navElement.children) {
       
        element.addEventListener('click', (e) => {
            navigationRemoveClass(navElement, className)
            e.currentTarget.classList.add(className)
            if (callback != null || callback != undefined) {
                callback(navElement)
            }
        })
    }
}

/**
 * Removes all targed classname from previous navigation element.
 * @param  {Id || Node} NavigationElement Targets of the navigation 
 * @param  {String} className classname of the targets navigation element
 * @return {null}      
 */
function navigationRemoveClass(id, className) {
    let navElement = null

    if (typeof id === 'string') {
        navElement = document.getElementById(id)
        
    } else if(typeof id === 'object') {
        navElement = id
    }

    for (const element of navElement.children) {
        if (element.tagName === 'DIV') {
            return
        }
        
        element.classList.remove(className)
       
    }

}

window.addEventListener('DOMContentLoaded', () => {
    const navElement = document.getElementById('menu')
    navgationSelectionHandler(navElement, 'selected', moveSelection)
    
    // Gives time for Font Awesome icons to load in
    setTimeout( () => {
        moveSelection(navElement)
    }, 300)

    // const panelSideMenu = document.getElementById('panel-sidemenu')
    // if (panelSideMenu) {
    //     navgationSelectionHandler(panelSideMenu, 'picked', sidePanel)
    // }
    window.addEventListener('resize', () => moveSelection(navElement))
})

