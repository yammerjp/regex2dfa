import Graph from "./graph";

class NFA extends Graph {
  // 存在するノードからε遷移するノードを作る。もとのノードからの有効辺は新しいノードが始点となるように付け替える。
  cloneNode(originNodeId:number):number|undefined{
    const originNode = this.getNode(originNodeId);
    if( originNode === undefined ){
      return undefined;
    }
    const newNodeIsFinish = originNode.isFinish;
    const newNodeId = this.addNode(newNodeIsFinish);
    if( newNodeId === undefined){
      return undefined;
    }
    const newNode = this.getNode(newNodeId);
    if( newNode === undefined ){
      return undefined;
    }

    const edgeId = this.addEdge(originNode.id, newNode.id, "ε");
    if( edgeId === undefined ){
      return undefined;
    }
    const edge = this.getEdge(edgeId);
    if( edge === undefined ){
      return undefined;
    }

    const edgesFrom = this.edgesFrom(originNodeId);
    edgesFrom.forEach( e => {
      if( e.id !== edge.id ){
        e.from = newNode;
      }
    });
    return newNodeId;
  }

  bindNodesFinish():number|undefined {
    const nodesFinish = this.nodesFinish;
    if( nodesFinish.length === 0 ){
      return undefined;
    }
    const newNodeFinishId = this.addNode(true);

    nodesFinish.forEach( nodeFinish => {
      nodeFinish.isFinish = false;
      this.addEdge( nodeFinish.id, newNodeFinishId, "ε" );
    });
    return newNodeFinishId;
  }



  /*
  replaceNodeWithGrapth(nodeId:number, graph:NFA):boolean{
    // 置き換えるグラフの受理状態を一つにまとめておく
    const nodeFinishId = graph.bindNodesFinish();
    if( nodeFinish === undefined ){
      return false;
    }
    const nodeFinish = this.getNode(nodeFinishId)
    if( nodeFinish === undefined ){
      return false;
    }

    // 置き換えるグラフの受理状態を解除
    nodeFinish.isFinish = false;


    const cloneNodeId = this.cloneNode(nodeId);
    if( cloneNodeId === undefined ){
      return false;
    }
  }
  */
}

export default NFA;
