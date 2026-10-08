const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'articles');
fs.mkdirSync(outDir, { recursive: true });

const created = '2026-10-07';
const sources = {
  shadowrocket: ['Shadowrocket 官方 App Store 页面', 'https://apps.apple.com/app/shadowrocket/id932747118'],
  clashParty: ['Clash Party 官方 GitHub 仓库', 'https://github.com/mihomo-party-org/clash-party'],
  clashPartyRelease: ['Clash Party 官方 Releases', 'https://github.com/mihomo-party-org/clash-party/releases'],
  mihomo: ['Mihomo 官方 GitHub 仓库', 'https://github.com/MetaCubeX/mihomo'],
  applePrivacy: ['Apple：App Privacy Details', 'https://developer.apple.com/app-store/app-privacy-details/'],
  cisaDns: ['CISA：Understanding DNS', 'https://www.cisa.gov/news-events/news/understanding-and-using-domain-name-system'],
  cloudflareDns: ['Cloudflare Learning Center：What is DNS?', 'https://www.cloudflare.com/learning/dns/what-is-dns/'],
  cloudflareQuic: ['Cloudflare Learning Center：What is QUIC?', 'https://www.cloudflare.com/learning/performance/what-is-quic/'],
  appleBattery: ['Apple Support：查看 iPhone 电池使用情况', 'https://support.apple.com/guide/iphone/check-battery-usage-and-health-iphb06c4b37/ios'],
  githubSecurity: ['GitHub Docs：About supply chain security', 'https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-supply-chain-security'],
  microsoftNetwork: ['Microsoft Support：Fix network connection issues in Windows', 'https://support.microsoft.com/windows/fix-network-connection-issues-in-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c'],
  appleVpn: ['Apple Support：VPN settings overview for Apple devices', 'https://support.apple.com/guide/deployment/vpn-settings-overview-depae3d361d0/web'],
  androidVpn: ['Android Developers：VPN', 'https://developer.android.com/develop/connectivity/vpn'],
  wireguard: ['WireGuard 官方 Quick Start', 'https://www.wireguard.com/quickstart/'],
  openvpn: ['OpenVPN Community Resources：Troubleshooting', 'https://openvpn.net/community-resources/troubleshooting/'],
};

