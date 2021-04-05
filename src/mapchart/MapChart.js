import React from "react";
import { geoCentroid } from "d3-geo";
import axios from "axios";
import { schoolDataAPI, schoolLogoAPI  } from "../APIs/APIs";

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import "./MapChart.css";

import allStates from "./allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};




function fetchSchoolData(params) {
    var queryString=`&school.state=${params.usaState}&fields=school.name,school.school_url,`
    
    var variableField = params.content === "cost"? 
    "2018.cost.attendance.academic_year":
    "2012.earnings.6_yrs_after_entry.median"
    
    var fullApiCall = schoolDataAPI + queryString + variableField

    axios.get(fullApiCall)
      .then((res) => {
        return res.data.metadata.total
      }) // get total number of records
      .then(numOfRecords => {
        var promiseList = []
        for(let i = 0; i <= Math.floor(numOfRecords/100); i++){
          promiseList.push(axios.get(fullApiCall+"&page="+i))
        }
        Promise.all(promiseList)
          .then((resList) => {
            
            var highestDataPoints = []

            resList.map((res) => {
              res.data.results.map((schoolData) => {
                if (schoolData[variableField] != null) {
                if (highestDataPoints.length < 9){
                  highestDataPoints.push(schoolData)
                }
                else if (highestDataPoints.length === 9){
                  highestDataPoints.push(schoolData)
                  highestDataPoints.sort(function(dataObj1, dataObj2){
                    if(dataObj1[variableField] < dataObj2[variableField])
                      return 1
                    if(dataObj1[variableField] > dataObj2[variableField])
                      return -1
                    return 0
                  })
                }
                else {
                  for(let j = 0; j < 10; j++){
                    if ( schoolData[variableField] > highestDataPoints[j][variableField]){
                      highestDataPoints.splice(j, 0, schoolData)
                      break
                    }
                  }
                  if (highestDataPoints.length > 10) // an element is inserted
                    highestDataPoints.pop();
                }
              }
              })

            })

            
            

            params.updateDataList(highestDataPoints)
            params.toggleLoading(false)

            }

          )

      })

  }

function MapChart(props){
    return (
      <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                className="state-geo"
                onClick={()=> {
                  var usaState = allStates.find(s => s.val === geo.id).id
                  props.updateDataList([])
                  props.changeUsaState(usaState)
                  props.toggleLoading(true)
                  fetchSchoolData({
                    usaState: usaState,
                    content: props.content,
                    updateDataList: props.updateDataList,
                    toggleLoading: props.toggleLoading
                  })
                }}
                style={{
                  
                  default: {
                    stroke: "#FFF",
                    fill: "rgb(202, 207, 211)",
                    outline: "none"
                  },

                  pressed: {
                    fill: "rgb(202, 207, 211)",
                    outline: "none"
                  },
                
                  hover: {
                    fill: "grey",
                    outline: "none"
                  }

                }}
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#AAA"
              />
            ))}

            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                      </text>
                    </Marker>
                    ) : (
                    <Annotation
                      subject={centroid}
                      dx={offsets[cur.id][0]}
                      dy={offsets[cur.id][1]}
                    >
                      <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                      </text>
                    </Annotation>
                    )
                    )
                }
                </g>
              );
            })}
            </>
          )}
      </Geographies>
      </ZoomableGroup>
      </ComposableMap>
    );
  }

export default MapChart;