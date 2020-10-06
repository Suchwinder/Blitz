import React from 'react';
import './ChooseFile.css'
import UploadButtons from './UploadButton';

const ChooseFile = () => {
    return(
        <div className="placeholder">
            <div className="md-form">
                <div className="file-field">
                    <div className="z-depth-1-half mb-4">
                        <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" className="img-fluid"
                        alt="example placeholder"></img>
                    </div>
                    <div className="d-flex justify-content-center">
                        <UploadButtons/>
                    </div>
                </div>
            </div>
        </div>
    
  )
    
}

export default ChooseFile;