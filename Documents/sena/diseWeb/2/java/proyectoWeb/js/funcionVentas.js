function easyTabs(){
  hora();
  easyTabs1();
}

function allowDrop(ev) {
  ev.preventDefault();
  
}

function dragEnd(ev) {
    ev.preventDefault();
    document.getElementById("erasetab").style.visibility= 'hidden';
  
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  document.getElementById("erasetab").style.visibility= 'visible';
} 

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  eratabform(data);
  document.getElementById(data).remove();
  document.getElementById("erasetab").style.visibility= 'hidden';
  
}

function eratabform(indetab){
  var groups = document.querySelectorAll('.t-tab');
  let forera = document.querySelectorAll('.t-form');
  var quit;
  
    if (groups.length > 0) {
      for (i = 0; i < groups.length; i++) {
        if(groups[i].id == indetab){
          forera[i].remove();
        }
      }
  }
}

function hora(){
  let hoy = new Date();
  let dhoy = hoy.getDate();
   let mhoy =hoy.getMonth()+1;
   let ahoy = hoy.getFullYear();
   let hour = hoy.getHours();
   let min = hoy.getMinutes();
   if(mhoy < 10){ mhoy = "0" + mhoy};
   if(min < 10){ min = "0" + min};

  document.getElementById("dia").innerHTML = dhoy + "/" + mhoy + "/" + ahoy ;
  document.getElementById("hora").innerHTML =   hour + ":" + min;
  var time = setTimeout(function(){ hora() }, 500);
}

function newtab(){

  if ( typeof nta == 'undefined' ) {
    nta = 4;
  }

  const newli = document.createElement("li");
  newli.setAttribute('class','t-tab');
  newli.id="tab" +nta;
  newli.draggable="true";
  newli.setAttribute("ondragstart","drag(event)");
  newli.setAttribute("ondragend","dragEnd(event)");
  newli.setAttribute('index',nta);
  const textNode = document.createTextNode("Venta " + nta);
  newli.appendChild(textNode);

  const newul = document.querySelector('#ulmain');
  newul.insertBefore(newli,newul.children[newul.children.length-1]);
  creaform(nta);
  easyTabs1();
  
  ++nta;

}


function creaform(inc){
  let formu = document.getElementById("formulario");
  let newformu=formu.cloneNode(true);
  newformu.setAttribute('class','t-form');
  newformu.setAttribute('index', inc);
  newformu.id= "form" + inc;

  const newsel = document.querySelector('#forms');
  newsel.insertBefore(newformu,newsel.children[newsel.children.length-1]);

  let chnselect = document.getElementById('drinkList');
  chnselect.id ='drinkList' +inc;
  chnselect.setAttribute('onchange',"enlistar('drinkList" +inc +"','#drinktable" + inc + "','"+inc+"')");

  let chntbldrk = document.getElementById('drinktable');
  chntbldrk.id = 'drinktable' +inc;

  let chnslcsnk = document.getElementById('snacklist');
  chnslcsnk.id ='snacklist' +inc;
  chnslcsnk.setAttribute('onchange',"enlistar('snacklist" +inc +"','#tablesnack" + inc + "','"+inc+"')");

  let chntblsnk = document.getElementById('tablesnack');
  chntblsnk.id = 'tablesnack' +inc;
  
  let chnbtt = document.getElementById('erase');
  chnbtt.id = 'erase' + inc;
  chnbtt.setAttribute('onclick',"eraseall('"+ chntbldrk.id +"','" + chntblsnk.id +"' )");
  
  let chnerabtt = document.getElementById('borrar');
  chnerabtt.id= 'borrar' +inc;
  chnerabtt.setAttribute('onclick',"erasetab()");

  let chntotbtt = document.getElementById('total');
  chntotbtt.id= 'total' +inc;
  chntotbtt.setAttribute('onclick',"totales('.precio"+inc+"', 'latotal"+ inc+"')");

  let chntotlab = document.getElementById('latotal');
  chntotlab.id= 'latotal' +inc;
  
}


function enlistar(selectid, tableid,num){
  let entrada = document.getElementById(selectid).value;
  if ( typeof aux == 'undefined' ) {
    aux = 0;
  }
  if(entrada != ""){
  const tr = document.createElement("tr");
  tr.id= "fila" + aux;
  tr.setAttribute('onclick','thear(event)');
  const table = document.querySelector(tableid);
  table.appendChild(tr);

  document.getElementById(tr.id).innerHTML= "<td id='column" + aux+1 +"'></td> <td class='precio"+num+"' id ='column"+ aux+2 +"'></td> <td id='column"+ aux+3 +"'></td>"
 
  document.getElementById('column' +aux+1).innerHTML= entrada; 
  document.getElementById('column' + aux+2).innerHTML=  price(entrada);
  document.getElementById('column' + aux+3).innerHTML= "<input type='number' class='price' onchange='multi(event)' value='1'> ";

  }
  document.getElementById(selectid).value= "";
  ++aux;
  
}

