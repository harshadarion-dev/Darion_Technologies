document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('rss-feed-container');

    // Using heavily cached Tech News RSS to JSON logic
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                container.innerHTML = ''; // clear loading state
                data.items.slice(0, 9).forEach(item => {
                    // Clean HTML from title if present
                    const cleanTitle = item.title.replace(/<[^>]*>?/gm, '');

                    // Extract image safely attempting multiple standard RSS locations
                    let imageSrc = item.thumbnail || (item.enclosure && item.enclosure.link);

                    // If still missing, parse the raw description HTML for embedded images
                    if (!imageSrc) {
                        const imgMatch = (item.content || item.description || '').match(/<img[^>]+src="([^">]+)"/);
                        if (imgMatch && imgMatch[1]) {
                            imageSrc = imgMatch[1];
                        }
                    }

                    // Ultimate enterprise fallback guaranteeing the layout never breaks
                    if (!imageSrc || imageSrc === '') {
                        imageSrc = 'images/production_hero_1777316699933.png';
                    }

                    // Native Darion Carbon Card
                    const card = `
                    <div class="bx--col-sm-4 bx--col-md-4 bx--col-lg-4" style="margin-bottom: 2rem;">
                        <a href="${item.link}" target="_blank" class="ibm-card" style="text-decoration:none; display: flex; flex-direction: column; height: 100%;">
                            <div style="width:100%; height:12rem; background:url('${imageSrc}') center center / cover; border-bottom: 1px solid var(--ibm-gray-20);"></div>
                            <div class="ibm-card-content" style="flex: 1;">
                                <p class="ibm-card-eyebrow">Technical Dispatch • ${new Date(item.pubDate).toLocaleDateString()}</p>
                                <h3 class="ibm-card-title">${cleanTitle}</h3>
                            </div>
                            <div class="ibm-card-footer" style="padding: 1rem 1.5rem; justify-content:flex-start; color: var(--ibm-blue-60); font-weight: 500;">
                                Read Global Intel <svg style="margin-left:0.5rem;" width="16" height="16" viewBox="0 0 32 32" fill="currentColor"><path d="M16 4L14.6 5.4 24.2 15H4v2h20.2l-9.6 9.6L16 28l12-12L16 4z"/></svg>
                            </div>
                        </a>
                    </div>`;
                    container.insertAdjacentHTML('beforeend', card);
                });
            } else {
                container.innerHTML = '<p style="color: var(--ibm-gray-70);">Unable to sync with master RSS nodes.</p>';
            }
        })
        .catch(err => {
            console.error('RSS Fetch Engineering Error:', err);
            container.innerHTML = '<p style="color: var(--ibm-gray-70);">Telemetry cluster currently inaccessible. Awaiting handshake...</p>';
        });
});
