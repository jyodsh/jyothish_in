import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jyothish Sebastian
      </h1>
      <p className="mb-4">
        Welcome to my personal website! </p>
        <p>
        I'm Jyothish Sebastian, 
        a Principal Software Engineer at a leading health care technology company in the United States.</p>
        <p>
        With a passion for web application development, I take pride in crafting innovative web-based solutions. </p>
        <p>
        This space is dedicated to sharing my life philosophies and the practices that guide my daily life.
        Here, you'll find insights into my professional journey, personal reflections, 
        and the principles that drive my work and life.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
