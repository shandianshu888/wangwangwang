# Bing 上线检查清单

当前项目已提供可抓取的静态文章链接、CollectionPage / Article / FAQ / Breadcrumb 结构化数据、HTML 网站地图、XML Sitemap 模板、RSS 模板和 IndexNow 请求模板。

正式上线后按顺序完成：

1. 将 `{{SITE_URL}}` 替换为带 `https://` 的正式网址，将 `{{SITE_HOST}}` 替换为不带协议的域名。
2. 把 `sitemap.xml.template` 发布为 `/sitemap.xml`，把 `rss.xml.template` 发布为 `/rss.xml`。
3. 把 `robots.txt.template` 替换变量后发布为 `/robots.txt`。
4. 在 Bing Webmaster Tools 添加并验证网站。验证码必须使用平台真实提供的值，不能使用示例值。
5. 在 IndexNow 生成密钥，将密钥文本文件放在站点根目录，再替换 `indexnow-payload.template.json` 中的变量。
6. 只在文章新增、实质更新或删除时提交 URL，不要为没有变化的页面反复提交。
7. 为每页加入正式 canonical；canonical、站内链接、Sitemap 和 IndexNow URL 必须使用同一域名及 HTTPS 形式。
8. 上线后检查 HTTP 状态、移动端渲染、结构化数据、服务器日志中的 Bingbot 抓取和 Bing Webmaster Tools 报告。

不要购买或伪造“秒收录”服务。IndexNow 用于通知页面变化，不保证排名或收录。
