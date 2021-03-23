import MapChart from "./mapchart/MapChart";
import DataPage from "./datapage/DataPage";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import  logo from "./logo.png";
import {useState} from 'react';
import "./Homepage.css";


function Homepage() {

  const [ dataList, updateDataList ] = useState([])
  const [ content, changeContent ] = useState("cost")
  const [ usaState, changeUsaState ] = useState("")
  const [ loading, toggleLoading ] = useState(false)

  return (
    <div className="main">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
        <img
          alt="logo"
          src= {logo}
          width="30"
          height="30"
          style={{
            marginLeft: 15,
            marginRight: 25
          }}
        />
        College Earnings and Costs
        </Navbar.Brand>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <span> 
              Click on a state to see the 10 schools in that state with the
              {content === "cost"? 
                " highest cost of attendance.":
                " highest median earnings 2 years after graduate."
              }
            </span>

            <Button
                variant="link"
                className="button-link"
                style={{display: "block"}}
                disabled={loading}

                onClick={() => {
                  changeContent(content === "cost"? "earning":"cost")
                  updateDataList([])
                  changeUsaState("")
                }}
              >
               I want to see schools with highest {content === "cost"? "median earnings":"costs"}
            </Button>
            
            <br/>

            <span style={{
              display: "block", 
              fontStyle: "italic",
              fontSize: 12
            }}>
              * Data sourse: The U.S. Department of Education. Both cost of attendance and earning data are gathered in 2018.
            </span>

            <br/>

            <MapChart
              updateDataList={ updateDataList }
              changeUsaState = { changeUsaState }
              content = { content }
              usaState = { usaState }
              toggleLoading = { toggleLoading }
            />
          </Col>
          <Col>
            <DataPage
              dataList = { dataList }
              content = { content }
              usaState = { usaState }
              loading = { loading }
            />
          </Col>
        </Row>      
      </Container>
      
    </div>
  );
}

export default Homepage;
