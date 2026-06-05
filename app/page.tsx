import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

export default function Home() {
  return (
    <ThemeProvider>
      <main className="flex flex-col w-full">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  )
}
