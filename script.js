// Add these at the top with your other selectors
const slots = document.querySelectorAll('.slot');
let currentSlot = 0; 

// --- Modify your existing 'snap' event listener to this: ---
snap.addEventListener('click', () => {
    if (currentSlot < 3) {
        const canvas = slots[currentSlot];
        const ctx = canvas.getContext('2d');
        
        // Match the canvas size to the video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the frame into the specific slot
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        currentSlot++;
        
        // Update button text
        if (currentSlot < 3) {
            snap.innerText = `Take Photo ${currentSlot + 1}`;
        } else {
            snap.innerText = "All done! 💖";
            snap.disabled = true;
            video.style.display = 'none'; // Optional: Hide camera when done
        }
    }
});
const video = document.getElementById('video');
const photoCanvas = document.getElementById('photoCanvas');
const photoContext = photoCanvas.getContext('2d');
const overlayCanvas = document.getElementById('overlayCanvas');
const overlayContext = overlayCanvas.getContext('2d');
const snap = document.getElementById('snap');

// Start camera
async function Camera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', setupCanvases, { once: true });
    } catch (err) {
        alert("Could not access camera. Please check permissions.");
        console.error("Error:", err);
    }
}

function setupCanvases() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    photoCanvas.width = overlayCanvas.width = width;
    photoCanvas.height = overlayCanvas.height = height;
    drawCuteOverlay(width, height);
}

function drawCuteOverlay(w, h) {
    overlayContext.lineWidth = 15;
    overlayContext.strokeStyle = '#ff69b4';
    overlayContext.strokeRect(0, 0, w, h);

    overlayContext.lineWidth = 5;
    overlayContext.strokeStyle = 'white';
    overlayContext.setLineDash([10, 10]);
    overlayContext.strokeRect(20, 20, w - 40, h - 40);
    overlayContext.setLineDash([]);
    
    overlayContext.fillStyle = 'white';
    overlayContext.font = '40px Arial';
    overlayContext.fillText('✨', w - 60, 60);
    overlayContext.fillText('💖', w - 60, h - 60);
    overlayContext.fillText('✨', 40, h - 60);
}

snap.addEventListener('click', () => {
    photoContext.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);
    photoCanvas.style.display = 'block';
    video.style.display = 'none';
    snap.innerText = 'Saving...';
    snap.disabled = true;

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = photoCanvas.width;
    finalCanvas.height = photoCanvas.height;
    const finalCtx = finalCanvas.getContext('2d');

    finalCtx.drawImage(photoCanvas, 0, 0);
    finalCtx.drawImage(overlayCanvas, 0, 0);

    const link = document.createElement('a');
    link.download = 'my-photo.png';
    link.href = finalCanvas.toDataURL('image/png');
    link.click();

    setTimeout(() => {
        photoCanvas.style.display = 'none';
        video.style.display = 'block';
        snap.innerText = 'Snap!';
        snap.disabled = false;
    }, 2000);
});
let currentSlot = 0;
const slots = document.querySelectorAll('.slot');

Camera();
