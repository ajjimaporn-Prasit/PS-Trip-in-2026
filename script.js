const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slideNum = document.getElementById('slide-num');

let currentSlide = 0;

function updateSlide() {
  // ซ่อนทุกหน้า และลบ class active
  slides.forEach(slide => slide.classList.remove('active'));
  
  // แสดงผลหน้าปัจจุบัน
  slides[currentSlide].classList.add('active');
  
  // อัปเดตตัวเลขหน้าตัวบอกสถานะ
  slideNum.textContent = `หน้า ${currentSlide + 1} / ${slides.length}`;
}

// กดปุ่มถัดไป
nextBtn.addEventListener('click', () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
  } else {
    currentSlide = 0; // ถ้ารอบสุดท้ายให้วนกลับไปหน้าแรก
  }
  updateSlide();
});

// กดปุ่มย้อนกลับ
prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = slides.length - 1; // ถ้าย้อนหน้าแรกสุด ให้ไปหน้าสุดท้าย
  }
  updateSlide();
});

// ตรวจจับขนาดหน้าจอของมือถือเพื่อบีบเฟรมสไลด์ให้พอดี (Auto Scale)
function adjustScale() {
  const wrapper = document.querySelector('.ppt-wrapper');
  const controls = document.querySelector('.nav-controls');
  const width = window.innerWidth;
  
  if (width < 1300) {
    const scale = (width - 30) / 1280;
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.transformOrigin = 'top center';
    
    // คำนวณขอบล่างของปุ่มควบคุมให้พอดีตามสเกลที่ย่อ
    const marginAmount = -720 * (1 - scale) + 20;
    controls.style.marginTop = `${marginAmount}px`;
  } else {
    wrapper.style.transform = 'none';
    controls.style.marginTop = '20px';
  }
}

window.addEventListener('resize', adjustScale);
window.addEventListener('DOMContentLoaded', adjustScale);
