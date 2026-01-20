import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface DougongStructure {
  id: string
  name: string
  description: string
  era: string
  mechanicalPrinciple: string
}

interface AppState {
  apiKey: string
  setApiKey: (key: string) => void
  selectedStructure: DougongStructure | null
  setSelectedStructure: (structure: DougongStructure | null) => void
  showForceVectors: boolean
  setShowForceVectors: (show: boolean) => void
  animationSpeed: number
  setAnimationSpeed: (speed: number) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (key) => set({ apiKey: key }),
      selectedStructure: null,
      setSelectedStructure: (structure) => set({ selectedStructure: structure }),
      showForceVectors: true,
      setShowForceVectors: (show) => set({ showForceVectors: show }),
      animationSpeed: 1,
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
    }),
    {
      name: 'dougong-storage',
    }
  )
)
