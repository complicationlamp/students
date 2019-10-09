import React, { Component } from 'react'

class FormatStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
			students: [],
			filteredStudents:[]
		}
		this.filter=this.filter.bind(this)
  }

	arrAvg(arr){
			let sum =0;
			for(let i of arr){sum +=parseInt(i)};
			return sum/arr.length;
		}

	filter=(e)=>{
		let srcStr= e.target.value.toLowerCase()
		let arr =[];
		for(let x of this.state.students){
			//can search by first or last name and is not cases sensitice 
			if(x.firstName.toLowerCase().includes(srcStr) || x.lastName.toLowerCase().includes(srcStr)){
				arr.push(x)
			}else{
				// alert('Sorry no on by the name: ' + srcStr)
			}
		};
		
		this.setState({
			filteredStudents:arr
			//added a callback function to force the state to update, redux would be a better option for a production app
		}, () => {console.log(this.state.filteredStudents)})
	}

  componentDidMount() {
		console.log("herere",this.state.filteredStudents.length)
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
			<input type="text" id="filter" onChange={this.filter}></input>

			{	studentObj.map((student) => {
				return (
						<div className='container'>
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
						</div>
				)
			})}
		</div>
    )
  }
}

export default FormatStudents 