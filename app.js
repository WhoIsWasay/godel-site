/**
 * GÖDEL RENDERING ENGINE
 * Reads from siteConfig and builds the DOM.
 */

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Render Hero
    const hero = document.getElementById('hero');
    hero.classList.add('reveal');
    const videoHtml = siteConfig.hero.youtubeEmbedUrl
        ? `<div class="video-container"><iframe src="${siteConfig.hero.youtubeEmbedUrl}" title="Gödel overview" frameborder="0" allowfullscreen></iframe></div>`
        : '';

    hero.innerHTML = `
        <h1>${siteConfig.hero.projectName}</h1>
        <p class="hero-tagline">${siteConfig.hero.tagline}</p>
        <a href="${siteConfig.hero.githubRepoUrl}" class="btn" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        <div class="hero-founder">
            <strong>${siteConfig.hero.founderName}</strong><br>
            ${siteConfig.hero.founderTagline}
        </div>
        ${videoHtml}
    `;

    // 2. Render About
    const about = document.getElementById('about');
    about.classList.add('reveal');
    about.innerHTML = `
        <h2>About</h2>
        <p class="about-lead">${siteConfig.about.whyItExists}</p>
        <p>${siteConfig.about.bio}</p>
    `;

    // 3. Render Pipeline
    const pipelineContainer = document.getElementById('pipeline-container');
    document.getElementById('pipeline').classList.add('reveal');
    siteConfig.pipeline.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'pipeline-step';
        stepDiv.innerHTML = `
            <h3>0${index + 1} - ${step.name}</h3>
            <p>${step.description}</p>
        `;
        pipelineContainer.appendChild(stepDiv);
    });

    // 4. Render Benchmarks
    const benchmarkList = document.getElementById('benchmark-list');
    const summaryGrid = document.getElementById('benchmark-summary');
    document.getElementById('benchmarks').classList.add('reveal');

    const totalContracts = siteConfig.benchmarks.length;
    let syntheticPlanted = 0;
    let syntheticFound = 0;
    let competitivePlanted = 0;
    let competitiveFound = 0;
    let totalFalsePositives = 0;

    siteConfig.benchmarks.forEach(bm => {
        const isCompetitive = bm.category_tags && bm.category_tags.includes('competitive-audit');
        if (isCompetitive) {
            competitivePlanted += bm.bugs_planted;
            competitiveFound += bm.bugs_found;
        } else {
            syntheticPlanted += bm.bugs_planted;
            syntheticFound += bm.bugs_found;
        }
        totalFalsePositives += bm.false_positives || 0;

        const badgeClass = bm.status.toLowerCase();
        const tagsHtml = bm.category_tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        const card = document.createElement('article');
        card.className = 'benchmark-card';
        card.innerHTML = `
            <div class="benchmark-head">
                <a class="benchmark-name" href="${bm.github_link}" target="_blank" rel="noopener noreferrer">${bm.contract_name}</a>
                <div class="benchmark-meta">
                    <span class="badge ${badgeClass}">${bm.status}</span>
                    <span>${bm.lines_of_code} LOC</span>
                </div>
            </div>
            <div class="benchmark-stats">
                <span><strong>${bm.bugs_found}/${bm.bugs_planted}</strong> bugs found</span>
                <span><strong>${bm.bugs_missed}</strong> missed</span>
                <span><strong>${bm.false_positives}</strong> false pos.</span>
            </div>
            <div class="benchmark-tags">${tagsHtml}</div>
            <p class="benchmark-summary">${bm.short_summary}</p>
        `;
        benchmarkList.appendChild(card);
    });

    const syntheticHitRate = syntheticPlanted > 0 ? ((syntheticFound / syntheticPlanted) * 100).toFixed(1) : 0;
    const competitiveMatchRate = competitivePlanted > 0 ? ((competitiveFound / competitivePlanted) * 100).toFixed(1) : 0;

    summaryGrid.innerHTML = `
        <div class="summary-card">
            <div class="summary-value">${totalContracts}</div>
            <div class="summary-label">Contracts Tested</div>
        </div>
        <div class="summary-card">
            <div class="summary-value" style="color: var(--color-catch)">${syntheticHitRate}%</div>
            <div class="summary-label">Synthetic Hit Rate (${syntheticFound}/${syntheticPlanted})</div>
        </div>
        <div class="summary-card">
            <div class="summary-value" style="color: var(--color-catch)">${competitiveMatchRate}%</div>
            <div class="summary-label">C4 Match Rate (${competitiveFound}/${competitivePlanted})</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${totalFalsePositives}</div>
            <div class="summary-label">False Positives</div>
        </div>
    `;

    // 5. Render Current Work
    const currentWorkSection = document.getElementById('current-work');
    currentWorkSection.classList.add('reveal');
    const currentWorkList = document.getElementById('current-work-list');
    siteConfig.currentWork.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        currentWorkList.appendChild(li);
    });

    // 6. Render Roadmap
    const roadmapSection = document.getElementById('roadmap');
    roadmapSection.classList.add('reveal');
    const roadmapList = document.getElementById('roadmap-list');
    siteConfig.roadmap.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="timeline-phase">${item.phase}</div>
            <div class="timeline-desc">${item.description}</div>
        `;
        roadmapList.appendChild(li);
    });

    // 7. Render Known Limitations
    const limitationsSection = document.getElementById('limitations');
    limitationsSection.classList.add('reveal');
    const limitationsContainer = document.getElementById('limitations-container');
    siteConfig.knownProblems.forEach(problem => {
        const details = document.createElement('details');
        details.innerHTML = `
            <summary>${problem.problem}</summary>
            <div class="details-content">
                <strong>Why it happens:</strong>
                ${problem.why_it_happens}
                <strong>Planned fix:</strong>
                ${problem.planned_fix}
            </div>
        `;
        limitationsContainer.appendChild(details);
    });

    // 8. Render Footer
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <div>Gödel Engine | <a href="mailto:${siteConfig.footer.contactEmail}">Contact</a></div>
        <div>Last Updated: ${siteConfig.footer.lastUpdated}</div>
    `;

    // --------------------------------------------------------
    // SCROLL REVEAL (respects reduced-motion)
    // --------------------------------------------------------
    if (reduceMotion) {
        document.querySelectorAll('.reveal').forEach(section => {
            section.classList.add('active');
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(section => {
        observer.observe(section);
    });

    setTimeout(() => {
        document.getElementById('hero').classList.add('active');
    }, 100);
});
