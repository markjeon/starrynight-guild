// 길드원 데이터 저장소
let guildMembers = [
    {
        name: "견신",
        intro: "별이빛나는밤 길드의 활발한 길드원입니다!",
        image: "./Images/견신.png"
    },
    {
        name: "고유치",
        intro: "길드 활동에 열정적으로 참여하는 길드원입니다!",
        image: "./Images/고유치.png"
    },
    {
        name: "고팔희",
        intro: "동료들과 함께하는 시간을 소중히 여기는 길드원입니다!",
        image: "./Images/고팔희.png"
    },
    {
        name: "관계자외출입금지",
        intro: "특별한 이름을 가진 독특한 길드원입니다!",
        image: "./Images/관계자외출입금지.png"
    },
    {
        name: "느좋",
        intro: "항상 긍정적인 마음을 가진 길드원입니다!",
        image: "./Images/느좋.png"
    },
    {
        name: "뒤찌",
        intro: "신뢰할 수 있는 든든한 길드원입니다!",
        image: "./Images/뒤찌.png"
    },
    {
        name: "림리밍",
        intro: "길드 분위기 메이커 역할을 하는 즐거운 길드원입니다!",
        image: "./Images/림리밍.png"
    },
    {
        name: "샐름보",
        intro: "길드를 위해 홈페이지까지 만들어주는 멋진 길드원입니다!",
        image: "./Images/샐름보.png"
    },
    {
        name: "아리솔",
        intro: "항상 긍정적인 에너지를 전해주는 길드원입니다!",
        image: "./Images/아리솔.png"
    },
    {
        name: "히와이로",
        intro: "길드원들을 따뜻하게 챙겨주는 다정한 길드원입니다!",
        image: "./Images/히와이로.png"
    },
];

// 갤러리 데이터 저장소 - 숫자 파일명들
let galleryImages = [
    {
        title: "함께한 특별한 순간",
        image: "./Images/1.png"
    },
    {
        title: "길드원들과의 추억", 
        image: "./Images/2.png"
    }
    // 새 갤러리 이미지 추가 시:
    // { title: "제목", image: "./Images/3.png" },
    // { title: "제목", image: "./Images/4.png" }
];

// 관리자 모드 토글
function toggleAdmin() {
    const panel = document.getElementById('adminPanel');
    const removeBtns = document.querySelectorAll('.remove-btn');
    
    // 패널이 닫혀있을 때만 비밀번호 확인
    if (!panel.classList.contains('active')) {
        const password = prompt('관리자 비밀번호를 입력하세요:');
        
        // 비밀번호 확인 (기본값: signal, 로컬스토리지에서 커스텀 비밀번호 확인)
        const adminPassword = localStorage.getItem('adminPassword') || 'signal';
        
        if (password === null) {
            // 취소 버튼을 누른 경우
            return;
        }
        
        if (password !== adminPassword) {
            alert('비밀번호가 틀렸습니다.');
            return;
        }
        
        showNotification('관리자 모드로 진입합니다.');
        // 관리자 모드 클래스 추가
        document.body.classList.add('admin-mode');
        // 삭제 버튼들 보이기
        removeBtns.forEach(btn => {
            btn.style.display = 'block';
        });
        // 갤러리 삭제 버튼들 보이기
        const galleryRemoveBtns = document.querySelectorAll('.gallery-remove-btn');
        galleryRemoveBtns.forEach(btn => {
            btn.style.display = 'block';
        });
    } else {
        // 관리자 모드 클래스 제거
        document.body.classList.remove('admin-mode');
        // 관리자 모드 닫을 때 삭제 버튼들 숨기기
        removeBtns.forEach(btn => {
            btn.style.display = 'none';
        });
        // 갤러리 삭제 버튼들 숨기기
        const galleryRemoveBtns = document.querySelectorAll('.gallery-remove-btn');
        galleryRemoveBtns.forEach(btn => {
            btn.style.display = 'none';
        });
    }
    
    panel.classList.toggle('active');
}

