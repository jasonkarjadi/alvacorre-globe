// import { Box } from "@chakra-ui/react";
import {
  AdditiveBlending,
  BackSide,
  Group,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
  fragmentShader,
  vertexShader,
} from "./shaders";

const Globe: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }

    const sphereGeometry = new SphereGeometry(7, 50, 50);
    const sphere = new Mesh(
      sphereGeometry,
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: new TextureLoader().load("/globe.jpg"),
          },
        },
      })
    );
    sphere.rotation.y = -Math.PI / 2;

    const atmosphere = new Mesh(
      sphereGeometry,
      new ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: AdditiveBlending,
        side: BackSide,
      })
    );
    atmosphere.scale.set(1.1, 1.1, 1.1);

    const sizes = {
      width: 750,
      height: 750,
    };

    const camera = new PerspectiveCamera(75, 1, 1, 1000);
    camera.position.set(0, 0, 15);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;
    controls.enablePan = false;
    controls.enableZoom = false;

    const renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const group = new Group();
    group.add(sphere);

    const scene = new Scene();
    scene.add(group, atmosphere);

    const tick = () => {
      controls.update();

      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };
    tick();
  };

  return <canvas ref={onCanvasLoaded} />;
};

export default Globe;
