import { useRef, useMemo, useEffect, useState, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Pakistan center coordinates
const PAKISTAN_CENTER = { lat: 30.3753, lng: 69.3451 }

// Convert lat/lng to 3D position on sphere
const latLngToVector3 = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  
  return new THREE.Vector3(x, y, z)
}

// Get camera position to look at a specific lat/lng
const getCameraPositionForLatLng = (lat, lng, distance) => {
  const pos = latLngToVector3(lat, lng, distance)
  return pos
}

// GeoJSON World Data URL
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'

// Country labels with coordinates
const COUNTRY_LABELS = [
  { name: 'Pakistan', lat: 30.3753, lng: 69.3451, highlight: true },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'China', lat: 35.8617, lng: 104.1954 },
  { name: 'Russia', lat: 61.524, lng: 105.3188 },
  { name: 'USA', lat: 37.0902, lng: -95.7129 },
  { name: 'Brazil', lat: -14.235, lng: -51.9253 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'UK', lat: 55.3781, lng: -3.436 },
  { name: 'Germany', lat: 51.1657, lng: 10.4515 },
  { name: 'France', lat: 46.2276, lng: 2.2137 },
  { name: 'Japan', lat: 36.2048, lng: 138.2529 },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375 },
  { name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792 },
  { name: 'Iran', lat: 32.4279, lng: 53.688 },
  { name: 'Turkey', lat: 38.9637, lng: 35.2433 },
  { name: 'Egypt', lat: 26.8206, lng: 30.8025 },
  { name: 'Indonesia', lat: -0.7893, lng: 113.9213 },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
  { name: 'Argentina', lat: -38.4161, lng: -63.6167 },
  { name: 'UAE', lat: 23.4241, lng: 53.8478 },
  { name: 'Italy', lat: 41.8719, lng: 12.5674 },
  { name: 'Spain', lat: 40.4637, lng: -3.7492 },
]

// Starfield Background Component
const Starfield = ({ count = 2000 }) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const radius = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      const colorMix = Math.random()
      colors[i * 3] = 0.8 + colorMix * 0.2
      colors[i * 3 + 1] = 0.9 + colorMix * 0.1
      colors[i * 3 + 2] = 1
    }
    
    return { positions, colors }
  }, [count])
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={points.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Atmosphere Glow Shader
const AtmosphereGlow = ({ radius }) => {
  const atmosphereRef = useRef()
  
  const atmosphereShader = useMemo(() => ({
    uniforms: {
      glowColor: { value: new THREE.Color('#00F5FF') },
      viewVector: { value: new THREE.Vector3(0, 0, 1) },
    },
    vertexShader: `
      uniform vec3 viewVector;
      varying float intensity;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vNormel = normalize(normalMatrix * viewVector);
        intensity = pow(0.7 - dot(vNormal, vNormel), 2.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying float intensity;
      void main() {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4(glow, intensity * 0.6);
      }
    `,
  }), [])
  
  useFrame(({ camera }) => {
    if (atmosphereRef.current) {
      atmosphereRef.current.material.uniforms.viewVector.value = camera.position
    }
  })
  
  return (
    <mesh ref={atmosphereRef} scale={1.12}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        attach="material"
        args={[atmosphereShader]}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

// Country outlines from GeoJSON
const CountryOutlines = ({ radius, geoData, highlightCountry = 'Pakistan' }) => {
  const projectCoordinates = useCallback((coordinates, rad) => {
    return coordinates.map(([lng, lat]) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      
      const x = -(rad * Math.sin(phi) * Math.cos(theta))
      const z = rad * Math.sin(phi) * Math.sin(theta)
      const y = rad * Math.cos(phi)
      
      return new THREE.Vector3(x, y, z)
    })
  }, [])
  
  const { countryLines, pakistanLines } = useMemo(() => {
    if (!geoData) return { countryLines: [], pakistanLines: [] }
    
    const allLines = []
    const pakLines = []
    
    geoData.features.forEach(feature => {
      const countryName = feature.properties.ADMIN || feature.properties.name
      const isPakistan = countryName === highlightCountry
      const targetArray = isPakistan ? pakLines : allLines
      
      const processCoordinates = (coords) => {
        coords.forEach(ring => {
          const points = projectCoordinates(ring, radius * 1.001)
          for (let i = 0; i < points.length - 1; i++) {
            targetArray.push(points[i].x, points[i].y, points[i].z)
            targetArray.push(points[i + 1].x, points[i + 1].y, points[i + 1].z)
          }
        })
      }
      
      if (feature.geometry.type === 'Polygon') {
        processCoordinates(feature.geometry.coordinates)
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach(polygon => {
          processCoordinates(polygon)
        })
      }
    })
    
    return {
      countryLines: new Float32Array(allLines),
      pakistanLines: new Float32Array(pakLines)
    }
  }, [geoData, radius, highlightCountry, projectCoordinates])
  
  if (!geoData) return null
  
  return (
    <group>
      {countryLines.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={countryLines.length / 3}
              array={countryLines}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#666666" transparent opacity={0.7} />
        </lineSegments>
      )}
      
      {pakistanLines.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pakistanLines.length / 3}
              array={pakistanLines}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#39FF14" transparent opacity={1} />
        </lineSegments>
      )}
    </group>
  )
}