const articles = [
  ['shadowrocket-what-is-it','小火箭是什么？Shadowrocket 和 VPN 有什么区别','小火箭通常指 iOS 上的 Shadowrocket。本文用讲人话的方式解释它、代理订阅和传统 VPN 的区别。','starter','小火箭 Shadowrocket VPN 区别','小火箭是一个规则型代理客户端，不是线路服务本身。它负责读取配置、转发流量和按规则分流；能否连接、速度如何，取决于配置、网络和服务端。', ['先分清“客户端”和“服务”：购买应用不等于自动获得可用线路。','系统代理、VPN 接口和应用内代理的覆盖范围不同，不能只看状态图标。','换了网络出口也不等于绝对匿名，账号、Cookie、指纹和服务日志仍可能关联身份。'], sources.shadowrocket],
  ['shadowrocket-download-official','小火箭怎么下载？认准 Shadowrocket 官方 App Store 页面','查找 Shadowrocket 正版下载入口、开发者信息和 App Store ID，避开来路不明的安装包。','pitfall','小火箭下载 Shadowrocket 官网 正版','优先从 Apple App Store 获取 Shadowrocket，并核对 App Store ID 932747118 与页面开发者信息。不要安装陌生网站提供的描述文件、企业签名包或所谓破解版。', ['搜索结果里的“官网”不一定由开发者运营，先看最终是否跳转到官方商店。','不要向安装教程提供 Apple ID 密码、短信验证码或设备解锁密码。','已安装应用也要定期检查来源；异常证书、频繁掉签不是正常功能。'], sources.shadowrocket],
  ['shadowrocket-import-no-connection','小火箭导入订阅后不能用：按这 7 步排查','Shadowrocket 导入订阅成功却无法连接时，从订阅、节点、权限、DNS 和日志逐层定位。','help','小火箭不能用 导入订阅 无法连接','先不要反复删除重装。确认订阅已更新、选中了具体节点、连接权限已允许，再用日志判断卡在解析、连接还是握手阶段。', ['切换网络测试，区分本地 Wi-Fi 问题与配置问题。','只测试一个节点不能代表整份订阅，应在同一时间检查多个不同入口。','求助时提供脱敏后的时间、错误文本、客户端版本和网络类型，不要公开订阅链接。'], sources.shadowrocket],
  ['shadowrocket-rule-global-direct','小火箭规则模式、全局代理和直连怎么选','解释 Shadowrocket 的规则、全局与直连模式，给出不同使用场景下的选择方法。','starter','小火箭 规则模式 全局代理 直连','日常使用通常先选规则模式；全局用于临时验证是否为规则匹配问题；直连用于恢复原网络或做对照测试。模式名称是流量决策，不代表线路质量。', ['规则模式按域名、IP 或规则集决定去向，重点是规则是否匹配。','全局会让更多流量走所选代理，可能增加延迟和流量消耗。','直连不经过代理，可作为排障对照组，但不等于关闭所有网络扩展。'], sources.shadowrocket],
  ['shadowrocket-dns-settings','小火箭 DNS 怎么设置？先弄懂本地解析和远程解析','Shadowrocket DNS 设置入门：解释解析路径、泄露误区和网页打不开时的排查顺序。','help','小火箭 DNS 设置 DNS 泄露','没有明确需求时，优先使用配置提供者或官方文档建议的 DNS 方案，不要同时堆叠多个互相覆盖的设置。网页打不开时，先确认是域名解析失败还是代理连接失败。', ['DNS 只负责把域名解析为地址，不负责保证目标服务器可达。','加密 DNS 能保护部分解析过程，但不能自动提供匿名或绕过所有限制。','修改前记录原值；失败时恢复默认，再一次只改一个变量。'], sources.cloudflareDns],
  ['shadowrocket-backup-security','小火箭配置怎么备份？订阅链接和规则文件要先脱敏','说明 Shadowrocket 配置迁移、备份与分享时的敏感信息，避免把订阅令牌一起公开。','toolbox','小火箭 配置备份 订阅安全','备份可以做，但分享前必须检查订阅 URL、认证字段、私钥、设备标识和自定义规则。配置文件能连上，不代表适合公开。', ['把原始备份保存在可信设备和加密存储中。','对外求助时使用最小复现配置，只保留必要字段。','一旦订阅地址公开，应在服务后台重置，而不是只删除截图。'], sources.shadowrocket],
  ['one-yuan-airport-reliable','一元机场靠谱吗？先算清价格之外的 8 个风险','不推荐具体商家，只提供判断一元机场是否值得尝试的证据清单和止损方法。','pitfall','一元机场 靠谱吗 一元机场推荐','“一元”只能说明宣传价格，不能证明稳定、隐私或售后。先核对计费周期、流量、限速、退款、运营时间和联系方式；拿不到证据，就把它当高风险短期选项。', ['不要一次性长付，低价服务的持续运营能力需要时间验证。','区分官方条款、群聊口头承诺和第三方推广文案。','先用非关键场景测试，不在未知线路上传输敏感明文数据。'], null],
  ['one-yuan-airport-hidden-costs','一元机场为什么还能卖？低价套餐常见限制拆解','从共享资源、限速、流量、入口质量和售后成本解释一元机场的限制，不编造具体商家数据。','pitfall','一元机场 为什么便宜 套餐限制','极低价格往往对应更少的资源、更严格的限制或更低的服务保障，但具体原因必须看条款和实测，不能仅凭价格推断“必跑路”或“必超售”。', ['确认“一元”是月付、首月、体验价还是兑换后的平均价。','查看流量重置日、倍率、设备数和并发限制。','价格比较应按可用流量、持续时间和实际可用率，而不是只看付款数字。'], null],
  ['cheap-airport-how-to-choose','便宜机场怎么选？不看广告词，看这张证据清单','便宜机场选择指南：围绕条款透明、支付周期、客户端兼容与可复现测试做判断。','pitfall','便宜机场 推荐 怎么选','先筛掉信息不透明、强推长周期、夸张承诺和没有有效支持渠道的服务，再用短周期、少量预算验证兼容性与稳定性。本站不提供无依据排名。', ['条款应能找到套餐周期、流量、退款和限制说明。','客户端支持要写清配置格式，而不是只说“全平台”。','测试至少覆盖自己常用设备、网络和时间段。'], null],
  ['cheap-airport-vs-payg','便宜机场月付还是按量？先看你的使用模式','比较低价月付与按量套餐的适合人群、计算方法和常见误区。','starter','便宜机场 按量套餐 月付','高频、稳定使用更适合比较月付的可用性；低频或备用场景可以关注按量方案。关键不是哪种绝对便宜，而是有效期、流量重置和使用频率是否匹配。', ['把闲置月份也算进总成本。','按量套餐要确认有效期和流量倍率。','不要用标称总流量代替实际可用体验。'], null],
  ['free-airport-safe','免费机场安全吗？能用不等于值得信任','解释免费机场的隐私、稳定性、来源和凭证风险，并给出最低限度的安全检查。','pitfall','免费机场 安全吗 免费节点','无法核实运营者、日志政策和配置来源的免费订阅，不适合承载敏感账号、支付或工作数据。免费不等于恶意，但缺少责任主体时，你很难评估和追责。', ['不安装要求关闭系统安全功能的客户端。','不导入包含未知脚本、证书或远程控制内容的配置。','使用独立浏览器资料和多因素认证，降低凭证泄露后的损失。'], sources.githubSecurity],
  ['free-airport-subscription-leak','免费机场订阅链接能分享吗？公开链接的泄露风险','说明订阅 URL 为什么可能包含账号令牌，以及截图、日志和群聊转发中的泄露点。','help','免费机场 订阅链接 泄露','订阅链接应按密码对待。URL 中可能含有令牌或用户标识，公开后别人可能消耗额度、查看配置，甚至触发账号限制。', ['截图前遮住完整 URL、二维码和订阅标识。','日志中如果出现 Authorization、token、key 等字段要删除。','发现泄露后，在提供方后台重置凭证并移除旧链接。'], null],
  ['free-airport-long-term','免费机场能长期用吗？把“临时可用”和“长期可靠”分开','从持续运营、资源变动和支持渠道解释免费服务为什么不适合作为唯一方案。','pitfall','免费机场 长期使用 稳定','偶尔连通只能证明当次可用，不能证明长期稳定。若它是关键网络工具，应准备合法、可控的替代路径和离线资料，不把唯一入口押在无法联系的免费服务上。', ['记录测试日期、网络、节点和失败比例，别凭一次体验下结论。','关键配置保留本地备份，但备份前先检查敏感字段。','服务中断时先确认公告和多节点状态，避免把局部故障写成“跑路”。'], null],
  ['airport-shutdown-warning-signs','机场跑路前有哪些信号？只能做风险提示，不能当判决书','梳理服务异常、续费促销、公告缺失等风险信号，同时避免凭一次超时指控服务商跑路。','pitfall','机场跑路 前兆 风险','单次超时、个别节点失败或客服回复慢都不能单独证明“跑路”。更可靠的判断需要持续时间、多入口状态、官方公告、域名与支付变化等多项证据。', ['保存订单、条款与沟通记录，但不要公开他人隐私。','异常期间不要因为“最后优惠”冲动长付。','把事实记录和个人判断分开写，标注观察时间。'], null],
  ['airport-speed-test-method','机场测速怎么测才靠谱？延迟、速度和稳定性分开看','提供可复现的机场节点测试方法，避免用单次截图或“全绿”界面替代证据。','lab','机场测速 节点测速 延迟','至少固定设备、网络、客户端版本、测试目标和时间窗口；延迟、吞吐、丢包和连接成功率要分开记录。没有原始记录，就不要写成亲测排名。', ['先做本地网络基线，再测试代理路径。','早晚不同时间重复，保留失败样本。','同一服务内部也要注明节点范围，不能以一个节点代表全部。'], null],
  ['airport-subscription-update-failed','机场订阅更新失败：从 HTTP 状态到配置解析逐层查','订阅更新失败排障指南，区分地址失效、网络错误、证书问题和客户端解析错误。','help','机场订阅 更新失败 Clash 小火箭','先复制订阅地址到安全环境检查是否仍有效，再看客户端日志中的 HTTP 状态或解析错误。不要在公开网站粘贴订阅内容做“在线转换”。', ['401/403 常指向授权或权限问题；404 可能是地址变化。','超时需要区分 DNS、连接和服务器响应阶段。','下载成功但导入失败，多半要检查配置格式与客户端兼容性。'], null],
  ['airport-vs-vpn','机场和 VPN 有什么区别？别把客户端、协议和服务混成一团','用一张逻辑图解释机场订阅、代理客户端、协议与传统 VPN 服务的关系。','starter','机场 VPN 区别 代理','“机场”是中文网络社区对代理订阅服务的非正式称呼；VPN 是一类虚拟专用网络技术或商业产品称呼。两者可能都改变流量路径，但技术实现、覆盖范围和责任主体不同。', ['客户端只是工具，订阅或账号才提供远端连接参数。','系统代理通常不覆盖所有应用；TUN/VPN 接口覆盖更广但仍取决于规则。','任何工具都不能自动消除账号登录、Cookie 和服务端日志。'], null],
  ['airport-node-selection','机场节点怎么选？低延迟不是唯一答案','节点选择指南：综合连接成功率、路由、带宽、晚高峰表现和目标服务可用性。','starter','机场节点 怎么选 延迟','先选能稳定连接且满足目标用途的节点，再比较延迟和速度。延迟很低但频繁断线，通常不如稍慢却稳定的节点。', ['按目标服务测试，而不是只盯客户端的探测数字。','同一地点的不同运营商路由可能完全不同。','遇到异常先换协议或入口做对照，不要无脑轮询全部节点。'], null],
  ['clash-party-what-is','Clash Party 是什么？支持哪些系统，和 Mihomo 什么关系','介绍 Clash Party 的定位、支持平台、核心关系和适合的使用场景。','starter','Clash Party 是什么 下载','Clash Party 是面向 Windows、macOS 和 Linux 的图形客户端项目，使用 Mihomo 等能力处理配置与流量。它是客户端，不提供节点或订阅服务。', ['优先从项目官方 GitHub 仓库和 Releases 获取安装包。','不同版本功能与界面会变化，教程必须标注版本。','导入未知配置前检查脚本、规则提供者和订阅来源。'], sources.clashParty],
  ['clash-platy-typo','Clash Platy 是什么？你可能想找的是 Clash Party','处理“clash platy”搜索词：说明常见拼写错误，并给出 Clash Party 官方入口和安全核对方法。','starter','clash platy Clash Party','目前没有足够依据把“Clash Platy”当作一个独立、可信的客户端名称；多数搜索意图可能指向 Clash Party。下载前请核对仓库组织名与 Releases，不要从相似拼写站点取安装包。', ['正确项目名是 Clash Party。','搜索拼写错误容易进入仿冒下载页，最终来源比页面标题更重要。','安装前查看版本号、发布时间、文件名和项目发布记录是否对应。'], sources.clashParty],
  ['clash-party-download-safe','Clash Party 下载安全吗？官方入口、版本与校验清单','Clash Party 安全下载指南：认准官方 Releases，检查版本、系统架构和文件来源。','pitfall','Clash Party 下载 官网 安全','从官方 GitHub Releases 下载，并确认操作系统与 CPU 架构。第三方“高速下载”“绿色版”会增加被捆绑或替换的风险。', ['Windows 注意 x64 与 ARM64；macOS 注意 Intel 与 Apple 芯片。','不要因为系统提示就直接关闭安全软件，先核对发布来源。','升级前备份配置并记录当前可用版本，方便回退。'], sources.clashPartyRelease],
  ['clash-party-import-subscription','Clash Party 怎么导入订阅？导入后先做四项检查','Clash Party 订阅导入与首次使用清单，包含更新、选择、系统代理和日志检查。','starter','Clash Party 导入订阅 教程','在配置页添加可信订阅后先执行更新，再选择配置和具体节点；随后按需求启用系统代理或 TUN，并用日志确认流量实际经过客户端。', ['订阅地址不要发到截图、转换网站或公开群聊。','配置能下载不代表节点可用，要分开验证。','多个代理客户端不要同时接管系统代理。'], sources.clashParty],
  ['clash-party-system-proxy-tun','Clash Party 系统代理和 TUN 模式有什么区别','解释 Clash Party 系统代理与 TUN 的覆盖范围、权限需求和排障选择。','starter','Clash Party TUN 系统代理 区别','浏览器等遵循系统设置的应用可先用系统代理；需要覆盖不读系统代理的应用时再考虑 TUN。TUN 覆盖更广，但权限、DNS 和路由冲突也更复杂。', ['排障先用范围更小的系统代理建立基线。','启用 TUN 前退出其他 VPN、虚拟网卡和同类客户端。','公司设备或受管设备不要绕过管理员策略。'], sources.clashParty],
  ['clash-party-dns-override','Clash Party DNS 覆写后打不开网页：恢复与排查步骤','处理 Clash Party DNS 覆写导致的解析异常，提供可逆的逐步检查。','help','Clash Party DNS 覆写 网页打不开','先关闭自定义 DNS 覆写并恢复配置默认值；若网页恢复，再一次只启用一项设置，对照日志确认是上游不可达、规则错误还是地址格式问题。', ['保存修改前配置，确保能一键回退。','用域名与 IP 分别测试，区分解析和连接。','不要同时改系统 DNS、浏览器安全 DNS和客户端 DNS。'], sources.clashPartyRelease],
  ['clash-party-nodes-missing','Clash Party 更新后节点不显示：配置、Provider 与版本排查','Clash Party 升级后节点为空或 Provider 加载失败时的排障顺序。','help','Clash Party 节点不显示 Provider 错误','先确认当前激活的配置没有切换，再手动更新 Provider 并查看错误日志；如果问题从升级后出现，用备份配置和上一可用版本做对照。', ['配置列表存在不等于 Provider 内容加载成功。','检查远程地址、权限、证书时间和 YAML 语法。','回退版本是定位手段，不是永久忽略安全更新。'], sources.clashPartyRelease],
  ['mihomo-what-is','Mihomo 是什么？为什么很多 Clash 客户端在用它','用新手能懂的方式解释 Mihomo 核心、图形客户端与配置文件之间的关系。','starter','Mihomo 是什么 Clash Meta','Mihomo 是开源的代理核心项目；图形客户端负责界面、配置管理和系统集成，核心负责规则匹配、连接与流量处理。它本身不出售节点。', ['同一核心在不同客户端中，界面和默认设置可能不同。','教程要同时标注客户端版本与核心版本。','核心能力不等于所有前端都已提供对应开关。'], sources.mihomo],
  ['clash-vs-mihomo','Clash 和 Mihomo 有什么区别？旧教程还能不能照搬','解释 Clash、Clash Meta/Mihomo 的名称关系，以及使用旧教程时应核对的关键点。','starter','Clash Mihomo 区别 Clash Meta','很多旧教程里的 Clash 指一类配置生态或早期核心；Mihomo 延续并扩展了相关能力。旧配置不一定失效，但字段、默认行为和前端支持需要按当前文档核对。', ['不要只凭文件后缀判断兼容性。','遇到弃用字段，优先按当前核心日志和文档修改。','前端名称相似不代表来自同一维护团队。'], sources.mihomo],
  ['windows-clash-client-choice','Windows 上的 Clash 类客户端怎么选？看维护、来源和需求','不做虚假排名，从维护状态、官方来源、系统支持和排障能力选择 Windows 客户端。','pitfall','Windows Clash 客户端 推荐 2026','先选仍有公开维护记录、发布来源清晰、能查看日志且适配自己系统架构的客户端。不要因为界面相似就默认安全，也不要把下载量当唯一证据。', ['核对最近发布记录和问题追踪，而不是只看博客推荐。','需要 TUN、规则编辑或便携版时再比较具体功能。','下载和订阅服务应分开评估，客户端免费不代表线路免费。'], sources.githubSecurity],
  ['shadowrocket-vs-clash-party','小火箭和 Clash Party 怎么选？先看设备，不是看谁更强','比较 Shadowrocket 与 Clash Party 的平台、使用方式和适合人群，不编造跑分。','pitfall','小火箭 Clash Party 对比','iPhone、iPad、Apple TV 等 Apple 设备可考虑 Shadowrocket；Windows、macOS、Linux 桌面环境可了解 Clash Party。两者不是同平台的简单擂台赛，优先看设备和配置兼容。', ['比较时固定同一网络、同一配置和同一目标。','桌面 TUN 与移动系统网络扩展的权限机制不同。','客户端选择不能替代对订阅来源和隐私政策的判断。'], sources.shadowrocket],
  ['free-vpn-vs-free-airport','免费 VPN 和免费机场哪个更安全？先问这 6 个问题','从责任主体、权限、日志、来源、商业模式和退出成本比较免费 VPN 与免费机场。','pitfall','免费 VPN 免费机场 安全 对比','不能只按“VPN”或“机场”标签判断安全。更重要的是谁在运营、收集什么数据、客户端从哪里下载、如何盈利、能否删除账号，以及出现问题时是否能联系。', ['查看应用商店隐私标签与独立隐私政策，但不要把自述当审计结论。','拒绝要求安装根证书、关闭安全功能或授予无关权限的服务。','敏感业务优先使用组织认可的方案，不用未知免费线路。'], sources.applePrivacy],
  ['clash-party-203-upgrade-test','Clash Party 2.0.3 值得升级吗？升级前后复现测试方案','围绕 Clash Party 2.0.3 的启动、配置加载、Provider、DNS 和系统代理设计升级对比实验。','lab','Clash Party 2.0.3 升级 测试','当前页面提供可复现的升级测试方案，不给没有记录的性能结论。先备份当前配置，记录旧版本基线，再分别验证启动、配置加载、Provider 更新、DNS 和系统代理。', ['测试必须保留升级前版本、核心版本和配置散列值。','同一设备和网络连续重复，失败样本也要记录。','发现回归时用旧版本复测，区分版本问题与远端服务波动。'], sources.clashPartyRelease],
  ['mihomo-core-update-benchmark','Mihomo 核心升级后更快吗？CPU、内存和连接复用测试','设计 Mihomo 核心版本升级前后的资源占用与连接表现测试，不用体感代替数据。','lab','Mihomo 核心 性能 CPU 内存 测试','不能只凭“新版本更流畅”下结论。应固定前端、配置、规则集、测试目标和请求量，分别记录空闲、加载规则、并发连接与持续传输阶段。', ['空闲内存、峰值内存和稳定运行内存要分开。','首次启动包含缓存建立，不能和热启动混在一起。','核心日志级别会影响资源占用，测试时必须保持一致。'], sources.mihomo],
  ['tun-vs-system-proxy-benchmark','TUN 模式和系统代理谁更快？覆盖范围与资源占用实验','用相同配置比较 TUN 与系统代理的覆盖范围、延迟、CPU 和兼容性，避免一句话定胜负。','lab','TUN 模式 系统代理 性能 对比','TUN 覆盖更广，不代表一定更快；系统代理开销较小，也不代表所有应用都能用。实验要先验证覆盖范围，再比较资源和连接表现。', ['浏览器、命令行和不读系统代理的应用要分别测试。','切换模式后清理连接并重启目标应用。','DNS 路径和路由规则必须记录，否则结果不可复现。'], sources.mihomo],
  ['doh-doq-dns-latency-test','DoH、DoT、DoQ 谁更快？DNS 延迟与失败率测试方案','比较加密 DNS 协议时如何控制缓存、上游、网络和重复次数，避免拿一次查询截图做结论。','lab','DoH DoT DoQ DNS 速度 测试','协议名称不能直接决定速度。测试应控制同一解析目标、上游地区、缓存状态和网络环境，同时记录中位数、尾延迟和失败率。', ['冷缓存与热缓存要分组记录。','平均值会掩盖偶发卡顿，应保留 P95 或最慢样本。','解析快不代表目标网站连接一定快。'], sources.cloudflareDns],
  ['ipv4-vs-ipv6-node-test','IPv4 和 IPv6 节点哪个更稳？双栈网络对照实验','设计 IPv4、IPv6 双栈节点的解析、连接、路由和晚高峰稳定性实验。','lab','IPv4 IPv6 节点 稳定性 测试','IPv6 不天然更快，IPv4 也不必然更稳。结果取决于本地运营商、路由、服务端和目标站点，必须在同一地点做双栈对照。', ['先确认本地确实获得可用 IPv6，而不是只有地址没有出口。','记录解析结果和实际连接地址，避免以为在测 IPv6。','不同运营商结果不能直接互相替代。'], sources.cisaDns],
  ['quic-vs-tcp-proxy-test','QUIC 和 TCP 代理谁更抗抖？弱网与丢包实验方案','围绕 QUIC、TCP 在延迟、抖动和受控丢包环境下的连接恢复与传输表现设计实验。','lab','QUIC TCP 代理 弱网 丢包 测试','QUIC 基于 UDP 并集成现代传输能力，但并不保证在所有网络都更快。实验需要控制服务器、加密、文件大小、丢包和往返延迟。', ['分别测首次连接、复用连接和网络切换。','某些网络会限制 UDP，失败本身也是兼容性结果。','网页加载与大文件传输要拆成不同场景。'], sources.cloudflareQuic],
  ['shadowrocket-battery-test','小火箭耗电吗？Shadowrocket 电量与后台活动测试','使用 iPhone 系统电池统计比较直连、规则模式和持续代理，不伪造续航数字。','lab','小火箭 耗电 Shadowrocket 电池 测试','判断小火箭是否耗电，至少要对照屏幕时间、网络类型、后台活动、流量规模和测试时长。系统电池占比不是绝对耗电量，不能直接跨设备比较。', ['同一设备、相近电量区间和亮度条件下测试。','Wi-Fi 与蜂窝网络分开记录。','规则更新、测速和持续传输不能混成一个场景。'], sources.appleBattery],
  ['airport-seven-day-peak-test','机场晚高峰稳不稳？连续 7 天节点观察模板','提供晚高峰连续记录模板，关注连接成功率、尾延迟、速度波动和故障持续时间。','lab','机场 晚高峰 稳定性 7天 测试','单晚表现不能代表长期稳定。至少连续记录一周，并固定每天的时间窗口、网络、目标、节点范围和测试次数。本站未填入任何服务商模拟数据。', ['记录成功和失败，而不是只保存最好成绩。','节点维护、运营商波动和目标站限速要单独备注。','最终结论限定在测试地区、设备和时间范围内。'], null],
  ['free-airport-traffic-observation','免费机场会不会偷流量？只能这样做安全观察','说明如何在隔离环境观察免费订阅的连接目标、权限和异常请求，不把观察结果夸大成安全审计。','lab','免费机场 偷流量 隐私 流量分析','普通流量观察只能发现部分异常，不能证明“绝对安全”或“确定窃密”。应使用隔离设备、测试账号和非敏感数据，记录客户端来源、连接目标与权限变化。', ['不要在主力设备和真实账号上做未知服务实验。','加密流量看不到内容不等于没有风险。','发现异常只能陈述证据，不推断未观察到的行为。'], sources.githubSecurity],
  ['subscription-availability-monitor','机场订阅稳定吗？订阅地址可用率监测实验','设计订阅更新可用率、响应时间、HTTP 状态和配置解析成功率的长期监测方案。','lab','机场订阅 可用率 监测 HTTP 状态','订阅接口稳定性和节点稳定性是两件事。监测只访问自己的订阅地址，并对日志脱敏；记录响应状态、耗时和解析结果，不公开令牌。', ['设置合理频率，避免监测本身对服务造成压力。','把网络超时、HTTP 错误和配置解析错误分开统计。','订阅令牌必须从公开报告和截图中删除。'], null],
  ['vpn-connected-no-internet','VPN 已连接但无法上网：从路由、DNS 到 Kill Switch 急救','VPN 显示已连接却打不开网页时，按基础网络、路由、DNS、Kill Switch 和 MTU 顺序排查。','help','VPN 已连接 无法上网 连上没网','先断开 VPN 确认原网络正常，再重新连接并分别测试 IP 与域名。如果 IP 可达但域名失败，优先检查 DNS；全部不可达则检查路由、Kill Switch 和服务端状态。', ['不要一上来重装客户端，先判断故障发生在哪一层。','保留连接日志中的时间和错误阶段，但隐藏服务器与账号信息。','修改 DNS、路由或 MTU 时一次只改一项。'], sources.microsoftNetwork],
  ['vpn-connection-timeout','VPN 连接超时怎么办？服务器没回应的 8 步急救','VPN connection timeout 常见原因包括本地网络、DNS、端口、协议、服务器负载和系统时间。','help','VPN 连接超时 connection timeout','切换 Wi-Fi 与移动网络做对照，再换同服务的其他服务器。如果所有服务器只在当前网络超时，优先怀疑本地网络、端口或协议限制。', ['超时只说明请求未按时完成，不能单独证明服务商跑路。','核对系统时间，证书握手对时间偏差敏感。','记录是解析超时、TCP/UDP 连接超时还是 TLS 握手超时。'], sources.microsoftNetwork],
  ['vpn-keeps-disconnecting','VPN 总是自动断开：网络切换、休眠和心跳排查','处理 VPN 频繁掉线、锁屏后断开、Wi-Fi 切换后不重连等问题。','help','VPN 自动断开 频繁掉线 重连','先记录断开发生在锁屏、休眠、网络切换还是固定时长后，再检查省电策略、保持连接设置、网络质量和服务端会话限制。', ['把“断开”和“已连接但没流量”分开记录。','移动设备省电模式可能限制后台网络活动。','固定时间断开可能与会话、NAT 或心跳间隔有关。'], sources.appleVpn],
  ['windows11-vpn-not-connecting','Windows 11 VPN 连接不上：系统自带与第三方客户端排查','Windows 11 VPN 无法连接时检查网络适配器、凭据、协议、时间、防火墙和冲突软件。','help','Windows 11 VPN 连接不上 错误','先使用 Windows 网络疑难解答并确认普通网络正常，再检查 VPN 配置、系统时间、虚拟网卡以及是否有其他 VPN 或代理客户端占用路由。', ['记录 Windows 显示的具体错误代码。','不要同时运行多个需要接管网络的客户端。','公司设备受策略管理时联系管理员，不要绕过安全策略。'], sources.microsoftNetwork],
  ['iphone-vpn-connected-no-internet','iPhone VPN 已连接但没网：权限、DNS 与蜂窝网络急救','iPhone 出现 VPN 图标但网页打不开时，检查原网络、VPN 配置、按需连接、DNS 和蜂窝权限。','help','iPhone VPN 已连接 无法上网','先断开 VPN 验证 Safari 在原网络能否访问，再切换 Wi-Fi 与蜂窝网络。若只有一个配置失败，检查该配置的服务器、认证和按需连接规则。', ['删除配置前先确认能否重新获取。','重置网络设置会清除已保存的 Wi-Fi 等信息，不能当第一步。','企业管理配置应由组织管理员处理。'], sources.appleVpn],
  ['android-vpn-not-connecting','Android VPN 连接失败：始终开启、专用 DNS 与省电设置','Android VPN 连接不上或后台断开时，检查始终开启 VPN、无 VPN 阻止连接、专用 DNS 和电池优化。','help','Android VPN 连接失败 始终开启 VPN','先确认普通网络可用，再检查系统是否启用了“始终开启 VPN”或“无 VPN 时阻止连接”。旧配置残留可能让新客户端无法接管。', ['不同品牌系统菜单名称可能不同。','关闭电池优化仅用于验证，确认原因后再决定长期设置。','工作资料与设备管理策略可能限制 VPN 配置。'], sources.androidVpn],
  ['vpn-dns-leak-fix','VPN DNS 泄露怎么排查？先分清解析路径和检测误报','解释 VPN DNS 泄露的判断方法、浏览器安全 DNS、系统缓存和分流规则对检测结果的影响。','help','VPN DNS 泄露 检测 修复','先关闭浏览器自定义安全 DNS，再清理缓存并对比 VPN 开关前后的解析服务器。出现本地运营商 DNS 不一定等于内容泄露，需结合分流与实际请求路径判断。', ['DNS 测试站只能观察它收到的查询，不能审计全部流量。','规则分流可能有意让部分域名本地解析。','不要为了通过检测站而复制未知 DNS 配置。'], sources.cloudflareDns],
  ['vpn-slow-speed-fix','VPN 速度慢怎么解决？先测本地基线再换协议','VPN 网速慢、延迟高和视频卡顿时，按本地网络、服务器距离、协议、MTU 与拥塞排查。','help','VPN 速度慢 延迟高 提速','先在关闭 VPN 时测本地基线，再连接同一区域多个服务器。若所有服务器都按比例变慢，检查协议、设备性能和 MTU；只有单节点慢则更像路由或负载问题。', ['测速要固定目标、时间和设备。','距离近不保证路由更好。','所谓“一键提速参数”可能破坏兼容性，修改前先备份。'], null],
  ['vpn-wifi-works-cellular-fails','VPN 在 Wi-Fi 能用，移动数据不能用：协议与蜂窝权限排查','VPN 仅在 Wi-Fi 可用、切到 4G/5G 就失败时的急救步骤。','help','VPN WiFi 能用 移动数据不能用','先确认客户端拥有蜂窝数据权限，再尝试服务明确支持的其他协议或端口。移动网络可能使用不同的 NAT、IPv6 和 UDP 策略。', ['不要把不同网络下的结果直接归因于服务器。','记录移动运营商、IPv4/IPv6 和错误阶段。','切换协议必须使用服务端实际支持的配置。'], sources.appleVpn],
  ['vpn-cellular-works-wifi-fails','VPN 移动数据能用，Wi-Fi 不能用：路由器和局域网急救','VPN 在移动数据正常、连接某个 Wi-Fi 后失败时，检查路由器 DNS、UDP、访客网络和认证页面。','help','VPN 移动数据能用 WiFi 不能用','若换其他 Wi-Fi 正常，问题大概率集中在当前路由器或网络策略。先完成公共 Wi-Fi 的网页认证，再检查路由器 DNS、时间和协议限制。', ['访客网络可能禁止设备间或特定协议通信。','酒店、学校和公司网络可能有明确使用政策。','不要在无权限的网络上尝试绕过管理措施。'], sources.microsoftNetwork],
  ['vpn-certificate-expired','VPN 提示证书过期或不受信任：不要直接点继续','处理 VPN certificate expired、unknown CA、hostname mismatch 等证书错误。','help','VPN 证书过期 不受信任 错误','先核对系统时间和服务器地址。证书确实过期、主机名不匹配或签发机构未知时，应联系服务提供者更新，不能靠关闭验证长期使用。', ['不要安装聊天群里来源不明的根证书。','系统时间错误会导致仍有效证书看起来失效。','记录证书主体、到期时间和错误文字，但隐藏账号信息。'], sources.openvpn],
  ['vpn-authentication-failed','VPN 身份验证失败：密码、令牌、时间和设备限制排查','VPN authentication failed、AUTH_FAILED 和登录循环的处理方法。','help','VPN 身份验证失败 AUTH_FAILED','重新手动输入账号凭据，检查密码是否更新、令牌是否过期、系统时间是否准确以及账号是否达到设备或并发限制。', ['不要反复高频尝试，避免触发账号锁定。','订阅链接和 VPN 账号密码不是同一种凭据。','多因素认证失败时确认设备时间与验证码窗口。'], sources.openvpn],
  ['vpn-port-blocked','VPN 端口被封或协议被限制？这样做合规排查','当某协议在特定网络无法连接时，如何用合法授权的端口和协议做对照。','help','VPN 端口被封 协议受限 UDP TCP','先在另一个可信网络测试同一配置。如果只在一个网络失败，查看网络使用政策，并切换到服务端明确支持的备用协议或端口。', ['不要扫描不属于自己的网络。','UDP 失败不等于所有 VPN 都被封锁。','公司或学校网络应按管理员要求使用。'], sources.microsoftNetwork],
  ['vpn-kill-switch-no-internet','关闭 VPN 后无法上网？先检查 Kill Switch 和残留路由','VPN 退出后断网、只能开着 VPN 上网时，修复 Kill Switch、系统代理、DNS 和虚拟网卡残留。','help','关闭 VPN 无法上网 Kill Switch','先重新打开客户端，关闭 Kill Switch 或“无 VPN 时阻止连接”，再正常断开。随后检查系统代理、DNS 和默认路由是否恢复。', ['强制结束进程可能来不及恢复网络设置。','重启只能暂时清理部分状态，仍需找出残留设置。','修改路由前记录原配置。'], sources.microsoftNetwork],
  ['vpn-split-tunneling-not-working','VPN 分流失效：应用仍走错出口怎么办','处理 split tunneling 应用绕过失败、规则不生效和 DNS 路径不一致。','help','VPN 分流 失效 split tunneling','先确认客户端按应用、域名还是 IP 分流，再检查目标应用是否产生多个进程或使用独立 DNS。用一个明确目标做对照，不要同时改大量规则。', ['域名可能解析到多个动态 IP。','应用更新后进程路径可能变化。','分流只决定路径，不保证目标服务接受该出口。'], sources.androidVpn],
  ['wireguard-handshake-failed','WireGuard 没有握手：密钥、Endpoint、端口和时间急救','WireGuard latest handshake 为空或持续为零时的排查顺序。','help','WireGuard handshake failed 没有握手','先检查公钥是否成对、Endpoint 地址与端口是否正确、服务端端口是否监听，再确认 NAT 后客户端是否需要 PersistentKeepalive。', ['私钥绝不能截图或公开。','AllowedIPs 错误通常影响路由，但完全无握手先查 Endpoint 与端口。','服务端与客户端都要查看最新握手和收发字节。'], sources.wireguard],
  ['openvpn-tls-handshake-failed','OpenVPN TLS 握手失败：证书、时间与端口排查','OpenVPN TLS Error、TLS key negotiation failed 和 certificate verify failed 的急救方法。','help','OpenVPN TLS handshake failed 错误','先确认系统时间、服务器地址、协议和端口，再检查 CA、客户端证书与 tls-auth/tls-crypt 参数是否匹配。', ['TLS 超时与证书验证失败是不同故障。','不要通过关闭证书验证解决主机名错误。','日志只截取必要错误行，并删除远端地址和账号。'], sources.openvpn],
  ['ikev2-vpn-connection-failed','IKEv2 VPN 连接失败：证书、NAT 与身份标识急救','IKEv2 在 Windows、iPhone 或路由器上无法连接时的分层排查。','help','IKEv2 VPN 连接失败 证书 NAT','核对远程 ID、服务器地址、认证方式和证书用途，再检查网络是否允许必要流量。移动网络切换后重新协商失败时可先正常断开再连接。', ['远程 ID 不一定等于服务器显示名称。','证书链缺失与证书过期要分开处理。','企业 IKEv2 配置应按管理员提供的参数使用。'], sources.appleVpn],
  ['vpn-local-network-unreachable','开 VPN 后访问不了打印机和 NAS：局域网路由急救','VPN 开启后局域网设备、打印机、路由器或 NAS 无法访问时的处理方法。','help','VPN 无法访问局域网 打印机 NAS','检查客户端是否有“允许局域网”选项，以及远端网段是否与本地网段冲突。不要把整个私有地址段盲目加入直连，先确认实际设备地址。', ['本地与远端使用相同网段会造成路由冲突。','访客 Wi-Fi 可能本来就禁止局域网访问。','远程办公设备的分流规则应由组织管理员确认。'], sources.microsoftNetwork],
  ['vpn-battery-drain-overheating','VPN 耗电发热怎么办？协议、信号和后台流量急救','手机使用 VPN 后耗电、发热或后台流量增加时的检查清单。','help','VPN 耗电 发热 后台流量','先查看系统电池统计与流量统计，区分 VPN 客户端、目标应用和弱信号造成的消耗。持续测速、频繁重连和大量规则更新都会增加活动。', ['电池占比是相对值，不能直接跨设备比较。','弱蜂窝信号本身就会增加耗电。','关闭不必要的持续测速与调试日志后再做对照。'], sources.appleBattery],
];

