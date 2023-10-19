import { initial } from "lodash";
import React, { useState } from "react";
import Viewer from "react-viewer/dist/index.js";

export default function ImageViewer(props, close) {
  const [visible, setVisible] = useState(false);
//   debugger
  const renderList = () => {
      let i = 0;
      let tagsCount = props.imagesList.length;
      let tempList = [];
      while (i < tagsCount) {
          tempList.push({src: props.imagesList[i]});
          i += 1;
      };
      return tempList;
  };
  const renderImages = () => {
    let i = 0;
    let tagsCount = props.imagesList.length;
    let tempTags = [];
    while (i < tagsCount && i < 2) {
      tempTags.push(<img src={props.imagesList[i]} style={{height:231, marginRight:10}} alt="" onClick={()=>{setVisible(true)}}/>);
      i += 1;
    };
    return tempTags;
  };
  const ButtonText =() =>{
    if (props.imagesList.length === 0){
      return(<img src='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' style={{height:231, marginRight:10}} alt=""/>)
    }
    else{ 
      return (     
        <div style={{cursor:"pointer"}} >
          <button style={{cursor:"pointer", height:231, width:200, position:'absolute', backgroundImage:'url(' + props.imagesList[0] + ')', backgroundSize:"cover", opacity:0.3}}
            onClick={() => {
              setVisible(true);
            }}/>
          <p style={{position:'absolute', fontSize:'20px', fontWeight:500, marginLeft:'25px', marginTop:'100.5px', width:'150px'}} onClick={() => {setVisible(true);}}>
            Show all Images </p>
        </div> 
              )}
  }
  return (
    <div style={{display:'flex'}}>
      {renderImages()}
        {ButtonText()}
      <Viewer
        visible={visible}
        drag={false}
        rotatable={false}
        scalable={false}
        downloadable={true}
        onClose={() => {
          setVisible(false);
        }}
        images={renderList()}
      />
    </div>
  );
}