function price(intr){
  if(snacks[intr]== undefined){
    return drinks[intr]
  }else{
    return snacks[intr]
  }
}

function eraseall(table1,table2){
  eraseall1(table1);
  eraseall1(table2);

}

function eraseall1( valor4) {
  const list = document.getElementById(valor4);
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}

function erase(valor3){
  if (valor3.length > 0) {
    for (i = 0; i < valor3.length; i++) {      
      valor3[i].removeChild();
    }
  }
}

function easyTabs1() {
  
    var clicks = document.querySelectorAll('.t-tab');
    for (i = 0; i < clicks.length; i++) {
      if(i != clicks.length-1){
      clicks[i].onclick = function() {
        last = undefined;
        var tSiblings = this.parentElement.children;
        for (i = 0; i < tSiblings.length; i++) {
          tSiblings[i].className = "t-tab";
        }
        this.className = "t-tab selected";
        var idx = this.getAttribute("index");
        var cSiblings = document.querySelectorAll('.t-form');
        for (i = 0; i < cSiblings.length; i++) {
          cSiblings[i].className = "t-form";
          if (cSiblings[i].getAttribute("index") == idx) {
            cSiblings[i].className = "t-form selected";
          }
        }
      };
    }
  }
}

function thear(event){  
   last = event.target.parentElement;
   document.getElementById(last.id).style.background= 'red';
}

function erasetab(){
  last.remove();
}

function totales(tdclass,lbltot){
  let suma = new Number();
   let totale = document.querySelectorAll(tdclass);
   for (t = 0; t < totale.length; t++) {
    suma = parseInt(totale[t].innerHTML) +suma;
  }
  document.getElementById(lbltot).innerText= suma;
}


function multi(event){
  let sum3 = new Number();
  let sum1 = parseInt(event.target.value);
  colum = event.target.parentElement.id;
  
  if(typeof active == 'undefined' && typeof sum2 == 'undefined'){
    sum2 = parseInt(event.target.parentElement.previousElementSibling.innerHTML);
    active = colum;
    if(event.target.value > 0){
      sum3 = sum1 * sum2;
     event.target.parentElement.previousElementSibling.innerHTML = sum3;
    }
       
  }else if(active == colum){
    if(event.target.value > 0){
      sum3 = sum1 * sum2;
     event.target.parentElement.previousElementSibling.innerHTML = sum3;
    }
    
  }else if (active != colum){
    sum2 = parseInt(event.target.parentElement.previousElementSibling.innerHTML);
    if(event.target.value > 0){
      sum3 = sum1 * sum2;
     event.target.parentElement.previousElementSibling.innerHTML = sum3;
     active = colum;
    }   
  }
}

function chnprice(){
  
}












































/*function easyTabs1() {
    var groups = document.querySelectorAll('.t-container');
    if (groups.length > 0) {
      for (i = 0; i < groups.length; i++) {
        var tabs = groups[i].querySelectorAll('.t-tab');
        for (t = 0; t < tabs.length; t++) {
          tabs[t].setAttribute("index", t+1);
          if (t == 0) tabs[t].className = "t-tab selected";
        }
        var contents = groups[i].querySelectorAll('.t-content');
        for (c = 0; c < contents.length; c++) {
          contents[c].setAttribute("index", c+1);
          if (c == 0) contents[c].className = "t-content selected";
        }
      }
      var clicks = document.querySelectorAll('.t-tab');
      for (i = 0; i < clicks.length; i++) {
        clicks[i].onclick = function() {
          var tSiblings = this.parentElement.children;
          for (i = 0; i < tSiblings.length; i++) {
            tSiblings[i].className = "t-tab";
          }
          this.className = "t-tab selected";
          var idx = this.getAttribute("index");
          var cSiblings = this.parentElement.parentElement.querySelectorAll('.t-content');
          for (i = 0; i < cSiblings.length; i++) {
            cSiblings[i].className = "t-content";
            if (cSiblings[i].getAttribute("index") == idx) {
              cSiblings[i].className = "t-content selected";
            }
          }
        };
      }
    }
 var tabs = document.querySelectorAll('.t-tab');
      for (t = 0; t < tabs.length; t++) {
        if(t != tabs.length-1) {
          tabs[t].setAttribute("index", t+1);
          if (t == 0) tabs[t].className = "t-tab selected"; 
        } 
      } 

      var tabs1 = document.querySelectorAll('.t-form');
      for (t = 0; t < tabs1.length; t++) {
        tabs1[t].setAttribute("index", t+1);
        if (t == 0) tabs1[t].className = "t-form selected";
      }
 
  }*/


  
 
  


