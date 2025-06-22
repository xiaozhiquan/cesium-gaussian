
var baselayers = window.mapconf.baselayers
var layers = window.mapconf.layers
var temps=[]
function addBaseLayersFromConf(){
    baselayers.forEach((item,i)=>{
        var temp;
        switch(item.type){
            case 'tdt':
                temp= new Cesium.WebMapTileServiceImageryProvider({
                    url: item.url,
                    layer: item.layer,
                    style: "default",
                    format: "tiles",
                    tileMatrixSetID: 'w',
                    subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                    minimumLevel: 0,
                    maximumLevel: 18,
                    credit: 'Tianditu'
                    });
                    temps.push(temp)
                break
            default:
                break
        }
        //针对cesium1123
        // if(temp){
        //     const imageryLayer = new Cesium.ImageryLayer(temp);
        //     temps.push(imageryLayer)
        // }
    })
    return temps;
}

function addLayersFromConf(conf){
    
    var temps=[]
    layers.forEach((item,i)=>{
        var temp;
        switch(item.type){
            case 'tdt':
                temp= new Cesium.WebMapTileServiceImageryProvider({
                    url: item.url,
                    layer: item.layer,
                    style: "default",
                    format: "tiles",
                    tileMatrixSetID: 'w',
                    subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                    minimumLevel: 0,
                    maximumLevel: 18,
                    credit: 'Tianditu'
                    });
                break
            case 'wmts':
                temp= new Cesium.WebMapTileServiceImageryProvider({
                    url: item.url,
                    layer: item.layer,
                    // style: "default",
                    // format: "tiles",
                    tileMatrixSetID: item.tileMatrixSetID,
                    });
                break
            default:
                break
        }
        if(temp){
            const imageryLayer = new Cesium.ImageryLayer(temp);
            temps.push(imageryLayer)
        }
    })
    return temps;
}


export {
    addBaseLayersFromConf,addLayersFromConf
}