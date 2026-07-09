const video = document.getElementById('video');
const overlayCanvas = document.getElementById('overlayCanvas');
const overlayContext = overlayCanvas.getContext('2d');
const snapBtn = document.getElementById('snap');
const slots = document.querySelectorAll('.slot');
let currentSlot = 0;

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            overlayCanvas.width = video.videoWidth;
            overlayCanvas.height = video.videoHeight;
            drawCuteOverlay(video.videoWidth, video.videoHeight);
        };
    } catch (err) {
        alert("Camera access denied.");
    }
}

function drawCuteOverlay(w, h) {
    overlayContext.strokeStyle = '#ff69b4';
    overlayContext.lineWidth = 10;
    overlayContext.strokeRect(0, 0, w, h);
}

snapBtn.addEventListener('click', () => {
    if (currentSlot < slots.length) {
        const canvas = slots[currentSlot];
        const ctx = canvas.getContext('2d');
        // Draw the frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        currentSlot++;
        
        if (currentSlot >= slots.length) {
            snapBtn.innerText = "All done! 💖";
            snapBtn.disabled = true;
        }
    }
});

startCamera();
