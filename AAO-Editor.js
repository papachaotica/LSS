// ==UserScript==
// @name        AAO-Editor V2
// @namespace   leitstellenspiel
// @description Öffnet das bearbeitungsfenster des AAO eintrgas.
// @include     https://www.leitstellenspiel.de/missions/*
// @author	    papahaotica
// @version     2.0.2
// @grant       none
// ==/UserScript==


(function() {
    addNewAAOButton();
    var br = document.createElement("br");
    insertAfter(br,document.getElementById('newAAOButton'));
    insertAfter(createCheckbox(),br);
    insertAfter(createLabel(),document.getElementById('editBox'));


})();


function createCheckbox(){
 var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'edit';
    checkbox.value = 'editing';
    checkbox.id = 'editBox';
    checkbox.innerHTML = 'Bearbeiten';
    checkbox.setAttribute('onclick', 'change()');
    checkbox.onclick = function () {


  if (document.getElementById('editBox').checked)
  {
     addEditHref();
  } else {
      removeHrefs();
  }
 };
    return checkbox;
}


function createLabel(){
    var label = document.createElement('label');
    label.class = 'onoffswitch-label';
    label.htmlFor = 'editBox';
    label.appendChild(document.createTextNode('Bearbeiten'));
    return label;
}


function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;


    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}




function removeHrefs(){
     var aaos = document.getElementsByClassName('btn btn-xs btn-default aao');
    for(var i = 0; i<aaos.length;i++){
        var cur = extractNumber(aaos[i]);
       aaos[i].onclick = function() { return false;};
    }
}


function addEditHref(){
    var aaos = document.getElementsByClassName('btn btn-xs btn-default aao');
    for(var i = 0; i<aaos.length;i++){
        var cur = extractNumber(aaos[i]);
       aaos[i].onclick = function(j) { return function() { onClickLink(j+''); }; }(extractNumber(aaos[i]));
    }
}


function onClickLink(text) {
       return window.location.replace('https://www.leitstellenspiel.de/aaos/'+text+'/edit/');
       }


function extractNumber(aao){
var aaoID = aao.id;
var aaoNr = aaoID.replace(/\D/g,'');
    return aaoNr;
}




function addNewAAOButton(){
    var aaodivs = document.getElementsByClassName('col-sm-2 col-xs-4');
    var aaodiv = aaodivs[5];
    var newButton = document.createElement('a');
    newButton.setAttribute('href','/aaos/new');
    newButton.setAttribute('class','btn btn-xs btn-default btn-success');
    newButton.setAttribute('style','font-size: 8px;');
    newButton.setAttribute('id','newAAOButton');
    var newSpan = document.createElement('span');
    newSpan.setAttribute('class','glyphicon glyphicon-plus');
    newSpan.setAttribute('alt','Neu');
    newButton.appendChild(newSpan);
    aaodiv.appendChild(newButton);
}
