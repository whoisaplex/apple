export default class DebugConsole {
    constructor(htmlElement){
        this.htmlElement = htmlElement; 
    }

    log(...logs) {
        this.htmlElement.innerHTML += `<p><code>${logs}</code></p>`;
    }

    clearLog(){
        this.htmlElement.innerHTML = ""; 
    }
}