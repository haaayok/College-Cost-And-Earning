import React from "react";
import { Row, Col, Table } from "react-bootstrap"
import loading from "./loading.gif"
import { schoolLogoAPI } from "../APIs/APIs"


function getBaseURL(url){
  var parts = url.split("www.")
  var latterPart = parts[parts.length - 1]
  console.log(latterPart)
  return latterPart.split("/")[0]
}

function DataPage(props){

    var i = 0
    var variableField = props.content === "cost"? 
    "2018.cost.attendance.academic_year":
    "2012.earnings.6_yrs_after_entry.median"

    return(
      <div>
        {props.loading && 
          <img
            src={loading} 
            alt="loading..."
            with={200}
            height={200}
            style={{
              position: "absolute",
              display: "inline-block",
              top: "30%",
              left: "30%"
            }}
          />
        }

        <Table>

          <thead>
            <tr>
              <th> # </th>
              <th width={500}> {props.usaState} schools  </th>
              <th> {props.content}/year </th>
            </tr>
          </thead>

          <tbody>
            {props.dataList.map( (schoolData) => {
              return (
                <tr key={i}>
                  <td> {++i} </td>
                  <td>
                    <Row>
                      <Col xs={2}>
                        <img
                          width = "30"
                          height = "30"
                          src={schoolLogoAPI+getBaseURL(schoolData["school.school_url"])}
                          alt=""
                        />
                      </Col>

                      <Col>
                    <a
                      href={(schoolData["school.school_url"].includes("://")?
                            "":"https://")
                            + schoolData["school.school_url"]}
                      target="_blank"
                      style={{
                        fontSize: 16,
                        fontWeight: "bold"
                      }}
                    >
                      
                      {schoolData["school.name"]}
                    </a>
                    </Col>
                    </Row>
                  </td>
                  <td> ${schoolData[variableField]} </td>
                </tr>
              )
            })}
          </tbody>

        </Table>
      </div>
    );
}


export default DataPage;