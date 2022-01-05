import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';


class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            list: JSON.parse(localStorage.getItem("myTodoList")) || [],
            editKey:''
        }
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Add item if user input in not empty
    addItem() {
        if (this.state.userInput !== '') {
            const userInput = {

                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);
            localStorage.setItem("myTodoList",JSON.stringify(list))
            // reset state
            this.setState({
                list,
                userInput: ""
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and leave value which we need to delete
        const updateList = list.filter(item => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
            
        });
        localStorage.setItem("myTodoList",JSON.stringify(updateList))
        if(key==this.state.editKey){
            this.setState({editKey:'',userInput:''})
        }

    }
    editItem(item){
        this.setState({userInput:item.value,editKey:item.id})
    }
    update(){
        if (this.state.userInput !== '') {
            let findIndex=this.state.list.findIndex(obj=>obj.id===this.state.editKey)
            this.state.list[findIndex].value=this.state.userInput;
            this.setState({list:this.state.list,editKey:'',userInput:''},()=>{
                localStorage.setItem("myTodoList",JSON.stringify( this.state.list))
            })
            
        } 
    }
    render() {
        return (
            <Container>

                <Row style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: '3rem',
                    fontWeight: 'bolder',
                }}
                >TODO LIST
                </Row>

                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>

                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="add item . . . "
                                size="lg"
                                value={this.state.userInput}
                                onChange={item => this.updateInput(item.target.value)}
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            />
 {this.state.editKey?
                            <Button
                                variant="dark"
                                size="lg"
                                onClick={() => this.update()}
                            >
                               Update
                            </Button>
                     :<Button
                     variant="dark"
                     size="lg"
                     onClick={() => this.addItem()}
                 >
                    ADD
                 </Button>}
                        </InputGroup>

                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <ListGroup>
                            {/* map over and print items */}
                            {this.state.list.map(item => {
                                return (

                                    <ListGroup.Item variant="dark" action as="li"
                                        className="d-flex justify-content-between align-items-start"
                                        key={item.id}
                                       >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.value}</div>

                                        </div>
                                        <Button variant="outline-primary"  onClick={() => this.editItem(item)}>Edit</Button>{' '}
                                        <Button variant="outline-danger"  onClick={() => this.deleteItem(item.id)}>Delete</Button>{' '}
                                    </ListGroup.Item>

                                )
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ToDoList;