let positions;
function getMarkers(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
          positions = (JSON.parse(this.response));
          renderQuestMarkers()
}
};
   xhttp.open("GET", "http://localhost:3000", true);
   xhttp.send();
}
