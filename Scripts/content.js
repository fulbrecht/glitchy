let username = ""
let prompts = {
    "Ask a question to your future self":""
}

fetchName().then((response) => {
    username = response
})
fetchPrompts().then((response) =>{
    prompts = {...prompts, ...response}
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
                glitch(visibleElements)
            }
        })
    })
    observer.observe(document.body, { subtree: true, childList: true })
}

//apply the glitch
function glitch(elements) {
    const randomIndex = getRandomIndex(0, elements.length)
    const e = elements[randomIndex]

    promptIndex = getRandomIndex(0,Object.keys(prompts).length - 1)
    console.log(promptIndex)
    console.log(prompts)
    
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
    div.style.fontSize = `${rect.height / 1.2}px`
    div.addEventListener('mouseleave', handleMouseleave)
    div.addEventListener('click', handleClick)
    document.body.appendChild(div)

    const span = document.createElement("span")
    if(username){
        span.textContent = `Hi ${username}`
    } else {
        span.textContent = "Click Me"
    }

    div.appendChild(span)

    return div
}

function handleMouseleave(){
    const e = glitchDiv
    e.remove()
    glitchCount = 0
}

function handleClick(){

    const promptKey = Object.keys(prompts)[promptIndex]

    if(!username){
        username = prompt("What is your name?")
        chrome.storage.local.set({username})
    } else if(promptKey === "Ask a question to your future self"){
        const newPrompt = prompt(promptKey)
        if(newPrompt){
            prompts[newPrompt] = ""
        }
    } else if(prompts[promptKey]){
        const confirmation = confirm(`Would you like to change your answer to "${promptKey}" from "${prompts[promptKey]}"?`)
        if(confirmation){
            prompts[promptKey] = prompt(promptKey)
        }
        
    } else {
        prompts[promptKey] = prompt(promptKey)
        
    }

    chrome.storage.local.set({prompts}).then(() => {
        console.log('Response to "'+ promptKey + '" is "' + prompts[promptKey] + '".')
    })

}


// Helper functions
async function fetchName(){
    const response = await chrome.storage.local.get(["username"])
    return response.username
}

async function fetchPrompts(){
    // const response = await chrome.runtime.sendMessage({})
    const response = await chrome.storage.local.get(["prompts"])
    console.log(response)
    return response.prompts
}

function getVisibleElements(elements){
    let visibleElements = []
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if (isVisible(element)) {
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
