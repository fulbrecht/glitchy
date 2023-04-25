fetchCount()

async function fetchCount() {
    const response = await chrome.storage.local.get(["glitchPrompts"])
    const glitchPrompts = response.glitchPrompts
    const promptCount = glitchPrompts.length
    addTextToPopup(promptCount);
}

function addTextToPopup(text) {
    const messageElement = document.getElementById("message")
    const countElement = document.getElementById("count")
    if(countElement){
        countElement.innerHTML = text
    }
    if(messageElement){
        messageElement.innerHTML = "prompt(s)"
    }
}