addMutationObserver()
let glitchCount = 0

const style = document.createElement('style')

style.innerHTML = `
    @keyframes blinking {
    0% { opacity: 1; }
    50% { opacity: 0.1; }
    100% { opacity: 1; }
    }
    `
    
    document.head.appendChild(style);
    
    function addMutationObserver() {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                const elements = mutation.target.getElementsByTagName('*');
                let visibleElements = []
                // loop through all the elements and check if they are visible
                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    if (isVisible(element) && hasText(element)) {
                        visibleElements.push(element);
                    }
                }
                
                const randomIndex = Math.floor(Math.random() * visibleElements.length)
                const randomElement = visibleElements[randomIndex]
                glitch(randomElement)
            })
        })
        observer.observe(document.body, { subtree: true, childList: true })
    }
    
    function glitch(node) {
        if (glitchCount === 0){
            const oldHTML = node.innerHTML
            const oldStyle  = node.style
            node.style.backgroundColor = 'green'
            node.style.animation = 'blinking 1s infinite'
            node.addEventListener('mouseenter', () => {
                node.style.backgroundColor = 'red'
                node.textContent = 'hello world'
              });
              node.addEventListener('mouseleave', () => {
                node.style = oldStyle
                // node.style.animation = ''
                node.innerHTML = oldHTML
              });
            glitchCount = 1
    
        }
    }
    
    // Helper functions
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
