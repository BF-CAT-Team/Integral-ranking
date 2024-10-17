# base

## 参考内容: 
- Icon  https://pictogrammers.com/library/mdi/icon/export-variant/
- UI https://vuetifyjs.com/zh-Hans/
- vite
- json5 https://json5.org/

## 更新数据

赛季更新的数据放置public/txt, 在更新后需要配置/public/config内的`season`和`servers`对应赛季配置和服务器配置。

### 赛季
```json5
{
  // key 赛季id，查找需要对应key名称
  "s0": {
    // 赛季名称, 同时也是国际化
    "name": "S0测试赛季",
    // 赛季描述
    "description": "测试赛季",
    // 赛季区间，只有0...1
    "dateRange": [
      "2023-08-01",
      "2023-08-31"
    ],
    // 赛季参与服务器名称
    "serverIds": [
      "Miku"
    ],
    // 赛季更新时间
    "updateTime": "20230901 10:47 (\u6d4b\u8bd5\u8d5b\u5b63\u6700\u7ec8\u6392\u540d)",
    // 赛季对应数据位置
    "fileUrl": "txt/S0/Miku_M2_20230831_list.txt"
  }
}
```

### 服务器
```json5
{
  // 服务器id
  "value": "Miku",
  // 服务器面板画像
  "picture": "../assets/servers/Miku/miku.jpg",
  // 服务器全称
  "name": "[BFV ROBOT][Miku]M2喷火器彩蛋测试服",
  // 服务器描述
  "description": "Miku39 想透透你!",
  // 服务器意向参与赛季，注意要与赛季key一致
  "season": [
    "s0","s2"
  ]
}
```
