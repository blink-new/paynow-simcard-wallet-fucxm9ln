import React, { ReactNode } from 'react'

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}