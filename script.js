(function() {
  var cnt = 0;
  var image;
  var imageUrl;
  var more;
  var strangeElements = [];

  function downloadURI(uri) {
    var link = document.createElement("a");
    link.href = uri;
    link.setAttribute('download', null);
    link.click();
  }

  function pollForMore(elem) {
    if (elem.nextElementSibling) {
      walkThroughVisibleImages(elem.nextElementSibling);
      return;
    }
    setTimeout(function() { pollForMore(elem); }, 100);
  }

  function processElem(elem) {
    image = elem.getElementsByClassName('zoom')[0];
    if (!image) {
      strangeElements.push(elem);
      return true;
    }
    imageUrl = image.getAttribute('href');
    if (!!newestAvailable && imageUrl.indexOf(newestAvailable) > -1) {
      return false;
    }
    downloadURI(imageUrl);
    cnt++;
    return true;
  }

  function walkThroughVisibleImages(elem) {
    if (!processElem(elem)) {
      return;
    }
    while (elem.nextElementSibling) {
      elem = elem.nextElementSibling;
      if (!processElem(elem)) {
        return;
      }
      if (cnt % 5 === 0 && elem.nextElementSibling) {
        setTimeout(function() {
          walkThroughVisibleImages(elem.nextElementSibling);
        }, 3000);
        return;
      }
    }
  }

  var newestAvailable = prompt("What is the newest image filename?");
  var container = document.getElementById('image-container');
  var elem = container.firstElementChild;
  walkThroughVisibleImages(elem);
})();
