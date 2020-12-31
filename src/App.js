import RecordRTC from "recordrtc";
import './App.css';

function App() {
  var video = document.querySelector("video");
  var recorder; 


  const captureCamera = (callback) => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
          callback(camera);
          
      }).catch(function(error) {
          alert('camera not found');
          console.error(error);
      });
      console.log(video);
  }
  
  const  stopRecordingCallback= () =>{
      video.src = video.srcObject = null;
      video.muted = false;
      video.volume = 1;
      video.src = URL.createObjectURL(recorder.getBlob());
      
      recorder.camera.stop();
      recorder.destroy();
      recorder = null;
  }
  

   const startRecordingCall = () =>{
     
     
      captureCamera(function(camera) {
          video.muted = true;
          video.volume = 1;
          video.srcObject = camera;
  
          recorder = RecordRTC(camera, {
              type: 'video'
          });
  
          recorder.startRecording();
  
          recorder.camera = camera;
         
      });
  };
  
 const  stopRecording = () => { 
      recorder.stopRecording(stopRecordingCallback);
  };
  

  return (
    <div className="App">
    
    <title>Video Recording</title>
     <h1>Record and download </h1>
     <br></br>
 
   <button onClick={startRecordingCall}  type="button">Start Recording</button>
   <button  onClick={stopRecording}   type="button" > stopRecording</button>

     
    </div>
  );
}

export default App;