function esc(s=''){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));}
function categoryName(c){return ({starter:'新手喂饭',pitfall:'旺仔排雷',help:'旺仔援助',toolbox:'旺仔急救箱',lab:'旺仔实验室'})[c];}
function badge(c){return c==='help'||c==='toolbox'?'orange':c==='lab'?'cream':'pink';}
function sourceList(primary){
  const list = primary ? [primary] : [sources.cisaDns];
  return list.map(([name,url])=>`<li><a href="${url}" rel="noopener" target="_blank">${esc(name)}</a></li>`).join('');
}
function schema(a){
  const [slug,title,description,category,keyword,answer,points] = a;
  const faqs = [
    {q:`${keyword.split(' ')[0]}适合新手直接用吗？`,a:'可以先从官方文档、短周期测试和可逆设置开始。涉及订阅、账号或配置时先备份，并避免公开敏感链接。'},
    {q:'一次连接失败能说明服务有问题吗？',a:'不能。需要结合失败阶段、多个节点、不同网络和持续时间判断；单次超时只代表本次请求没有按时完成。'},
    {q:'本文有推荐或推广具体服务吗？',a:'没有。本文是资料整理与配置说明，不提供无依据排名，也不包含推广链接。'}
  ];
  return JSON.stringify({
    '@context':'https://schema.org','@graph':[
      {'@type':'Article',headline:title,description,datePublished:created,dateModified:created,author:{'@type':'Person',name:'旺仔旺旺旺'},inLanguage:'zh-CN',keywords:keyword},
      {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'首页',item:'../index.html'},{'@type':'ListItem',position:2,name:'文章',item:'../articles.html'},{'@type':'ListItem',position:3,name:title}]},
      {'@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}
    ]
  }).replace(/</g,'\\u003c');
}
function render(a,index){
  const [slug,title,description,category,keyword,answer,points,primary] = a;
  const cat=categoryName(category); const color=badge(category);
  const faqs=[
    [`${keyword.split(' ')[0]}适合新手直接用吗？`,'可以先从官方入口、短周期测试和可逆设置开始。导入配置前备份，修改时一次只动一个变量。'],
    ['一次连接失败能说明服务有问题吗？','不能。需要结合失败阶段、多个节点、不同网络和持续时间判断。单次超时只代表本次请求没有按时完成。'],
    ['这篇文章会推荐具体机场或套餐吗？','不会。本文只提供判断方法、配置步骤或风险说明，不编造价格、速度、节点数量和用户评价。']
  ];
  const checks = [
    '先记录设备、系统、客户端版本、网络类型和发生时间。',
    '确认软件来自官方商店或项目发布页，订阅来自你能核实的服务方。',
    '一次只修改一个设置，并保留修改前的值，确保能够恢复。',
    '用至少两个目标、两个节点或两种网络做对照，不用单次结果下结论。',
    '公开求助前删除订阅 URL、二维码、令牌、账号、IP 和私钥。'
  ];
  const dogLine=index%3===0?'旺！先给结论，别让一串开关把你吓得满屏乱点。':index%3===1?'参数写得再精神，也得靠记录和对照说话。':'先把问题分层，别让客户端、节点和 DNS 一起背锅。';
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}｜新年旺旺旺</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow"><meta name="keywords" content="${esc(keyword)}"><link rel="stylesheet" href="../assets/styles.css"><script defer src="../assets/app.js"></script><script type="application/ld+json">${schema(a)}</script></head><body>
<a class="skip-link" href="#article">跳到正文</a><header class="site-header"><a class="brand" href="../index.html"><span class="brand-dog" aria-hidden="true">ᴖᴥᴖ</span><span>新年旺旺旺</span></a><button class="menu-button" aria-expanded="false" aria-controls="site-nav">菜单 ☰</button><nav id="site-nav" class="site-nav" aria-label="主导航"><a href="../index.html">首页</a><a class="nav-branded" href="../articles.html">旺仔好物</a><a class="nav-branded" href="../articles.html?category=toolbox">百宝狗窝</a><a class="nav-branded" href="../articles.html?category=help">急救锦囊</a><a class="nav-branded" href="../articles.html?category=pitfall">排雷哨所</a><a class="nav-branded" href="../index.html#featured-title">快乐源泉</a><a aria-current="page" href="../articles.html">文章</a><a href="../about.html">关于旺仔</a><a href="../policy.html">编辑政策</a></nav></header>
<main class="article-shell"><aside class="toc" aria-label="文章目录"><b>本页目录</b><a href="#answer">直接答案</a><a href="#meaning">先把概念说清</a><a href="#checklist">操作清单</a><a href="#mistakes">常见误区</a><a href="#faq">常见问题</a><a href="#sources">来源</a></aside>
<header class="article-header"><nav class="breadcrumbs" aria-label="面包屑"><a href="../index.html">首页</a> / <a href="../articles.html">${cat}</a> / ${esc(keyword.split(' ')[0])}</nav><span class="badge ${color}">${cat} · ${category==='lab'?'实验方案 / 待实测':'资料整理'}</span><h1>${esc(title)}</h1><p class="article-deck">${esc(description)}</p><div class="article-meta"><span>发布：<time datetime="${created}">${created}</time></span><span>作者：旺仔旺旺旺</span><span>${category==='lab'?'状态：待录入真实数据':'无推广链接'}</span></div><details class="mobile-toc"><summary>展开文章目录</summary><nav><a href="#answer">直接答案</a><a href="#meaning">概念</a><a href="#checklist">清单</a><a href="#mistakes">误区</a><a href="#faq">FAQ</a><a href="#sources">来源</a></nav></details></header>
<article id="article" class="article-body"><section id="answer" class="geo-answer"><p class="answer-label">30 秒直接答案</p><h2>${esc(keyword)}</h2><p>${esc(answer)}</p><p class="answer-note">${dogLine}</p></section>
<h2 id="meaning">先把概念说清</h2><p>这篇文章对应的搜索意图是“${esc(keyword)}”。页面采用先结论、再原因、最后操作的顺序，方便快速确认自己该做什么。文中把官方可核实信息、通用排障方法和编辑判断分开；没有真实测试记录的地方不会写成亲测。</p><ul>${points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="callout warn"><strong>边界提醒</strong>客户端显示连接、节点显示绿色或某次网页打开，都只是一项观察。稳定性、隐私和长期可用性需要更长时间、更多环境和原始记录才能判断。</div>
<h2 id="checklist">照着做的检查清单</h2><ol>${checks.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><h3>如何记录结果</h3><p>建议用“时间—环境—动作—结果—错误文本”五列记录。比如：2026-10-07 20:30，Windows 11，家庭 Wi-Fi，更新配置，返回 HTTP 403。这样的信息能把“就是不行”变成可定位的问题。</p><h3>什么时候应该停止折腾</h3><p>如果配置要求安装未知证书、关闭系统安全功能、提供账号密码或把订阅粘贴到陌生转换网站，应先停下核实来源。故障排查不应扩大权限和隐私风险。</p>
<h2 id="mistakes">常见误区</h2><div class="myth-grid"><section><h3>误区一：名字像就是真的</h3><p>仿冒下载页常使用相似名称。最终应核对官方商店、代码仓库、开发者或维护组织，而不是只看标题。</p></section><section><h3>误区二：便宜等于划算</h3><p>价格要和周期、流量、限制、可用性及退出成本一起比较。没有条款和记录时，只能说“待验证”。</p></section><section><h3>误区三：一次失败就是跑路</h3><p>一次超时可能来自本地网络、DNS、客户端、节点或目标站点。需要多项证据才能升级判断。</p></section></div>
<h2 id="faq">常见问题</h2>${faqs.map(([q,v])=>`<details class="faq-block"><summary>${esc(q)}</summary><p>${esc(v)}</p></details>`).join('')}
<h2 id="sources">资料来源与更新说明</h2><ul class="source-list">${sourceList(primary)}</ul><p>创建日期：${created}。本文为资料整理、配置说明或风险指南；没有服务商实测数据，也没有推广链接。只有内容发生实质修改时才更新日期。</p><section class="related"><h2>继续查</h2><p><a href="../articles.html">返回全部文章，按栏目或关键词筛选 →</a></p></section></article>
<aside class="article-side"><span class="badge ${color}">${cat}</span><p><strong>搜索词</strong><br>${esc(keyword)}</p><p>本文不提供机场名单，不展示模拟测速，不做无依据排名。</p><button class="share-copy" data-copy="${esc(title)}">复制文章标题</button><p class="copy-status" role="status" aria-live="polite"></p></aside></main><footer class="site-footer"><div class="wrap footer-bottom"><span>© 2026 旺仔旺旺旺</span><a href="../policy.html">编辑政策</a></div></footer><button class="back-top" type="button" aria-label="返回顶部">↑<span>回到狗窝</span></button></body></html>`;
}

articles.forEach((a,i)=>fs.writeFileSync(path.join(outDir, `${a[0]}.html`), render(a,i), 'utf8'));

const cards = articles.map((a,i)=>{
  const [slug,title,description,category,keyword]=a;
  return `<article class="list-card" data-category="${category}"><span class="badge ${badge(category)}">${categoryName(category)}</span><h2><a href="articles/${slug}.html">${esc(title)}</a></h2><p>${esc(description)}</p><div class="tag-list">${keyword.split(' ').slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('')}<span>${category==='lab'?'实验方案':'资料整理'}</span></div><div class="card-meta"><time datetime="${created}">${created}</time><span>${category==='lab'?'待实测':`${8+i%5} 分钟`}</span></div></article>`;
}).join('\n');

function replaceBlock(file,start,end,content){
  const p=path.join(root,file); let text=fs.readFileSync(p,'utf8');
  const block=`${start}\n${content}\n${end}`;
  if(text.includes(start)&&text.includes(end)) text=text.replace(new RegExp(`${start}[\\s\\S]*?${end}`),block);
  else if(file==='articles.html') text=text.replace('<div class="empty-state">',`${block}\n<div class="empty-state">`);
  else text += `\n${block}\n`;
  fs.writeFileSync(p,text,'utf8');
}
replaceBlock('articles.html','<!-- SEO-ARTICLES:START -->','<!-- SEO-ARTICLES:END -->',cards);

// Remove the old non-clickable planning cards now that those subjects have real pages.
{
  const p=path.join(root,'articles.html');
  let text=fs.readFileSync(p,'utf8');
  text=text.replace(/<article class="list-card"[\s\S]*?<\/article>/g,card=>card.includes('<h2><a href=')?card:'');
  fs.writeFileSync(p,text,'utf8');
}

const sitemapLinks=articles.map(a=>`<li><a href="articles/${a[0]}.html">${esc(a[1])}</a></li>`).join('\n');
{
  const p=path.join(root,'sitemap.html'); let text=fs.readFileSync(p,'utf8');
  const start='<!-- SEO-ARTICLES:START -->', end='<!-- SEO-ARTICLES:END -->';
  const block=`${start}<section class="wrap sitemap-articles"><h2>专题文章（${articles.length} 篇）</h2><ul>${sitemapLinks}</ul></section>${end}`;
  text=text.replace(new RegExp(`\\s*${start}[\\s\\S]*?${end}`),'');
  text=text.replace('</main>',`${block}</main>`);
  fs.writeFileSync(p,text,'utf8');
}

const xml=articles.map(a=>`  <url><loc>{{SITE_URL}}/articles/${a[0]}.html</loc><lastmod>${created}</lastmod></url>`).join('\n');
{
  const p=path.join(root,'sitemap.xml.template'); let text=fs.readFileSync(p,'utf8');
  const start='<!-- SEO-ARTICLES:START -->', end='<!-- SEO-ARTICLES:END -->';
  const block=`${start}\n${xml}\n${end}\n`;
  text=text.replace(new RegExp(`\\s*${start}[\\s\\S]*?${end}\\s*`),'\n');
  text=text.replace('</urlset>',`${block}</urlset>`);
  fs.writeFileSync(p,text,'utf8');
}

const rssItems=articles.map(a=>`    <item><title>${esc(a[1])}</title><link>{{SITE_URL}}/articles/${a[0]}.html</link><guid>{{SITE_URL}}/articles/${a[0]}.html</guid><pubDate>Wed, 07 Oct 2026 08:00:00 +0800</pubDate><description>${esc(a[2])}</description></item>`).join('\n');
fs.writeFileSync(path.join(root,'rss.xml.template'),`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>新年旺旺旺｜网络工具与排障文章</title><link>{{SITE_URL}}/</link><description>小火箭、Clash Party、Mihomo、DNS、节点选择与网络故障排查。</description><language>zh-cn</language><lastBuildDate>Wed, 07 Oct 2026 08:00:00 +0800</lastBuildDate>\n${rssItems}\n</channel></rss>\n`,'utf8');

const indexNowUrls=['','articles.html',...articles.map(a=>`articles/${a[0]}.html`)];
fs.writeFileSync(path.join(root,'indexnow-payload.template.json'),JSON.stringify({host:'{{SITE_HOST}}',key:'{{INDEXNOW_KEY}}',keyLocation:'{{SITE_URL}}/{{INDEXNOW_KEY}}.txt',urlList:indexNowUrls.map(u=>`{{SITE_URL}}/${u}`)},null,2)+'\n','utf8');

console.log(`Generated ${articles.length} article pages and updated indexes.`);
