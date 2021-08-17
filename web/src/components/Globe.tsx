import { Box } from "@chakra-ui/react";
import {
  AdditiveBlending,
  BackSide,
  Group,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
  Vector2,
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

    const sphereGeometry = new SphereGeometry(5, 50, 50);
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

    const camera = new PerspectiveCamera(50, 1, 1, 100);
    camera.position.set(0, 0, 15);

    const controls = new OrbitControls(camera, canvas);
    Object.assign(controls, {
      enableDamping: true,
      rotateSpeed: 0.5,
      autoRotate: true,
      autoRotateSpeed: 0.2,
      enablePan: false,
      enableZoom: false,
    });

    const sizes = {
      width: 750,
      height: 750,
    };

    const renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const mouse = new Vector2();
    addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / sizes.width) * 2 - 1;
      mouse.y = -(e.clientY / sizes.height) * 2 + 1;
    });

    const raycaster = new Raycaster();
    // addEventListener("pointerdown", () => {
    //   raycaster.setFromCamera(mouse, camera);
    // });

    const group = new Group();
    group.add(sphere);

    const scene = new Scene();
    scene.add(group, atmosphere);

    const tick = () => {
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.intersectObject(sphere).length > 0) {
        controls.autoRotate = false;
      } else {
        controls.autoRotate = true;
      }

      controls.update();

      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };
    tick();
  };

  return (
    <Box
      as="canvas"
      ref={onCanvasLoaded as string & ((instance: HTMLCanvasElement) => void)}
      borderRadius="full"
    />
  );
};

export default Globe;

// Points
// const points = [];
// const createPoint = (lat, lng, name) => {
//   const point = new THREE.Mesh(
//     new THREE.SphereGeometry(0.1, 50, 50),
//     new THREE.MeshBasicMaterial({
//       color: "#FF0000",
//     })
//   );
//   // Latitude and Longitude
//   const latitude = (lat / 180) * Math.PI;
//   const longitude = (lng / 180) * Math.PI;
//   // X, Y, X Coordinates
//   const pointX = radius * Math.cos(latitude) * Math.sin(longitude);
//   const pointY = radius * Math.sin(latitude);
//   const pointZ = radius * Math.cos(latitude) * Math.cos(longitude);
//   point.position.set(pointX, pointY, pointZ);
//   point.name = name;
//   group.add(point);
//   points.push(point);
//   // console.log(point);
// };
// createPoint(-0.7893, 113.9213, "INA"); // Indonesia
// createPoint(36.2048, 138.2529, "JPN"); // Japan
// createPoint(55.3781, -3.436, "ENG"); // United Kingdom
