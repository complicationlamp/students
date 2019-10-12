import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


class FormatStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
			students: [],
			filteredStudents:[],
			open:false,
		}
		this.filter=this.filter.bind(this)
		this.toggle=this.toggle.bind(this)
  }

	arrAvg(arr){
			let sum =0;
			for(let i of arr){sum +=parseInt(i)};
			return sum/arr.length;
		}

	toggle(id) {
		const students = this.state.students.map((student) => {
			if (student.id === id) {
				student.opened = student.opened ? false : true;
			}
			console.log(student)
			return student
		})

		this.setState({
			students
		});
	}


	filter=(e)=>{
		let srcStr= e.target.value.toLowerCase()
		let arr =[];
		for(let x of this.state.students){
			//can search by first or last name and is not cases sensitice 
			if(x.firstName.toLowerCase().includes(srcStr) || x.lastName.toLowerCase().includes(srcStr)){
				arr.push(x)
			}
		};
		
		this.setState({
			filteredStudents:arr
			//added a callback function to force the state to update, redux would be a better option for a production app
		}, () => {console.log('state up to date')})
	}

  componentDidMount() {
		// console.log("herere",this.state.filteredStudents.length)
		const url = 'https://www.hatchways.io/api/assessment/students';
	fetch(url).then((resp) => resp.json()) // Transform the data into json
	.then((data)=> {
		// const updatedStudents = data.students.map((student) => {
		// 	student.opened = false;
		// })
		this.setState({
			students:data.students
		})
	})
  }

  render() {
		//if no letters have been given to the input, then reder the whole list of studetns
		let studentObj = this.state.filteredStudents.length === 0 ? this.state.students : this.state.filteredStudents;


    return (
		<div>
			<input type="text" id="filter" onChange={this.filter}></input>

			{	studentObj.map((student) => {
				// student.opened = false;
				// console.log(student)
				return (
						<div className='container' id={student.id}>
							<div className='img-container'>
								<img alt='pic' src={student.pic}/>
							</div>

							<div className='info-container'>
								<h1>{student.firstName.toUpperCase() + " " + student.lastName.toUpperCase()}</h1>
								<p>Email:{" "+ student.email} </p>
								<p>Company:{" "+ student.company}</p>
								<p>Skill:{" " + student.skill}</p>
								<p>Average:{this.arrAvg(student.grades)}</p>
							</div>
							<button type="button" className="collapsible" onClick={()=>this.toggle(student.id)}>
							{/* change the icon on the buttom */}
								{student.opened ?<FontAwesomeIcon icon={faMinus}/>:<FontAwesomeIcon icon={faPlus} />}
							</button>
							<div className={"collapsible-scores" + (student.opened ? ' in' : '')}>
							{/* <div className="collapsible-scores"> */}
								{/* {grades} */}
								<p>Test 1: {student.grades[0]}%</p>
								<p>Test 2: {student.grades[1]}%</p>
								<p>Test 3: {student.grades[2]}%</p>
								<p>Test 4: {student.grades[3]}%</p>
								<p>Test 5: {student.grades[4]}%</p>
								<p>Test 6: {student.grades[5]}%</p>
								<p>Test 7: {student.grades[6]}%</p>
								<p>Test 8: {student.grades[7]}%</p>
							</div>
						</div>
				)
			})}
		</div>
    )
  }
}

export default FormatStudents 