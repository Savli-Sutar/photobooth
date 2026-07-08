const video = document.getElementById('video');
const overlayCanvas = document.getElementById('overlayCanvas');
const overlayContext = overlayCanvas.getContext('2d');
const snapBtn = document.getElementById('snap');
const slots = document.querySelectorAll('.slot');
let currentSlot = 0;

// Initialize Camera
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', setupCanvases, { once: true });
    } catch (err) {
        alert("Could not access camera. Please check permissions.");
    }
}

// Setup canvas sizes to match video
function setupCanvases() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    
    // Set sizes for all slots and overlay
    slots.forEach(slot => {
        slot.width = width / 2; // Scaled down for the strip
        slot.height = height / 2;
    });
    overlayCanvas.width = width;
    overlayCanvas.height = height;
    
    drawCuteOverlay(width, height);
}

function drawCuteOverlay(w, h) {
    overlayContext.lineWidth = 15;
    overlayContext.strokeStyle = '#ff69b4';
    overlayContext.strokeRect(0, 0, w, h);
    overlayContext.fillStyle = 'white';
    overlayContext.font = '40px Arial';
    overlayContext.fillText('✨', w - 60, 60);
}

// Snap Logic
snapBtn.addEventListener('click', () => {
    if (currentSlot < 3) {
        const canvas = slots[currentSlot];
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        currentSlot++;
        
        if (currentSlot < 3) {
            snapBtn.innerText = `Take Photo ${currentSlot + 1}`;
        } else {
            snapBtn.innerText = "All done! 💖";
            snapBtn.disabled = true;
        }
    }
});

startCamera();
