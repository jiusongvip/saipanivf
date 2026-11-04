// Roles and education summarized from the institution’s public team page.
// Checked 2026-10-20; this is not independent license verification.
export const teamSource = '/team/';
export const team = [
 {id:'gary-ramsey',name:'Gary G. Ramsey, M.D.',role:'医疗主任',image:'gary',summary:'院方公开介绍的医疗主任，具有UCLA医学教育背景。',background:'院方介绍列明其医学学位来自加州大学洛杉矶分校（UCLA）。',question:'初诊由哪位医生接诊？如何讨论治疗选择、个人风险和复诊安排？'},
 {id:'irena-lalic',name:'Irena Lalic',role:'胚胎学专家',image:'irena',summary:'具有生物学与临床胚胎学背景，参与IVF实验室相关工作。',background:'院方介绍列明其生物学硕士来自萨格勒布大学，临床胚胎学硕士来自英国利兹大学。',question:'受精、培养与冷冻报告何时提供？报告由谁解释，样本由谁保存？'},
 {id:'rose-wang',name:'Rose Wang',role:'护理负责人',image:'rose',summary:'院方公开介绍的护理负责人，参与护理管理与就诊服务。',background:'院方团队页列为护理负责人（Head Nurse）。',question:'用药说明、到院准备与复查提醒如何沟通？临时调整时联系谁？'}
] as const;

