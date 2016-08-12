// Initialize Firebase
// TODO: Replace with your firebase project's customized code snippet
// NOTE: Unless you edit this part, the site won't work out of box!
var config = {
  apiKey: "apiKey",
  authDomain: "projectId.firebaseapp.com",
  databaseURL: "https://databaseName.firebaseio.com",
  storageBucket: "bucket.appspot.com",
};
firebase.initializeApp(config);

var gp = document.querySelector("#dev-dropdown");
gp.querySelector('.gplus').addEventListener('click', function() {
    document.location.href = "https://plus.google.com/+AbarajithanLv";
});
gp.querySelector('.twitter').addEventListener('click', function() {
    document.location.href = "https://twitter.com/imabara";
});
gp.querySelector('.linkedin').addEventListener('click', function() {
    document.location.href = "https://in.linkedin.com/in/abarajithanlv";
});

var course = ["BE","BTECH"];

var semesters = ["sem1","sem2","sem3","sem4","sem5","sem6","sem7","sem8"];

var btech = ["B.Tech-Information Technology","B.Tech Chemical Engg","B.Tech Biotechnology","B.Tech Polymer Technology","B.Tech Plastic Technology",
    "B.Tech Textile Chemistry","B.Tech Textile Technology","B.Tech Fashion Technology","B.Tech Petroleum Engg","B.Tech Chemical and Electrochemical Engg",
    "B.Tech Petrochemical Technology","B.Tech Pharmaceutical Technology","B.Tech Food Technology"];
var be = ["B.E Electronics and Communication Engg","B.E Electrical and Electronics Engg","B.E Electronics and Instrumentation Engg",
    "B.E Instrumentation and Control Engg","B.E Civil Engg","B.E Environmental Engg","B.E Geoinformatics Engg","B.E Aeronautical Engg",
    "B.E Automobile Engg","B.E Mechanical Engg","B.E Production Engg","B.E Material Science and Engg","B.E Manufacturing Engg",
    "B.E Industrial Engg and Management","B.E Mechatronics Engg","B.E Mechanical and Automation Engg","B.E Industrial Engg","B.E Mechanical Engg - Sandwich","B.E Computer Science Engg","B.E BioMedical Engg","B.E Medical Electronics","B.E PetroChemical Engg","B.E Marine Engg","B.E Agriculture Engg","B.E Robotics And Automation","B.E Computer and Communication Engg"];

var beNickNames = ["ECE", "EEE", "EIE", "ICE", "CIVIL", "EE", "GIE", "AERO", "AUTO","MECH", "PE", "MSE", "ME", "IEM", "MECHA", 
                   "MAE", "IE", "MES", "CSE","BIO", "MED", "PCE", "MARINE", "AGRI", "RA", "CCE"];
var btechNickNames = ["IT", "CE", "BIO", "POLY", "PLASTIC", "TC", "TT", "FT", "PE", "CEE","PCE", "PT", "FOOD"];

var grades = ["S","A","B","C","D","E","U"];

var courseValue = 0;
var subjectList = [];

function toggleCourse(el){
    var value = el.selectedIndex;
    var deptBox = document.getElementById("dept-box");
    deptBox.innerHTML = "";
    if(value === 0){
        for(i=0;i<be.length;i++){
            var opt = document.createElement("option");
            opt.value= i;
            opt.innerHTML = be[i];
            deptBox.appendChild(opt);
        }
    }
    if(value === 1){
        for(i=0;i<btech.length;i++){
            var opt = document.createElement("option");
            opt.value= i;
            opt.innerHTML = btech[i];
            deptBox.appendChild(opt);
        }
    }
    courseValue = value;
}

    var startButton = document.getElementById("startButton");
    startButton.addEventListener('click',populateSubjects,false);

