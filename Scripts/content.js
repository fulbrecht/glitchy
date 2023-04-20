
let prompts = []
fetchPrompts().then((response) =>{
    prompts = response
})

let promptIndex = 0
let glitchCount = 0
let glitchDiv

addMutationObserver()

//watch for mutations and pick random element to 'glitch'
function addMutationObserver() {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if(glitchCount === 0 ){
                const elements = mutation.target.getElementsByTagName('*');
                const visibleElements = getVisibleElements(elements);
                const randomIndex = getRandomIndex(0, visibleElements.length)
                const randomElement = visibleElements[randomIndex]
                promptIndex = getRandomIndex(0,prompts.length)
                glitch(randomElement)
            }
        })
    })
    observer.observe(document.body, { subtree: true, childList: true })
}

//apply the glitch
function glitch(e) {

    glitchDiv = addGlitchDiv(e)
    console.log(glitchDiv)
    
    console.log("Glitch inserted")
    glitchCount = 1
    
}

function addGlitchDiv(e){
    const rect = e.getBoundingClientRect();
    const div = document.createElement("div")
    div.classList.add("glitch")
    div.style.top = `${rect.top + window.scrollY}px`
    div.style.left = `${rect.left + window.scrollX}px`
    div.style.width = `${rect.width}px`
    div.style.height = `${rect.height}px`
    div.addEventListener('mouseleave', handleMouseleave)
    div.addEventListener('click', handleClick)
    document.body.appendChild(div)
    return div
}

function handleMouseleave(){
    const e = glitchDiv
    e.remove()
}

function handleClick(){

    prompts[promptIndex].response = prompt(prompts[promptIndex].question)
    chrome.storage.local.set({prompts}).then(() => {
        console.log('Response to "'+ prompts[promptIndex].question + '" is "' + prompts[promptIndex].response + '".')
    })

}


// Helper functions
async function fetchPrompts(){
    const response = await chrome.runtime.sendMessage({})
    console.log(response)
    return response.prompts
}

function getVisibleElements(elements){
    let visibleElements = []
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if (isVisible(element) && hasText(element)) {
            visibleElements.push(element)
        }
    }
    return visibleElements
}

function isVisible(e){
    if (e.offsetHeight > 0 && e.offsetWidth > 0){
        return true
    }
    return false
}

function hasText(e){
    if (e.textContent){
        return true
    }
    return false
}

function isUserInput(node) {
  const tagName = node.tagName ? node.tagName.toLowerCase() : "";
  return (
    tagName == "input" || tagName == "textarea" || isInsideContentEditable(node)
  );
}

function isInsideContentEditable(node) {
  while (node.parentNode) {
    if (node.contentEditable === "true") {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function getRandomIndex(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
