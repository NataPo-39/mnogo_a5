const yearEl = document.getElementById('year');
const serverTimeEl = document.getElementById('serverTime');
const newsContainer = document.getElementById('newsList');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Отображение серверного времени (локальное время браузера — для демонстрации)
function updateTime() {
    if (!serverTimeEl) return;
    const now = new Date();
    serverTimeEl.textContent = now.toLocaleString('ru-RU');
}
updateTime();
setInterval(updateTime, 1000);

// Загрузка анонсов с сервера (маршрут /news)
async function loadNews() {
    try {
        const response = await fetch('/news');
        if (!response.ok) throw new Error('Ошибка загрузки');
        const news = await response.json();
        if (!newsContainer) return;

        if (news.length === 0) {
            newsContainer.innerHTML = '<p>Нет анонсов</p>';
            return;
        }

        const newsHtml = news.map(item => `
            <div class="news-item">
                <div class="news-rubric">${escapeHtml(item.rubric || 'Анонс')}</div>
                <h4>${escapeHtml(item.title)} <span class="news-date">${escapeHtml(item.date)}</span></h4>
                <p class="news-preview">${escapeHtml(item.preview)}</p>
            </div>
        `).join('');
        newsContainer.innerHTML = newsHtml;
    } catch (err) {
        console.error('Ошибка загрузки анонсов:', err);
        if (newsContainer) newsContainer.innerHTML = '<p>Не удалось загрузить анонсы</p>';
    }
}

// Простая защита от XSS
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

loadNews();