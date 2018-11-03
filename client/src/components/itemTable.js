import React from 'react';

const ItemTable =(props) => {

    return (
      <div>
      <div className="table-responsive" style={{ marginTop:"20px",width: "100%"}}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item Name</th>
              <th>Item Price (Rs)</th>
              <th>GST Slab (%)</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
          {
            props.table.map((list,index)=>{
              return(
                <tr key={index} >
                  <td>{index+1}</td>
                  <td>{list.name}</td>
                  <td>{list.price}</td>
                  <td>{list.gstSlab}</td>
                  <td>{list.totalPrice}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        </div>
      </div>
    );

}

export default ItemTable;
