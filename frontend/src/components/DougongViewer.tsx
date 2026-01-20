import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store/useStore'

// 斗拱3D模型组件
function DougongModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { showForceVectors, animationSpeed } = useStore()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001 * animationSpeed
    }
  })

  return (
    <group ref={groupRef}>
      {/* 底座 - 柱头 */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.8, 0.9, 1, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* 第一层 - 坐斗 */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[1.6, 0.4, 1.6]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </mesh>

      {/* 第二层 - 华栱 */}
      <group position={[0, -0.9, 0]}>
        <mesh position={[0, 0, 0.8]}>
          <boxGeometry args={[1.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#CD853F" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, -0.8]}>
          <boxGeometry args={[1.4, 0.3, 0.3]} />
          <meshStandardMaterial color="#CD853F" roughness={0.7} />
        </mesh>
        <mesh position={[0.8, 0, 0]}>
          <boxGeometry args={[0.3, 0.3, 1.4]} />
          <meshStandardMaterial color="#CD853F" roughness={0.7} />
        </mesh>
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[0.3, 0.3, 1.4]} />
          <meshStandardMaterial color="#CD853F" roughness={0.7} />
        </mesh>
      </group>

      {/* 第三层 - 昂 */}
      <group position={[0, -0.5, 0]}>
        <mesh position={[0, 0, 1.2]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.2, 0.25, 0.8]} />
          <meshStandardMaterial color="#DEB887" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, -1.2]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[1.2, 0.25, 0.8]} />
          <meshStandardMaterial color="#DEB887" roughness={0.7} />
        </mesh>
      </group>

      {/* 第四层 - 令栱 */}
      <group position={[0, -0.1, 0]}>
        <mesh position={[0, 0, 1.6]}>
          <boxGeometry args={[1.0, 0.2, 0.3]} />
          <meshStandardMaterial color="#F4A460" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, -1.6]}>
          <boxGeometry args={[1.0, 0.2, 0.3]} />
          <meshStandardMaterial color="#F4A460" roughness={0.7} />
        </mesh>
      </group>

      {/* 顶层 - 檐椽 */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.5, 0.15, 2.5]} />
        <meshStandardMaterial color="#C8102E" roughness={0.6} />
      </mesh>

      {/* 力学向量箭头 */}
      {showForceVectors && (
        <>
          {/* 向下的重力 */}
          <arrowHelper args={[new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0.5, 0), 1.5, 0xff0000, 0.3, 0.2]} />

          {/* 向外的支撑力 */}
          <arrowHelper args={[new THREE.Vector3(1, 0.5, 0).normalize(), new THREE.Vector3(0, -1, 0), 1.2, 0x00ff00, 0.3, 0.2]} />
          <arrowHelper args={[new THREE.Vector3(-1, 0.5, 0).normalize(), new THREE.Vector3(0, -1, 0), 1.2, 0x00ff00, 0.3, 0.2]} />
          <arrowHelper args={[new THREE.Vector3(0, 0.5, 1).normalize(), new THREE.Vector3(0, -1, 0), 1.2, 0x00ff00, 0.3, 0.2]} />
          <arrowHelper args={[new THREE.Vector3(0, 0.5, -1).normalize(), new THREE.Vector3(0, -1, 0), 1.2, 0x00ff00, 0.3, 0.2]} />
        </>
      )}
    </group>
  )
}

export default function DougongViewer() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[500px] lg:h-[700px] bg-gradient-to-br from-chinese-black to-gray-900 rounded-2xl overflow-hidden border-2 border-chinese-gold/30 shadow-2xl">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-chinese-black/90 z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-chinese-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-chinese-gold">加载3D模型中...</p>
          </div>
        </div>
      )}

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
        />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <DougongModel />

        <Environment preset="sunset" />

        {/* 地面网格 */}
        <gridHelper args={[20, 20, 0x444444, 0x222222]} position={[0, -3, 0]} />
      </Canvas>

      {/* 控制提示 */}
      <div className="absolute bottom-4 left-4 bg-chinese-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-chinese-gold/30">
        <p className="text-xs text-gray-300">
          <span className="text-chinese-gold">鼠标左键</span>：旋转 |
          <span className="text-chinese-gold"> 滚轮</span>：缩放 |
          <span className="text-chinese-gold"> 右键</span>：平移
        </p>
      </div>
    </div>
  )
}
