let rawTextArea = undefined;
let formattedTextArea = undefined;

document.addEventListener("DOMContentLoaded", () => {
        getElements();
        registerEventHandlers();
})

function getElements() {
    rawTextArea = document.querySelector("#raw");
    formattedTextArea = document.querySelector("#formatted");
    console.log(rawTextArea, formattedTextArea)
}

function registerEventHandlers() {
    rawTextArea.addEventListener("input", parseText);
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
    formattedTextArea.value = splitByBreak.join("");;
}
