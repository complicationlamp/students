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
        let h1 = document.createElement("h1");
        let img = document.createElement("img");
        let pEmail = document.createElement("p");
        let pCo = document.createElement("p");
        let pSkill = document.createElement("p");
        let pAvg = document.createElement("p");

        //use the children vaiable to add numbering to ids (nozero based for people)
        let children = div.children.length + 1

        //set the atttrributes for the various elements we are adding
        container.setAttribute("class", "container")
        h1.setAttribute("id", "name"+children);
        img.setAttribute("id", "image"+children);
        img.setAttribute("src", student.pic);
        pEmail.setAttribute("id", "email"+children);
        pCo.setAttribute("id", "company"+children);
        pSkill.setAttribute("id", "skill"+children);
        pAvg.setAttribute("id", "average"+children);

        //add each element to the container div
        div.appendChild(container);
        container.appendChild(img);
        container.appendChild(h1);
        container.appendChild(pEmail);
        container.appendChild(pCo);
        container.appendChild(pSkill);
        container.appendChild(pAvg);
        
        h1.appendChild(document.createTextNode(student.firstName + " " + student.lastName));
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
