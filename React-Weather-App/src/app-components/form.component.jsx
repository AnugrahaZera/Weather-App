import React from "react";
import "./form.styles.css";

const Form = props=>{
return(
<div className="container">
    <div>{props.error ?error():null}</div>
    <Form on submit={props.loadweather}>
<div className="row">
<div className="col-md-3 offset-md-2">
    <input type="text"className="form-control"name="city"autoComplete="off"placeholder="city"/>
</div>
<div className="col-md-3">
    <input type="text"className="form-control"name="country"autoComplete="off"placeholder="country"/>
</div>
<div className="col-md-3 mt-md-0 py-2 text-left">
    <button className="btn btn-warning">Get Weather</button>
</div>


</div>
</Form>








</div>
);

};

function error(){
    <div className="alert alert danger-mx-5">
Please Enter City And Country
    </div>
}

export default Form;