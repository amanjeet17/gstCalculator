import React from 'react';
import {RadialChart} from 'react-vis';


 const GstChart = (props) =>{
   const myData = [{angle: props.gst.five,label:'('+props.gst.five*100/props.gst.total+'%)'}, {angle: props.gst.twelve,label:'('+props.gst.twelve*100/props.gst.total+'%)'}, {angle: props.gst.eighteen,label:'('+props.gst.eighteen*100/props.gst.total+'%)'}]
   return(
     <div className="chart">
     <h4>GST % Pie Chart </h4>
     <ul>
        <li className="slab">5% Slab</li>
        <li className="slab">12% Slab</li>
        <li className="slab">18% Slab</li>
      </ul>
     <RadialChart
     data={myData}
     width={300}
     height={290}
     stroke={'#ccc'}
     strokeWidth={2}
     labelsRadiusMultiplier={0.7}
     labelsStyle={{
       fontSize: 20
      }}
      showLabels />
      </div>
   )
 }

export  default GstChart;
