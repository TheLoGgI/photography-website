// Navigation seleted menu item - Lasse
function seletedMenuItem(id) {
    const navElement = document.getElementById(id)

    for (const element of navElement.children) {
        if (element.classList.contains('selected')) {
            return element
        }
    }

    return null

}

function moveSelection() {
    const selection = document.getElementById('navSelection')
    const selectedItem = seletedMenuItem('menu')
    const selectedRect = selectedItem.getBoundingClientRect()

    selection.style.transform = `translateX(${selectedRect.x + 5 + 'px'})`
    selection.style.transition = 'transform .3s ease, width .4s ease'
    
}


function navgationSelectionHandler(id) {
    const navElement = document.getElementById(id)
    for (const element of navElement.children) {
       
        element.addEventListener('click', (e) => {
            navigationRemoveClass(navElement)
            e.currentTarget.classList.add('selected')
            moveSelection()
        })
    }
}

function navigationRemoveClass(id) {
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
        
        element.classList.remove('selected')
       
    }

}

window.addEventListener('DOMContentLoaded', () => {
    
    navgationSelectionHandler('menu')
    
    setTimeout( () => {
        moveSelection()
    }, 200)
})


window.addEventListener('resize', () => moveSelection())