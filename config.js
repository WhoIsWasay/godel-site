/**
 * GÖDEL SITE CONFIGURATION
 * Edit this file to update the website. No HTML/CSS/JS knowledge required.
 */

const siteConfig = {
    // 1. HERO SECTION
    hero: {
        projectName: "Gödel",
        tagline: "Formal verification for multi-contract Solidity protocols - Z3 proofs, Foundry-replayed exploits.",
        founderName: "Abdul Wasay", 
        founderTagline: "CS student and solo founder building automated reasoning engines for Ethereum.",
        githubRepoUrl: "https://github.com/WhoIsWasay/godel-audit-results",
        // Leave youtubeEmbedUrl empty ("") if you don't have a video yet
        youtubeEmbedUrl: "" 
    },

    // 2. ABOUT SECTION
 about: {
    bio: "I'm a computer science student and solo founder building infrastructure at the intersection of AI and formal methods. Before Gödel, I built Sprout, a developer-first payment gateway with a full Go/Redis/PostgreSQL backend and a double-entry ledger, from scratch. Gödel is my attempt to bring the same rigor to smart contract security - merging large language models with deterministic mathematical provers.",
    whyItExists: "Smart contract vulnerabilities cause billions in losses, but traditional formal verification is too slow and requires specialized PhD-level knowledge to write properties. Gödel bridges this gap. It reads a Solidity protocol, builds an exact model of the deployed contracts, proves declared invariants with Z3, and only reports a finding when Foundry replays a synthesized exploit. Single-function reasoning still runs, but the engine now reasons over bounded cross-contract executions too."
},
    // 3. PIPELINE STAGES (HOW IT WORKS)
    // Renders as a left-to-right flow diagram
    pipeline: [
  { name: "Ingest", description: "Slither CFG + Foundry/Hardhat build-info, with a pinned solc per source pragma." },
  { name: "Deploy Model", description: "Contracts, instances, constructor wiring, roles and declared proxies from the deployment scripts." },
  { name: "Exact Harness", description: "Per-function and cross-contract Z3 models: checked arithmetic, mappings, structs, arrays, linked args and returns." },
  { name: "Trace Reasoning", description: "Declared protocol, economic and return invariants over bounded multi-contract traces (BMC)." },
  { name: "Execution Semantics", description: "Reentrancy schedules, declared transaction orders, nested ETH value and declared ERC-20 accounting." },
  { name: "PoC Synthesis", description: "A deterministic Foundry test built from the exact counterexample; a declared proxy is reproduced through the proxy." },
  { name: "Foundry Gate", description: "Every finding is replayed on the EVM - no replay, no bug. Z3-only violations stay inconclusive." }
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
            contract_name: "MiniVault",
            lines_of_code: 72,
            bugs_planted: 4,
            bugs_found: 4,
            bugs_missed: 0,
            false_positives: 0,
            status: "Caught", // Use: "Caught", "Missed", or "Partial"
            category_tags: ["arithmetic", "logic"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/MiniVault",
            short_summary: "All 4 real bugs caught and forge-confirmed on a yield-bearing staking vault: a flat-500 instead of 5% emergency-withdrawal penalty (breaks the 5% penalty invariant and underflows positions under 500), a floor-division zero-share-burn in withdraw that lets a caller extract assets while burning no shares, orphaned assets left behind when the last shareholder emergency-withdraws, and a non-zero deposit minting zero shares at a high share price."
        },
        {
            contract_name: "PoolTogetherV3 (Code4rena)",
            lines_of_code: 433,
            bugs_planted: 4,
            bugs_found: 2,
            bugs_missed: 2,
            false_positives: 0,
            status: "Partial",
            category_tags: ["arithmetic", "logic", "competitive-audit"],
            github_link: "https://github.com/WhoIsWasay/godel-audit-results/tree/main/PoolTogetherV3",
            short_summary: "Code4rena 2021-06 competitive audit across 2 yield source contracts. Matched 2 known high-severity findings (H-01: wrong variable in IdleYieldSource.redeemToken, H-02: inverted subtraction in YearnV2._withdrawFromVault). Also independently identified 2 precision-loss bugs in YearnV2 share conversion (_tokenToShares, _tokenToYShares) not in the original C4 report. Missed H-05 (IdleYieldSource zero-share minting) and M-01 (YearnV2 safeApprove DoS)."
        },
    ],

    // 5. CURRENT WORK
currentWork: [
    "Multi-contract assurance (M7-M13): declared protocol and economic invariants over bounded cross-contract traces, with deterministic Foundry PoCs built from exact Z3 counterexamples.",
    "Proxy-faithful reproduction: declared identical-layout proxies are deployed and called through the proxy; a direct-implementation PoC is refused.",
    "Declared ERC-20 accounting: external token balances and supply are modeled with transfer/transferFrom/approve guards, plus a concrete-token PoC path.",
    "Nested value flow: ETH value propagates through linked hops to depth 3, with under-forwarding controls and explicit depth refusals.",
    "Release tooling: Docker runtime (godel:local), SARIF export, scorecard, one-command CLI and a ship-check release gate; the offline suite is 1,600+ tests."
],

    // 6. KNOWN PROBLEMS
 knownProblems: [
    {
        problem: "Declared scope, not arbitrary protocols",
        why_it_happens: "Multi-contract reasoning is bounded: declared deployments, declared invariants, bounded trace depth, and at most three nested linked calls. An invariant or attack path outside that declared scope is not proven, and an unmodeled contract interaction keeps the model PARTIAL rather than being counted safe.",
        planned_fix: "Widen the declared-trace budget and automatic trace enumeration per protocol; deepen nested-value/state linkage beyond three hops."
    },
    {
        problem: "Unmodeled external behavior",
        why_it_happens: "External calls without a declaration keep an explicit unmodeled-call over-approximation. Fee-on-transfer, rebasing, blacklists, undeclared proxies, undeclared oracles and non-standard token functions are refused with a reason - they are never guessed. A finding that needs one of those behaviors is reported as inconclusive, not confirmed.",
        planned_fix: "Add more declared semantics (fee-on-transfer, oracle interfaces, upgrade/admin layouts) only behind explicit README declarations and per-feature regression fixtures."
    },
    {
        problem: "Economic, MEV and gas limits",
        why_it_happens: "Transaction-order checks cover declared actor sequences only; there is no mempool, builder, private order-flow or gas-bidding simulation. Gas/DoS output is a deterministic detector prior with a Foundry liveness PoC, not a formal gas proof. Economic invariants are templates over declared ledgers, not a game-theory review.",
        planned_fix: "Add richer declared order-flow models and bounded cost models while keeping every result reproducible and clearly labeled."
    },
    {
        problem: "Reachability is modeled, not live",
        why_it_happens: "Deterministic PoCs deploy a fresh instance from the deployment model and use the declared actor/setup. Live chain state, fork state and unscripted deployments are out of scope, so a mathematically valid counterexample that needs an unmodeled pre-state stays inconclusive.",
        planned_fix: "Opt-in pinned-block fork pre-states and a stricter deployment-manifest coverage report."
    },
],

    // 7. ROADMAP
  roadmap: [
    { phase: "Phase 1: Protocol-level assurance", description: "Shipped M7-M13: cross-contract traces, protocol/economic invariants, reentrancy, ordering, gas/DoS priors and the critical promotion gate. Expanding real-world protocol coverage under declared scope." },
    { phase: "Phase 2: Release & CI", description: "Docker runtime, one-command CLI, SARIF, scorecard, ship-check and dependency/SBOM gates are in place; hosted zero-config PR verification is next." },
    { phase: "Phase 3: Multi-language Support", description: "Expand the agentic pipeline to Rust/Solana and Vyper after the Solidity protocol-level surface is complete." },
    { phase: "Phase 4: The FV Environment", description: "A unified development environment where formal verification is as native as autocomplete - write code, get invariants proposed and proven in real time, not bolted on after the fact." }
],

    // 8. FOOTER
    footer: {
        contactEmail: "wasay.godel@gmail.com",
        lastUpdated: "November 2026"
    }
};