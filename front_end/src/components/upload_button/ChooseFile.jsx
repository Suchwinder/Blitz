import React from 'react';
import './ChooseFile.css'
import UploadButtons from './UploadButton';

const ChooseFile = () => {
    return(
        <div className="placeholder">
            <form class="md-form">
                <div class="file-field">
                    <div class="z-depth-1-half mb-4">
                        <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" class="img-fluid"
                        alt="example placeholder"></img>
                    </div>
                    <div class="d-flex justify-content-center">
                        <UploadButtons/>
                    </div>
                </div>
            </form>
        </div>
    
  )
    
}

export default ChooseFile;