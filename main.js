let rawTextArea = undefined;
let formattedTextArea = undefined;
let copyBtn = undefined;
let statusIndicator = undefined;

document.addEventListener("DOMContentLoaded", () => {
        getElements();
        registerEventHandlers();
})

function getElements() {
    rawTextArea = document.querySelector("#raw");
    formattedTextArea = document.querySelector("#formatted");
    copyBtn = document.querySelector("#copyBtn");
    statusIndicator = document.querySelector("#statusText");
    console.log(rawTextArea, formattedTextArea)
}

function registerEventHandlers() {
    rawTextArea.addEventListener("input", parseText);
    copyBtn.addEventListener('click', copyText);
}

function parseText(source) {
    const {value: sourceValue} = source.target;
    let stringified = JSON.stringify(sourceValue);
    let splitByBreak = stringified.split("\\n");

    for(let i = 0; i < splitByBreak.length; i++) {
        if (i % 4 === 0) {
            splitByBreak[i] += `\n---[Verse:${Math.floor(i / 3) + 1}]---\n`;
        } else {
            splitByBreak[i] += '\n';
        }
    }
    formattedTextArea.value = splitByBreak.join("");
}


async function copyText(e) {
    try {
        if (formattedTextArea.value !== "") {
            navigator.clipboard.writeText(formattedTextArea.value);
            statusIndicator.innerHTML = "Text copied!";
        }
    } catch (e) {
        console.log(e);
    }
}