# 新年特惠旺

轻量中文静态博客，无构建依赖。

## 本地预览

在本目录运行：

```powershell
python -m http.server 4173
```

浏览器打开 `http://localhost:4173/`。也可直接打开 `index.html`，但剪贴板等浏览器能力在本地 HTTP 环境下更容易正常工作。

## 已实现

- 首页、文章列表、三篇示范文章、关于、编辑政策、隐私、HTML 网站地图和 404。
- 响应式导航、Escape 关闭、搜索、栏目筛选、加载更多、目录定位、复制反馈和返回顶部。
- 教程型、排障型和待实测测评模板；旺仔评分“待测”状态。
- WebSite 与 Article 结构化数据，不含评分、报价和虚假评论数据。
- Bing 友好的静态专题入口、CollectionPage / FAQ / Breadcrumb 数据，以及 XML Sitemap、RSS、robots 和 IndexNow 上线模板。

## 上线前必须补充

1. 正式域名：添加每页 canonical 和 `og:url`；把 `sitemap.xml.template` 的 `{{SITE_URL}}` 替换后另存为 `sitemap.xml`；在 `robots.txt` 添加正确绝对地址。
2. 创建真实存在的 Open Graph 图片后添加 `og:image`。
3. 如需 Telegram、订阅、联系方式或推广入口，提供真实地址和后端；不要使用占位链接。
4. 确定托管商后补充服务器日志与数据保存说明。
5. 发布具体测评前补齐原始记录、测试环境、套餐官方来源和推广关系。
6. 按 `BING-SEO-GO-LIVE.md` 完成 Bing Webmaster Tools 验证、IndexNow 密钥与正式抓取检查。
