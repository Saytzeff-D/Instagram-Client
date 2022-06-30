import axios from 'axios';
import React, { useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const CreatePost = React.forwardRef((props, ref)=> {
    const navigate = useNavigate()
    const {url, userId} = props
    const [disable, setDisable] = useState(false)
    const [spinStyle, setSpinStyle] = useState('')
    useImperativeHandle(ref, ()=>({
        discardPost(){
            discardPost()
        }
    }))

    const [newMedia, setNewMedia] = useState({mediaType: '', mediaUrl: '', caption: '', userId: userId})
    const [viewPickFIle, setViewPickFile] = useState("text-center d-block")
    const [preview, setPreview] = useState('d-none')
    const selectFile = ()=>{
        document.getElementById('postFile').click()
    }
    const uploadFile = (e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            if(/(video)/g.test(reader.result)){
                setNewMedia({...newMedia, mediaType: 'video', mediaUrl: reader.result})
                setViewPickFile('text-center d-none')
                setPreview("d-block")
            }else{
                setNewMedia({...newMedia, mediaType: 'image', mediaUrl: reader.result})
                setViewPickFile('text-center d-none')
                setPreview("d-block")
            }
        }
    }
    const uploadPost = ()=>{
        setDisable(true)
        setSpinStyle('spinner-grow spinner-grow-sm')
        axios.post(`${url}createPost`, newMedia).then((res)=>{
            if(res.data.msg === 'Upload Successful'){
                navigate(0)
                setSpinStyle('')
            }
            else{
                setSpinStyle('')
                setDisable(false)
                alert(res.data)
            }
        }).catch((err)=>{
            setSpinStyle('')
            setDisable(false)
            alert(err.response.data.message)
        })
    }
    const discardPost = ()=>{
        setViewPickFile('text-center d-block')
        setNewMedia({})
        setPreview('d-none')
    }
    return (
        <>
            <div className={viewPickFIle}>
                <p>Drag Photos and Videos here</p>
                <input type="file" id="postFile" className="d-none" onChange={uploadFile} />
                <button className='btn btn-primary' onClick={selectFile} >Select from device</button>
            </div>
            <div className={preview}>
                <div className='row w-1000'>
                    <div className='col-12 my-1'>
                        {
                            newMedia.mediaType === 'video'
                            ?
                            <video src={newMedia.mediaUrl} alt="previewVideo" controls autoPlay className='w-100' height="300px"></video>
                            :
                            <img src={newMedia.mediaUrl} alt="previewPhoto" className='w-100 img-fluid' />
                        }
                    </div>
                    <div className='col-12 my-1'>
                        <textarea className='form-control w-100 h-100' name="caption" value={newMedia.caption} placeholder='Write a caption' onChange={(e)=>{setNewMedia({...newMedia, [e.target.name]: e.target.value})}}></textarea>
                    </div>
                    <button className='btn btn-primary btn-block mt-5 font-weight-bold mx-3' onClick={uploadPost} disabled={disable} >Upload Post <span className={spinStyle}></span></button>
                </div>
            </div>
        </>
    );
})

export default CreatePost;