import { Inject, Service } from 'autoinjection'
import * as cheerio from 'cheerio'
import { type ArticleContentService } from '~/domain/service/article-content'
import { type Article } from '~/domain/model/article/entity'
import { type ArticleRepository } from '~/domain/model/article/repository'

@Service({ singleton: true })
export class WebScrapingArticleContentService implements ArticleContentService {
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject() private readonly articleRepository?: ArticleRepository) {}

  async laodContent(article: Article): Promise<void> {
    try {
      const response = await fetch(article.uri)
      const html = await response.text()
      const $ = cheerio.load(html)

      const title = $('meta[property="og:title"]').attr('content') ?? $('title').text()
      const imageUri = $('meta[property="og:image"]').attr('content') ?? $('img').attr('src')
      const description = $('meta[property="og:description"]').attr('content') ?? $('meta[name="description"]').attr('content') ?? $('p').text().substring(0, 300)

      article.loadContent(title, description, imageUri)
    } catch (error) {
      // eslint-disable-next-line no-param-reassign
      article.contentStatus = 'FAILED'
    } finally {
      this.articleRepository!.save(article)
    }
  }
}
