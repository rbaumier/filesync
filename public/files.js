(function () {
  var files;

  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    console.error('The File APIs are not fully supported in this browser.');
  }

  io().on('file:changed', function (filename, timestamp, content) {
    // ensure that the user has specified a local folder
    if(!files) console.error('You need specify your local folder in order to use the application');

    // only get the local file version
    var modifiedFile = files.filter(function (file) {
      return file.name === filename;
    })[0];

    var reader = new FileReader();

    // file completed
    reader.onload = function (e) {
      console.log(e.target.result)
    }

    reader.readAsText(modifiedFile, 'utf8');
  });

  document.getElementById('files').addEventListener('change', function (e) {
    files = [].slice.call(e.target.files);
  }, false);

}());