// 비밀번호 변경
function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    // 현재 비밀번호 확인
    const adminPassword = localStorage.getItem('adminPassword') || 'signal';
    if (currentPassword !== adminPassword) {
        showNotification('현재 비밀번호가 틀렸습니다.', 'error');
        return;
    }
    
    // 새 비밀번호 확인
    if (newPassword !== confirmPassword) {
        showNotification('새 비밀번호가 일치하지 않습니다.', 'error');
        return;
    }
    
    if (newPassword.length < 4) {
        showNotification('비밀번호는 최소 4자 이상이어야 합니다.', 'error');
        return;
    }
    
    // 비밀번호 저장
    localStorage.setItem('adminPassword', newPassword);
    
    // 입력 필드 초기화
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    showNotification('비밀번호가 성공적으로 변경되었습니다!');
}

// 배너 업로드
function uploadBanner() {
    const fileInput = document.getElementById('bannerUpload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const bannerImg = document.getElementById('guildBanner');
            bannerImg.src = e.target.result;
            
            // 로컬스토리지에 저장
            localStorage.setItem('guildBanner', e.target.result);
            
            showNotification('배너가 성공적으로 업로드되었습니다!');
        };
        reader.readAsDataURL(file);
    } else {
        showNotification('파일을 선택해주세요.', 'error');
    }
}

// 길드원 추가
function addMember() {
    const name = document.getElementById('memberName').value;
    const intro = document.getElementById('memberIntro').value;
    const imageFile = document.getElementById('memberImageFile').value;
    
    if (!name) {
        showNotification('이름을 입력해주세요.', 'error');
        return;
    }
    
    if (!intro) {
        showNotification('소개를 입력해주세요.', 'error');
        return;
    }
    
    // 이미지 파일명이 없으면 이름.png로 자동 설정
    const imagePath = imageFile ? `./Images/${imageFile}` : `./Images/${name}.png`;
    
    const newMember = {
        name: name,
        intro: intro,
        image: imagePath
    };
    
    guildMembers.push(newMember);
    localStorage.setItem('guildMembers', JSON.stringify(guildMembers));
    renderMembers();
    
    // 입력 필드 초기화
    document.getElementById('memberName').value = '';
    document.getElementById('memberIntro').value = '';
    document.getElementById('memberImageFile').value = '';
    
    showNotification('길드원이 성공적으로 추가되었습니다!');
}

// 길드원 카드 렌더링
function renderMembers() {
    const membersGrid = document.getElementById('membersGrid');
    membersGrid.innerHTML = '';
    
    guildMembers.forEach((member, index) => {
        const memberCard = createMemberCard(member, index);
        membersGrid.appendChild(memberCard);
    });
}

// 길드원 카드 생성
function createMemberCard(member, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'member-card';
    cardDiv.innerHTML = `
        <div class="member-card-front" style="background-image: url('${member.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <h3 class="member-name">${member.name}</h3>
            <button onclick="removeMember(${index})" class="remove-btn admin-only" style="position: absolute; bottom: 15px; right: 15px; padding: 8px 12px; background: rgba(255,0,0,0.8); border: none; border-radius: 6px; color: white; cursor: pointer; font-size: 0.8rem; z-index: 100; display: none; font-weight: bold;">삭제</button>
        </div>
    `;
    
    return cardDiv;
}

// 길드원 삭제
function removeMember(index) {
    if (confirm('정말로 이 길드원을 삭제하시겠습니까?')) {
        guildMembers.splice(index, 1);
        localStorage.setItem('guildMembers', JSON.stringify(guildMembers));
        renderMembers();
        showNotification('길드원이 삭제되었습니다.');
    }
}

