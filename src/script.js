window.onload = function () {

    // check for query string
    var url = window.location.href;
    var query = url.split("?")[1];
    if(query){
        var queryArray = query.split("&");
        var queryObject = {};
        for(var i = 0; i < queryArray.length; i++){
            var queryItem = queryArray[i].split("=");
            queryObject[queryItem[0]] = queryItem[1];
        }
        
        // get query string values
        var text = decodeURIComponent(queryObject.text);
        var maxWidth = queryObject.maxWidth ? queryObject.maxWidth : 500;
        
        // make website only return image
        document.body.innerHTML = "";
        var img = document.createElement("img");
        img.src = textToImg(maxWidth, text);
        document.body.appendChild(img);


    } else {
        document.getElementById("btn").onclick = function () {

            var maxWidth = document.getElementById("maxWidth").value;
            var text = document.getElementById("text").value;

            // create image
            var img = document.createElement("img");
            img.src = textToImg(maxWidth, text);
            document.getElementById("img").appendChild(img);

        }

        document.getElementById("img").onclick = function () {

            // open image as bufferd file in new tab
            var img = document.getElementById("img").getElementsByTagName("img")[0];
            var win = window.open();
            win.document.write(img.outerHTML);

        }
    }
}


function textToImg(maxWidth, text) {

    // text to image
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = "30px Arial";
    var width = context.measureText(text).width;

    // new line if text is too long for maxWidth
    if(width > maxWidth){
        var words = text.split(" ");
        var line = "";
        var lines = [];
        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = context.measureText(testLine).width;
            if (testWidth > maxWidth) {
                lines.push(line);
                line = words[n] + " ";
            }
            else {
                line = testLine;
            }
        }
        lines.push(line);
    }

    // draw text
    canvas.width = width < maxWidth ? width : maxWidth;
    canvas.height = 30 * lines.length;
    context.font = "30px Arial";
    context.fillStyle = "black";
    
    for(var n = 0; n < lines.length; n++) {
        context.fillText(lines[n], 0, 30 * (n + 1));
    }


    // image to data
    return canvas.toDataURL("image/png");

}