addMutationObserver()
let prompts = []
fetchPrompts()
let promptIndex = 0
let glitchCount = 0
let glitchNode
let oldHTML
let oldStyle
let message



//blinking animation for glitch
const style = document.createElement('style')
style.innerHTML = `
    @keyframes blinking {
    0% { opacity: 1; }
    50% { opacity: 0.1; }
    100% { opacity: 1; }
    }
    `
    
document.head.appendChild(style);

//watch for mutations and pick random element to 'glitch'
function addMutationObserver() {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if(glitchCount === 0 ){
                const elements = mutation.target.getElementsByTagName('*');
                const visibleElements = getVisibleElements(elements);
                const randomIndex = getRandomIndex(0, visibleElements.length)
                const randomElement = visibleElements[randomIndex]
                glitchNode = randomElement
                promptIndex = getRandomIndex(0,prompts.length)
                glitch(randomElement)
            }
        })
    })
    observer.observe(document.body, { subtree: true, childList: true })
}

//apply the glitch
function glitch(node) {
    oldHTML = node.innerHTML
    oldStyle  = node.style
    node.style.backgroundColor = 'green'
    node.style.animation = 'blinking 1s infinite'
    node.addEventListener('mouseenter', handleMouseenter)
    node.addEventListener('mouseleave', handleMouseleave);
    node.addEventListener('click', handleClick)

    console.log("Glitch inserted")
    glitchCount = 1

}

//hover effect
function handleMouseenter(){
    const e = glitchNode
    e.innerHTML = ''
    e.style.backgroundColor = 'red'
    if(message){
        e.textContent = message
    } else {
        e.textContent = 'click me'
    }
}

function handleMouseleave(){
    const e = glitchNode
    e.style = oldStyle
    e.innerHTML = oldHTML
    //node.removeEventListener('mouseenter', handleMouseenter)
    //node.removeEventListener('click', handleClick)
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
    prompts = response.prompts;
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
