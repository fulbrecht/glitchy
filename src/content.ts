import { test } from "./test"

let username = ""
let promptIndex = 0
let glitchCount = 0
let glitchDiv

interface Prompt {
    message: string
    response: string 
}
const defaultPrompt: Prompt = {
    message: "Ask a question to your future self",
    response: "" 
}

type Prompts = Array<Prompt>

let glitchPrompts: Prompts = []
glitchPrompts.push(defaultPrompt)

fetchName().then((response) => {
    username = response
})

fetchPrompts().then((response) =>{
    if(response){
        glitchPrompts.push(...response.slice(1))
        test()
    }
    glitch()
})


// addMutationObserver()

// //watch for mutations and pick random element to 'glitch'
// function addMutationObserver() {
//     const observer = new MutationObserver(function (mutations) {
//         mutations.forEach(function (mutation) {
//             if(glitchCount === 0 ){
//                 const elements = mutation.target.getElementsByTagName('*');
//                 const visibleElements = getVisibleElements(elements);
//                 glitch(visibleElements)
//             }
//         })
//     })
//     observer.observe(document.body, { subtree: true, childList: true })
// }

//apply the glitch
function glitch() {
    if(glitchCount === 0 ){
        const elements = document.getElementsByTagName('*');
        const visibleElements = getVisibleElements(elements);

        const randomIndex = getRandomIndex(0, visibleElements.length - 1)
        const randomElement = visibleElements[randomIndex]

        promptIndex = getRandomIndex(0, glitchPrompts.length - 1)
        // console.log(promptIndex, "index")
        // console.log(glitchPrompts.length)
        console.log(glitchPrompts)
        
        glitchDiv = addGlitchDiv(randomElement)
        console.log(glitchDiv)
        
        console.log("Glitch inserted")
        glitchCount = 1
    }
    
}

function addGlitchDiv(e){
    const rect = e.getBoundingClientRect();
    const div = document.createElement("div")
    div.classList.add("glitch")
    
    div.style.top = `${rect.top + window.scrollY}px`
    div.style.left = `${rect.left + window.scrollX}px`
    // div.style.left = `${e.offsetLeft}px`
    // div.style.top = `${e.offsetTop}px`
    // div.style.left = `0px`
    // div.style.top = `0px`
    div.style.width = `${rect.width}px`
    div.style.height = `${rect.height}px`
    if(isFixed(e)){
        div.style.position = "fixed"
    } else if(isSticky(e)){
        div.style.position = "sticky"
    } else {
        div.style.position = "absolute"
    }
    // e.style.backgroundColor = "purple"
    //div.style.fontSize = `${rect.height / 1.2}px`
    div.addEventListener('mouseleave', handleMouseleave)
    div.addEventListener('click', handleClick)
    document.body.appendChild(div)
    // e.parentElement.appendChild(div)

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

    //const promptKey = Object.keys(glitchPrompts)[promptIndex]
    const promptMessage = glitchPrompts[promptIndex].message
    const promptResponse = glitchPrompts[promptIndex].response

    if(!username){
        username = prompt("What is your name?")
        chrome.storage.local.set({username})
    } else if(promptMessage === "Ask a question to your future self"){
        const newQuestion = prompt(promptMessage)
        if(newQuestion){
            const newPrompt= {
                message: newQuestion,
                response: ""
            }
            console.log(typeof glitchPrompts)
            console.log(newPrompt)
            glitchPrompts.push(newPrompt)
        }
    } else if(promptResponse){
        const confirmation = confirm(`Would you like to change your answer to "${promptMessage}" from "${promptResponse}"?`)
        if(confirmation){
            glitchPrompts[promptIndex].response = prompt(promptMessage)
        }
        
    } else {
        glitchPrompts[promptIndex].response = prompt(promptMessage)
        
    }

    chrome.storage.local.set({glitchPrompts}).then(() => {
        console.log('Response to "'+ promptMessage + '" is "' + glitchPrompts[promptIndex].response + '".')
    })

}


// Helper functions
async function fetchName(){
    const response = await chrome.storage.local.get(["username"])
    return response.username
}

async function fetchPrompts(){
    const response = await chrome.storage.local.get(["glitchPrompts"])
    return response.glitchPrompts
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

function isFixed(e) {
    let parent = e.parentElement;

    while (parent) {
        const ePosition = window.getComputedStyle(parent).position
        if ( ePosition === 'fixed') {
            return true;
        }
        parent = parent.parentElement;
    }

    return false;
}

function isSticky(e) {
    let parent = e.parentElement;

    while (parent) {
        const ePosition = window.getComputedStyle(parent).position
        if (ePosition === 'sticky') {
            return true;
        }
        parent = parent.parentElement;
    }

    return false;
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
    return Math.floor(Math.random() * (max - min + 1)) + min
}
