(function () {
  var files;

  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    console.error('The File APIs are not fully supported in this browser.');
  }

  io().on('file:changed', function (filename, timestamp, content) {
    // ensure that the user has specified a local folder
    if (!files) console.error('You need specify your local folder in order to use the application');

    // only get the local file version
    var modifiedFile = files.filter(function (file) {
      return file.webkitRelativePath === filename;
    })[0];

    if (!modifiedFile) return console.error('A file was modified but cannot be found locally');

    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    var reader = new FileReader();

    // file completed
    reader.onload = function (e) {
      // diff between e.target.result (local file) and content (server file)
      var diff = JsDiff.diffLines(e.target.result, content);
      _.forEach(diff, function (part) {
        // green for additions, red for deletions, grey for common parts
        var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
        var span = document.createElement('span');
        span.style.color = color;
        span.appendChild(document.createTextNode(part.value));
        display.appendChild(span);
      });
    }

    reader.readAsText(modifiedFile, 'utf8');
  });

  document.getElementById('files').addEventListener('change', function (e) {
    files = _.toArray(e.target.files);
  }, false);

}());
