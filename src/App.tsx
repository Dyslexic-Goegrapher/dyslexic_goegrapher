import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

type BlogPost = {
  slug: string
  title: string
  summary: string
  content: string
}

const blogPostFiles = import.meta.glob('./blogposts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function getSlugFromPath(path: string) {
  return path.split('/').pop()?.replace('.md', '') ?? 'post'
}

function getTitle(content: string, slug: string) {
  const titleMatch = content.match(/^#\s+(.*)$/m)
  return titleMatch?.[1]?.trim() || slug
}

function getSummary(content: string) {
  return content
    .replace(/^#\s+.*$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140) || 'No summary yet.'
}

const blogPosts: BlogPost[] = Object.entries(blogPostFiles)
  .map(([path, content]) => {
    const slug = getSlugFromPath(path)

    return {
      slug,
      title: getTitle(content, slug),
      summary: getSummary(content),
      content,
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug))

function App() {
  const [selectedSlug, setSelectedSlug] = useState(blogPosts[0]?.slug ?? '')

  const selectedPost =
    blogPosts.find((post) => post.slug === selectedSlug) ?? null

  return (
    <main>
      <header>
        <p>Hi, I am Dyssi.</p>
        <h1>What is this?</h1>
        <p>
          This site is a place to:
        </p>
        <ol>
          <li>Show what I build</li>
          <li>Publish blog posts</li>
          <li>Experiment with new ideas</li>
        </ol>
      </header>
      <section>
        <h2>Blog posts</h2>

        {blogPosts.length === 0 ? (
          <p>No blog posts found in `src/blogposts` yet.</p>
        ) : (
          <div >
            <div>
              <ul >
                {blogPosts.map((post) => (
                  <li key={post.slug}>
                    <button onClick={() => setSelectedSlug(post.slug)}>
                      <strong>{post.title}</strong>
                      <p >{post.summary}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <article>
              {selectedPost ? (
                <div >
                  <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                </div>
              ) : (
                <p>Select a post.</p>
              )}
            </article>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
