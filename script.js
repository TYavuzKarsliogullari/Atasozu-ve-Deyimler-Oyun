// MÜZİK KONTROL VE SORULAR
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');
let isMusicPlaying = false;

// Müziği Aç/Kapa Fonksiyonu
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.volume = 0.4; // Ses seviyesi %40
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                isMusicPlaying = true;
                musicBtn.innerText = "🔊";
            })
            .catch(error => {
                console.log("Müzik çalma hatası:", error);
                alert("Müzik dosyası (muzik.mp3) bulunamadı veya tarayıcı izin vermedi.");
            });
        }
    } else {
        bgMusic.pause();
        isMusicPlaying = false;
        musicBtn.innerText = "🔇";
    }
}

// SORU LİSTESİ
const questions = [
    { text: "Gireni çıkanı çok olan, kimin gelip gittiği belli olmayan yer.", answer: "Dingo'nun ahırı" },
    { text: "Çok sevinmek.", answer: "Etekleri zil çalmak" },
    { text: "Daha sözün başında ne demek istediğini anlamak, anlayışlı ve kavrayışlı olmak.", answer: "Leb demeden leblebiyi anlamak" },
    { text: "Bir işin ya da olayın artık çok geç kalındığını, faydasının olmadığını ifade eder.", answer: "Üsküdar'da sabah oldu" },
    { text: "Sonradan geldiği bir yerde, kendinden önce gelen kişinin yerini almaya çalışmak.", answer: "Dağdan gelip bağdakini kovmak" },
    { text: "Daha iyisini elde etmek uğruna çalışırken elindekilerini de yitirmek.", answer: "Dimyat'a pirince giderken evdeki bulgurdan olmak" },
    { text: "Birileri için çok özveri ile çalışıp hizmet etmek.", answer: "Saçını süpürge etmek" },
    { text: "Evini barkını yıkmak, ocağını söndürmek.", answer: "Ocağına incir ağacı dikmek" },
    { text: "Gerektiğinden çok önce veya henüz ortada hiçbir şey yokken hazırlanmaya kalkışmak.", answer: "Dereyi görmeden paçaları sıvamak" },
    { text: "Her zaman bir arada bulunan, arkadaşlık eden kimseler birbirlerinin huylarından etkilenerek benzer hale gelirler.", answer: "Üzüm üzüme baka baka kararır" },
    { text: "Bir kişinin kırgınlık veya tepkisinin karşı tarafça fark edilmemesi durumunu anlatır.", answer: "Tavşan dağa küsmüş, dağın haberi yok" },
    { text: "İki ortak veya taraf arasındaki yakınlığın dayandığı sebep yok olduğunda bu yakınlık da çözülür.", answer: "Öküz öldü ortaklık bozuldu" },
    { text: "Hile ve dalavere ile iş yapmak.", answer: "Dolap çevirmek" },
    { text: "Bir kişiyi, yaptığı yanlışın cezasını ağır bir şekilde vermek.", answer: "Eşek sudan gelinceye kadar dövmek" },
    { text: "Sadece konuşmakla, vaatlerde bulunmakla iş yürümez bir şeyin olması için emek ve çaba gerekir.", answer: "Lafla peynir gemisi yürümez" },
    { text: "Davranış ve yetenekleriyle ilgi ve önem kazanmak.", answer: "Göze girmek" },
    { text: "Birinin başına gelen kötü bir durum senin de başına gelebilir.", answer: "Gülme komşuna gelir başına" },
    { text: "İnsan, kendi ortamında veya kendi işinde öne çıkar, değer görür.", answer: "Her horoz kendi çöplüğünde öter" },
    { text: "Bir söylenti, dedikodu veya haberin mutlaka bir dayanağı, gerçek nedeni vardır.", answer: "Ateş olmayan yerden duman çıkmaz" },
    { text: "Düşünüp taşınmadan ivedi olarak yapılan işten iyi sonuç alınamayacağını anlatan söz.", answer: "Acele işe şeytan karışır" },
    { text: "İnsan sevdiği kimse veya sevdiği iş yüzünden gelecek sıkıntılara katlanır.", answer: "Gülü seven dikenine katlanır" },
    { text: "Dostlar, birbirlerinden ne denli uzak düşmüş olurlarsa olsunlar, günün birinde kavuşabilirler.", answer: "Dağ dağa kavuşmaz insan insana kavuşur" },
    { text: "İnsanlar küçük yaşta kolay eğitilir.", answer: "Ağaç yaşken eğilir" },
    { text: "Bir işte düşüncesizce davranan kişi her türlü olumsuz sonuca katlanır.", answer: "Akılsız başın cezasını ayaklar çeker" },
    { text: "Azar azar olagelen şeyler birikerek önemli bir niceliğe ulaşacağı için küçümsenmemelidir.", answer: "Damlaya damlaya göl olur" },
    { text: "Ne yapsa, ne kadar çaba ve ustalık gösterse nafile.", answer: "Ağzınla kuş tutsan nafile" },
    { text: "Umutsuz bir bekleyişi anlatmak için söylenen bir söz.", answer: "Ölme eşeğim ölme" },
    { text: "Belli etmeden iş çevirmek, ortalığı karıştırmak.", answer: "Saman altından su yürütmek" },
    { text: "İşi düzelteyim derken büsbütün bozmak.", answer: "Kaş yapayım derken göz çıkarmak" },
    { text: "Delirmek veya bunalım içinde bulunmak.", answer: "Keçileri kaçırmak" }
];