function populateSubjects(){
    
    startButton.disabled = true;
    document.getElementById("card_step2").scrollIntoView(true);
    
    var myDiv = document.getElementById("gpa-subjects");
    myDiv.innerHTML = "";
    //var newDiv = document.createElement("div");
    
    var startTag = "<div class='mdl-grid' style='width: auto; margin-left: 16px; margin-right: 16px;'>";
    var itemTag = "<div class='mdl-cell mdl-cell--4-col'>";
    var endTag ="</div>";
    var subjectCount = 0;
    subjectList = [];
    
    var regulation = "Reg2013";
    
    var sem = semesters[document.getElementById("sem-box").value];
    var deptValue = document.getElementById("dept-box").value;
    var dept = "";
    
    if(courseValue === 0){
        //BE
        dept = beNickNames[deptValue];
    }
    if(courseValue === 1){
        //BTECH
        dept = btechNickNames[deptValue];
    }
    
    var semRef = firebase.database().ref("database").child(regulation)
        .child(course[courseValue]).child(dept).child(sem);
    semRef.once("value").then(function(snapshot){
            subjectCount = snapshot.numChildren();

            for(i=0;i<subjectCount;i+=1){
                var subject = {
                    name: snapshot.child("Sub "+(i+1)).child("name").val(),
                    code: snapshot.child("Sub "+(i+1)).child("code").val(),
                    credit: snapshot.child("Sub "+(i+1)).child("credit").val(),
                    elective: snapshot.child("Sub "+(i+1)).child("elective").val(),
                    id: snapshot.child("Sub "+(i+1)).child("id").val()
                };

                var spinner = document.createElement("select");
                spinner.id = "spinner"+(i+1);
                spinner.className = "browser-default";
                spinner.style.verticalAlign = "center";
                var spinnerOption = document.createElement("option");
                spinnerOption.value = 10;
                spinnerOption.innerHTML = "S";
                spinner.appendChild(spinnerOption);
                var spinnerOption = document.createElement("option");
                spinnerOption.value = 9;
                spinnerOption.innerHTML = "A";
                spinner.appendChild(spinnerOption);
                var spinnerOption = document.createElement("option");
                spinnerOption.value = 8;
                spinnerOption.innerHTML = "B";
                spinner.appendChild(spinnerOption);
                var spinnerOption = document.createElement("option");
                spinnerOption.value = 7;
                spinnerOption.innerHTML = "C";
                spinner.appendChild(spinnerOption);
                var spinnerOption = document.createElement("option");
                spinnerOption.value = 6;
                spinnerOption.innerHTML = "D";
                spinner.appendChild(spinnerOption);
                var spinnerOption = document.createElement("option");
                spinnerOption.value = 5;
                spinnerOption.innerHTML = "E";
                spinner.appendChild(spinnerOption);
                var spinnerOption = document.createElement("option");
                spinnerOption.value = 0;
                spinnerOption.innerHTML = "U";
                spinner.appendChild(spinnerOption);

                subjectList.push(subject);

                var headDiv = document.createElement("div");
                headDiv.className = "mdl-grid";

                var itemDiv = document.createElement("div");
                itemDiv.className = "mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone";
                itemDiv.innerHTML = subject.code;
                itemDiv.style.textAlign = "center";
                itemDiv.style.height = "50px";
                itemDiv.style.lineHeight = "50px";
                headDiv.appendChild(itemDiv);

                var itemDiv = document.createElement("div");
                itemDiv.className = "mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone";
                itemDiv.innerHTML = subject.name;
                itemDiv.style.textAlign = "center";
                itemDiv.style.height = "50px";
                itemDiv.style.lineHeight = "50px";
                headDiv.appendChild(itemDiv);

                var itemDiv = document.createElement("div");
                itemDiv.className = "mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--4-col-phone";
                itemDiv.appendChild(spinner);

                headDiv.appendChild(itemDiv);

                myDiv.appendChild(headDiv);

            }

        startButton.disabled = false;
        
        var calcBtn = document.getElementById("calcButton");
        calcBtn.disabled = false;
        calcBtn.addEventListener('click',calculateGPA,false);
      
    });
    
}

function calculateGPA(){
    
    var totalCredits = 0;
    var pointsEarned = 0;
    var totalPoints = 0;
    
    var gpaSum = 0.0;
    
    for(i=0;i<subjectList.length;i++){
        
        var subject = subjectList[i];
        
        var val = document.getElementById("spinner"+(i+1)).value;
        if(val != 0){
            totalCredits += Number(subject.credit);
        }
        pointsEarned += Number(val);
        gpaSum += Number(subject.credit * val);
        
    }
    
    var gpaVal = gpaSum / totalCredits;
    totalPoints = subjectList.length * 10;
    
    document.getElementById("card_step3").scrollIntoView(true);
    document.getElementById("gpaValue").innerHTML = formatValue(gpaVal);
    document.getElementById("creditsText").innerHTML = "Credits : "+totalCredits;
    document.getElementById("pointsText").innerHTML = "Points earned : "+pointsEarned;
    document.getElementById("totalPointsText").innerHTML = "Total points : "+totalPoints;
    
}

function formatValue(val){
    return parseFloat(Math.round(val*100)/100).toFixed(2);
}

