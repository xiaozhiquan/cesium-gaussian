

var mapconf={

    baselayers:[
        {
            type:'tdt',
            url:'http://{s}.tianditu.gov.cn/img_w/wmts?tk=816517e17d1cc31c6eec03ef9fc4bb5b',
            layer:'img_w',
            title:'天地图',
        }
    ],
    layers:[
        // {
        //     type:'wmts',
        //     url:'http://127.0.0.1:9001/geoserver/gwc/service/wmts/rest/hnny:Growth_2020_05/{style}/{TileMatrixSet}/{TileMatrixSet}:{TileMatrix}/{TileRow}/{TileCol}?format=image/png',
        //     layer: 'hnny:Growth_2020_05',
        //     tileMatrixSetID: 'EPSG:900913',
        //     title:'xx',
        // }
               
    ],
    tools:[
        {
            title:'量测',
            name:"measureline",
            id:1,
            icon:"icon-map-ruler"
        },
        {
            title:'目标列表',
            name:"targetlist",
            id:2,
            icon:"icon-youxiajiantoufangxing",
            iconclose:"icon-zuoshangjiantoufangxing"
        }
        // {
        //     title:'隐藏',
        //     name:"hide",
        //     id:2,
        // }
    ],
    socketUrl:"ws://127.0.0.1:8888/obstacles",
    
}

window.mapconf = mapconf