import { useState } from 'react'

interface ForceResult {
  totalLoad: number
  distributedForce: number
  leverRatio: number
  stressPoints: Array<{ name: string; force: number; direction: string }>
}

export default function MechanicsCalculator() {
  const [roofLoad, setRoofLoad] = useState(1000) // 屋顶荷载 (kg)
  const [layers, setLayers] = useState(4) // 斗拱层数
  const [overhang, setOverhang] = useState(1.5) // 出檐深度 (m)
  const [result, setResult] = useState<ForceResult | null>(null)

  const calculateForces = () => {
    // 简化的力学计算模型
    const leverRatio = overhang / 0.5 // 杠杆比
    const distributedForce = roofLoad / (layers * 4) // 分散到每个支点的力
    const columnForce = roofLoad * (1 + leverRatio * 0.3) // 柱子承受的力

    const stressPoints = [
      { name: '柱头', force: columnForce, direction: '向下' },
      { name: '坐斗', force: roofLoad * 0.8, direction: '向下' },
      { name: '华栱', force: distributedForce * 4, direction: '向外' },
      { name: '昂', force: roofLoad * leverRatio * 0.2, direction: '向上' },
      { name: '令栱', force: distributedForce * 2, direction: '向外' }
    ]

    setResult({
      totalLoad: roofLoad,
      distributedForce,
      leverRatio,
      stressPoints
    })
  }

  return (
    <div className="bg-chinese-black/80 backdrop-blur-md rounded-xl border border-chinese-gold/30 p-6">
      <h3 className="text-xl font-bold text-chinese-gold mb-4">力学计算器</h3>

      <div className="space-y-4">
        {/* 屋顶荷载 */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            屋顶荷载: {roofLoad} kg
          </label>
          <input
            type="range"
            min="500"
            max="3000"
            step="100"
            value={roofLoad}
            onChange={(e) => setRoofLoad(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-chinese-red"
          />
        </div>

        {/* 斗拱层数 */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            斗拱层数: {layers} 层
          </label>
          <input
            type="range"
            min="2"
            max="6"
            step="1"
            value={layers}
            onChange={(e) => setLayers(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-chinese-red"
          />
        </div>

        {/* 出檐深度 */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            出檐深度: {overhang} m
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={overhang}
            onChange={(e) => setOverhang(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-chinese-red"
          />
        </div>

        {/* 计算按钮 */}
        <button
          onClick={calculateForces}
          className="w-full py-3 bg-chinese-red hover:bg-chinese-red/80 rounded-lg transition-colors font-medium"
        >
          计算力学分布
        </button>

        {/* 计算结果 */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-chinese-black/50 border border-chinese-gold/30 rounded-lg p-4">
              <h4 className="text-sm font-bold text-chinese-gold mb-3">计算结果</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">总荷载:</span>
                  <span className="text-white font-medium">{result.totalLoad} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">单点分散力:</span>
                  <span className="text-white font-medium">{result.distributedForce.toFixed(1)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">杠杆比:</span>
                  <span className="text-white font-medium">{result.leverRatio.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-chinese-black/50 border border-chinese-gold/30 rounded-lg p-4">
              <h4 className="text-sm font-bold text-chinese-gold mb-3">各部分受力</h4>

              <div className="space-y-2">
                {result.stressPoints.map((point, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{point.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{point.force.toFixed(1)} kg</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        point.direction === '向下' ? 'bg-red-500/20 text-red-400' :
                        point.direction === '向上' ? 'bg-green-500/20 text-green-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {point.direction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-chinese-black/50 border border-chinese-gold/30 rounded-lg p-4">
              <h4 className="text-sm font-bold text-chinese-gold mb-2">力学原理说明</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                斗拱通过杠杆原理和层层叠加，将屋顶的集中荷载分散到多个支点。
                出檐越深，杠杆比越大，需要更多层数来平衡力矩。
                每层斗拱都起到分散荷载的作用，形成稳定的力学体系。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
