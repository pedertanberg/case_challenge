import React, { useEffect } from "react";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import Switch from "react-switch";
import axios from "axios";
 
const ImageDisplayer = () => {
    const [heigh,setHeight]=React.useState(500)
    const [width,setWidth]=React.useState(500)
    const [blur,setBlur]=React.useState(1)
    const [greyScale,setGreyScale]=React.useState(true)
    const [imageData, setImageData]=React.useState('')
    const [greyScaleURL,setGreyScaleURL]=React.useState('')






    function getImage(){

    }

    let i;
    const width_array= []
    const height_array=[]
    for (let i = 0; i < 1001; i+=50) {
        width_array.push({key:i,text:i,value:i})
        height_array.push({key:i,text:i,value:i})
    }

    const blur_array=[]
    for (let i = 1; i < 11; i++) {
        blur_array.push({key:i,text:i,value:i})
    }

    function greyscaleSwitch(){
        if(greyScale===true){
            setGreyScale(false)
            setGreyScaleURL('')
        }else{
            setGreyScale(true)
            setGreyScaleURL('&grayscale')
        }
    }

    function axioscall(){
        axios.get('https://picsum.photos/'+width+'/'+heigh+'?blur='+blur+greyScaleURL,{
            responseType: 'arraybuffer',
        }).then(res =>{
            console.log(res)
            const data = Buffer.from(res.data, 'binary').toString('base64')
            console.log(data)
            setImageData("data:image/png;base64,"+data)

        }

        )
    }

    useEffect(() => {     
       axioscall() 
    },[blur,heigh,width,greyScale]);



    
      

    return (
        <div style={{display:"block"}}>
            <div style={{backgroundColor:"", color:"white", display:"flex", marginBottom:"200px", width:"80%"}}>
                <div style={{width:"25%", paddingLeft:"5%"}}>
                    <Dropdown
                        placeholder="Choose Height"
                        fluid
                        selection
                        inverted
                        options={height_array}
                        style={{backgroundColor:"rgba(0,0,0,0)", color:"#fff", background:"rgba(0,0,0,0)", borderBottom:"2px solid #2760e0"}}
                        onChange={(e,uniqueValue)=>{setHeight(uniqueValue.value)}}
                    />
                </div>

                <div style={{width:"25%", paddingLeft:"5%"}}>
                    <Dropdown
                        placeholder="Choose Width"
                        fluid
                        selection
                        inverted
                        options={width_array}
                        style={{backgroundColor:"rgba(0,0,0,0)", color:"#fff", background:"rgba(0,0,0,0)", borderBottom:"2px solid #2760e0"}}
                        onChange={(e,uniqueValue)=>{setWidth(uniqueValue.value)}}
                    />
                </div>

                <div style={{width:"25%", paddingLeft:"5%"}}>
                    <Dropdown
                        placeholder="Choose Blur"
                        fluid
                        selection
                        inverted
                        options={blur_array}
                        style={{backgroundColor:"rgba(0,0,0,0)", color:"#fff", background:"rgba(0,0,0,0)", borderBottom:"2px solid #2760e0"}}
                        onChange={(e,uniqueValue)=>{setBlur(uniqueValue.value);}}
                    />
                </div>

                <div style={{display:"block", width:"25%", paddingLeft:"5%"}}>
                <div>Greyscale is <b>{greyScale ? 'currently on' : 'currently off'}</b></div>
                <Switch onChange={greyscaleSwitch} checked={greyScale} />

                </div>

                
            
                
                
            </div>
            <img src={imageData}></img>

            <div style={{backgroundColor:"#2760e0", color:"white", display:"flex", marginBottom:"200px", width:"80%", height:"300px", borderRadius:"30px", marginLeft:"150px"}}>
                <div style={{display:"flex"}}>
                                                                       
                </div>

                
                
            </div>
            
      </div>
    );
  }

 
export default ImageDisplayer;