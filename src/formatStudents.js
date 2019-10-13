import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


class FormatStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
			students: [],
			filteredStudents:[],
			filteredByTags:[],
			idToAddTagTo:0,
		}
		this.toggle=this.toggle.bind(this)
		this.filterByName=this.filterByName.bind(this)
		this.inputForTags=this.inputForTags.bind(this)
  }

	//simple function to take the average of the test scores
	arrAvg(arr){
			let sum =0;
			//used parseInt to make it a Number
			for(let i of arr){sum +=parseInt(i)};
			return sum/arr.length;
		}

	//function to open/expand the div to show all the test scores 
	toggle(id) {
		const students = this.state.students.map((student) => {
			if (student.id === id) {
				// we are going to add the opened property to the student object
				student.opened = student.opened ? false : true;
			}
			return student
		})

		this.setState({
			students, idToAddTagTo:id
		});
	}

	inputForTags = (e) => {
		const val = e.target.value;
		//listen fo the enter key, else it'll fire on every keystroke, also making sure there is a value
		if (e.key === 'Enter' && val) {
			const students=this.state.students.map((student)=>{
				//this is checking to make sure we are adding to the right student
				if(student.id ===this.state.idToAddTagTo){
					console.log("right student")
					///then we can the tags to it
					student.tags.push(val)
				}
				return student
			})
			this.setState({
				students
			});
		}
	}

	filterByName=(e)=>{
		let arr =[];
		let srcStr= e.target.value.toLowerCase()
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

	filterByTag=(e)=>{
		let arr =[];
		let srcStr= e.target.value
		//this bit of logic tells us to search in filterd students if a name has already been searched
		let filledList = this.state.filteredStudents.length!==0?this.state.filteredStudents:this.state.students
		//itorate over to find matching cases
		for(let x of filledList){
			if(x.tags.includes(srcStr)){
				arr.push(x);
			}
		}
		this.setState({
			filteredByTags:arr
		}, () => {console.log('state up to date')})
	}

  componentDidMount() {
		const url = 'https://www.hatchways.io/api/assessment/students';
		fetch(url).then((resp) => resp.json())
		 // turn response data into json
		.then((data)=> {
			data.students.map((student)=>{
				// we are going to add the tags property to the student object
				student.tags=[]
			})
			this.setState({
				students:data.students
			})
		})
  }

  render() {
		//this code allows up to use both serches together see line 88 for other relative code
		// if there is no serch query for tag then use the filter by name array
		//otherwise use the tag array because it will filter the filteredtudent array or default to the student array
		let allFilters = this.state.filteredByTags.length ===0 ? this.state.filteredStudents: this.state.filteredByTags;
		let studentObj = allFilters.length === 0 ? this.state.students : allFilters;

    return (
		<div>
			<input type="text" id="nameFilter" 
			className='filterNamesInput'
			placeholder="Search by name" 
			onChange={this.filterByName}>
			</input>

			<input type="text" id="tagFilter" 
			className='filterTagsInput'
			placeholder="Search by tag" 
			onChange={this.filterByTag}>
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
							{/* change the icon on the button from + to - */}
								{student.opened ?
								<FontAwesomeIcon size="2x" className='icons' icon={faMinus}/>:
								<FontAwesomeIcon size="2x" className='icons'icon={faPlus} />}
							</button>

							{/* adds 'in' to the className which will allter the CSS making the block visiable*/}
							<div className={"collapsible-scores" + (student.opened ? ' in' : '')}>
							<div className='testScores'>
								{/* loop through the student's grads and appended them to the container */}
								{student.grades.map((grades, i)=>{
									return <p>Test {i+1}: {student.grades[i]}%</p>
								})}
								</div>

								<div className='tagContainer'>
									{/* append tags to the container*/}
									<ul className='tagList'>
										{student.tags.map((tag)=>{
											return <li className="individualTag">{tag}</li>
										})}
									</ul>
								</div>

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