// Detail-page content for /team/<id>/. Layout follows a common doctor-profile pattern
// (hero, highlights, background, scope, questions, institution card, other members).
// Facts come from the provider's public team page (checked 2026-10-20) plus, where cited in
// `sources`, public directory/registry records and press (checked 2026-11-03). Anything not
// found (board certification, languages, Irena Lalic / Rose Wang beyond the team page) is
// listed as an item to confirm rather than invented.
export const teamProfiles: Record<string,{
 title:string;description:string;initials:string;tags:string[];
 highlights:[string,string][];bio:string[];education:[string,string][];
 scope:[string,string][];fit:string[];questions:string[];
 timeline?:[string,string][];sources?:{name:string;url:string}[];whyTitle:string;whyLead:string;
}> = {
 'gary-ramsey':{
  title:'Gary G. Ramsey, M.D. · 医疗主任',
  description:'塞班接诊机构医疗主任 Gary G. Ramsey 医生：UCLA 医学博士、妇产科住院医师培训、美国加州与北马里亚纳群岛执照，以及初诊时可以向医生确认的问题。',
  initials:'GR',tags:['医疗主任','妇产科','生殖医学','IVF / ICSI'],
  whyTitle:'为什么选择 Gary 医生',whyLead:'美国本土医学院出身、受过完整妇产科训练，并长期在塞班从事生殖医疗——你在塞班的治疗方案由他做医学把关。',
  highlights:[['接诊机构医疗主任','院方团队页列为 Saipan IVF Center 医疗主任（Medical Director），负责诊疗方案的医学把关；2024 年当地媒体报道亦以此职务介绍。'],['UCLA 医学博士','1990 年毕业于加州大学洛杉矶分校（UCLA）大卫·格芬医学院，并在 UCLA 医学中心完成实习。'],['完整妇产科住院医师培训','1991–1994 年在伊利诺伊大学芝加哥医学院完成妇产科住院医师培训。'],['美国执照，长期扎根塞班','持有加州（1991 年起）与北马里亚纳群岛（1999 年起）医师执照；2013 年起即担任塞班生殖诊所医疗主任。']],
  bio:['Gary G. Ramsey 医生是院方公开介绍的医疗主任，专业为妇产科。他 1990 年获加州大学洛杉矶分校（UCLA）大卫·格芬医学院医学博士学位，随后在 UCLA 医学中心完成一年过渡期实习，并于 1991–1994 年在伊利诺伊大学芝加哥医学院完成妇产科住院医师培训。','公开执照资料显示，他自 1999 年起持有北马里亚纳群岛医师执照。据马里亚纳商业杂志（Marianas Business Journal）2024 年报道引述其职业资料，他自 2013 年 8 月起担任塞班 Pacific Fertility Institute 医疗主任。医疗主任通常负责诊疗方案的医学把关，包括评估检查结果、讨论治疗选择与风险。'],
  education:[['医学博士（M.D.）','加州大学洛杉矶分校 大卫·格芬医学院，1990 年'],['实习','UCLA 医学中心，过渡期实习，1990–1991 年'],['住院医师培训','伊利诺伊大学芝加哥医学院，妇产科，1991–1994 年'],['医师执照','加利福尼亚州（1991 年起）、北马里亚纳群岛（1999 年起）']],
  timeline:[['1990','获 UCLA 大卫·格芬医学院医学博士学位'],['1990–1991','UCLA 医学中心过渡期实习'],['1991–1994','伊利诺伊大学芝加哥医学院妇产科住院医师培训'],['1999','取得北马里亚纳群岛医师执照'],['2013','担任塞班 Pacific Fertility Institute 医疗主任（据媒体引述其职业资料）'],['现在','Saipan IVF Center 医疗主任']],
  sources:[{name:'Doximity · Gary G. Ramsey MD（教育、培训与执照记录）',url:'https://www.doximity.com/pub/gary-ramsey-md'},{name:'美国 NPI 登记 · NPI 1336274471（妇产科，加州执照 G72257）',url:'https://npiregistry.cms.hhs.gov/provider-view/1336274471'},{name:'Marianas Business Journal · Saipan company offers IVF for China market（2024-03-06）',url:'https://mbjguam.com/node/762'}],
  scope:[['初诊评估','结合病史与已有检查，讨论适合的治疗方向；可先看[初诊准备清单](/guides/first-visit/)。'],['治疗方案','[IVF](/treatments/ivf/)、[ICSI](/treatments/icsi/)、[冻卵](/treatments/egg-freezing/)、[冻胚移植](/treatments/frozen-embryo-transfer/)等方案的适用条件与选择。'],['风险与结果','讨论[个人风险](/treatments/ivf/#risks)、成功率的统计口径与复诊安排。']],
  fit:['准备第一次做 IVF，希望先确认方案是否适合（参考 [IVF 流程](/process/)）','已有检查报告，想请医生判断还缺哪些检查（参考 [AMH 与卵巢储备](/guides/amh-ovarian-reserve/)）','考虑[冻卵或冻胚](/fertility-preservation/)，想了解年龄与结果的关系','既往治疗未成功，希望重新评估方案（参考 [PGT-A 检测怎么选](/guides/pgt-a-decision/)）'],
  questions:['初诊由哪位医生接诊？后续监测和取卵是否由同一位医生负责？','根据我的检查，建议哪种方案？还有哪些其他选择？','你们提供的成功率数据是按什么年龄组、什么结局统计的？','治疗期间出现不适，夜间或周末联系谁？']
 },
 'irena-lalic':{
  title:'Irena Lalic · 胚胎学专家',
  description:'塞班接诊机构胚胎学专家 Irena Lalic 的公开教育背景、实验室工作范围，以及可以询问的胚胎培养与冷冻问题。',
  initials:'IL',tags:['胚胎学','IVF 实验室','ICSI','玻璃化冷冻'],
  whyTitle:'为什么向 Irena 咨询实验室问题',whyLead:'受精、胚胎培养和冷冻都在实验室完成。Irena 受过英国临床胚胎学的专业训练，是你了解胚胎情况的直接窗口。',
  highlights:[['胚胎学专家','院方团队页列为胚胎学专家（Embryologist），参与 IVF 实验室相关工作。'],['临床胚胎学硕士','院方介绍列明其临床胚胎学硕士来自英国利兹大学。'],['生物学硕士','院方介绍列明其生物学硕士来自克罗地亚萨格勒布大学。']],
  bio:['Irena Lalic 是院方公开介绍的胚胎学专家，具有生物学与临床胚胎学背景。胚胎学团队通常负责取卵后的卵子处理、受精（含 [ICSI](/treatments/icsi/)）、胚胎培养与评估，以及卵子和胚胎的[冷冻保存](/fertility-preservation/)。'],
  education:[['临床胚胎学硕士','英国利兹大学（University of Leeds）'],['生物学硕士','克罗地亚萨格勒布大学（University of Zagreb）']],
  scope:[['受精与 ICSI','常规受精或[单精子注射 ICSI](/treatments/icsi/)，适用条件在评估时确认。'],['胚胎培养与评估','培养天数、观察方式与[报告内容](/guides/embryo-lab-report/)。'],['卵子与胚胎冷冻','玻璃化冷冻、保存记录与日后[冻胚移植](/treatments/frozen-embryo-transfer/)安排。']],
  fit:['想看懂自己的[胚胎培养报告](/guides/embryo-lab-report/)','在比较是否做 [ICSI](/treatments/icsi/) 或 [PGT-A 检测](/guides/pgt-a-decision/)','计划[冻卵或冻胚](/fertility-preservation/)，关心冷冻与保存流程','希望了解[实验室设施](/facility/#lab)与样本保管方式'],
  questions:['受精、培养与冷冻报告何时提供？报告由谁解释？','胚胎培养到第几天？评估标准是什么？','冷冻样本由谁保存？如何核对身份与数量？','如果以后要转运样本到其他机构，手续是什么？']
 },
 'rose-wang':{
  title:'Rose Wang · 护理负责人',
  description:'塞班接诊机构护理负责人 Rose Wang 的公开职务，以及用药说明、到院准备和复查提醒可以向护理团队确认的事项。',
  initials:'RW',tags:['护理负责人','用药指导','到院准备','治疗随访'],
  whyTitle:'为什么治疗期间要认识 Rose',whyLead:'从促排打针到移植后的复查，护理团队是你最常联系的人。Rose 负责护理管理与就诊服务，帮你把每一步安排清楚。',
  highlights:[['护理负责人','院方团队页列为护理负责人（Head Nurse）。'],['护理管理与就诊服务','院方介绍其参与护理管理与就诊服务。'],['治疗期间的联络点','用药、到院与复查提醒通常由护理团队协调，是治疗期间最常联系的人。']],
  bio:['Rose Wang 是院方公开介绍的护理负责人，参与护理管理与就诊服务。在 [IVF 治疗](/treatments/ivf/)中，护理团队通常负责用药说明、注射指导、到院准备和治疗后的随访提醒。'],
  education:[['职务','护理负责人（Head Nurse）']],
  scope:[['用药与注射指导','促排药物的使用方法、时间与保存方式，各阶段见 [IVF 就诊清单](/guides/ivf-steps/)。'],['到院准备','检查前注意事项、取卵与移植当天的安排，行程见[出行准备清单](/guides/travel-checklist/)。'],['随访与提醒','复查、验孕时间与返程后的联络方式，见[胚胎移植后注意事项](/guides/embryo-transfer-aftercare/)。']],
  fit:['第一次自己打促排针，需要详细指导（参考 [IVF 就诊清单](/guides/ivf-steps/)）','需要提前安排[行程与到院时间](/guides/travel-checklist/)','[移植后](/guides/embryo-transfer-aftercare/)返程，需要跨时区联系护理团队'],
  questions:['用药说明、到院准备与复查提醒如何沟通？','临时调整日程时联系谁？','返程后出现不适，如何联系护理团队并就近就医？']
 }
};