// Pakistan Fill Polygon
const PakistanFill = ({ radius }) => {
  const meshRef = useRef()
  
  const pakistanCoords = useMemo(() => [
    [61.0, 25.0], [63.0, 25.5], [64.5, 25.0], [66.0, 24.5], [68.0, 24.0],
    [70.0, 24.0], [71.0, 24.5], [71.5, 25.0], [72.0, 26.0], [73.0, 27.0],
    [74.0, 28.0], [74.5, 29.5], [74.0, 30.5], [73.5, 31.5], [73.0, 33.0],
    [72.0, 34.5], [71.0, 35.5], [71.5, 36.0], [72.5, 36.5], [74.0, 37.0],
    [75.5, 36.5], [76.0, 35.5], [77.0, 35.0], [77.0, 34.0], [76.0, 33.0],
    [75.0, 32.0], [74.5, 31.0], [74.0, 30.0], [73.0, 29.0], [72.0, 28.0],
    [71.0, 27.5], [70.0, 26.5], [68.0, 26.0], [66.0, 25.5], [64.0, 26.0],
    [62.0, 25.5], [61.0, 25.0]
  ], [])
  
  const geometry = useMemo(() => {
    const vertices = []
    const center = latLngToVector3(PAKISTAN_CENTER.lat, PAKISTAN_CENTER.lng, radius * 1.002)
    
    pakistanCoords.forEach(([lng, lat], i) => {
      const point = latLngToVector3(lat, lng, radius * 1.002)
      const nextPoint = latLngToVector3(
        pakistanCoords[(i + 1) % pakistanCoords.length][1],
        pakistanCoords[(i + 1) % pakistanCoords.length][0],
        radius * 1.002
      )
      
      vertices.push(center.x, center.y, center.z)
      vertices.push(point.x, point.y, point.z)
      vertices.push(nextPoint.x, nextPoint.y, nextPoint.z)
    })
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geo.computeVertexNormals()
    
    return geo
  }, [pakistanCoords, radius])
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 0.25 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.material.opacity = pulse
    }
  })
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color="#39FF14"
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// Pulsing Ring Animation
const PulsingRing = ({ radius }) => {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  
  const position = useMemo(() => 
    latLngToVector3(PAKISTAN_CENTER.lat, PAKISTAN_CENTER.lng, radius * 1.003),
    [radius]
  )
  
  const rotation = useMemo(() => {
    const lookAt = new THREE.Vector3(0, 0, 0)
    const up = new THREE.Vector3(0, 1, 0)
    const matrix = new THREE.Matrix4()
    matrix.lookAt(position, lookAt, up)
    const euler = new THREE.Euler()
    euler.setFromRotationMatrix(matrix)
    return euler
  }, [position])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (ring1Ref.current) {
      const scale1 = 1 + (time % 2) * 0.5
      ring1Ref.current.scale.setScalar(scale1)
      ring1Ref.current.material.opacity = Math.max(0, 0.8 - (time % 2) * 0.4)
    }
    
    if (ring2Ref.current) {
      const scale2 = 1 + ((time + 0.7) % 2) * 0.5
      ring2Ref.current.scale.setScalar(scale2)
      ring2Ref.current.material.opacity = Math.max(0, 0.6 - ((time + 0.7) % 2) * 0.3)
    }
    
    if (ring3Ref.current) {
      const scale3 = 1 + ((time + 1.4) % 2) * 0.5
      ring3Ref.current.scale.setScalar(scale3)
      ring3Ref.current.material.opacity = Math.max(0, 0.4 - ((time + 1.4) % 2) * 0.2)
    }
  })
  
  return (
    <group position={position} rotation={rotation}>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#39FF14" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#39FF14" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#39FF14" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Glowing Pin Marker
const GlowingPin = ({ radius }) => {
  const pinRef = useRef()
  const glowRef = useRef()
  
  const position = useMemo(() => 
    latLngToVector3(PAKISTAN_CENTER.lat, PAKISTAN_CENTER.lng, radius * 1.05),
    [radius]
  )
  
  const basePosition = useMemo(() => 
    latLngToVector3(PAKISTAN_CENTER.lat, PAKISTAN_CENTER.lng, radius * 1.003),
    [radius]
  )
  
  useFrame((state) => {
    if (pinRef.current) {
      const hover = Math.sin(state.clock.elapsedTime * 2) * 0.02
      pinRef.current.position.copy(position).multiplyScalar(1 + hover)
    }
    
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      glowRef.current.scale.setScalar(pulse)
    }
  })
  
  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              basePosition.x, basePosition.y, basePosition.z,
              position.x, position.y, position.z
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#39FF14" transparent opacity={0.6} />
      </line>
      
      <mesh ref={pinRef} position={position}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#39FF14" />
      </mesh>
      
      <mesh position={position}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#39FF14" transparent opacity={0.3} />
      </mesh>
      
      <pointLight position={position} color="#39FF14" intensity={2} distance={0.5} />
    </group>
  )
}

