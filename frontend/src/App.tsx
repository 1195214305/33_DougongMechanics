import { useState } from 'react'
import DougongViewer from './components/DougongViewer'
import InfoPanel from './components/InfoPanel'
import SettingsModal from './components/SettingsModal'

function App() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="min-h-screen traditional-pattern">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-chinese-black/80 backdrop-blur-md border-b border-chinese-red/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-chinese-red rounded-lg flex items-center justify-center">
                <span className="text-2xl text-chinese-gold">斗</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-chinese-gold">斗拱之美</h1>
                <p className="text-xs sm:text-sm text-gray-400">檐椽之韵 · 古代力学建筑阐释</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="px-4 py-2 bg-chinese-red/20 hover:bg-chinese-red/30 border border-chinese-red/50 rounded-lg transition-colors text-sm"
            >
              设置
            </button>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D展示区 */}
            <div className="lg:col-span-2">
              <DougongViewer />
            </div>

            {/* 信息面板 */}
            <div className="lg:col-span-1">
              <InfoPanel />
            </div>
          </div>
        </div>
      </main>

      {/* 设置弹窗 */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}

export default App
