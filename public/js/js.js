
function removeTags(string, array){
  return array ? string.split("<").filter(function(val){ return f(array, val); }).map(function(val){ return f(array, val); }).join("") : string.split("<").map(function(d){ return d.split(">").pop(); }).join("");
  function f(array, value){
    return array.map(function(d){ return value.includes(d + ">"); }).indexOf(true) != -1 ? "<" + value : value.split(">")[1];
  }
}


function startAudio(){
        document.getElementById("audiooutput").play();
    
    }


function intro(){
    
    document.getElementById("mensaje").innerHTML = "";
    var textointro = "<img src='img/avatar.jpg' class='avatar'><p>Buenos d&iacute;as! </p>[pause]<img src='img/avatar.jpg' class='avatar'><p>Bienvenido a Don Us Company!</p>[pause]<img src='img/avatar.jpg' class='avatar'><p>Somos la marca n.1 de donas en Argentina!</p>[pause]<li><video autoplay loop muted playsinline class='chatimg reply2 videoloading'><source src='img/video-intro-crop.mp4' type='video/mp4'></video></li>[pause]<img src='img/avatar.jpg' class='avatar'><p>Qu&eacute; bueno verte de nuevo!</p>[pause]<img src='img/avatar.jpg' class='avatar'><p>Ya probaste nuestras Donuts?</p>";
    
    var strIntro = textointro. split("[pause]");

var tiempo = 0000;

for(var i = 0; i < strIntro.length; i++){
    
    var cuantasletras = strIntro[i].length;
    if(cuantasletras>100){cuantasletras=100;}
    
 

   (function (i) {
            
              var str1 = "<li>";
              var str3 = "</li>";
              var res = str1.concat(strIntro[i], str3);
              
       setTimeout(function(){ 
       document.getElementById("mensaje").insertAdjacentHTML("beforeend", res);
                document.getElementById("audiooutput").play(); 
                document.getElementById("mensaje").scrollIntoView({ block: 'end',  behavior: 'smooth' });
       }, tiempo);
       
       
   })(i);
   
      tiempo = tiempo + (cuantasletras * 20);
   
document.getElementById("esperando").innerHTML = "<img src='img/avatar.jpg' class='avatar'><div id='typing-loader'></div>";
document.getElementById("esperando").style.display = "block";

}



setTimeout(function(){
    
document.getElementById("esperando").innerHTML = "";

document.getElementById('opcionesdiv').style.display="block";
document.getElementById("opcionesdiv").style.opacity = "1";

                document.getElementById("opcionestit").scrollIntoView({ block: 'start',  behavior: 'smooth' });
            
}, tiempo);

}


function showReply(str, direct, textInput, callback) {
  if (str == "") {
    
    return;
  } else {


document.getElementById("opcionesdiv").style.display = 'none';

if(direct != "yes"){
var botoncito = event.target.textContent;
event.target.style.display = 'none';
}else{
    var botoncito = textInput;
    document.getElementById("mensaje").innerHTML = "";
}




botoncito = "<li class='liquestion'><p class='question'>" + botoncito + "</p></li>";

document.getElementById("mensaje").insertAdjacentHTML("beforeend", botoncito);
document.getElementById("mensaje").lastChild.classList.add("sendinganimation");


var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        
        document.getElementById("mensaje").lastChild.classList.remove("sendinganimation");
                
                  document.getElementById("audiooutput").play(); 
                  
        document.getElementById("esperando").innerHTML = "<img src='img/avatar.jpg' class='avatar'><div id='typing-loader'></div>";
document.getElementById("esperando").scrollIntoView({ block: 'end',  behavior: 'smooth' });

        var myStr = this.responseText;


     
     // buscar pausas   
var strArray = myStr. split("[pause]");

var tiempo = 0000;

for(var i = 0; i < strArray.length; i++){
    
        var cuantasletras = strArray[i].length;
         if(cuantasletras>100){cuantasletras=100;}
    tiempo = tiempo + (cuantasletras * 15);

   (function (i) {
       
            
       setTimeout(function(){ 
       document.getElementById("mensaje").insertAdjacentHTML("beforeend", strArray[i]);
       
              
       document.getElementById("audiooutput").play(); 
          
                    document.getElementById("chat").scrollIntoView({ block: 'end',  behavior: 'smooth' });
                   
   }, tiempo);
   
   
   })(i);

tiempo = tiempo;




}

setTimeout(function(){ 
    if(direct === "yes"){
        showOptions(str, 'yes');
    }else{
            showOptions(str);   
    }
        
        }, tiempo);

history.pushState(null, null, "#" + i);
tiempo = "";
       }
    };
    

    
    xmlhttp.open("GET", "bot.php?q=" + str, true);

setTimeout(function(){ 
    
    xmlhttp.send();

   
}, 1000);
    
    
  
   
  }
  
}


function showReplyFromParent(lanzar, texto){
  document.getElementById("opciones").innerHTML = "";
showReply(lanzar, 'yes', texto);

}

function cleanUp(){
  document.getElementById("mensaje").innerHTML = "";
  document.getElementById("opcionesdiv").style.display = "none";
  for (var i = 0; i <= 20; i++){
    clearTimeout(i);
}
}


function showOptions(str, direct) {
  if (str == "") {
    document.getElementById("opciones").innerHTML = "";
    return;
  } else {
   

   
  document.getElementById("esperando").innerHTML = "<img src='img/avatar.jpg' class='avatar'><div id='typing-loader'></div>";
  
  if(direct!="yes"){
      document.getElementById("chat").scrollIntoView({ block: 'end',  behavior: 'smooth' });
  }
      
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      
          if (this.readyState == 4 && this.status == 200) {
    
               document.getElementById("esperando").innerHTML = "";
               document.getElementById("opcionesdiv").style.opacity = "1";
document.getElementById("opcionesdiv").style.display = "block";
document.getElementById("opciones").innerHTML =  this.responseText;


 if (window.matchMedia("(max-width: 500px)").matches) {
     document.querySelector("#opciones li:nth-of-type(2)").scrollIntoView({ block: 'end',  behavior: 'smooth' });
    
  } else {
           document.querySelector("#opciones li:nth-of-type(2)").scrollIntoView({ block: 'end',  behavior: 'smooth' });

  }
  
       }
      
    };
    
    xmlhttp.open("GET", "options.php?q=" + str, true);
      
      
 
    xmlhttp.send();
    

    
    
  }
}