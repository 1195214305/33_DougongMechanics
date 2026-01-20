import { useState } from 'react'
import { useStore } from '../store/useStore'

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { apiKey, setApiKey, animationSpeed, setAnimationSpeed } = useStore()
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  const [showKey, setShowKey] = useState(false)

  const handleSave = () => {
    setApiKey(tempApiKey)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-chinese-black border-2 border-chinese-gold/50 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-chinese-gold">设置</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* API Key 设置 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              千问 API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-chinese-black/50 border border-chinese-gold/30 rounded-lg px-4 py-3 pr-12 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-chinese-gold"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showKey ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              用于AI助手功能。获取API Key：
              <a
                href="https://dashscope.console.aliyun.com/apiKey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-chinese-gold hover:underline ml-1"
              >
                阿里云千问控制台
              </a>
            </p>
          </div>

          {/* 动画速度 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              动画速度: {animationSpeed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-full accent-chinese-red"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>静止</span>
              <span>慢速</span>
              <span>正常</span>
              <span>快速</span>
            </div>
          </div>

          {/* 关于项目 */}
          <div className="pt-4 border-t border-chinese-gold/30">
            <h3 className="text-sm font-medium text-gray-300 mb-2">关于项目</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              本项目通过3D可视化技术，展示中国古代建筑斗拱结构的力学原理。
              结合边缘计算和AI技术，为用户提供沉浸式的学习体验。
            </p>
            <div className="mt-3 flex items-center space-x-2 text-xs text-gray-400">
              <span>技术栈：</span>
              <span className="px-2 py-1 bg-chinese-red/20 rounded">React</span>
              <span className="px-2 py-1 bg-chinese-red/20 rounded">Three.js</span>
              <span className="px-2 py-1 bg-chinese-red/20 rounded">ESA Pages</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-chinese-red hover:bg-chinese-red/80 rounded-lg transition-colors font-medium"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}
