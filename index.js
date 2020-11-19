var data = "";
var mimeType = "";
var fileName = "";
document.getElementById("file-input").addEventListener(
  "change",
  event => {
    fileToBase64(event).then(result => {
      console.log(result);
      const txt = result.split(",")[1];
      data = txt;
    });
  },
  false
);

// Convert file to base64 string
function fileToBase64(evt) {
  return new Promise(resolve => {
    var file = evt.target.files[0];
    mimeType = file.type;
    fileName = file.name;
    var reader = new FileReader();
    // Read file content on file loaded event
    reader.onload = function(event) {
      resolve(event.target.result);
    };

    // Convert data to base64
    reader.readAsDataURL(file);
  });
}

document.getElementById("download").addEventListener("click", () => {
  download(fileName, data, mimeType);
});

function download(name, content) {
  var link = document.createElement("a");
  link.style.display = "none";
  link.href = `data:application/octet-stream;base64,${encodeURIComponent(content)}`;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

