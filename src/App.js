import React from "react";

import './App.css';
import ToDoList from "./ToDoList";
class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'ToDo'
    }
  }
  tabChangeHandler = (tab) => {

    this.setState({ activeTab: tab })
  }
  render() {
    return (
    <React.Fragment>

        <button className="tablink" onClick={e => this.tabChangeHandler('ToDo')} style={{ background: this.state.activeTab === 'ToDo' ? 'green' : '#555' }}>My To Do List</button>
        <button className="tablink" onClick={e => this.tabChangeHandler('userData')} style={{ background: this.state.activeTab === 'userData' ? 'green' : '#555' }}>User List</button>
        
          {{
            "ToDo": <ToDoList></ToDoList>,
            "userData": null,
          }[this.state.activeTab]}

          </React.Fragment>
      
    
    )
  }
}
export default Tab;
