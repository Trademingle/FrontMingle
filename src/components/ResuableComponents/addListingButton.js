import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
// import AddIcon from '@material-ui/icons/Add';

const AddListingButtonDesign = withStyles((theme) => ({
    root: {
      borderRadius:44,
      backgroundColor: '#2B64D2',
      '&:hover': {
        backgroundColor: '#003ba0',
      },
      color: 'white',
      height: '40px',
    },
}))(Button);

export default function AddListingButton() {
    return(
      <div>
            <Link to='../AddListing' style={{textDecoration:'none'}}>
                <AddListingButtonDesign> <p style={{fontSize:'20px', marginRight:'5px'}}>+ </p> Add Listing</AddListingButtonDesign>
            </Link>
      </div>
    );
  }