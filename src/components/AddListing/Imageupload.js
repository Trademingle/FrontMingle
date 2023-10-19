import React from "react";
import ImageUploading from "react-images-uploading";
import styles from "./review.module.css";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CancelIcon from '@material-ui/icons/Cancel';

// import "./styles.css";

export default function UploadButton(props) {
  const [images, setImages] = React.useState(props.urls);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // debugger;   
    if (typeof addUpdateIndex === "undefined"){
      props.urls.splice(0,props.urls.length);
      props.urls.push(...imageList);
    }else{
      const startIdx = addUpdateIndex[0];
      const endIdx = addUpdateIndex[addUpdateIndex.length-1];
      props.urls.push(...imageList.slice(startIdx,endIdx+1));
    }
    // console.log(imageList, addUpdateIndex);
    setImages([...props.urls]);
    
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
      }) => (
        <div className={styles.wrapper}>
          <button
          className={styles.uploadcontainer}
            onClick={onImageUpload}
            {...dragProps}>
            <AddPhotoAlternateIcon 
              style={{height:70,width:70}} 
              className={styles.addphotoicon}
              />
            <p className={styles.uploadtext}>Upload</p>
          </button>
          &nbsp;
          {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
          
          {imageList.map((image, index) => (
            <div key={index} className={styles.imageitem}>
              <img src={image.data_url} alt="" className={styles.imageview}/>
              <div>
                {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                <CancelIcon onClick={() => onImageRemove(index)} className={styles.closebutton}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}