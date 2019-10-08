import React from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  const url = 'https://www.hatchways.io/api/assessment/students';

fetch(url).then((resp) => resp.json()) // Transform the data into json
.then((data)=> {
    let students = data.students; // Get the results
    return students.map((student)=> {
        const arrAvg = arr =>{
            let sum =0;
            for(let i of arr){sum +=parseInt(i)};
            return sum/arr.length
        }

        //create base element
        let div = document.getElementById("list");
        
        //create the content elements 
        let container = document.createElement("div")
        let imgContainer = document.createElement("div")
        let infoContainer = document.createElement("div")
        let h1 = document.createElement("h1");
        let img = document.createElement("img");
        let pEmail = document.createElement("p");
        let pCo = document.createElement("p");
        let pSkill = document.createElement("p");
        let pAvg = document.createElement("p");

        //use the children vaiable to add numbering to ids (nozero based for people)
        let children = div.children.length + 1

       //break out each contaiiner into pic and info
        container.setAttribute("class", "container")
        imgContainer.setAttribute("class", "img-container")
        infoContainer.setAttribute("class", "info-container")
        //set the atttrributes for the various elements we are adding
        h1.setAttribute("id", "name"+children);
        img.setAttribute("id", "image"+children);
        img.setAttribute("src", student.pic);
        pEmail.setAttribute("id", "email"+children);
        pCo.setAttribute("id", "company"+children);
        pSkill.setAttribute("id", "skill"+children);
        pAvg.setAttribute("id", "average"+children);

        //add each element container div
        div.appendChild(container);
        container.appendChild(imgContainer);
        container.appendChild(infoContainer);
        //add the img
        imgContainer.appendChild(img)
        //all text info (who, company, etc.) to add to info container
        infoContainer.appendChild(h1);
        infoContainer.appendChild(pEmail);
        infoContainer.appendChild(pCo);
        infoContainer.appendChild(pSkill);
        infoContainer.appendChild(pAvg);

        
        h1.appendChild(document.createTextNode(student.firstName.toUpperCase() + " " + student.lastName.toUpperCase()));
        pEmail.appendChild(document.createTextNode("Email: "+student.email));
        pCo.appendChild(document.createTextNode("Company: "+student.company));
        pSkill.appendChild(document.createTextNode("Skill: "+student.skill));
        pAvg.appendChild(document.createTextNode("Average: " + arrAvg(student.grades) +"%"));
    })
})

  return (
    <div id="list"></div>
  );
}

export default App;
