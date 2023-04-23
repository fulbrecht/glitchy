fetchCount()

async function fetchCount() {
    const response = await chrome.storage.local.get(["prompts"])
    const prompts = response.prompts
    const promptCount = Object.keys(prompts).length
    addTextToPopup(promptCount);
}

function addTextToPopup(text) {
    document.getElementById("count").innerHTML = text
    document.getElementById("message").innerHTML = "prompt(s)"
}