import RecordRTC from "recordrtc";
import './App.css';

function App() {
    let videoElm = document.querySelector("video");
    let flipBtn = document.querySelector('#flip-btn');
    var recorder; 
    
    
    let defaultsOpts = { audio: true, video: true }
    let shouldFaceUser = true;
    
   
    let supports = navigator.mediaDevices.getSupportedConstraints();
    if( supports['facingMode'] === true ) {
      flipBtn.disabled = false;
    }
    
    let stream = null;
    
    function capture(callback) {
      defaultsOpts.video = { facingMode: shouldFaceUser ? 'user' : 'environment' }
      navigator.mediaDevices.getUserMedia(defaultsOpts)
        .then(function(_stream) {
          stream = _stream;
          videoElm.srcObject = stream;
          videoElm.play();
          callback(stream)
        })
        .catch(function(err) {
          console.log(err)
        });
    }
    
    flipBtn.addEventListener('click', function(){
      if( stream == null ) return
      stream.getTracks().forEach(t => {
        t.stop();
      });
      shouldFaceUser = !shouldFaceUser;
      capture();
    })

      
    
    
    const startVideo = () => {
        capture();
    }

    const  stopRecordingCallback= () =>{
        videoElm.src = videoElm.srcObject = null;
        videoElm.muted = false;
        videoElm.volume = 1;
        videoElm.src = URL.createObjectURL(recorder.getBlob());
        
        recorder.stream.stop();
        recorder.destroy();
        recorder = null;
    }

    const startRecordingCall = () =>{
        capture(function(stream) {
  
            videoElm.volume = 1;
            videoElm.srcObject = stream;
    
            recorder = RecordRTC(stream, {
                type: 'video'
            });
    
            recorder.startRecording();
            recorder.stream = stream;
           
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
 
   <button onClick={startVideo}  type="button">Start Camera</button>
   <button onClick={startRecordingCall} type="button">Start Recording</button>
   <button onClick={stopRecording}  type="button" > stopRecording</button>

     
    </div>
  );
}

export default App;
