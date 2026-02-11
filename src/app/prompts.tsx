'use client'

import { useState, useMemo } from 'react'
import { Prompt } from '../types/prompt'
import { motion } from 'framer-motion'

interface PromptsProps {
  prompts: Prompt[]
}

export default function Prompts({ prompts }: PromptsProps) {
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>(prompts)
  const categories = useMemo(() => {
    return ['Alle', ...new Set(prompts.map((prompt) => prompt.category))]
  }, [prompts])
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle')
  const [copyMessage, setCopyMessage] = useState<string | null>(null)

  const filterByCategory = (category: string) => {
    setSelectedCategory(category)
    setFilteredPrompts(
      category === 'Alle'
        ? prompts
        : prompts.filter((p) => p.category === category)
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopyMessage('Prompt erfolgreich kopiert! ✅')

    setTimeout(() => setCopyMessage(null), 2000)
  }

  return (
    <div className="relative mx-auto p-6 max-w-4xl">
      <h1 className="mb-6 font-bold text-3xl text-center">Prompt Manager</h1>

      <p className="mx-auto mb-6 max-2xl text-gray-600 text-center">
        Der Prompt Manager bietet eine kuratierte Sammlung von{' '}
        <b>ChatGPT-Prompts</b>, die in Kategorien unterteilt sind, sowie
        optimierte Prompts für verschiedene Anwendungsfälle. Nutzer können
        Prompts durchsuchen, direkt mit einem spezialisierten GPT testen oder
        den Prompt für eigene Zwecke in die Zwischenablage kopieren. Ideal für
        effiziente AI-Workflows und kreative Inspiration!
      </p>

      {/* Categories */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-green-800 text-white'
                : 'bg-gray-200 dark:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Prompt Cards */}
      <div className="gap-4 grid md:grid-cols-2">
        {filteredPrompts.map((prompt, index) => {
          const isLinkValid = prompt.gpt_link.trim().length > 0

          return (
            <div key={index} className="shadow p-4 border rounded-lg">
              <h2 className="font-bold text-lg">{prompt.title}</h2>
              <p className="text-gray-700 dark:text-gray-400">
                {prompt.description}
              </p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => copyToClipboard(prompt.prompt)}
                  className="bg-white dark:bg-green-800 px-4 py-1 border-1 border-green-800 rounded cursor-pointer"
                >
                  Kopieren
                </button>

                {isLinkValid && (
                  <a
                    href={isLinkValid ? prompt.gpt_link : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded ${
                      isLinkValid
                        ? 'bg-green-800 text-white cursor-pointer'
                        : 'bg-green-100 dark:text-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={(e) => !isLinkValid && e.preventDefault()}
                  >
                    Testen
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Snackbar / Toast Notification */}
      {copyMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bottom-5 left-1/2 fixed bg-green-500 shadow-lg px-4 py-2 rounded-lg text-white -translate-x-1/2 transform"
        >
          {copyMessage}
        </motion.div>
      )}
    </div>
  )
}
