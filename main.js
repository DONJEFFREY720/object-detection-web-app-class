function setup(){
     canvas = createCanvas(380,380)
     canvas.center()
     video = createCapture(VIDEO) ;
     video.hide()
}

function start(){
     ObjD = ml5.objectDetector('cocossd',modelLoaded)
     document.getElementById("status").innerHTML = "Status : DETECTING OBJECT"
}

img =""
model_status = ""
objects = []



function modelLoaded(){
     console.log("model is ready")
     model_status = true
    
}

function gotResults(error,results){
     if(error){
          console.log(error)
     }
          console.log(results)
          objects = results
     }


function draw(){
    image(video,0,0,380,380)
     if(model_status != ""){

          r = random(255)
          g = random(255)
          b = random(255)

          ObjD.detect(video,gotResults)


          for(i=0; i<objects.length; i++){
               document.getElementById("status").innerHTML = "Status : OBJECTS DETECTED"
               document.getElementById("num_obj").innerHTML = "No. of objects :  "+objects.length
               fill(r,g,b)
              percentage =  floor(objects[i].confidence*100)
               text(objects[i].label +" "+percentage+"%",objects[i].x,objects[i].y)
               noFill()
               stroke(r,g,b)
               rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
          }

     }
}