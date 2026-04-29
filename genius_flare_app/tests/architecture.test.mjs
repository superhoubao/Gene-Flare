import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function read(relPath) {
  return readFileSync(join(root, relPath), 'utf8');
}

function getTranslations() {
  const language = read('src/components/utils/LanguageContext.jsx');
  const match = language.match(/const translations = (\{[\s\S]*?\n\});/);
  assert.ok(match, 'translations object should be statically readable');

  return Function(`return (${match[1]});`)();
}

function flattenTranslations(value, prefix = '', output = {}) {
  Object.entries(value).forEach(([key, item]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      flattenTranslations(item, nextKey, output);
      return;
    }
    output[nextKey] = item;
  });

  return output;
}

function sourceFiles(dir = 'src') {
  return readdirSync(join(root, dir), { recursive: true })
    .filter((file) => /\.(jsx?|tsx?)$/.test(file))
    .map((file) => join(dir, file));
}

function textFiles(dir = '.') {
  return readdirSync(join(root, dir), { recursive: true })
    .filter((file) => /\.(jsx?|tsx?|css|html|json|md)$/.test(file))
    .map((file) => join(dir, file));
}

test('app routes expose the new top-level research and shield flows', () => {
  const app = read('src/App.jsx');

  assert.match(app, /path="\/research"/);
  assert.match(app, /path="\/shield\/\*"/);
  assert.match(app, /path="\/health-plan"/);
  assert.match(app, /path="\/health-score"/);
  assert.match(app, /path="\/shield\/challenges"/);
  assert.match(app, /Navigate to="\/health-plan/);
  assert.doesNotMatch(app, new RegExp(['Social', 'Layout'].join('')));
});

test('bottom navigation reflects home, research, shield, and me', () => {
  const nav = read('src/components/layout/BottomNavBar.jsx');

  assert.match(nav, /path: '\/research'/);
  assert.match(nav, /path: '\/shield'/);
  assert.match(nav, /t\('nav\.research'\)/);
  assert.match(nav, /t\('nav\.shield'\)/);
  assert.match(nav, /t\('nav\.me'\)/);
  assert.doesNotMatch(nav, /path: '\/social'/);
  assert.doesNotMatch(nav, /label: 'RESEARCH'|label: 'SHIELD'|label: 'ME'/);
  assert.match(nav, /orbital-dock/);
});

test('app layout hides bottom navigation on secondary pages and immersive ai flow', () => {
  const layout = read('src/components/layout/AppLayout.jsx');

  assert.match(layout, /<Outlet \/>/);
  assert.match(layout, /topLevelPaths/);
  assert.match(layout, /sectionPathsWithDock/);
  assert.match(layout, /\/shield\/services/);
  assert.match(layout, /topLevelPaths\.includes\(location\.pathname\)/);
  assert.doesNotMatch(layout, /\/health-plan/);
  assert.doesNotMatch(layout, /startsWith/);
  assert.match(layout, /\/ai-consultation/);
  assert.doesNotMatch(layout, /AnimatePresence|useOutlet|cloneElement|popLayout/);
});

test('route changes open new pages at top and restore scroll on browser back', () => {
  const scrollToTop = read('src/components/utils/ScrollToTop.jsx');

  assert.match(scrollToTop, /useLayoutEffect/);
  assert.match(scrollToTop, /useNavigationType/);
  assert.match(scrollToTop, /scrollPositionsRef/);
  assert.match(scrollToTop, /navigationType === 'POP'/);
  assert.match(scrollToTop, /window\.history\.scrollRestoration = 'manual'/);
  assert.match(scrollToTop, /window\.scrollTo\(0, top\)/);
  assert.match(scrollToTop, /document\.documentElement\.scrollTop = top/);
  assert.match(scrollToTop, /document\.body\.scrollTop = top/);
  assert.match(scrollToTop, /requestAnimationFrame/);
  assert.match(scrollToTop, /location\.key/);
  assert.doesNotMatch(scrollToTop, /pathname\.split\('\/'\)\[1\]/);
  assert.doesNotMatch(scrollToTop, /prevBaseRef/);
});

test('top app bar uses the new command-bar visual language', () => {
  const topBar = read('src/components/layout/TopAppBar.jsx');
  const language = read('src/components/utils/LanguageContext.jsx');

  assert.match(topBar, /signal-command-bar/);
  assert.match(topBar, /absolute top-0 left-0 right-0 z-50/);
  assert.doesNotMatch(topBar, /fixed top-0 left-0 right-0 z-50/);
  assert.match(topBar, /useLanguage/);
  assert.match(topBar, /topBar\.defaultTitle/);
  assert.doesNotMatch(topBar, /commandLayer/);
  assert.doesNotMatch(language, /指令层|Command Layer|基因之火|Gene Flare/);
  assert.match(language, /defaultTitle: 'GeneFlare'/);
});

test('language dictionaries have parity and every static translation key resolves', () => {
  const translations = getTranslations();
  const en = flattenTranslations(translations.en);
  const zh = flattenTranslations(translations.zh);
  const missingZh = Object.keys(en).filter((key) => !(key in zh));
  const missingEn = Object.keys(zh).filter((key) => !(key in en));

  assert.deepEqual(missingZh, []);
  assert.deepEqual(missingEn, []);

  const usedKeys = new Map();
  sourceFiles().forEach((file) => {
    const source = read(file);
    for (const match of source.matchAll(/\bt\(\s*['"]([^'"]+)['"]/g)) {
      const usages = usedKeys.get(match[1]) ?? [];
      usedKeys.set(match[1], [...usages, file]);
    }
  });

  const missingUsedKeys = [...usedKeys.entries()]
    .filter(([key]) => !(key in en) || !(key in zh))
    .map(([key, files]) => ({ key, files: [...new Set(files)] }));

  assert.deepEqual(missingUsedKeys, []);
});

test('project branding is unified under GeneFlare', () => {
  const files = textFiles()
    .filter((file) => !file.startsWith('tests/'))
    .filter((file) => !file.startsWith('node_modules/'))
    .filter((file) => !file.startsWith('dist/'));

  files.forEach((file) => {
    const source = read(file);
    assert.doesNotMatch(source, /MIO Health|mio_health|Gene Flare|基因之火/, `${file} should not contain legacy brand text`);
  });

  assert.match(read('package.json'), /"name": "geneflare_app"/);
  assert.match(read('package-lock.json'), /"name": "geneflare_app"/);
  assert.match(read('index.html'), /<title>GeneFlare<\/title>/);
  assert.match(read('PROJECT_PAGES.md'), /# GeneFlare 项目页面说明文档/);
});

test('legacy prototype and retired page files stay removed', () => {
  const sourceList = sourceFiles();

  assert.deepEqual(sourceList.filter((file) => file.startsWith('src/pages/social/')), []);
  assert.ok(!sourceList.includes(`src/pages/health/${['Health', 'Layout'].join('')}.jsx`));
  assert.ok(!sourceList.includes(`src/pages/health/${['Health', 'Assessment'].join('')}.jsx`));
  assert.ok(!sourceList.includes(`src/pages/health/${['Health', 'Data'].join('')}.jsx`));
  assert.ok(!sourceList.includes(`src/pages/health/${['Health', 'Report'].join('')}.jsx`));
});

test('language context supports interpolation, fallback, and persisted language switching', () => {
  const language = read('src/components/utils/LanguageContext.jsx');

  assert.match(language, /geneflare_lang/);
  assert.match(language, /\['mio', 'health', 'lang'\]\.join\('_'\)/);
  assert.match(language, /LEGACY_LANGUAGE_STORAGE_KEY/);
  assert.match(language, /localStorage\.getItem/);
  assert.match(language, /localStorage\.setItem/);
  assert.match(language, /params = \{\}/);
  assert.match(language, /replace\(\/\{\{\(\\w\+\)\}\}\/g/);
  assert.match(language, /translations\.en/);
  assert.doesNotMatch(language, /\\x[0-9a-fA-F]{2}/);
});

test('home page introduces health asset minting progress', () => {
  const home = read('src/pages/HomePage.jsx');
  const plans = read('src/data/plans.js');

  assert.match(home, /useLanguage/);
  assert.doesNotMatch(home, /title="Gene Flare"/);
  assert.match(home, /home\.sync\.live/);
  assert.match(home, /home\.sections\.hero\.tag/);
  assert.match(home, /home\.sections\.controlBoard\.healthScore/);
  assert.match(home, /\/health-score/);
  assert.match(home, /home\.sections\.researchNFT\.tag/);
  assert.match(home, /home\.sections\.planSummary\.title/);
  assert.match(home, /home\.healthTasks\.cta\.complete/);
  assert.doesNotMatch(home, /home\.startChat/);
  assert.match(home, /healthTasks\.plans/);
  assert.match(home, /grid-cols-2/);
  assert.match(home, /planSummaryOpen/);
  assert.match(home, /setPlanSummaryOpen/);
  assert.match(home, /mode="wait"/);
  assert.match(home, /'flex flex-col'/);
  assert.match(home, /self-end text-\[2\.45rem\] leading-none/);
  assert.match(home, /mt-2 text-\[9px\] leading-\[1\.45\]/);
  assert.doesNotMatch(home, /grid-cols-\[minmax\(0,1fr\)_auto\]/);
  assert.match(home, /grid-cols-1 lg:grid-cols-2/);
  assert.match(home, /grid-cols-2 lg:grid-cols-4/);
  assert.match(home, /min-h-\[170px\]/);
  assert.match(home, /planSummaryOpen \? \(/);
  assert.doesNotMatch(home, /加入前需补齐信号|完成机构计划后|plan-summary-note/);
  assert.doesNotMatch(home, /Task Engine|High-value tasks|Research Signals|Institution Use/);
  assert.doesNotMatch(home, /Plan Console|Console Fold|Console Open|Live Progress|Plan Status/);
  assert.doesNotMatch(home, /AI 推荐原因|剩余动作|预计价值|Tap card for details/);
  assert.match(home, /所属计划|Plan/);
  assert.match(plans, /Institution Metabolic Reset|Sleep Repair Protocol|Tokyo Longevity Observation/);
  assert.match(plans, /待开始|进行中|待验证/);
  assert.match(plans, /提升睡眠质量|提升均衡营养|提升恢复能力/);
  assert.match(plans, /Start Tonight|Track Intake|Open Recovery Path/);
});

test('research page foregrounds mint rewards and authorization returns', () => {
  const research = read('src/pages/profile/MyNFTs.jsx');
  const language = read('src/components/utils/LanguageContext.jsx');

  assert.match(research, /useLanguage/);
  assert.match(research, /researchPage\.rewardStages\.mint\.name/);
  assert.match(research, /researchPage\.returnWaterfall/);
  assert.match(research, /researchPage\.terminal/);
  assert.match(research, /researchPage\.liveMatchbook/);
  assert.match(research, /researchPage\.proofStream/);
  assert.match(language, /Mint Reward/);
  assert.match(language, /Access Reward/);
  assert.match(language, /Contribution Return/);
});

test('shield experience highlights japanese medical privileges and CAR-T guidance', () => {
  const shield = read('src/pages/profile/FlameShield.jsx');
  const language = read('src/components/utils/LanguageContext.jsx');

  assert.match(shield, /useLanguage/);
  assert.match(shield, /shieldPage\.services\.cart\.title/);
  assert.match(shield, /shieldPage\.privilegeRunway/);
  assert.match(language, /CAR-T/i);
  assert.match(language, /Japan/i);
  assert.match(language, /benefit/i);
  assert.match(language, /Privilege Runway/);
});

test('shield layout exposes runway tabs navigation styling', () => {
  const shieldLayout = read('src/pages/shield/ShieldLayout.jsx');

  assert.match(shieldLayout, /useLanguage/);
  assert.match(shieldLayout, /shieldLayout\.tabsLabel/);
  assert.match(shieldLayout, /shieldLayout\.services/);
  assert.doesNotMatch(shieldLayout, /Challenges/);
});

test('health plan page exposes unified plan dashboard sections', () => {
  const healthPlan = read('src/pages/health/HealthPlan.jsx');
  const healthPlanPage = read('src/pages/health/HealthPlanPage.jsx');
  const plans = read('src/data/plans.js');

  assert.match(healthPlanPage, /useLanguage/);
  assert.match(healthPlanPage, /showBack/);
  assert.match(healthPlanPage, /rightIcon=\{null\}/);
  assert.match(healthPlanPage, /healthPlan\.dashboard\.pageTitle/);
  assert.match(healthPlanPage, /healthPlan\.dashboard\.title/);
  assert.match(healthPlanPage, /healthPlan\.dashboard\.executingPlans/);
  assert.match(healthPlan, /useLanguage/);
  assert.match(healthPlan, /healthPlan\.executing/);
  assert.match(healthPlan, /healthPlan\.recommended/);
  assert.match(healthPlan, /healthPlan\.institution/);
  assert.match(healthPlan, /healthPlan\.planQueue/);
  assert.match(healthPlan, /healthPlan\.completed/);
  assert.match(healthPlan, /待开始|进行中|待验证|已完成/);
  assert.match(plans, /Tokyo Longevity Observation|Bayer Vascular Signal Study|Institution Metabolic Reset/);
});

test('health score page exposes the digital twin as a secondary page', () => {
  const healthScore = read('src/pages/health/HealthScorePage.jsx');

  assert.match(healthScore, /HealthOverview/);
  assert.match(healthScore, /showBack/);
  assert.match(healthScore, /rightIcon=\{null\}/);
  assert.match(healthScore, /healthScorePage\.title/);
});

test('shield services page participates in language switching', () => {
  const shieldServices = read('src/pages/shield/ShieldServices.jsx');

  assert.match(shieldServices, /useLanguage/);
  assert.match(shieldServices, /shieldServices\.premium/);
  assert.match(shieldServices, /shieldServices\.services\.jpCheckup\.title/);
  assert.match(shieldServices, /shieldServices\.payment/);
});

test('profile page content participates in language switching', () => {
  const profile = read('src/pages/profile/ProfilePage.jsx');

  assert.match(profile, /useLanguage/);
  assert.match(profile, /profilePage\./);
});
