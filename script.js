const video = document.getElementById('video');
const appContainer = document.getElementById('app-container');
const photoStrip = document.getElementById('photo-strip');
const overlayCanvas = document.getElementById('overlayCanvas');
const overlayContext = overlayCanvas.getContext('2d');
const snapBtn = document.getElementById('snap');
const retakeBtn = document.getElementById('retake');
const slots = document.querySelectorAll('.slot');
let currentSlot = 0;

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            overlayCanvas.width = video.videoWidth;
            overlayCanvas.height = video.videoHeight;
            overlayContext.strokeStyle = '#ff69b4';
            overlayContext.lineWidth = 10;
            overlayContext.strokeRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        };
    } catch (err) { alert("Camera access denied."); }
}

snapBtn.addEventListener('click', () => {
    if (currentSlot < slots.length) {
        const ctx = slots[currentSlot].getContext('2d');
        ctx.drawImage(video, 0, 0, slots[currentSlot].width, slots[currentSlot].height);
        currentSlot++;
        
        if (currentSlot === slots.length) {
            // Fade out camera
            appContainer.style.opacity = '0';
            setTimeout(() => {
                appContainer.classList.add('hidden');
                photoStrip.classList.add('visible');
            }, 600);

            // Switch buttons
            snapBtn.classList.add('hidden');
            retakeBtn.classList.remove('hidden');
            
            // Turn off camera
            video.srcObject.getTracks().forEach(track => track.stop());
        }
    }
});

retakeBtn.addEventListener('click', () => location.reload());

startCamera();
