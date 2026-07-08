const video = document.getElementById('video');
const photoCanvas = document.getElementById('photoCanvas');
const photoContext = photoCanvas.getContext('2d');
const overlayCanvas = document.getElementByOd('overlayCanvas');
const overlayContext = overlayCanvas.getContext('2d');
const snap = document.getElementById('snap');

//start camera
async function Camera() {
    //this is a browser API which access permission to use hardware(mircophone or speaker) here video is to be accessed
    const stream = await navigator.mediaDevices.getUserMedia({video:true}); 
    video.srcObject = stream; // gives raw data from video to the window on webpage
    video.addEventListener('loadedmetadata', setupCanvases, { once: true });
            } catch (err) {
                alert("Could not access camera. Please check permissions.");
                console.error("Error:", err);
            }
    function setupCanvases(){
        const width= video.videoWidth;
        const height= video.videoHeight;
        photoCanvas.width= overlayCanvas.width = width;
        photoCanvas.height = overlayCanvas.height = height;
        drawCuteOverlay(width, height);
    }
    function drawCuteOverlay(w,h){
        // draw cute frame border
        overlayContext.lineWidth = 15;
        overlayContext.strokeStyle = 'ff69b4';
        overlayContext.strokeRect( 0, 0, w, h);

        overlayContext.lineWidth = 5;
        overlayContext.strokeStyle = 'white';
        overlayContext.setLineDash([10, 10]); // Dashed Line
        overlayContext.strokeRect( 20, 20, w-40, h-40);
        //Reset Dash Line
        overlayContext.setLineDash([]); 
        overlayContext.fillStyle = 'white';
       overlayContext.font = '40px Arial';
        overlayContext.fillText('✨', w - 60, 60);
        overlayContext.fillText('💖', w - 60, h - 60);
        overlayContext.fillText('✨', 40, h - 60);
        
    }
    
    snap.addEventListener('click',() => {
        // 1. Freeze the photo layer
        photoContext.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);
        // 2. Switch visibilty
        photoCanvas.style.display = 'block';
            video.style.display = 'none';
            snap.innerText = 'Saving...';
            snap.disabled = true;
            // 3. Merge the two layer but creating a third layer to combine them
            const finalCanvas = document.createElement('finalCanvas');
            finalCanvas.width = photoCanvas.width;
            finalCanvas.height = photoCanvas.height;
            const finalCtx = finalCanvas.getContext('2d');

            finalCtx.drawImage(photoCanvas, 0, 0);
            finalCtx.drawImage(overlayCanvas, 0, 0);
            //4. Download the image 
            const link = document.createElement('a');
            link.download = 'my-photo-png';
            link.href = finalCanvas.toDataURL('image/png');
            link.click();
            //5. Restart URL after sometime
            setTimeout(() =>{
                photoCanvas.style.display = 'none';
                video.style.display = 'block';
                snap.innerText = '💖 Say Cheese! 💖';
                snap.disabled = false;

            },2000);    
});
Camera();
