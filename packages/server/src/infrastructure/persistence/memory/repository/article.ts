import { Service } from 'autoinjection'
import { Article } from '~/domain/model/article/entity.js'
import type { ArticleRepository } from '~/domain/model/article/repository.js'

@Service({ singleton: true })
class MemoryArticleRepository implements ArticleRepository {
  #articles: Array<Article> = []

  async findById(accountId: number, articleId: number): Promise<Article> {
    const article = this.#articles.find((a) => a.id === articleId && a.accountId === accountId)

    if (!article) {
      throw new Error('Article not found')
    }

    return this.mapToEntity(article)
  }

  async save(article: Article): Promise<Article> {
    const { id } = article

    const index = this.#articles.findIndex((a) => a.id === id)
    if (index === -1) {
      this.#articles.push(article)
    } else {
      this.#articles[index] = article
    }

    return article
  }

  async delete(article: Article): Promise<void> {
    const { id } = article

    const index = this.#articles.findIndex((a) => a.id === id)
    if (index !== -1) {
      this.#articles.splice(index, 1)
    }
  }

  private mapToEntity(article: Article): Article {
    return Article.new(article)
  }
}

export default MemoryArticleRepository