// Country Labels
const CountryLabels = ({ radius }) => {
  return (
    <group>
      {COUNTRY_LABELS.map((country) => {
        const position = latLngToVector3(country.lat, country.lng, radius * 1.06)
        
        return (
          <Html
            key={country.name}
            position={[position.x, position.y, position.z]}
            center
            distanceFactor={8}
            occlude={false}
            style={{
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
            }}
          >
            <div 
              className={`px-2 py-0.5 rounded whitespace-nowrap ${
                country.highlight 
                  ? 'bg-green-500/30 text-green-400 font-bold border border-green-500/50 text-xs' 
                  : 'bg-black/60 text-gray-400 border border-gray-700/30 text-[10px]'
              }`}
              style={{
                backdropFilter: 'blur(4px)',
              }}
            >
              {country.name}
            </div>
          </Html>
        )
      })}
    </group>
  )
}

// Pakistan Label Component
const PakistanLabel = ({ radius }) => {
  const position = useMemo(() => 
    latLngToVector3(PAKISTAN_CENTER.lat, PAKISTAN_CENTER.lng, radius * 1.04),
    [radius]
  )
  
  return (
    <Html
      position={[position.x, position.y, position.z]}
      center
      distanceFactor={6}
      occlude={false}
      style={{ pointerEvents: 'none' }}
    >
      <div className="text-green-400 font-bold text-xs tracking-wider" style={{ textShadow: '0 0 8px #39FF14, 0 0 15px #39FF14', fontSize: '10px' }}>
        PAKISTAN
      </div>
    </Html>
  )
}

