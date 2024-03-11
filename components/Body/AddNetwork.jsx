import React, {useState, useCallback, useEffect} from 'react'
import  { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast'

const AddNetwork = ({ axios }) => {
  //Notifications
  const notifyError = (msg)=>toast.error(msg, { duration: 2000 });
  const notifySuccess= (msg)=>toast.success(msg, { duration: 2000 });

  const [displayImg, setDisplayImg] = useState('');

  const [network, setNetwork] = useState({
    networkName: '',
    rpcUrl: '',
    apiKey: '',
    walletAddress: '',
    privateKey: '',
    image: displayImg,
  });

  const handleFormFieldChange = (fieldName, e)=>{
    setNetwork({...network, [fieldName]: e.target.value})
  };

  const storeNetwork = ()=>{
    const {networkName, 
          rpcUrl, 
          apiKey, 
          walletAddress,
          privateKey, 
          image, 
          network,
          } = token;

          if(!networkName || 
            !rpcUrl || 
            !apiKey || 
            !walletAddress ||
            !privateKey || 
            image || 
            !network
            ) 
            return notifyError('Provide all required data');

            let networkArray = []
            const networkLists = localStorage.getItem('setNetworks');
            if(networkLists){
              networkArray = JSON.parse(localStorage.getItem('setNetworks'));
              networkArray.push(network);
              localStorage.setItem('setNetworks', JSON.stringify(networkArray));
              notifySuccess('Network added successfully')
              // window.location.reload();
            }else{
              networkArray.push(token);
              localStorage.setItem('setNetworks', JSON.stringify(networkArray));
              notifySuccess('Network added successfully');

            }
          };
  const uploadToInfura = async(file) => {
    notifySuccess('Uploaded successfully');
    if(file){
      try{
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: ', "Content-Type: "',
            pinata_secret_api_key: 'multipart/form-data',
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setNetwork({...network, image: ImgHash});
        setDisplayImg(ImgHash);
        notifySuccess('Uploaded successfully');
      }catch(error){
        notifyError('Unable to upload image to Pinata')

      }
    }
  };

  const onDrop = useCallback(async(acceptedFile)=>{
    await uploadToInfura(acceptedFile[0]);
  });

  const {getInputProps, 
        getRootProps, 
        isDragAccept, 
        isDragReject, 
        isDragActive} = useDropzone({ 
          onDrop, 
          maxSize: 500000000000}
          );


  return (
  <div className='techwave_fn_content'>
    <div  className='techwave_fn_page'>
      <div className='techwave_fn_user_setting_page'>
        <div className='techwave_fn_pagetitle'>
          <h2 className='title'>Add Network</h2>
        </div>

        <div className='container small'>
          <div className='techwave_fn_user_settings'>
            <form action="">
              <div className='user__settings'>
                <div className='settings_left'>
                  <label htmlFor="input"
                  className='fn__upload'>
                    {
                      displayImg == '' ? (
                        <span className='upload_content' {...
                        getRootProps()}>
                          <span className='title'>Drag & Drop Image</span>
                          <span className='fn__lined_text'>
                            <span className='line'></span>
                            <span className='text'>OK</span>
                            <span className='line'></span>
                          </span>
                          <span className='title'>Browse</span>
                          <span className='desc'>Support JPG, JPEG, & PNG </span>
                          <input 
                          type="file" 
                          accept='image/*'
                          {...getInputProps()} />
                        </span>
                      ) : (
                        <img src={displayImg} className='preview_img' alt="" />
                      )
                    }
                  </label>
                </div>
                <div className='settings_right'>
                  <div className='item'>
                   <label 
                   htmlFor="name"
                   className='input_label'>Network Name</label>
               
                  <div className='input_item'>
                    <input 
                    type="text" 
                    className='input'
                    placeholder='network'
                    onChange={()=>
                    handleFormFieldChange('networkName', e)}
                     />
                  </div>
                  </div>
                  <div className='item'>
                   <label 
                   htmlFor="name"
                   className='input_label'>Alchemy Provider</label>
               
                  <div className='input_item'>
                    <input 
                    type="text" 
                    className='input'
                    placeholder='RPC URL'
                    onChange={()=>
                    handleFormFieldChange('rpcUrl', e)}
                     />
                  </div>
                  </div>
                  <div className='item'>
                   <label 
                   htmlFor="name"
                   className='input_label'>Alchemy API Key</label>
               
                  <div className='input_item'>
                    <input 
                    type="text" 
                    className='input'
                    placeholder='API KEY'
                    onChange={()=>
                    handleFormFieldChange('apikey', e)}
                     />
                  </div>
                  </div>
                  <div className='item'>
                   <label 
                   htmlFor="name"
                   className='input_label'>Wallet Address</label>
               
                  <div className='input_item'>
                    <input 
                    type="text" 
                    className='input'
                    placeholder='WALLET ADDRESS'
                    onChange={()=>
                    handleFormFieldChange('walletAddress', e)}
                     />
                  </div>
                  </div>
                  <div className='item'>
                   <label 
                   htmlFor="name"
                   className='input_label'>Private Key</label>
               
                  <div className='input_item'>
                    <input 
                    type="text" 
                    className='input'
                    placeholder='PRIVATE KEY'
                    onChange={()=>
                    handleFormFieldChange('privateKey', e)}
                     />
                  </div>
                  </div>
                  <div>
                    <a onClick={()=>storeNetwork()}
                    className='techwave_fn_button'>Set network</a>
                  </div>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddNetwork