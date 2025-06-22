

import { Batchpoints,testlinePrimitive } from "./BatchPoints"
  function buildSplatOCtree(buffer,vertexCount,modelMatrix,viewer){
    
    var f_buffer = new Float32Array(buffer)
    var points = []
    
    
    var pointsColl = new Cesium.PointPrimitiveCollection({
        modelMatrix:modelMatrix,
        blendOption: Cesium.BlendOption.OPAQUE,
        // depthTest: {
        //   enabled: false,
        // }
      })
    for (let i = 0; i < vertexCount; i++) {
        var temp =new Cesium.Cartesian3()
      temp.x =f_buffer[(8*i+0)]
      temp.y = f_buffer[(8*i+1)]
      temp.z = f_buffer[(8*i+2)]
      let positionMC = Cesium.Matrix4.multiplyByPoint(modelMatrix,temp,new Cesium.Cartesian3())
      //points[i]={id:i,x:positionMC.x,y:positionMC.y,z:positionMC.z}
      points[i]=positionMC
      var p = pointsColl.add({
        position :temp,
        pixelSize :3,
        color : Cesium.Color.RED,
        disableDepthTestDistance : Number.POSITIVE_INFINITY,
        // translucencyByDistance: undefined,         // ✅ 不要距离淡出
        // scaleByDistance: undefined
      });
        
        
        

    }
    // Batchpoints(points,viewer)
    //testlinePrimitive(viewer)
    
    var root = buildOctree(points)
    // console.log(root);
    viewer.zoomTo({
        destination: points[0]
    })
    return  root
  }
  function buildOctree(points, depth = 0, maxDepth = 10, maxPoints = 5) {
    if (points.length === 0) return null;
  
    // 计算 AABB
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (const p of points) {
      min[0] = Math.min(min[0], p.x);
      min[1] = Math.min(min[1], p.y);
      min[2] = Math.min(min[2], p.z);
      max[0] = Math.max(max[0], p.x);
      max[1] = Math.max(max[1], p.y);
      max[2] = Math.max(max[2], p.z);
    }
  
    const node = {
        aabb: { min: min, max: max },
        children: null,
        points: null
      };
  
    // 停止条件：深度限制或点数少
    if (depth >= maxDepth || points.length <= maxPoints) {
      node.points = points;
      return node;
    }
  
    // 计算中心点
    const center = [
      (min[0] + max[0]) / 2,
      (min[1] + max[1]) / 2,
      (min[2] + max[2]) / 2
    ];
  
    // 8个子空间
    const octants = Array.from({ length: 8 }, () => []);
  
    for (const p of points) {
      const index =
        (p.x > center[0] ? 1 : 0) +
        (p.y > center[1] ? 2 : 0) +
        (p.z > center[2] ? 4 : 0);
      octants[index].push(p);
    }
  
    node.children = octants.map(childPoints =>
      buildOctree(childPoints, depth + 1, maxDepth, maxPoints)
    );
  
    return node;
  }

  function intersectOctree(rayOrigin,rayDir,node,results = []){
    
    if ( !rayIntersectsAABB(rayOrigin, rayDir, node.aabb.min, node.aabb.max)) {
      return;
    }
  
    if (node.children) {
      for (const child of node.children) {
        intersectOctree(rayOrigin, rayDir, child, results);
      }
    } else {
      results.push(...node.points); // 或者执行更精细的点检测
    }
  
    return results;
  }
  function rayIntersectsAABB(rayOrigin, rayDir, boxMin, boxMax) {
    let tmin = -Infinity;
    let tmax = Infinity;

    for (let i = 0; i < 3; i++) {
      const invD = 1 / rayDir[i];
      let t1 = (boxMin[i] - rayOrigin[i]) * invD;
      let t2 = (boxMax[i] - rayOrigin[i]) * invD;

      if (invD < 0) [t1, t2] = [t2, t1];

      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);

      if (tmax < tmin) return false;
    }

    return true;
  }



  export  {buildSplatOCtree,intersectOctree}