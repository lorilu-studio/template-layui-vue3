const getDepth = function () {};

/**
 * 获取当前节点
 *  
 * @param list 集合
 * @param id 节点编号
 */
export const getNode = function(list: any[], id: string): any {
  for (let i in list) {
    let item = list[i];
    if (item.id === id) {
      return item;
    } else {
      if (item.children) {
        let value = getNode(item.children, id);
        if (value) {
          return value;
        }
      }
    }
  }
}

/**
 * 获取所有父节点 ( 包含当前节点 )
 * 
 * @param list 集合
 * @param id 节点编号
 */
export const getParents = function(list:any[], id: string) : any{
  for (let i in list) {
      if (list[i].id === id) {
         return [list[i]]
      }
      if (list[i].children) {
        let node = getParents(list[i].children, id)
        if (node !== undefined) {
          return node.concat(list[i])
        }
      }
   }    
}