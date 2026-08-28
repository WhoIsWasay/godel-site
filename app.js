/**
 * GÖDEL RENDERING ENGINE WITH ANIMATIONS
 * Reads from siteConfig and builds the DOM. 
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Hero
    const hero = document.getElementById('hero');
    hero.classList.add('reveal'); // Add animation class
    let videoHtml = siteConfig.hero.youtubeEmbedUrl 
        ? `<div class="video-container"><iframe src="${siteConfig.hero.youtubeEmbedUrl}" frameborder="0" allowfullscreen></iframe></div>` 
        : '';
    
    hero.innerHTML = `
        <h1>${siteConfig.hero.projectName}</h1>
        <p class="hero-tagline">${siteConfig.hero.tagline}</p>
        <a href="${siteConfig.hero.githubRepoUrl}" class="btn" target="_blank">View on GitHub</a>
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
        <p style="color: #fff; font-size: 1.1rem; margin-bottom: 1rem;">${siteConfig.about.whyItExists}</p>
        <p>${siteConfig.about.bio}</p>
    `;

    // 3. Render Pipeline
    const pipelineContainer = document.getElementById('pipeline-container');
    document.getElementById('pipeline').classList.add('reveal');
    siteConfig.pipeline.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'pipeline-step';
        stepDiv.innerHTML = `
            <h3>0${index + 1} — ${step.name}</h3>
            <p>${step.description}</p>
        `;
        pipelineContainer.appendChild(stepDiv);
    });

    // 4. Render Benchmarks
    const tableBody = document.getElementById('benchmark-tbody');
    const summaryGrid = document.getElementById('benchmark-summary');
    document.getElementById('benchmarks').classList.add('reveal');
    
    let totalContracts = siteConfig.benchmarks.length;
    let syntheticPlanted = 0;
    let syntheticFound = 0;
    let competitivePlanted = 0;
    let competitiveFound = 0;

    siteConfig.benchmarks.forEach(bm => {
        const isCompetitive = bm.category_tags && bm.category_tags.includes('competitive-audit');
        if (isCompetitive) {
            competitivePlanted += bm.bugs_planted;
            competitiveFound += bm.bugs_found;
        } else {
            syntheticPlanted += bm.bugs_planted;
            syntheticFound += bm.bugs_found;
        }

        const row = document.createElement('tr');
        const badgeClass = bm.status.toLowerCase();
        const tagsHtml = bm.category_tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        row.innerHTML = `
            <td data-label="Contract"><a href="${bm.github_link}" target="_blank">${bm.contract_name}</a></td>
            <td data-label="LOC">${bm.lines_of_code}</td>
            <td data-label="Status"><span class="badge ${badgeClass}">${bm.status}</span></td>
            <td data-label="Bugs">${bm.bugs_found} / ${bm.bugs_planted}</td>
            <td data-label="Missed">${bm.bugs_missed}</td>
            <td data-label="False Pos.">${bm.false_positives}</td>
            <td data-label="Categories">${tagsHtml}</td>
            <td data-label="Summary" style="color: var(--text-muted);">${bm.short_summary}</td>
        `;
        tableBody.appendChild(row);
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
            <div class="summary-value">0</div>
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
        <div>Gödel Engine • <a href="mailto:${siteConfig.footer.contactEmail}">Contact</a></div>
        <div>Last Updated: ${siteConfig.footer.lastUpdated}</div>
    `;

    // --------------------------------------------------------
    // INIT INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // --------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Grab all elements with the 'reveal' class and observe them
    document.querySelectorAll('.reveal').forEach(section => {
        observer.observe(section);
    });
    
    // Trigger the hero animation immediately on load
    setTimeout(() => {
        document.getElementById('hero').classList.add('active');
    }, 100);
});