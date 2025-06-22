
<template>
  <div class='cesiumViewer' id="cesiumContainer">
    
    

  
  </div>


</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
var cesiumViewer
// import main from './CesiumViewer1102';
import main from '../utils/gsViewer'

import {addBaseLayersFromConf,addLayersFromConf} from '../utils/map/cesiumlayers'


window.CESIUM_BASE_URL = "./ThirdParty/CesiumUnminified1102/";


export default {
  data() {
    return {
        center:[0,0]
       
    };
  },
  computed: {},
  watch: {},
  mounted() {

    var CesiumViewer = this.initViewer()
    main(CesiumViewer,this.center,"/model.splat").then((data) =>{
      cesiumViewer = data.cesiumViewer
      
      window.cesiumViewer =cesiumViewer
      // octree = data.octreeData
      // gsPrimitive = data.gsPrimitive
     
      
      
    })


    
  },
  methods: {
    //创建Viewer
   initViewer() {
      var temps = addBaseLayersFromConf(window.mapconf)
      var CesiumViewer = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false,
        orderIndependentTranslucency: false,
        imageryProvider: temps[0],
        geocoder: false,
        timeline: false,
        animation: false,
        homeButton: false,
        fullscreenButton: false,
        selectionIndicator: false,
        infoBox: false,
        useDefaultRenderLoop: true,
        scene3DOnly: true,
        automaticallyTrackDataSourceClocks: false,
        dataSources: null,
        clock: null,
        targetFrameRate: 60,
        resolutionScale: 0.1,
        terrainProvider: new Cesium.EllipsoidTerrainProvider(),
        terrainShadows: Cesium.ShadowMode.ENABLED,
        navigationHelpButton: false,
        contextOptions: {
          //requestWebgl2: true, // for a one day upgrade test
          webgl: {
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
            depth: true,
            stencil: true,
          },
        },
      });
      //添加专题地图
      var themeLayers = addLayersFromConf(window.mapconf)
      themeLayers.forEach(lyr => {
        CesiumViewer.imageryLayers.addImageryProvider(lyr)
      });

      return CesiumViewer
    },
    
  },
  created() {

  },
  
}
</script>

<style >
    
    #cesiumContainer{
        width: 100%;
        height: 100%;
        
    }
    .cesium-viewer{
      width: 100%;
      height: 100%;
    }
    
    
</style>