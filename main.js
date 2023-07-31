function setup(){
     canvas = createCanvas(640,420)
     canvas.center()
     ObjD = ml5.objectDetector('cocossd',modelLoaded)
     document.getElementById("status").innerHTML = "Status : DETECTING OBJECT"
}

img =""
model_status = ""
objects = []

function preload(){
     img = loadImage("apple.png")
}

function modelLoaded(){
     console.log("model is ready")
     model_status = true
     ObjD.detect(img,gotResults)
}

function gotResults(error,results){
     if(error){
          console.log(error)
     }
          console.log(results)
          objects = results
     }


function draw(){
    image(img,0,0,640,420)
     if(model_status != ""){
          for(i=0; i<objects.length; i++){
               document.getElementById("status").innerHTML = "Status : OBJECTS DETECTED"
               fill("red")
              percentage =  floor(objects[i].confidence*100)
               text(objects[i].label +" "+percentage+"%",objects[i].x,objects[i].y)
               noFill()
               stroke("red")
               rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
          }

     }
}