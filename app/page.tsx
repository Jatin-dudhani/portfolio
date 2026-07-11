'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Certificates from '@/components/Certificates'
import Blog from '@/components/Blog'
import GitHubActivity from '@/components/GitHubActivity'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Particles from '@/components/Particles'
import AIChat from '@/components/AIChat'
import MatrixRain from '@/components/MatrixRain'
import { ThemeProvider } from '@/components/ThemeProvider'

export default function Home() {
  const [matrixActive, setMatrixActive] = useState(false)

  return (
    <ThemeProvider>
      <Particles />
      <MatrixRain active={matrixActive} />
      <main className="relative z-10 flex flex-col w-full">
        <Header />
        <Hero onMatrixToggle={() => setMatrixActive((v) => !v)} />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certificates />
        <Blog />
        <GitHubActivity />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <AIChat />
    </ThemeProvider>
  )
}
