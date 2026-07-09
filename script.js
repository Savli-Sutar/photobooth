const video = document.getElementById('video');
const appContainer = document.getElementById('app-container');
const photoStrip = document.getElementById('photo-strip');
const stickerPalette = document.getElementById('sticker-palette');
const snapBtn = document.getElementById('snap');
const retakeBtn = document.getElementById('retake');
const slots = document.querySelectorAll('.slot');
let currentSlot = 0;

async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
}

snapBtn.addEventListener('click', () => {
    if (currentSlot < slots.length) {
        const ctx = slots[currentSlot].getContext('2d');
        ctx.drawImage(video, 0, 0, slots[currentSlot].width, slots[currentSlot].height);
        currentSlot++;
        
        if (currentSlot === slots.length) {
            // Hide camera and palette, show strip
            appContainer.style.opacity = '0';
            stickerPalette.style.display = 'none';
            setTimeout(() => {
                appContainer.classList.add('hidden');
                photoStrip.classList.add('visible');
            }, 600);
            
            snapBtn.classList.add('hidden');
            retakeBtn.classList.remove('hidden');
            video.srcObject.getTracks().forEach(track => track.stop());
        }
    }
});

retakeBtn.addEventListener('click', () => location.reload());
startCamera();
