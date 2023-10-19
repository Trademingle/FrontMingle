import React, { Component } from 'react';
import InvoiceDetails from './invoiceDetails';
import InvoiceHeader from "./invoiceHeader";
import api from '../api/api';
import styles from './invoice.module.css';
import moment from 'moment';
import swal from 'sweetalert';

class App extends Component {
  constructor(){
    super();
    const today=moment().format('YYYY-MM-DD')
    this.state={
      invoiceNumber:'',
      date:today,
      dateDue:'00-00-0000',
      billInfo:'',
      billInfoFrom:'',
       invoiceItems:[{
         description:'',
         price:0,
         quantity:0
       }],
      pdfLink:'',
    };
    this.handleOnChange=this.handleOnChange.bind(this);
  }
   addNewItem=()=>{
    this.setState({
      invoiceItems:[...this.state.invoiceItems,{description:'', quantity:0, price:0 }]
    });
  }
  deleteItem=(ind)=>{
    let item=[...this.state.invoiceItems];
    this.state.invoiceItems.map((invoice, index)=>{
      if(index===ind){
        item.splice(ind, 1); 
      }
    })
    this.setState({
      invoiceItems:[...item ]
     }) 
  }
  // convertPdf=()=>{
  //   var pdfConverter = require('jspdf');
  //   let totalAmount=0;
  //   var doc = new pdfConverter();
  //   doc.addImage(logo, 'JPEG', 130, 10, 70, 40);
  //   doc.setFontSize(26);    
  //   doc.setFontType('bold');
  //   doc.text(10, 20, 'INVOICE');
  //   doc.setFontSize(16);
  //   doc.setFont('loto');
  //   doc.setFontType('normal');
  //   doc.setTextColor(0)   
  //   doc.text(10,30,"# "+this.state.invoiceNumber);
  //   doc.text(10,40,"Bill to :")
  //   doc.setTextColor(80);  
  //   doc.text(10,47,this.state.billInfo);
  //   doc.setTextColor(0)   
  //   doc.text(10,70,"Bill from :")
  //   doc.setTextColor(80);  
  //   doc.text(10,77,this.state.billInfoFrom);
  //   doc.text(110,65,"Date Issued : "+this.state.date+" (yyyy-mm-dd)");
  //   doc.text(110,77,"Due Date : "+this.state.dateDue+" (yyyy-mm-dd)");
    
  //   doc.setLineWidth(12);
  //   doc.setDrawColor(43, 100, 210);
  //   doc.line(210, 104, 0, 104);
  //   doc.setTextColor(256)  
  //   doc.text(10,106, "Item");
  //   doc.text(95,106, "Quantity");
  //   doc.text(135,106, "Rate");
  //   doc.text(175,106, "Amount");
  //   doc.setTextColor(0) 
  //   this.state.invoiceItems.map((item,index)=>{
  //   totalAmount+=item.price*item.quantity;
  //   doc.text(10,116 +index *8, item.description);
  //   doc.text(95,116 +index *8, ""+item.quantity);
  //   doc.text(135,116 +index *8, "$"+item.price);
  //   doc.text(175,116 +index *8, "$"+item.price*item.quantity);
  //   })
    
  //   doc.text(100,190, "Subtotal:  "+' $'+totalAmount);
  //   doc.text(100,200, "GST/HST (13%):  "+' $'+totalAmount*13/100);
  //   doc.text(100,210, "Total:  "+' $' +((totalAmount*13/100)+ totalAmount) );



    
  //   doc.save("test.pdf");

            
  // }
  generatePdf=()=>{
    let data=[];
    let tempList={};
    let tempList2=[];
    this.state.invoiceItems.map((item,index)=>{
      tempList2.push(Object.values(item));
      tempList.entries= tempList2
    });
    data.id=this.props.id;
    data.tempList=tempList
    api.getPdf(data).then(res => {
        this.state.pdfLink = res.data
        console.log("pdf loaded successfully");
        console.log(res);
        swal({
          title: "Sent!",
          text: "Invoice sent and a copy has been downloaded for you!",
          icon: "success",
          button: "OK",
      });
        window.open(this.state.pdfLink, "_blank");
    }).catch(err => console.log(err))
  }

  handleChange=(e,name)=>{
    if(name==='invoice'){
      this.setState({invoiceNumber:e.target.value})
    }
    if(name==='date'){
      this.setState({date:e.target.value})
    }
    if(name==='dateDue'){
      this.setState({dateDue:e.target.value})
    }
    if(name==='bill'){
      this.setState({billInfo:e.target.value})
    }
    if(name==='billFrom'){
      this.setState({billInfoFrom:e.target.value})
    }
  }


  handleOnChange=(event , ind, Name)=>{
    let item=[...this.state.invoiceItems];       
    this.state.invoiceItems.map((invoicc , index)=>{
            if(index===ind ){   
              if(Name==="name")           
               item[index].description=event.target.value;
               if(Name==="Quan")           
               item[index].quantity=event.target.value;
               if(Name==="Rate")           
               item[index].price=event.target.value;              
            }
          });     
         this.setState({
          invoiceItems:[...item ]
         })         
  }
  render() {
    return (
      <div className={styles.container} style={{marginTop:'100px'}}>
        <InvoiceHeader handleChange={this.handleChange} date={this.state.date} billInfo={this.state.billInfo} invoiceNo={this.state.invoiceNumber} id={this.props.id}/>
        <InvoiceDetails pdf={this.generatePdf} items={this.state.invoiceItems} event={this.addNewItem} description={this.handledescription} del={this.deleteItem} onChangeHandler={this.handleOnChange}/>
      </div>
    );
  }
}

export default App;
