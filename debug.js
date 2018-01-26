class DebugConsole {
    constructor(htmlElement){
        this.htmlElement = htmlElement; 
        this.history = [];
        this.undreadlogs = false; 
    }

    log(log = {}) {
        this.htmlElement.innerHTML += `<p><code>${log.type ? log.type + ':' : ''} ${log.message}</code></p>`;
        this.history.push(log); 
    }

    clearLog(){
        this.htmlElement.innerHTML = ""; 
    }
}
