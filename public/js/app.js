var SiteForge = (function($) {
  
  'use strict';

  // Chache DOM elements
  var $dropArea = $(".drop"),
      $ul = $(".component-menu"),
      $components = $(".component"),
      $dropDowns = $(".dropdown"),
      $previewArea = $(".preview"),
      $dropPlaceholder = $(".placeholder"),
      $exportButton = $(".preview > button");
  
  var _siteStructure = "";

  // config objects
  var draggableConfig = {
    cursor: "move",
    revert: true,
    start: function() {
      $dropDowns.css("overflow", "visible");
    },
    stop: function() {
      $dropDowns.css("overflow", "auto");
    }
  };

  var droppableConfig = {
   accept: ".component",
   hoverClass: "drop-active",
   drop: function(e, ui) {
     $dropPlaceholder.hide();
     $exportButton.css("display", "block");
     var el = ui.draggable[0];
     $(this).append("<figure>" +
                      "<img src=\"" + el.src + "\" name=\"" + el.name + "\" data-id=\"" + el.dataset.id + "\" class='component-image' />" +
                      "<figcaption>" +
                        "<span class=\"remove\">X</span>" +
                      "</figcaption>" +
                    "</figure>");
     constructSiteStructure();
    }
  }
      
  var sortableConfig = {
    containment: "body",
    tolerance: "pointer",
    cursor: "move",
    items: "figure",
    update: function() {
      constructSiteStructure();
      removeExportButton();
    }
  }; 
 
  var constructSiteStructure = function() {
    var components = $(".preview img");
    _siteStructure = "";
    $.each(components, function(index, val) {
      console.log(val);
    });

  }

  var removeExportButton = function() {
    var figureElements = $(".preview figure");
    if(!figureElements.length) {
      $exportButton.css("display", "none");
    }
  }

  var resetDropdowns = function() {
    $dropDowns.css({
      display: "none",
      visibility: "hidden"
    });
  }

  var activateDropdown = function(el) {
    el.css({
      display: "block",
      visibility: "visible"
    });
  }

  var changePreviewWidth = function(condition) {
    condition = condition || "";

    if(condition === "shrink") {
      $previewArea.css("width", "70%");
      $dropArea.css("width", "660px");
    } else {
      $previewArea.css("width", "83%");
      $dropArea.css("width", "900px");
    }
  }
  
  var componentMenuCallback = function() {
   $ul.children().removeClass("active");
    $(this).addClass("active");

    var $dropdown = $(this).find(".dropdown");
    $dropdown.children().removeClass("active");

    if($dropdown.css("display") === "block") {
      resetDropdowns();
      changePreviewWidth();
      $ul.children().removeClass("active");
    } else {
      resetDropdowns();
      activateDropdown($dropdown);
      changePreviewWidth("shrink");
    }
  }
  
  var removeComponent = function() {
    $(this).closest("figure").remove();
    if($dropArea.children().length === 1) {
      $dropPlaceholder.show();
    }
    constructSiteStructure();
    removeExportButton();
  }

  var setupListeners = function() {
    $ul.on("click", "li", componentMenuCallback);
    $dropArea.on("click", ".remove", removeComponent);
  }
  
  var setupDragAndDrop = function() {
    $components.draggable(draggableConfig);
    $dropArea.droppable(droppableConfig);
    $dropArea.sortable(sortableConfig);
  }


  return {
    init: function() {
      setupListeners();
      setupDragAndDrop();
    }
  }
  
})(jQuery);

SiteForge.init();
