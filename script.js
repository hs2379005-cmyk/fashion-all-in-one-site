const brandNameInput = document.getElementById('brandName');
const campaignTitleInput = document.getElementById('campaignTitle');
const tagLineInput = document.getElementById('tagLine');
const accentColorInput = document.getElementById('accentColor');
const canvas = document.getElementById('thumbnailCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

const clampText = (value, fallback) => value.trim() || fallback;

function drawThumbnail() {
  const brand = clampText(brandNameInput.value, 'Maison Vela');
  const title = clampText(campaignTitleInput.value, 'Autumn Edit');
  const tagline = clampText(tagLineInput.value, 'Drops worth staying for');
  const accent = accentColorInput.value || '#d9b16d';

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#0c0b0d');
  gradient.addColorStop(0.35, '#171317');
  gradient.addColorStop(1, '#291a1c');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const glow = ctx.createRadialGradient(850, 110, 20, 850, 110, 420);
  glow.addColorStop(0, accent + 'cc');
  glow.addColorStop(0.4, accent + '55');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fillRect(70, 40, 1060, 550);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.strokeRect(70, 40, 1060, 550);

  ctx.fillStyle = '#f5ece4';
  ctx.font = '700 28px Inter';
  ctx.fillText(brand.toUpperCase(), 110, 110);

  ctx.fillStyle = accent;
  ctx.font = '600 20px Inter';
  ctx.fillText('NEW DROP', 110, 154);

  ctx.fillStyle = '#f5ece4';
  ctx.font = '600 106px Cormorant Garamond';
  const titleLines = wrapText(ctx, title, 520);
  titleLines.slice(0, 2).forEach((line, index) => {
    ctx.fillText(line, 110, 260 + index * 80);
  });

  ctx.fillStyle = 'rgba(245,236,228,0.78)';
  ctx.font = '500 28px Inter';
  ctx.fillText(tagline, 110, 420);

  ctx.fillStyle = accent;
  ctx.fillRect(110, 470, 210, 52);
  ctx.fillStyle = '#171317';
  ctx.font = '700 22px Inter';
  ctx.fillText('SHOP NOW', 148, 504);

  const silhouetteX = 790;
  const silhouetteY = 156;
  const silhouetteW = 290;
  const silhouetteH = 390;

  ctx.save();
  ctx.translate(silhouetteX, silhouetteY);
  ctx.beginPath();
  ctx.moveTo(silhouetteW * 0.5, 0);
  ctx.bezierCurveTo(
    silhouetteW * 0.9,
    0.18 * silhouetteH,
    silhouetteW * 0.9,
    0.72 * silhouetteH,
    silhouetteW * 0.58,
    silhouetteH
  );
  ctx.bezierCurveTo(
    silhouetteW * 0.38,
    silhouetteH,
    silhouetteW * 0.2,
    0.7 * silhouetteH,
    silhouetteW * 0.16,
    0.34 * silhouetteH
  );
  ctx.bezierCurveTo(
    silhouetteW * 0.14,
    0.22 * silhouetteH,
    silhouetteW * 0.28,
    0.1 * silhouetteH,
    silhouetteW * 0.5,
    0
  );
  ctx.closePath();
  ctx.fillStyle = 'rgba(245,236,228,0.22)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(silhouetteW * 0.5, 92, 54, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.font = '600 18px Inter';
  ctx.fillText('98K REACH', 800, 560);
  ctx.fillStyle = accent;
  ctx.fillRect(975, 534, 118, 34);
  ctx.fillStyle = '#171317';
  ctx.font = '700 16px Inter';
  ctx.fillText('LIVE', 1016, 557);
}

function wrapText(context, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

function updateThumbnail() {
  drawThumbnail();
}

brandNameInput.addEventListener('input', updateThumbnail);
campaignTitleInput.addEventListener('input', updateThumbnail);
tagLineInput.addEventListener('input', updateThumbnail);
accentColorInput.addEventListener('input', updateThumbnail);

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'maison-vela-thumbnail.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

updateThumbnail();