let currentQuestionIndex = 0;
let score = 0;
let availableQuestions = [];

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress');
const finalScore = document.getElementById('final-score');
const feedbackText = document.getElementById('feedback-text');
const questionCountBadge = document.getElementById('question-count');

function startGame() {
    // Müziği başlat
    if (!isMusicPlaying) {
        bgMusic.volume = 0.4;
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.innerText = "🔊";
        }).catch(e => console.log("Otomatik oynatma tarayıcı tarafından engellendi, butona basılması lazım."));
    }

    score = 0;
    currentQuestionIndex = 0;
    availableQuestions = [...questions];
    shuffleArray(availableQuestions);
    
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    showQuestion();
}

function showQuestion() {
    if (availableQuestions.length === 0) {
        endGame();
        return;
    }

    const currentQuestion = availableQuestions[currentQuestionIndex];
    questionText.innerText = currentQuestion.text;
    questionCountBadge.innerText = `Soru ${questions.length - availableQuestions.length + 1} / ${questions.length}`;
    
    questionText.classList.remove('animate-fade');
    void questionText.offsetWidth; 
    questionText.classList.add('animate-fade');
    
    const progressPercent = ((questions.length - availableQuestions.length) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    optionsContainer.innerHTML = '';
    
    let options = [currentQuestion.answer];
    while (options.length < 4) {
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        if (!options.includes(randomQ.answer)) {
            options.push(randomQ.answer);
        }
    }
    
    shuffleArray(options);

    options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.classList.add('option-btn');
        btn.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        btn.style.opacity = '0';
        btn.addEventListener('click', () => selectOption(btn, currentQuestion.answer));
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedBtn, correctAnswer) {
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedBtn.innerText === correctAnswer) {
        selectedBtn.classList.add('correct');
        selectedBtn.innerHTML += " ✅";
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        selectedBtn.innerHTML += " ❌";
        allBtns.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add('correct');
                btn.innerHTML += " ✅";
            }
        });
    }

    setTimeout(() => {
        availableQuestions.shift(); 
        if (availableQuestions.length > 0) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

function endGame() {
    gameScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScore.innerText = `${score} / ${questions.length}`;
    
    const resultIcon = document.getElementById('result-icon');
    
    if (score === questions.length) {
        feedbackText.innerText = "EFSANESİN! Hepsini bildin! 🌟";
        resultIcon.innerText = "🏆";
        launchConfetti();
    } else if (score > questions.length * 0.8) {
        feedbackText.innerText = "Çok iyisin! Tebrikler!";
        resultIcon.innerText = "🎉";
        launchConfetti();
    } else if (score > questions.length / 2) {
        feedbackText.innerText = "Fena değil, ama daha iyisi olabilir!";
        resultIcon.innerText = "👏";
    } else {
        feedbackText.innerText = "Biraz daha atasözü çalışman lazım.";
        resultIcon.innerText = "📚";
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function launchConfetti() {
    if (typeof confetti === 'function') {
        var duration = 3000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#6C63FF', '#FF6584', '#43D9AD']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#6C63FF', '#FF6584', '#43D9AD']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}