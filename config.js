/**
 * GÖDEL SITE CONFIGURATION
 * Edit this file to update the website. No HTML/CSS/JS knowledge required.
 */

const siteConfig = {
    // 1. HERO SECTION
    hero: {
        projectName: "Gödel",
        tagline: "An AI-powered formal verification agent for smart contracts.",
        founderName: "Abdul Wasay", 
        founderTagline: "CS student and solo founder building automated reasoning engines for Ethereum.",
        githubRepoUrl: "https://github.com/WhoIsWasay/godel-audit-results",
        // Leave youtubeEmbedUrl empty ("") if you don't have a video yet
        youtubeEmbedUrl: "" 
    },

    // 2. ABOUT SECTION
 about: {
    bio: "I'm a computer science student and solo founder building infrastructure at the intersection of AI and formal methods. Before Gödel, I built Sprout, a developer-first payment gateway with a full Go/Redis/PostgreSQL backend and a double-entry ledger, from scratch. Gödel is my attempt to bring the same rigor to smart contract security — merging large language models with deterministic mathematical provers.",
    whyItExists: "Smart contract vulnerabilities cause billions in losses, but traditional formal verification is too slow and requires specialized PhD-level knowledge to write properties. Gödel bridges this gap. It acts as an autonomous agent that reads Solidity code, generates strict invariants, and mathematically proves them."
},
    // 3. PIPELINE STAGES (HOW IT WORKS)
    // Renders as a left-to-right flow diagram
    pipeline: [
  { name: "Bug Hunter", description: "Analyzes function logic to propose candidate vulnerabilities." },
  { name: "Supervisor", description: "Critiques candidates and can trigger re-analysis." },
  { name: "Specifier", description: "Formalizes the vulnerability into a provable invariant." },
  { name: "Executor / Z3", description: "Symbolic execution and SMT solving to prove or disprove the invariant." },
  { name: "Gatekeeper", description: "Verifies the exploit against a live Foundry EVM test — no proof, no bug." },
  { name: "Fixer", description: "Proposes a patch, re-verified against the same invariant." }
],

    // 4. BENCHMARK RESULTS (THE CORE DATA)
    // The summary stats (total bugs, hit rate, etc.) are calculated automatically from this array.
    benchmarks: [
        {
            contract_name: "VestingVault",
            lines_of_code: 159,
            bugs_planted: 4,
            bugs_found: 3,
            bugs_missed: 1,
            false_positives: 0,
            status: "Partial", // Use: "Caught", "Missed", or "Partial"
            category_tags: ["arithmetic"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/vestingVault",
            short_summary: "Successfully identified an accounting state invariant breach in grant overwrites and a linear interpolation arithmetic logic bug in vesting calculations."
        },
        {
            contract_name: "DiscountLiquidityPool",
            lines_of_code: 131,
            bugs_planted: 2,
            bugs_found: 2,
            bugs_missed: 0,
            false_positives: 0,
            status: "Caught",
            category_tags: ["arithmetic", "logic"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/discountLiquidityPool",
            short_summary: "Successfully identified a division-before-multiplication truncation bug and a fee monotonicity logic violation."
        },
        {
            contract_name: "SubscriptionBillingProration",
            lines_of_code: 246,
            bugs_planted: 3,
            bugs_found: 3,
            bugs_missed: 0,
            false_positives: 0,
            status: "Caught",
            category_tags: ["arithmetic", "logic","state machine"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/subscriptionBillingProration",
            short_summary: "Successfully identified a double-division precision loss in refund calculations, an off-by-one boundary threshold flaw in loyalty discounts, and a state machine invariant breakdown on invoice overpayment."
        },
        {
            contract_name: "DAOTreasuryManager",
            lines_of_code: 225,
            bugs_planted: 3,
            bugs_found: 3,
            bugs_missed: 0,
            false_positives: 0,
            status: "Caught",
            category_tags: ["arithmetic", "logic"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/daoTreasuryManager",
            short_summary: "Successfully identified a uint64 downcast truncation bug, an incorrect ratio denominator error, and a budget reclamation monotonicity sign violation."
        },
        {
            contract_name: "EnterpriseSupply-ChainEscrowManager",
            lines_of_code: 388,
            bugs_planted: 4,
            bugs_found: 4,
            bugs_missed: 0,
            false_positives: 0,
            status: "Caught",
            category_tags:  ["arithmetic", "logic"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/enterpriseSupply-ChainEscrowManager",
            short_summary: "Successfully identified a sequential penalty overwrite bug, an off-by-one mapping boundary violation, an incorrect weighted-average denominator error, and an escrow balance conservation desync."
        },
         {
            contract_name: "GlobalPayrollWithholding-Manager",
            lines_of_code: 461,
            bugs_planted: 4,
            bugs_found: 2,
            bugs_missed: 2,
            false_positives: 0,
            status: "Partial",
            category_tags: ["arithmetic", "logic"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/globalPayrollWithholdingManager",
            short_summary: "Successfully identified an incorrect timeline denominator vesting ratio error across standalone and state-dependent execution pathways."
        },
         {
            contract_name: "CollateralizeDebtPosition",
            lines_of_code: 64,
            bugs_planted: 3,
            bugs_found: 2,
            bugs_missed: 1,
            false_positives: 0,
            status: "Partial",
            category_tags: ["arithmetic", "logic"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/collateralizeDebtPosition",
            short_summary: "Successfully identified a floor-division fee truncation flaw, a post-mutation interest calculation evasion, a 1-wei share-burning rounding arbitrage, and verified a false-positive unchecked overflow guard"
        },
        {
            contract_name: "IdleYieldSource",
            lines_of_code: 154,
            bugs_planted: 2,
            bugs_found: 1,
            bugs_missed: 1,
            false_positives: 0,
            status: "Partial",
            category_tags: ["logic", "competitive-audit"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/IdleYieldSource",
            short_summary: "Code4rena PoolTogether V3 competitive audit. Confirmed H-01: redeemToken passes wrong variable (shares instead of amount) to redeemIdleToken, causing incorrect redemption denomination. Forge EVM-verified."
        },
        {
            contract_name: "YearnV2YieldSource",
            lines_of_code: 279,
            bugs_planted: 2,
            bugs_found: 3,
            bugs_missed: 0,
            false_positives: 0,
            status: "Caught",
            category_tags: ["arithmetic", "logic", "competitive-audit"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/YearnV2YieldSource",
            short_summary: "Code4rena PoolTogether V3 competitive audit. Confirmed H-02: _withdrawFromVault subtracts in wrong direction (previousBalance - currentBalance instead of currentBalance - previousBalance), causing underflow. Also found 2 additional precision-loss bugs in share conversion functions, all forge-verified."
        },
    ],

    // 5. CURRENT WORK
currentWork: [
    "Validated against real Code4rena competitive audit contracts (PoolTogether V3) — found 4 bugs across 2 yield source contracts, including 3 forge-confirmed EVM exploits.",
    "RAG-powered bug hunter with historical vulnerability pattern retrieval — connecting known exploit patterns to new code automatically.",
    "Expanding the competitive audit dataset with more Code4rena and Sherlock contest contracts to measure real-world catch rates."
],

    // 6. KNOWN PROBLEMS
 knownProblems: [
    {
        problem: "Isolated Function Scope",
        why_it_happens: "The Inspector-Isolator engine is rigidly constrained to analyze one isolated function at a time. It is mathematically blind to compositional, multi-transaction attack vectors. If a zero-day exploit relies on an attacker interacting with one public entrypoint (e.g., triggering a state lock) and then calling an entirely separate public entrypoint in a subsequent transaction to drain funds, the isolated pipeline will mark both functions as safe. This boundary can only be breached in a separate, compositional agent phase.",
        planned_fix: "'None' at this stage. Our main focus is to find and fix at least 95% of the isolated bugs out there."
    },
    {
        problem: "Unverified State Reachability",
        why_it_happens: "When the Isolator proves an invariant violation, it proves it over free variables, not over states reachable through real transaction sequences. In many cases the violating state coincides with a genuinely reachable one, particularly when shared state can be influenced through paths outside the function under analysis. But the pipeline has no general mechanism to confirm that a mathematically valid counterexample corresponds to an actual reachable state, so a reported finding's severity — or its exploitability at all — may be overstated.",
        planned_fix: "'None' at this stage. Both this and the isolated-scope limitation stem from the same boundary: proper resolution requires modeling the full state-transition system rather than a single function body, which is deferred to a separate, compositional agent phase."
    },
],

    // 7. ROADMAP
  roadmap: [
    { phase: "Phase 1: Solidity FV Hardening", description: "Achieve a 95% catch rate on the standardized vulnerable contract dataset." },
    { phase: "Phase 2: CI/CD Integration", description: "Develop GitHub Actions for zero-config PR verification." },
    { phase: "Phase 3: Multi-language Support", description: "Expand the agentic pipeline to Rust/Solana and Vyper." },
    { phase: "Phase 4: The FV Environment", description: "A unified development environment where formal verification is as native as autocomplete — write code, get invariants proposed and proven in real time, not bolted on after the fact." }
],

    // 8. FOOTER
    footer: {
        contactEmail: "wasay.godel@gmail.com",
        lastUpdated: "August 2026"
    }
};