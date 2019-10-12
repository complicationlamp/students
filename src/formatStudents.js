import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


class FormatStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
			students: [],
			filteredStudents:[],
			idToAddTagTo:0,
		}
		this.filterByName=this.filterByName.bind(this)
		this.toggle=this.toggle.bind(this)
		this.inputForTags=this.inputForTags.bind(this)
  }

	arrAvg(arr){
			let sum =0;
			for(let i of arr){sum +=parseInt(i)};
			return sum/arr.length;
		}

	toggle(id) {
		const students = this.state.students.map((student) => {
			if (student.id === id) {
				///////////////////////////////////////////////////////////////////////
				student.tags=0?student.tags=[]:student.tags;
				///////////////////////////////////////////////////////////////////////
				student.opened = student.opened ? false : true;
			}
			// console.log(student)
			return student
		})

		this.setState({
			students, idToAddTagTo:id
		});
	}

///////////////////////////////////////////////////////////////////////
	inputForTags = (e) => {
		const val = e.target.value;
		const students=this.state.students.map((student)=>{
			if(student.id ===this.state.idToAddTagTo){
				console.log("right student")

				///then we can the tags to it
				student.tags=student.tags=[val]
			}
			console.log(student)
			return student
		})
///////////////////////////////////////////////////////////////////////
		if (e.key === 'Enter' && val) {
			console.log("hit enter for " + val)
			this.setState({
				students
			});
		}
	}


	filterByName=(e)=>{
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
		const url = 'https://www.hatchways.io/api/assessment/students';
		fetch(url).then((resp) => resp.json()) // Transform the data into json
		.then((data)=> {
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
			<input type="text" id="filter" 
			className='filterNamesInput'
			placeholder="Search by name" 
			onChange={this.filterByName}>
			</input>

			{	studentObj.map((student) => {

				return (
						<div className='container' id={student.id}>
							<div className='img-container'>
								<img alt='pic' src={student.pic}/>
							</div>

							<div className='info-container'>
								<h1>{student.firstName.toUpperCase() + " " + student.lastName.toUpperCase()}</h1>
								<div className='personalInfo'>
									<p>Email:{" "+ student.email} </p>
									<p>Company:{" "+ student.company}</p>
									<p>Skill:{" " + student.skill}</p>
									<p>Average:{this.arrAvg(student.grades)}</p>
								</div>
							</div>
							<button type="button" className="collapsible" onClick={()=>this.toggle(student.id)}>
							{/* change the icon on the buttom */}
								{student.opened ?
								<FontAwesomeIcon size="2x" className='icons' icon={faMinus}/>:
								<FontAwesomeIcon size="2x" className='icons'icon={faPlus} />}
							</button>
							<div className={"collapsible-scores" + (student.opened ? ' in' : '')}>
								<p>Test 1: {student.grades[0]}%</p>
								<p>Test 2: {student.grades[1]}%</p>
								<p>Test 3: {student.grades[2]}%</p>
								<p>Test 4: {student.grades[3]}%</p>
								<p>Test 5: {student.grades[4]}%</p>
								<p>Test 6: {student.grades[5]}%</p>
								<p>Test 7: {student.grades[6]}%</p>
								<p>Test 8: {student.grades[7]}%</p>
							
								<input type='text'
								className='tagInput' 
								placeholder="Add a tag"
								onKeyDown={this.inputForTags}>
								</input>
							</div>
						</div>
				)
			})}
		</div>
    )
  }
}

export default FormatStudents 