// 갤러리 이미지 추가
function addGalleryImage() {
    const title = document.getElementById('galleryTitle').value;
    const imageFile = document.getElementById('galleryImageFile').value;
    
    if (!title) {
        showNotification('사진 제목을 입력해주세요.', 'error');
        return;
    }
    
    if (!imageFile) {
        showNotification('이미지 파일명을 입력해주세요.', 'error');
        return;
    }
    
    const newGalleryImage = {
        title: title,
        image: `./Images/${imageFile}`
    };
    
    galleryImages.push(newGalleryImage);
    renderGallery();
    
    // 입력 필드 초기화
    document.getElementById('galleryTitle').value = '';
    document.getElementById('galleryImageFile').value = '';
    
    showNotification('갤러리 이미지가 추가되었습니다!');
}

// 갤러리 렌더링
function renderGallery() {
    const galleryCardsGrid = document.getElementById('galleryCardsGrid');
    if (!galleryCardsGrid) return;
    
    galleryCardsGrid.innerHTML = '';
    
    galleryImages.forEach((item, index) => {
        const galleryCard = document.createElement('div');
        galleryCard.className = 'gallery-card';
        galleryCard.innerHTML = `
            <div class="gallery-card-inner">
                <div class="gallery-card-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="gallery-card-content">
                    <h3 class="gallery-card-title">${item.title}</h3>
                    <div class="gallery-card-effects"></div>
                    <button onclick="removeGalleryImage(${index})" class="gallery-remove-btn admin-only" style="display: none;">삭제</button>
                </div>
            </div>
        `;
        galleryCardsGrid.appendChild(galleryCard);
    });
}

// 갤러리 이미지 삭제
function removeGalleryImage(index) {
    if (confirm('정말로 이 갤러리 이미지를 삭제하시겠습니까?')) {
        galleryImages.splice(index, 1);
        localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
        renderGallery();
        showNotification('갤러리 이미지가 삭제되었습니다.');
    }
}

// 알림 표시
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        background: ${type === 'error' ? 'rgba(255,0,0,0.9)' : 'rgba(0,255,0,0.9)'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 데이터 로드
function loadData() {
    // 배너 로드
    const savedBanner = localStorage.getItem('guildBanner');
    if (savedBanner) {
        document.getElementById('guildBanner').src = savedBanner;
    }
    
    // 길드원 데이터 로드
    const savedMembers = localStorage.getItem('guildMembers');
    if (savedMembers) {
        guildMembers = JSON.parse(savedMembers);
    }
    
    // 갤러리는 기본 이미지로 고정 (localStorage 사용 안함)
    
    renderMembers();
    renderGallery();
}


// 별 애니메이션 강화
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const twinklingContainer = document.querySelector('.twinkling');
    
    // 추가 별들 생성
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        starsContainer.appendChild(star);
    }
}

// 배너 파티클 효과 생성
function createBannerParticles() {
    const bannerContainer = document.querySelector('.banner-overlay');
    
    // 파티클 컨테이너 생성
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'banner-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    // 50개의 파티클 생성
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'banner-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: radial-gradient(circle, #ffd700 0%, #ffeb3b 50%, transparent 100%);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: 0;
            animation: bannerParticleFloat ${Math.random() * 4 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
        `;
        particlesContainer.appendChild(particle);
    }
    
    bannerContainer.appendChild(particlesContainer);
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 이벤트 리스너 등록
    document.getElementById('adminToggle').addEventListener('click', toggleAdmin);
    
    // 데이터 로드
    loadData();
    
    // 별 생성
    createStars();
    
    // 배너 파티클 생성
    createBannerParticles();
    
    // 스크롤 효과
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const stars = document.querySelector('.stars');
        const twinkling = document.querySelector('.twinkling');
        
        if (stars) {
            stars.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (twinkling) {
            twinkling.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // 가입 버튼 클릭 이벤트
    document.querySelector('.join-btn').addEventListener('click', function() {
        window.open('https://open.kakao.com/o/sUQvYRug', '_blank');
    });
});

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
    }
    
    .notification {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    .remove-btn:hover {
        background: rgba(255,0,0,1) !important;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);