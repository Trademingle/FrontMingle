import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api  from '../api/api';

export default function CustomizedHook(props) {

  const generateOptions = (options) => {
    return options.map(function(item) {
      return {title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()};
    });
  }

  // const index = (props.type==="languages") ? 0:1;
  const choosing_options = (props.type==="languages") ? generateOptions(api.languages): generateOptions(api.serviceTypes)
  // debugger;
  if (props.type==="languages") {
    return (
      <Autocomplete
        id="combo-box-demo"
        options={choosing_options}
        getOptionLabel={(option) => option.title}
        style={{ width: "auto" }}
        onChange={(event, newValue) =>{
                                        if (typeof newValue == "string"){
                                          props.information["query"] = newValue;
                                          props.setInformation({...props.information});
                                        }else if ('type' in props && newValue != null && 'title' in newValue){
                                          props.information[props.type] = [newValue['title']];
                                          props.setInformation({...props.information});
                                        }
                                      }
                  }
        renderInput={(params) => <TextField {...params} required style={{paddingTop: 15}} placeholder={props.placeholder} />}
      />
    );
  } else{
    return (
      <Autocomplete
        id="combo-box-demo"
        options={choosing_options}
        getOptionLabel={(option) => option.title?option.title:option}
        style={{ width: "auto" }}
        freeSolo
        defaultValue={props.value?props.value:null}
        onChange={(event, newValue) =>{
                                        if (typeof newValue == "string"){
                                          props.information["query"] = newValue;
                                          props.setInformation({...props.information});
                                        }else if ('type' in props && newValue != null && 'title' in newValue){
                                          props.information[props.type] = [newValue['title']];
                                          props.information["query"] = newValue['title'];
                                          props.setInformation({...props.information});
                                        }
                                      }
                  }
        renderInput={(params) => <TextField {...params} required style={{paddingTop: 15}} placeholder={props.placeholder} />}
      />
    );
  }

}