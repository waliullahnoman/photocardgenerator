const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');

// Template definitions (easily extensible)
const templates = {
    jamuna: {
        backgroundColor: '#ffffff',
        fontFamily: 'Noto Sans Bengali',
        logoPosition: { x: 50, y: 50, width: 100, height: 100 },
        headlinePosition: { x: 50, y: 900, fontSize: 48, color: '#000000' },
        subheadingPosition: { x: 50, y: 950, fontSize: 24, color: '#666666' },
        datePosition: { x: 50, y: 1000, fontSize: 18, color: '#000000' },
        mediaNamePosition: { x: 50, y: 1020, fontSize: 16, color: '#000000' },
        domainPosition: { x: 50, y: 1040, fontSize: 14, color: '#000000' },
        facebookPosition: { x: 800, y: 1000, fontSize: 14, color: '#000000' },
        youtubePosition: { x: 800, y: 1020, fontSize: 14, color: '#000000' }
    }
    // Add more templates here, e.g., somoy: { ... }
};

// Default values
let currentTemplate = 'jamuna';
let mainImage = null;
let logoImage = null;
let inputs = {
    headlineBangla: '',
    headlineEnglish: '',
    subheading: '',
    date: '',
    domain: '',
    mediaName: '',
    facebookUrl: '',
    youtubeUrl: '',
    fontSelector: 'Noto Sans Bengali',
    textColor: '#000000'
};

// Event listeners for inputs
document.getElementById('template').addEventListener('change', (e) => {
    currentTemplate = e.target.value;
    updatePreview();
});

document.getElementById('headlineBangla').addEventListener('input', (e) => {
    inputs.headlineBangla = e.target.value;
    updatePreview();
});

document.getElementById('headlineEnglish').addEventListener('input', (e) => {
    inputs.headlineEnglish = e.target.value;
    updatePreview();
});

document.getElementById('subheading').addEventListener('input', (e) => {
    inputs.subheading = e.target.value;
    updatePreview();
});

document.getElementById('date').addEventListener('input', (e) => {
    inputs.date = e.target.value;
    updatePreview();
});

document.getElementById('domain').addEventListener('input', (e) => {
    inputs.domain = e.target.value;
    updatePreview();
});

document.getElementById('mediaName').addEventListener('input', (e) => {
    inputs.mediaName = e.target.value;
    updatePreview();
});

document.getElementById('facebookUrl').addEventListener('input', (e) => {
    inputs.facebookUrl = e.target.value;
    updatePreview();
});

document.getElementById('youtubeUrl').addEventListener('input', (e) => {
    inputs.youtubeUrl = e.target.value;
    updatePreview();
});

document.getElementById('fontSelector').addEventListener('change', (e) => {
    inputs.fontSelector = e.target.value;
    updatePreview();
});

document.getElementById('textColor').addEventListener('input', (e) => {
    inputs.textColor = e.target.value;
    updatePreview();
});

document.getElementById('mainImageUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            mainImage = new Image();
            mainImage.onload = updatePreview;
            mainImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('logoUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            logoImage = new Image();
            logoImage.onload = updatePreview;
            logoImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'photo-card.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Function to update the canvas preview
function updatePreview() {
    const template = templates[currentTemplate];
    
    // Clear canvas
    ctx.fillStyle = template.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw main image (if uploaded)
    if (mainImage) {
        ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);
    }
    
    // Draw logo (if uploaded)
    if (logoImage) {
        const pos = template.logoPosition;
        ctx.drawImage(logoImage, pos.x, pos.y, pos.width, pos.height);
    }
    
    // Set font and color
    ctx.font = `${template.headlinePosition.fontSize}px ${inputs.fontSelector}`;
    ctx.fillStyle = inputs.textColor;
    
    // Draw headline (Bangla + English)
    const headline = `${inputs.headlineBangla} ${inputs.headlineEnglish}`;
    ctx.fillText(headline, template.headlinePosition.x, template.headlinePosition.y);
    
    // Draw subheading
    ctx.font = `${template.subheadingPosition.fontSize}px ${inputs.fontSelector}`;
    ctx.fillText(inputs.subheading, template.subheadingPosition.x, template.subheadingPosition.y);
    
    // Draw date
    ctx.font = `${template.datePosition.fontSize}px ${inputs.fontSelector}`;
    const formattedDate = inputs.date ? new Date(inputs.date).toLocaleDateString('en-GB') : '';
    ctx.fillText(formattedDate, template.datePosition.x, template.datePosition.y);
    
    // Draw media name
    ctx.font = `${template.mediaNamePosition.fontSize}px ${inputs.fontSelector}`;
    ctx.fillText(inputs.mediaName, template.mediaNamePosition.x, template.mediaNamePosition.y);
    
    // Draw domain
    ctx.font = `${template.domainPosition.fontSize}px ${inputs.fontSelector}`;
    ctx.fillText(inputs.domain, template.domainPosition.x, template.domainPosition.y);
    
    // Draw Facebook URL
    ctx.font = `${template.facebookPosition.fontSize}px ${inputs.fontSelector}`;
    ctx.fillText(inputs.facebookUrl, template.facebookPosition.x, template.facebookPosition.y);
    
    // Draw YouTube URL
    ctx.font = `${template.youtubePosition.fontSize}px ${inputs.fontSelector}`;
    ctx.fillText(inputs.youtubeUrl, template.youtubePosition.x, template.youtubePosition.y);
}

// Initial render
updatePreview();
