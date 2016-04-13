var galleryResetTimeout;

var Gallery = function(location, amount) {
  this.location = location;
  this.amount = amount;
};

var galleries = {
  comp2016: new Gallery("2016-comp", 22),
  build2016: new Gallery("2016-build", 28),
  bag2016: new Gallery("2016-bag", 30)
};

var selectedGal = galleries.comp2016;

var showImage = function(image, state) {
  if(state) {
    $("#image-full-outer").removeClass("non-bootstrap-hidden");
    $(".image-full").attr("src", image);
  }
  else {
    $("#image-full-outer").addClass("non-bootstrap-hidden");
  }
};

var incrementImage = function() {
  var src = $(".image-full").attr("src");
  var firstDigit = src.substr(src.length - 5, 1);
  var secondDigit = src.substr(src.length - 6, 1);
  firstDigit++;
  if(firstDigit === 10) {
    if(secondDigit === "/") {
      secondDigit = 1;
      firstDigit = 0;
    } else {
      secondDigit++;
      firstDigit = 0;
    }
  }

  if(firstDigit + 10*secondDigit > selectedGal.amount) {
    firstDigit = "0";
    secondDigit = "";
  }

  var result = selectedGal.location + "/" + secondDigit + "" + firstDigit + ".jpg";
  showImage(result, true);
};

var decrementImage = function() {
  var src = $(".image-full").attr("src");
  var firstDigit = src.substr(src.length - 5, 1);
  var secondDigit = src.substr(src.length - 6, 1);
  firstDigit--;
  if(firstDigit === -1) {
    if(secondDigit === "/") {
      secondDigit = Math.floor(selectedGal.amount/10);
      firstDigit = selectedGal.amount % 10;
    } else if(secondDigit === 1) {
      secondDigit = "";
      firstDigit = 9;
    } else {
      secondDigit--;
      firstDigit = 9;
    }
  }

  if(firstDigit + 10*secondDigit < 0) {
    firstDigit = selectedGal.amount % 10;
    secondDigit = Math.floor(selectedGal.amount/10);
  }

  if(secondDigit === 0) {
    secondDigit = "";
  }

  var result = selectedGal.location + "/" + secondDigit + "" + firstDigit + ".jpg";
  showImage(result, true);
};

var resetGallery = function() {
  $(".image-thumb-outer").animate({opacity: 0}, 250, function() {
    $(this).remove();
  });
  clearTimeout(galleryResetTimeout);
  galleryResetTimeout = setTimeout(function() {
    for(i = 0; i <= selectedGal.amount; i++) {
      $("#gallery-content").append(
          '<div class="image-thumb-outer">'
          + '<img class="image-thumb" height="87.5px" width="auto" src="'+selectedGal.location+'/'+i+'.jpg"/>'
        + '</div>');
    }
    $(".image-thumb-outer").on("click", function() {
      showImage($(this).children().attr("src"), true);
    });
  }, 200);
};

$(document).ready(function() {
  resetGallery();

  $("#image-full-outer").click(function() {
    showImage("", false);
  });

  $("#image-full-outer > img, #image-full-left, #image-full-right").click(function(event) {
    event.stopPropagation();
  });

  $(".btn-gallery").click(function() {
    $(".btn-gallery").removeClass("selected");
    $(this).addClass("selected");
    resetGallery();
  });

  $(document).keydown(function(e) {
    if(!($("#image-full-outer").hasClass("non-bootstrap-hidden"))) {
      switch(e.which) {
          case 37: // left
          decrementImage();
          break;

          case 39: // right
          incrementImage();
          break;
      }
      e.preventDefault();
    }
  });
});