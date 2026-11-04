// Site-owned service pages that replace outbound links to the provider's website.
// Provider-specific statements repeat only what this repository already recorded from
// the provider's public pages (see docs/audits/2026-10-21-provider-inventory.md and
// docs/release-reviews/2026-10-20-content-release-review.md). General medical and
// legal context cites HFEA / ASRM. Nothing here is a verified provider price or promise.

export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  checked: string;
  answer: string[];
  caveat: string;
  nav: [string, string][];
  table?: { id: string; title: string; intro?: string; caption: string; headers: string[]; rows: string[][] };
  steps?: { id: string; title: string; intro?: string; items: [string, string][] };
  cards?: { id: string; title: string; intro?: string; items: [string, string][] };
  checklist: { id: string; title: string; intro?: string; items: string[] };
  faq: [string, string][];
  related: [string, string, string][];
  contact: { title: string; text: string; href: string; label: string };
  sources: { name: string; url: string }[];
};

const hfea = {
  egg: { name: 'HFEA · Egg freezing', url: 'https://www.hfea.gov.uk/treatments/fertility-preservation/egg-freezing/' },
  embryo: { name: 'HFEA · Embryo freezing', url: 'https://www.hfea.gov.uk/treatments/fertility-preservation/embryo-freezing/' },
  donor: { name: 'HFEA · Using donated eggs, sperm or embryos in treatment', url: 'https://www.hfea.gov.uk/treatments/explore-all-treatments/using-donated-eggs-sperm-or-embryos-in-treatment' },
  consent: { name: 'HFEA · Consent to treatment and storage', url: 'https://www.hfea.gov.uk/choose-a-fertility-clinic/consent-to-treatment-and-storage/' },
  ivf: { name: 'HFEA · In vitro fertilisation (IVF)', url: 'https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/' }
};
const asrm = {
  oocyte: { name: 'ASRM · Evidence-based outcomes after oocyte cryopreservation (2021 guideline)', url: 'https://www.asrm.org/practice-guidance/practice-committee-documents/evidence-based-outcomes-after-oocyte-cryopreservation-for-donor-oocyte-in-vitro-fertilization-and-planned-oocyte-cryopreservation-a-guideline-2021/' },
  donation: { name: 'ASRM · Guidance regarding gamete and embryo donation (2024)', url: 'https://www.asrm.org/practice-guidance/practice-committee-documents/guidance-regarding-gamete-and-embryo-donation/' },
  carrier: { name: 'ASRM · Recommendations for practices using gestational carriers (2022)', url: 'https://www.asrm.org/practice-guidance/practice-committee-documents/recommendations-for-practices-using-gestational-carriers-a-committee-opinion-2022/' }
};

