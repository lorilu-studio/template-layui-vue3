const getDepth = function () {
    
}

const familyTree = function (arr1: any[], id: string) {
    var temp: any[] = []
    var forFn = function (arr: any[], id: string) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        if (item.id === id) {
          temp.push(item)
          forFn(arr1, item.parentId)
          break
        } else {
          if (item.children) {
            forFn(item.children, id)
          }
        }
      }
    }
    forFn(arr1, id)
    return temp
}