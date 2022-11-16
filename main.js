timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
label="";

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}
quick_draw_data_set=['cactus','plane','cat','dog','plane','cow','car','football','ice-cream','balloon','fish','tree','lion','pen','face','clouds'];

random_no=Math.floor((Math.random()*quick_draw_data_set.length));
Element_of_array=quick_draw_data_set[random_no];
console.log(Element_of_array);
if(Element_of_array ==undefined){
    Element_of_array=quick_draw_data_set[random_no];
}
else{
    document.getElementById("p3").innerHTML="Sketch To Be Drawn->"+Element_of_array;
};
function setup(){
    canvas=createCanvas(280,240);
    background("pink"); 
    canvas.mouseReleased(classifyCanvas);
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
       line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check_sketch();
    if(drawn_sketch == Element_of_array){
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score: "+score;
    }
}

function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer: "+timer_counter;
    if(timer_counter>500){
        document.getElementById("p1").innerHTML = "Your Sketch: ";
        document.getElementById("p2").innerHTML = "Confidence: ";
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}
    






function updateCanvas(){
    document.getElementById("p3").innerHTML="Sketch To Be Drawn->"+Element_of_array;
    c=color( random(255), random(255), random(255) );
    background(c);
    random_no=Math.floor((Math.random()*quick_draw_data_set.length));
Element_of_array=quick_draw_data_set[random_no];
document.getElementById("p3").innerHTML="Sketch To Be Drawn->"+Element_of_array;
}
function classifyCanvas(){
    classifier.classify(canvas,gotResults);
}
function gotResults(error,results){
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById("p1").innerHTML = "Your Sketch: "+results[0].label;
    document.getElementById("p2").innerHTML = "Confidence: "+Math.round(results[0].confidence * 100)+"%";
}