// Main Globe Component
const Globe = ({ geoData }) => {
  const radius = 2
  const globeRef = useRef()
  
  // Create realistic Earth texture procedurally
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const ctx = canvas.getContext('2d')
    
    // Ocean - deep blue gradient
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    oceanGradient.addColorStop(0, '#0a2463')
    oceanGradient.addColorStop(0.3, '#1e3a5f')
    oceanGradient.addColorStop(0.5, '#0d47a1')
    oceanGradient.addColorStop(0.7, '#1565c0')
    oceanGradient.addColorStop(1, '#0a2463')
    ctx.fillStyle = oceanGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add ocean texture/noise
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.fillStyle = `rgba(30, 80, 150, ${Math.random() * 0.1})`
      ctx.fillRect(x, y, 2, 2)
    }
    
    // Landmass definitions with colors (approximate equirectangular positions)
    const landmasses = [
      // North America
      { x: 100, y: 150, w: 350, h: 250, color: '#2d5a27', secondColor: '#4a7c40' },
      // South America
      { x: 250, y: 400, w: 150, h: 280, color: '#1b5e20', secondColor: '#388e3c' },
      // Europe
      { x: 950, y: 120, w: 200, h: 150, color: '#558b2f', secondColor: '#7cb342' },
      // Africa
      { x: 980, y: 280, w: 200, h: 320, color: '#c4a35a', secondColor: '#d4b96a' },
      // Asia (excluding Pakistan area for highlight)
      { x: 1100, y: 100, w: 450, h: 350, color: '#6d8c54', secondColor: '#8bc34a' },
      // Australia
      { x: 1480, y: 450, w: 180, h: 130, color: '#c17b3e', secondColor: '#d4a574' },
      // Greenland
      { x: 550, y: 50, w: 120, h: 100, color: '#e8e8e8', secondColor: '#ffffff' },
      // Antarctica
      { x: 0, y: 920, w: 2048, h: 104, color: '#e0e0e0', secondColor: '#ffffff' },
      // Russia/Siberia
      { x: 1200, y: 60, w: 500, h: 120, color: '#4a6741', secondColor: '#5d8a54' },
      // Middle East
      { x: 1080, y: 250, w: 150, h: 100, color: '#c9b896', secondColor: '#d4c4a8' },
      // India
      { x: 1280, y: 280, w: 100, h: 120, color: '#7cb342', secondColor: '#8bc34a' },
      // Southeast Asia
      { x: 1400, y: 320, w: 150, h: 150, color: '#2e7d32', secondColor: '#43a047' },
      // Japan
      { x: 1560, y: 200, w: 50, h: 80, color: '#558b2f', secondColor: '#689f38' },
      // UK/Ireland
      { x: 920, y: 140, w: 40, h: 50, color: '#4caf50', secondColor: '#66bb6a' },
      // Scandinavia
      { x: 1000, y: 80, w: 80, h: 100, color: '#388e3c', secondColor: '#4caf50' },
      // Central America
      { x: 180, y: 320, w: 80, h: 60, color: '#2e7d32', secondColor: '#43a047' },
      // Caribbean
      { x: 260, y: 310, w: 60, h: 30, color: '#1b5e20', secondColor: '#2e7d32' },
      // Madagascar
      { x: 1140, y: 500, w: 30, h: 60, color: '#558b2f', secondColor: '#689f38' },
      // New Zealand
      { x: 1650, y: 550, w: 30, h: 50, color: '#2e7d32', secondColor: '#43a047' },
      // Indonesia islands
      { x: 1420, y: 400, w: 150, h: 40, color: '#1b5e20', secondColor: '#2e7d32' },
      // Philippines
      { x: 1500, y: 320, w: 40, h: 60, color: '#2e7d32', secondColor: '#43a047' },
    ]
    
    // Draw landmasses with gradient and texture
    landmasses.forEach(land => {
      // Main fill with gradient
      const landGradient = ctx.createRadialGradient(
        land.x + land.w/2, land.y + land.h/2, 0,
        land.x + land.w/2, land.y + land.h/2, Math.max(land.w, land.h)
      )
      landGradient.addColorStop(0, land.secondColor)
      landGradient.addColorStop(1, land.color)
      
      ctx.fillStyle = landGradient
      ctx.beginPath()
      
      // Draw organic shape
      const points = []
      const numPoints = 20
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2
        const rx = land.w / 2 * (0.8 + Math.random() * 0.4)
        const ry = land.h / 2 * (0.8 + Math.random() * 0.4)
        points.push({
          x: land.x + land.w/2 + Math.cos(angle) * rx,
          y: land.y + land.h/2 + Math.sin(angle) * ry
        })
      }
      
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[(i + 1) % points.length].x) / 2
        const yc = (points[i].y + points[(i + 1) % points.length].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.closePath()
      ctx.fill()
      
      // Add texture noise to land
      for (let j = 0; j < land.w * land.h / 50; j++) {
        const px = land.x + Math.random() * land.w
        const py = land.y + Math.random() * land.h
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`
        ctx.fillRect(px, py, 2, 2)
      }
    })
    
    // Add some cloud-like white patches
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const r = 20 + Math.random() * 60
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])
  
  return (
    <group>
      {/* Earth sphere with realistic texture */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial 
          map={earthTexture}
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Subtle grid lines */}
      <mesh>
        <sphereGeometry args={[radius * 1.001, 36, 18]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
      </mesh>
      
      {/* Country outlines */}
      <CountryOutlines radius={radius} geoData={geoData} highlightCountry="Pakistan" />
      
      {/* Pakistan fill */}
      <PakistanFill radius={radius} />
      
      {/* Pakistan label */}
      <PakistanLabel radius={radius} />
      
      {/* Atmosphere glow */}
      <AtmosphereGlow radius={radius} />
      
      {/* Pakistan markers */}
      <PulsingRing radius={radius} />
      <GlowingPin radius={radius} />
    </group>
  )
}

// Scene with camera controls
const GlobeScene = ({ geoData }) => {
  const controlsRef = useRef()
  const groupRef = useRef()
  const [isInteracting, setIsInteracting] = useState(false)
  const [initialAnimationDone, setInitialAnimationDone] = useState(false)
  const interactionTimeoutRef = useRef(null)
  
  const { camera } = useThree()
  
  // Initial camera animation to Pakistan
  useEffect(() => {
    camera.position.set(0, 0, 8)
    
    const targetPosition = getCameraPositionForLatLng(PAKISTAN_CENTER.lat, PAKISTAN_CENTER.lng - 30, 5)
    
    const animateCamera = () => {
      const duration = 2000
      const startTime = Date.now()
      const startPos = camera.position.clone()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        
        camera.position.lerpVectors(startPos, targetPosition, eased)
        camera.lookAt(0, 0, 0)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setInitialAnimationDone(true)
        }
      }
      
      animate()
    }
    
    setTimeout(animateCamera, 500)
  }, [camera])
  
  // Auto-rotation
  useFrame((state, delta) => {
    if (groupRef.current && !isInteracting && initialAnimationDone) {
      groupRef.current.rotation.y += delta * 0.08
    }
  })
  
  const handleInteractionStart = () => {
    setIsInteracting(true)
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
  }
  
  const handleInteractionEnd = () => {
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false)
    }, 5000)
  }
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={0.6} color="#ffffff" />
      <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#00F5FF" />
      
      <Starfield count={1500} />
      
      <group ref={groupRef}>
        <Globe geoData={geoData} />
      </group>
      
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minDistance={3.5}
        maxDistance={10}
        rotateSpeed={0.4}
        zoomSpeed={0.5}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />
    </>
  )
}

// Loading component
const GlobeLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Loading Globe...</p>
    </div>
  </div>
)

// Main Globe3D Component
const Globe3D = () => {
  const [geoData, setGeoData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch(GEOJSON_URL)
        if (!response.ok) throw new Error('Failed to fetch GeoJSON')
        const data = await response.json()
        setGeoData(data)
      } catch (err) {
        console.error('Error loading GeoJSON:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchGeoData()
  }, [])
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative py-20 overflow-hidden"
      id="globe"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Based in </span>
            <span className="text-green-400">Pakistan</span>
            <span className="text-white">, Working </span>
            <span className="gradient-text">Globally</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Delivering exceptional digital experiences across continents and time zones
          </p>
        </motion.div>
        
        {/* Globe Canvas */}
        <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px]">
          {loading ? (
            <GlobeLoader />
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-red-400">Error loading globe: {error}</p>
            </div>
          ) : (
            <Canvas
              camera={{ position: [0, 0, 8], fov: 45 }}
              style={{ background: 'transparent' }}
              dpr={[1, 2]}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
              }}
            >
              <Suspense fallback={null}>
                <GlobeScene geoData={geoData} />
              </Suspense>
            </Canvas>
          )}
          
          {/* Interaction hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-sm flex items-center gap-2 pointer-events-none"
          >
            <span className="w-6 h-6 border border-gray-600 rounded flex items-center justify-center text-xs">
              ↔
            </span>
            <span>Drag to rotate • Scroll to zoom</span>
          </motion.div>
        </div>
        
        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mt-6"
        >
          <div className="glass px-6 py-4 rounded-2xl flex items-center gap-4">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </div>
            <div>
              <p className="text-white font-medium">Available for Remote Work</p>
              <p className="text-gray-400 text-sm">Pakistan Standard Time (PKT, UTC+5)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Globe3D