export const servicePages: Record<string, ServicePage> = {
  'fertility-preservation': {
    slug: 'fertility-preservation',
    title: '生育力保存：冻卵、冻精与冻胚怎么选',
    description: '比较冻卵、冻精和冻胚的流程、授权与未来使用方式，了解院方公开的冻卵服务环节和预约前要确认的问题。',
    checked: '2026-11-03',
    answer: [
      '生育力保存是把卵子、精子或胚胎冷冻保存，留待以后使用。<strong>冻卵</strong>需要促排卵和取卵；<strong>冻精</strong>通常在检查后采集精液即可冷冻；<strong>冻胚</strong>要先完成体外受精，日后使用需要相关各方的授权。',
      '冷冻保存的是一种未来的选择，不保证日后怀孕。卵子或胚胎冷冻时的年龄，通常是影响日后结果最重要的因素之一。'
    ],
    caveat: '本页是咨询准备资料，不替代医生评估。费用、保存年限与授权文件以接诊机构书面说明为准。',
    nav: [['#compare', '三种方式对比'], ['#provider-steps', '冻卵环节'], ['#checklist', '预约前确认'], ['#faq', '常见问题']],
    table: {
      id: 'compare', title: '冻卵、冻精、冻胚：4 项关键区别', intro: '先按自己的情况找到对应的一列，再带着问题咨询医生。', caption: '冻卵、冻精与冻胚对比',
      headers: ['比较项目', '冻卵', '冻精', '冻胚'],
      rows: [
        ['需要做什么', '评估、促排监测、取卵（通常需麻醉）、卵子玻璃化冷冻', '精液检查与传染病筛查后采集样本并冷冻', '促排取卵后与精子受精、实验室培养，再冷冻胚胎'],
        ['常见咨询原因', '希望推迟生育、暂无伴侣、医疗治疗前保存', '医疗治疗前保存、取精日程不便、提前储存样本', '已有确定伴侣或已选定捐精，计划日后移植'],
        ['以后怎样使用', '解冻后受精（常用 ICSI），培养后移植', '用于人工授精或 IVF／ICSI', '解冻后直接移植'],
        ['授权与保存', '本人签署保存与使用授权', '本人签署保存与使用授权', '通常需双方签署；一方变更授权可能影响使用']
      ]
    },
    steps: {
      id: 'provider-steps', title: '院方公开介绍的冻卵服务环节',
      intro: '院方生育力保存介绍列出以下环节。它说明了服务范围，但没有对应的美元报价，不能直接当作本站参考预算的包含清单。',
      items: [
        ['健康评估与视频咨询', '整理病史、用药及已有检查，确定个人方案。'],
        ['监测与促排用药', '超声和激素监测，安排促排卵药物。'],
        ['取卵与麻醉', '一次取卵操作及麻醉安排。'],
        ['玻璃化冷冻与保存', '卵子玻璃化冷冻，并确认保存地点与续存方式。'],
        ['取卵后随访', '取卵后的医疗随访与后续咨询。']
      ]
    },
    checklist: {
      id: 'checklist', title: '预约前要确认的 7 件事',
      items: [
        '监测可以在居住地完成哪些，哪些必须到塞班？大约需要停留几天？',
        '报价包含哪些环节，药物、麻醉、首年保存是否另计？',
        '每年保存费用多少，续费、逾期和停止保存怎样处理？',
        '冷冻后会收到什么报告（数量、成熟度、冷冻日期）？',
        '以后如需转运到其他机构，手续、费用与责任方是谁？',
        '冻胚涉及双方授权时，分开、离婚或一方去世后如何处理？',
        '有既往病史或正在用药，是否需要先与专科医生沟通？'
      ]
    },
    faq: [
      ['冻卵一定能保证以后生孩子吗？', '不能。冻卵保留的是一种机会。日后能否怀孕与冷冻时年龄、卵子数量与质量、解冻存活和胚胎发育等多个环节有关。'],
      ['冻卵和冻胚哪个更好？', '没有统一答案。冻胚可提前知道受精与培养情况，但需要确定精子来源并签署双方授权；冻卵保留了以后选择伴侣或捐精的灵活性。可请医生结合年龄、伴侣情况与计划时间说明。'],
      ['冻精需要到塞班停留很久吗？', '冻精通常不需要促排和手术取卵，停留时间一般比冻卵短，但传染病筛查、样本采集安排及取报告时间需要提前与接诊方确认。'],
      ['冷冻样本可以保存多久？', '保存期限受当地法规、机构政策和续费安排影响。请索取书面的保存条款，并确认联系方式变更时如何通知你。']
    ],
    related: [
      ['/treatments/egg-freezing/', '冻卵项目介绍', '适用情况、治疗环节、风险与参考预算。'],
      ['/guides/egg-freezing-cost/', '冻卵费用指南', '把药物、取卵、冷冻与年度保存拆开计算。'],
      ['/guides/amh-ovarian-reserve/', 'AMH 与卵巢储备', '先看懂检查结果，再讨论促排计划。'],
      ['/guides/egg-freezing/', '冻卵就诊清单', '每个阶段带什么资料、问什么问题。']
    ],
    contact: { title: '下一步：带着检查结果咨询保存方案', text: '可以先说明年龄、已有检查和计划使用的时间，询问适合的保存方式、在塞班的停留天数和书面报价。', href: '/contact/?topic=egg-freezing', label: '咨询生育力保存' },
    sources: [hfea.egg, hfea.embryo, asrm.oocyte, hfea.consent]
  },

  'egg-donation': {
    slug: 'egg-donation',
    title: '供卵与供精：筛查、匹配与授权',
    description: '使用捐赠卵子或精子前，分别确认捐赠者筛查、资料披露、匹配方式、法律亲子关系与费用。',
    checked: '2026-11-03',
    answer: [
      '使用捐赠卵子或精子时，医疗流程与普通 IVF 类似，但多了<strong>捐赠者筛查、资料披露、匹配方式和法律授权</strong>四类问题。',
      '院方公开介绍列有心理、遗传和传染病等供卵筛查。可用资源、筛查记录与接收条件需要在咨询时向接诊机构逐项核对；供精项目另行确认样本来源与资料。'
    ],
    caveat: '本页说明一般流程与应确认的问题，不代表任何捐赠资源已经可用或适合你。',
    nav: [['#steps', '供卵流程'], ['#compare', '新鲜与冷冻卵'], ['#screening', '筛查要点'], ['#checklist', '咨询清单'], ['#faq', '常见问题']],
    steps: {
      id: 'steps', title: '使用捐赠卵子的一般流程', intro: '具体安排由接诊医生根据检查结果决定，以下帮助你了解各环节的先后顺序。',
      items: [
        ['接受方评估', '评估子宫与全身健康，确认精子来源（伴侣或捐精）。'],
        ['选择与匹配', '了解可提供的捐赠者资料、匹配方式和等待时间。'],
        ['捐赠者准备或取用冷冻卵', '新鲜周期需捐赠者促排取卵；冷冻卵则由卵子库解冻。'],
        ['受精与培养', '卵子与精子在实验室受精，培养至可移植阶段。'],
        ['内膜准备与移植', '接受方用药准备子宫内膜，按计划移植胚胎。'],
        ['剩余胚胎处理', '确认剩余胚胎冷冻、保存费用与日后使用授权。']
      ]
    },
    table: {
      id: 'compare', title: '新鲜供卵与冷冻供卵：怎么比较', caption: '新鲜与冷冻供卵比较',
      headers: ['比较项目', '新鲜供卵周期', '冷冻卵子（卵子库）'],
      rows: [
        ['时间安排', '需要与捐赠者的周期同步', '通常不需与捐赠者同步，排期较灵活'],
        ['卵子数量', '取决于捐赠者当次取卵结果', '通常按约定的卵子数量提供'],
        ['需要确认的', '捐赠者是否只服务一位接受方、剩余卵子归属', '解冻存活情况及未达预期时的处理条款'],
        ['费用结构', '捐赠者补偿、药物、取卵等分项', '卵子费用、运输、解冻与实验室分项']
      ]
    },
    cards: {
      id: 'screening', title: '捐赠者筛查：要看到哪些记录？',
      intro: '美国对生殖细胞捐赠者有传染病筛查与检测要求；ASRM 另对病史、遗传与心理评估提出建议。请索取与你的捐赠者对应的书面记录。',
      items: [
        ['病史与家族史', '个人与三代家族病史，是否有已知遗传病。'],
        ['遗传携带者筛查', '检测范围、所用检测项目，以及是否需要与精子来源配对评估。'],
        ['传染病检测', '检测项目与时间，冷冻样本的检疫与复检安排。'],
        ['心理评估', '捐赠者是否接受心理评估与知情咨询。']
      ]
    },
    checklist: {
      id: 'checklist', title: '咨询供卵或供精时的 6 个问题',
      items: [
        '目前可以提供哪些捐赠者资料（照片、学历、病史），能否看到筛查报告？',
        '捐赠者是否同意孩子成年后获得身份信息？相关政策如何记录？',
        '同一捐赠者的卵子或精子最多用于多少个家庭？',
        '报价包含卵子／精子、筛查、受精培养和移植中的哪些环节？',
        '如果周期取消或胚胎数量少于预期，费用和后续安排如何处理？',
        '在我的居住国家或地区，使用捐赠卵子或精子的法律亲子关系如何确认？'
      ]
    },
    faq: [
      ['孩子会和我有血缘关系吗？', '使用捐赠卵子时，孩子与卵子捐赠者有遗传关系，与提供精子的一方有遗传关系；怀孕的人提供妊娠环境。很多家庭会提前考虑如何与孩子沟通来源。'],
      ['可以指定捐赠者的外貌或学历吗？', '能否筛选以及可提供的资料范围由捐赠项目决定。资料披露范围越清楚，越方便比较；请确认资料是否经过核实。'],
      ['供精和供卵可以同时使用吗？', '可以讨论使用捐赠胚胎或同时使用捐卵与捐精，但法律亲子关系与授权文件更复杂，建议先咨询你所在地的律师。'],
      ['捐赠资源需要等多久？', '等待时间取决于可用资源和你的筛选条件，咨询时请以书面方式确认。']
    ],
    related: [
      ['/guides/family-planning/', '家庭计划与捐赠指南', '捐赠资料、同意文件与法律亲子关系。'],
      ['/third-party-reproduction/', '第三方辅助生殖', '单身、LGBTQ+ 家庭与妊娠载体需要确认的事。'],
      ['/guides/embryo-lab-report/', '看懂胚胎实验室报告', '受精、培养与冷冻报告各说明了什么。'],
      ['/fees/', '费用预算', '组合治疗项目，计算参考预算。']
    ],
    contact: { title: '下一步：先确认资源与筛查记录', text: '可以先说明需要供卵、供精或两者，询问目前可用的资源、资料范围、等待时间与书面报价。', href: '/contact/', label: '咨询供卵与供精' },
    sources: [asrm.donation, hfea.donor, hfea.ivf]
  },

  'third-party-reproduction': {
    slug: 'third-party-reproduction',
    title: '第三方辅助生殖与多元家庭',
    description: '单身人士、LGBTQ+ 家庭与需要妊娠载体的家庭，了解可以讨论的方案，以及医疗、法律和跨境手续各需确认什么。',
    checked: '2026-11-03',
    answer: [
      '第三方辅助生殖是指治疗中涉及<strong>捐卵者、捐精者、捐赠胚胎或妊娠载体</strong>等第三方。院方公开介绍包括第三方妊娠，以及为 LGBTQ+ 家庭提供的捐精、捐卵和胚胎移植。',
      '医疗步骤只是其中一部分。法律亲子关系、各方同意、孩子的出生证件与回国手续同样重要，而且受你所在国家或地区法律影响，需要由专业律师确认。'
    ],
    caveat: '本页不构成法律意见。部分国家或地区禁止或不承认某些第三方辅助生殖安排，请在签约前完成法律咨询。',
    nav: [['#paths', '按家庭情况看'], ['#carrier', '妊娠载体'], ['#checklist', '签约前确认'], ['#faq', '常见问题']],
    table: {
      id: 'paths', title: '不同家庭，常见的讨论方向', intro: '以下只是咨询起点，适合哪种方案由医生评估决定。', caption: '不同家庭的辅助生殖方向',
      headers: ['家庭情况', '常讨论的方案', '需要特别确认'],
      rows: [
        ['单身女性', '捐精，配合人工授精或 IVF；也可先冻卵', '捐精者资料与身份披露政策、孩子出生登记'],
        ['单身男性或男性伴侣', '捐卵 IVF，并由妊娠载体怀孕', '妊娠载体安排的合法性、亲子关系确认方式、证件办理'],
        ['女性伴侣', '捐精；可讨论一方提供卵子、另一方怀孕', '两位母亲的法律身份如何在居住地获得承认'],
        ['跨性别人士', '在接受性别肯定治疗前保存生育力', '用药时间安排与保存授权'],
        ['医学上无法怀孕', '用自己的卵子或捐卵，由妊娠载体怀孕', '医学评估记录、妊娠载体的健康评估']
      ]
    },
    cards: {
      id: 'carrier', title: '涉及妊娠载体时，要分开确认的四件事',
      intro: 'ASRM 建议对妊娠载体和意向父母进行医学筛查、心理教育咨询，并由各方分别获得独立的法律咨询。',
      items: [
        ['医学评估', '妊娠载体的健康与既往妊娠情况，以及意向父母与配子来源的筛查。'],
        ['心理咨询', '各方对期望、沟通方式与可能出现情况的共同理解。'],
        ['独立法律意见', '意向父母与妊娠载体分别聘请律师，确认合同与亲子关系安排。'],
        ['出生与回国手续', '孩子出生登记、护照申请及回到居住地后身份是否被承认。']
      ]
    },
    checklist: {
      id: 'checklist', title: '签约前确认清单',
      items: [
        '接诊机构实际提供哪些第三方项目？哪些部分由其他机构或中介负责？',
        '医疗费、捐赠者补偿、法律费用与协调服务费分别付给谁？',
        '我所在的国家或地区如何看待这类安排？孩子的身份和亲子关系如何确认？',
        '各方的授权和同意文件有哪些？谁负责保管？',
        '出现医疗并发症、周期取消或计划变更时，责任和费用如何划分？',
        '孩子出生后需要办理哪些证件，大约需要在当地停留多久？'
      ]
    },
    faq: [
      ['单身人士可以咨询吗？', '可以。院方公开介绍包含面向单身和 LGBTQ+ 家庭的辅助生殖服务，具体接诊条件、所需文件需在初诊时确认。'],
      ['在塞班出生的孩子是美国公民吗？', '通常是，但存在例外，相关政策也在变化。孩子国籍、父母入境资格和出生后的证件是不同问题，请参阅本站塞班分娩页面并向主管机关核实。'],
      ['可以只做其中一部分吗？', '可以先单独咨询某个环节，例如先冻卵或先完成胚胎培养。是否能在不同机构之间转运样本，需要提前确认手续和责任。'],
      ['本站是否安排第三方妊娠？', '本站提供信息整理与就诊协调，医疗服务由接诊机构负责。涉及第三方的安排，各方角色、合同与收费应在签约前逐项书面确认。']
    ],
    related: [
      ['/guides/family-planning/', '家庭计划与捐赠指南', '捐赠资料、同意文件与法律亲子关系。'],
      ['/egg-donation/', '供卵与供精', '筛查记录、匹配方式与咨询清单。'],
      ['/birth-planning/', '塞班出生与美国公民身份', '出生公民权、入境与出生后证件。'],
      ['/service-scope/', '预约与服务范围', '接诊方、收费方与协调服务的分工。']
    ],
    contact: { title: '下一步：先说明家庭情况与想讨论的方案', text: '不必一次准备所有材料。可以先说明家庭构成、已有检查和计划时间，询问可提供的项目与需要的文件。', href: '/contact/', label: '咨询家庭生育计划' },
    sources: [asrm.carrier, asrm.donation, hfea.donor, hfea.consent]
  },

  'facility': {
    slug: 'facility',
    title: '诊所环境与实验室设施',
    description: '了解接诊机构的位置、公开介绍的实验室设施，以及到院前需要确认的接诊与报到安排。',
    checked: '2026-11-03',
    answer: [
      '接诊机构公开名称为 <strong>Saipan IVF Center</strong>，地址为塞班岛 Garapan 的 Bank of Guam 大楼 3 楼（3rd Floor, Bank of Guam, Garapan, Saipan, MP 96950）。',
      '院方公开设施介绍列有显微操作系统、胚胎操作工作台、MIRI® IVF 培养箱与卵子玻璃化冷冻。具体实施地点、设备与可开展项目，请在就诊前向院方确认。'
    ],
    caveat: '设施信息来自院方公开介绍，不等于第三方认证。实际报到地点与开放时间以预约确认为准。',
    nav: [['#clinic-arrival', '到院地址'], ['#lab', '实验室设施'], ['#onsite', '哪些在诊所完成'], ['#checklist', '到院前确认'], ['#faq', '常见问题']],
    cards: {
      id: 'lab', title: '实验室与胚胎培养',
      items: [
        ['MIRI® IVF 培养箱', '用于胚胎培养环境管理，胚胎观察与培养报告由实验室说明。'],
        ['卵子玻璃化冷冻', '用于生育力保存，取卵、冷冻与年度保存费用分别确认。'],
        ['ICSI 显微操作', '用于单精子注射，适用条件与实验室费用在评估时确认。'],
        ['遗传学检测', '咨询 PGT 类检测时，了解检测类型、样本要求、适用条件与报告时间。']
      ]
    },
    table: {
      id: 'onsite', title: '哪些环节通常需要到诊所完成？', intro: '实际安排因方案而异，下表帮助你提前与接诊方核对行程。', caption: '诊所与居住地可完成的环节',
      headers: ['环节', '通常在哪里完成', '需要确认'],
      rows: [
        ['初诊咨询', '可询问是否支持视频咨询', '咨询费用与需要提前提交的资料'],
        ['促排监测', '部分监测可询问能否在居住地完成', '居住地检查结果是否被接受、如何传送'],
        ['取卵与取精', '诊所', '到院时间、麻醉前准备与陪同要求'],
        ['受精、培养与冷冻', '诊所实验室', '报告提供时间与解释人'],
        ['胚胎移植', '诊所', '移植日期与移植后多久可以返程'],
        ['后续随访', '可与接诊团队商定方式', '出现不适时联系谁、如何就近就医']
      ]
    },
    checklist: {
      id: 'checklist', title: '到院前确认清单',
      items: [
        '接诊日期、时间、主诊医生和具体报到位置（楼层与入口）。',
        '把英文地址和预约确认保存在手机里，交通到达目的地前再次核对。',
        '需要空腹、停药或携带的检查报告与证件。',
        '实验室报告何时提供、由谁解释，以及冷冻样本的保存主体。',
        '接送、陪同人员与额外费用是否另行安排。'
      ]
    },
    faq: [
      ['可以先参观诊所吗？', '如需视频沟通或机构导览，可以通过咨询邮箱询问预约条件。'],
      ['诊所在塞班什么位置？', '公开地址为 Garapan 的 Bank of Guam 大楼 3 楼。地图搜索结果不能替代报到位置确认，出发前请向接诊方确认。'],
      ['医生和团队是谁？', '本站医疗团队页面整理了院方公开介绍的医生、胚胎学与护理负责人，实际接诊医生以预约确认为准。']
    ],
    related: [
      ['/team/', '医疗团队与实验室', '院方公开介绍的医生、胚胎学与护理团队。'],
      ['/guides/travel-checklist/', '出行准备清单', '证件、行程与到院前准备。'],
      ['/guides/embryo-lab-report/', '看懂胚胎实验室报告', '受精、培养与冷冻报告各说明了什么。'],
      ['/process/', 'IVF 流程', '每个阶段的准备事项与结果。']
    ],
    contact: { title: '下一步：确认接诊与到院安排', text: '预约时确认主诊医生、护理与实验室联络安排，以及治疗后复查联系谁。', href: '/contact/', label: '询问初诊与到院安排' },
    sources: [hfea.ivf, hfea.embryo]
  }
};
