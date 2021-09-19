import React, { useEffect } from "react";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import Switch from "react-switch";
import axios from "axios";
 
const ImageDisplayer = () => {
    const [height,setHeight]=React.useState(500)
    const [width,setWidth]=React.useState(500)
    const [blur,setBlur]=React.useState(1)
    const [greyScale,setGreyScale]=React.useState(false)
    const [imageData, setImageData]=React.useState('')
    const [greyScaleURL,setGreyScaleURL]=React.useState('')
    const [imageText,setImageText] = React.useState('')
    const [downloadURL,setDownloadURL] = React.useState('')


    const width_array= []
    const height_array=[]
    //Generating values for height and weight dropdown.
    for (let i = 0; i < 1001; i+=50) {
        width_array.push({key:i,text:i,value:i})
        height_array.push({key:i,text:i,value:i})
    }
    //Generating values for blur dropdown.
    const blur_array=[]
    for (let i = 1; i < 11; i++) {
        blur_array.push({key:i,text:i,value:i})
    }

    //Function for Greyscale switch
    function greyscaleSwitch(){
        if(greyScale===true){
            setGreyScale(false)
            setGreyScaleURL('')
        }else{
            setGreyScale(true)
            setGreyScaleURL('&grayscale')
        }
    }

    function getImageData(){
        axios.get('https://picsum.photos/'+width+'/'+height+'?blur='+blur+greyScaleURL,{
            responseType: 'arraybuffer', //Arraybuffer is an array of bytes in a fixed length, used to get img data. 
        }).then(res =>{

            const data = Buffer.from(res.data, 'binary').toString('base64')
            //Using Buffer to transfer the raw bytes data to a string with base64 - in order to easily use it in <img src>
            setImageData("data:image/png;base64,"+data)
            const id = res.headers['picsum-id']
            
            //Now making a call with the specific ID to get info
            axios.get('https://picsum.photos/id/'+id+'/info')
            .then(res=>{
                const data = res.data
                setImageText(data['author'])
                setDownloadURL(data['download_url'])
            })
        },
        )}



    //UseEffect dependent on the 4 attributes. If there is a change in any of them, make a new axios GET call. 
    useEffect(() => {     
        getImageData() 
    },[blur,height,width,greyScale]);
   

    return (
        <div style={{display:"block"}}>
            <div style={{backgroundColor:"", color:"white", display:"flex", marginBottom:"50px", width:"80%", marginLeft:"10%"}}>
                <div style={{width:"25%", paddingLeft:"10%", display:"block"}}>
                    <div><i className="arrows alternate vertical icon"/>Height</div>
                    <Dropdown
                        placeholder="Choose Height"
                        fluid
                        selection
                        inverted
                        search
                        allowAdditions
                        additionLabel='Custom Height: '
                        onAddItem={(e,data)=>{height_array.push(data.value)}}
                        options={height_array}
                        value={height}
                        style={{backgroundColor:"rgba(0,0,0,0)", color:"#fff", background:"rgba(0,0,0,0)", borderBottom:"2px solid #2760e0"}}
                        onChange={(e,uniqueValue)=>{setHeight(uniqueValue.value)}}
                    />
                </div>

                <div style={{width:"25%", paddingLeft:"5%", display:"block"}}>
                    <div><i className="arrows alternate horizontal icon"/>Width</div>
                    <Dropdown
                        placeholder="Choose Width"
                        fluid
                        selection
                        inverted
                        search
                        allowAdditions
                        additionLabel='Custom Width: '
                        onAddItem={(e,data)=>{width_array.push(data.value)}}
                        options={width_array}
                        value={width}
                        style={{backgroundColor:"rgba(0,0,0,0)", color:"#fff", background:"rgba(0,0,0,0)", borderBottom:"2px solid #2760e0"}}
                        onChange={(e,uniqueValue)=>{setWidth(uniqueValue.value)}}
                    />
                </div>

                <div style={{width:"25%", paddingLeft:"5%", display:"block"}}>
                    <div> <i className="eye slash icon"/> Blur</div>
                    <Dropdown
                        placeholder="Choose Blur"
                        fluid
                        selection
                        inverted
                        search
                        options={blur_array}
                        value={blur}
                        style={{backgroundColor:"rgba(0,0,0,0)", color:"#fff", background:"rgba(0,0,0,0)", borderBottom:"2px solid #2760e0"}}
                        onChange={(e,uniqueValue)=>{setBlur(uniqueValue.value);}}
                    />
                </div>

                <div style={{display:"block", width:"20%", paddingLeft:"5%"}}>
                    <div style={{color:"gray", marginBottom:"10px"}}>Greyscale is <b style={{color:"white"}}>{greyScale ? 'currently on' : 'currently off'}</b></div>
                    <Switch 
                        onChange={greyscaleSwitch} 
                        checked={greyScale} 
                        onColor="#557dd9"
                        onHandleColor="#2760e0"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        className="react-switch"
                        id="material-switch"
                        height={20}
                        width={48}
                    />
                </div>
            </div>
                <div style={{display:"inline-block"}}>
                    <img style={{borderRadius:"0px 100px 0px 0px"}} src={imageData}/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <div>Author: {imageText}</div>
                        <a target="_blank" href={downloadURL}>Download</a>
                    </div>
                </div>
            
        
      </div>
    );
  }

 
export default ImageDisplayer;