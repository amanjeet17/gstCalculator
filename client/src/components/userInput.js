import React, { Component } from 'react';

import axios from 'axios';
import ItemTable from './itemTable';
import GstChart from './gstChart';

var item={};
class UserInput extends Component {
  constructor(props){
    super(props)
    this.state={
      list:[],
      gst:{}
    }
  }

  optionSelected(event){
    item.gstSlab = event.target.value ;
  }
  handleAddOption = (e) => {
   e.preventDefault();
   item.name = e.target.elements.name.value.trim();
   e.target.elements.name.value = '';
   item.price = e.target.elements.price.value.trim();
   e.target.elements.price.value = '';
   console.log("option",item);
   axios.post('/api/resume/submit',item)
   .then(res=>{
     document.getElementById('gstlist').getElementsByTagName('option')[0].selected = 'selected'
     console.log("response posted successfully",res);
     console.log("xxx",[res.data.dataFields]);
     if(res.data.dataFields.gstSlab === 5){
       let newGst = Object.assign({}, this.state.gst);
       newGst.five = newGst.five +1;
       newGst.total = newGst.total +1;
       this.setState((prevState)=>{

         return{
           list:prevState.list.concat([res.data.dataFields]),
           gst:newGst
         }
       });
     }
     if(res.data.dataFields.gstSlab ===12){
       let newGst = Object.assign({}, this.state.gst);
       newGst.twelve = newGst.twelve +1;
       newGst.total = newGst.total +1;
       this.setState((prevState)=>{
         return{
           list:prevState.list.concat([res.data.dataFields]),
           gst:newGst
         }
       });
     }
     if(res.data.dataFields.gstSlab === 18){
       let newGst = Object.assign({}, this.state.gst);
       newGst.eighteen = newGst.eighteen +1;
       newGst.total = newGst.total +1;
       this.setState((prevState)=>{
         return{
           list:prevState.list.concat([res.data.dataFields]),
           gst:newGst
         }
       });
     }

   })
   .catch(err =>{
     console.log("Error in POST",err);
   });
  };
 componentWillMount(){
   axios.get('/api/resume/all')
   .then(res =>{
     console.log("Get all response",res.data);
     var gstChart={};
     var five=0;
     var twelve = 0;
     var eighteen=0;
     for(var i=0;i<res.data.length;i++){
       if(res.data[i].gstSlab===5){
         five++
       }
       if(res.data[i].gstSlab===12){
         twelve++
       }
       if(res.data[i].gstSlab===18){
         eighteen++
       }
     }
     gstChart.total= five + twelve + eighteen;
     gstChart.five = five;
     gstChart.twelve =twelve;
     gstChart.eighteen= eighteen;
     console.log("GSTCHART".gstchart);
     this.setState({
       list:res.data,
       gst:gstChart
     })

   })
   .catch(err =>{
     console.log("Get All error",err);
   });
 }


  render() {
    console.log("State",this.state);
    return (
      <div className="App">
      <div className="container">
      <h2> Calculate GST </h2>
    <form onSubmit={this.handleAddOption}>
     <div className="row">
       <div id="custom-search-input">
          <div className="input-group col-md-12">
              <div className="col-xs-12 col-sm-4 userinput">
                <input type="text" className="search-query form-control" required placeholder="Item Name" name="name" />
              </div>
              <div className="col-xs-12 col-sm-4 userinput">
                <input type="number" step=".01"className="search-query form-control" required placeholder="Item Price" name="price" />
              </div>
              <div className="col-xs-12 col-sm-2 userinput">
              <select required id='gstlist' onChange={this.optionSelected}>
              <option value="">Select GST Slab</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
              </select>
              </div>
              <div className="col-xs-12 col-sm-2 userinput">
                <button className="btn btn-danger" style={{width:"100%"}} type="submit">Add Item</button>
              </div>
              </div>
        </div>
      </div>
    </form>
    {
      this.state.list.length > 0 ?
      <div>
      <div className="col-xs-12 col-sm-4">
      <GstChart gst={this.state.gst}/>
      </div>
      <div className="col-xs-12 col-sm-8">
        <ItemTable table={this.state.list} />
        </div>
      </div>
      :
      <p>Loading Data ...</p>
    }

    </div>
      </div>
    );
  }
}

export default UserInput;
