import { useState } from 'react'
import { useStore } from '../store/useStore'
import MechanicsCalculator from './MechanicsCalculator'

const dougongStructures = [
  {
    id: 'tang',
    name: '唐代斗拱',
    era: '唐代（618-907年）',
    description: '唐代斗拱雄健有力，出檐深远，体现了盛唐气象。斗拱层数较少，但单层体量较大，承重能力强。',
    mechanicalPrinciple: '采用杠杆原理，通过层层叠加的斗和栱，将屋顶重量分散到柱子上。昂的使用增加了挑檐深度，形成优美的曲线。'
  },
  {
    id: 'song',
    name: '宋代斗拱',
    era: '宋代（960-1279年）',
    description: '宋代斗拱趋于精巧，层数增多，构件尺寸相对减小。注重结构的合理性和装饰性的统一。',
    mechanicalPrinciple: '通过增加斗拱层数，实现更大的出檐。每层斗拱都起到分散荷载的作用，形成稳定的力学体系。'
  },
  {
    id: 'ming',
    name: '明清斗拱',
    era: '明清（1368-1912年）',
    description: '明清斗拱装饰性增强，结构作用相对减弱。构件更加精细，彩绘装饰丰富。',
    mechanicalPrinciple: '虽然装饰性增强，但仍保持基本的力学功能。通过斗拱的组合，实现荷载的合理传递。'
  }
]

export default function InfoPanel() {
  const { selectedStructure, setSelectedStructure, showForceVectors, setShowForceVectors } = useStore()
  const [activeTab, setActiveTab] = useState<'structure' | 'mechanics' | 'calculator' | 'ai'>('structure')
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { apiKey } = useStore()

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return
    if (!apiKey) {
      setAiResponse('请先在设置中配置千问API Key')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/qwen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify({
          question: aiQuestion,
          context: selectedStructure ? `当前正在查看${selectedStructure.name}` : ''
        })
      })

      const data = await response.json()
      if (data.error) {
        setAiResponse(`错误: ${data.error}`)
      } else {
        setAiResponse(data.answer)
      }
    } catch (error) {
      setAiResponse('请求失败，请检查网络连接')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* 标签切换 */}
      <div className="bg-chinese-black/80 backdrop-blur-md rounded-xl border border-chinese-gold/30 p-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab('structure')}
            className={`py-2 px-3 rounded-lg transition-colors text-sm ${
              activeTab === 'structure'
                ? 'bg-chinese-red text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            结构类型
          </button>
          <button
            onClick={() => setActiveTab('mechanics')}
            className={`py-2 px-3 rounded-lg transition-colors text-sm ${
              activeTab === 'mechanics'
                ? 'bg-chinese-red text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            力学原理
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-2 px-3 rounded-lg transition-colors text-sm ${
              activeTab === 'calculator'
                ? 'bg-chinese-red text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            力学计算器
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-2 px-3 rounded-lg transition-colors text-sm ${
              activeTab === 'ai'
                ? 'bg-chinese-red text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            AI助手
          </button>
        </div>
      </div>

      {/* 结构类型选择 */}
      {activeTab === 'structure' && (
        <div className="space-y-3">
          {dougongStructures.map((structure) => (
            <div
              key={structure.id}
              onClick={() => setSelectedStructure(structure)}
              className={`bg-chinese-black/80 backdrop-blur-md rounded-xl border p-4 cursor-pointer transition-all ${
                selectedStructure?.id === structure.id
                  ? 'border-chinese-gold shadow-lg shadow-chinese-gold/20'
                  : 'border-chinese-gold/30 hover:border-chinese-gold/60'
              }`}
            >
              <h3 className="text-lg font-bold text-chinese-gold mb-2">{structure.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{structure.era}</p>
              <p className="text-sm text-gray-300">{structure.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 力学原理 */}
      {activeTab === 'mechanics' && (
        <div className="bg-chinese-black/80 backdrop-blur-md rounded-xl border border-chinese-gold/30 p-6">
          {selectedStructure ? (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-chinese-gold">{selectedStructure.name}的力学原理</h3>
              <p className="text-gray-300 leading-relaxed">{selectedStructure.mechanicalPrinciple}</p>

              <div className="pt-4 border-t border-chinese-gold/30">
                <h4 className="text-lg font-bold text-chinese-gold mb-3">关键力学特征</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-chinese-red mr-2">▸</span>
                    <span>杠杆原理：通过斗和栱的组合，形成多级杠杆系统</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chinese-red mr-2">▸</span>
                    <span>荷载分散：将集中荷载转化为分布荷载</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chinese-red mr-2">▸</span>
                    <span>抗震性能：榫卯结构提供柔性连接，增强抗震能力</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chinese-red mr-2">▸</span>
                    <span>出檐支撑：通过挑出结构，支撑深远的屋檐</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showForceVectors}
                    onChange={(e) => setShowForceVectors(e.target.checked)}
                    className="w-4 h-4 accent-chinese-red"
                  />
                  <span className="text-sm text-gray-300">显示力学向量</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <p>请先选择一个斗拱结构类型</p>
            </div>
          )}
        </div>
      )}

      {/* 力学计算器 */}
      {activeTab === 'calculator' && (
        <MechanicsCalculator />
      )}

      {/* AI助手 */}
      {activeTab === 'ai' && (
        <div className="bg-chinese-black/80 backdrop-blur-md rounded-xl border border-chinese-gold/30 p-6">
          <h3 className="text-xl font-bold text-chinese-gold mb-4">AI建筑顾问</h3>

          <div className="space-y-4">
            <div>
              <textarea
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="询问关于中国古代建筑力学的问题..."
                className="w-full h-24 bg-chinese-black/50 border border-chinese-gold/30 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-chinese-gold resize-none"
              />
            </div>

            <button
              onClick={handleAskAI}
              disabled={isLoading || !aiQuestion.trim()}
              className="w-full py-3 bg-chinese-red hover:bg-chinese-red/80 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
            >
              {isLoading ? '思考中...' : '询问AI'}
            </button>

            {aiResponse && (
              <div className="bg-chinese-black/50 border border-chinese-gold/30 rounded-lg p-4">
                <h4 className="text-sm font-bold text-chinese-gold mb-2">AI回答：</h4>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
