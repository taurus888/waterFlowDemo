//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 瀑布流
    scrollH: 0,
    imgWidth: 0,
    col1: [],
    col2: [],
    hotListLeftHeight: 0,
    hotListRightHeight: 0,
    imageList: [
      { imageUrl: "../../img/img1.jpg", imageWidth: 72,imageHeight: 60},
      { imageUrl: "../../img/img2.jpg", imageWidth: 70, imageHeight: 105},
      { imageUrl: "../../img/img3.jpg", imageWidth: 70, imageHeight: 100},
      { imageUrl: "../../img/img4.jpg", imageWidth: 50, imageHeight: 33},
      { imageUrl: "../../img/img5.jpg", imageWidth: 46, imageHeight: 70},
      { imageUrl: "../../img/img6.jpg", imageWidth: 60, imageHeight: 80},
      { imageUrl: "../../img/img7.jpg", imageWidth: 35, imageHeight: 35},
      { imageUrl: "../../img/img8.jpg", imageWidth: 22, imageHeight: 33},
      { imageUrl: "../../img/img9.jpg", imageWidth: 79, imageHeight: 124},
      { imageUrl: "../../img/img10.jpg", imageWidth: 80, imageHeight: 54},
      { imageUrl: "../../img/img11.jpg", imageWidth: 72, imageHeight: 72},
      { imageUrl: "../../img/img12.jpg", imageWidth: 60, imageHeight: 106},
      { imageUrl: "../../img/img13.jpg", imageWidth: 102, imageHeight: 68},
      { imageUrl: "../../img/img14.jpg", imageWidth: 50, imageHeight: 50},
      { imageUrl: "../../img/img15.jpg", imageWidth: 50, imageHeight: 50},
      { imageUrl: "../../img/img16.jpg", imageWidth: 35, imageHeight: 35},
      { imageUrl: "../../img/img17.jpg", imageWidth: 70, imageHeight: 70},
    ]
  },

  getImageList(){
    /*
      第一步计算出每个图片的高度
      第二步判断放置在哪边
    */
    let _this = this;
    let imageList = this.data.imageList; //假装我们从后台拿到了列表

    for(let i=0;i<imageList.length;i++){  
       
        let imgWidth = _this.data.imgWidth;  
        let oImgW = imageList[i].imageWidth;
        

        let col1 = _this.data.col1;
        let col2 = _this.data.col2;
        var hotListLeftHeightTemp = _this.data.hotListLeftHeight;
        var hotListRightHeightTemp = _this.data.hotListRightHeight;

        //比例计算
        let scale = imgWidth / oImgW;
        imageList[i].imageHeight = imageList[i].imageHeight * scale;      //自适应高度
        imageList[i].imageHeight += 60;


        if (hotListLeftHeightTemp <= hotListRightHeightTemp) {
          hotListLeftHeightTemp += imageList[i].imageHeight;
          col1.push(imageList[i])
        } else {
          hotListRightHeightTemp += imageList[i].imageHeight;
          col2.push(imageList[i])
        }

        _this.setData({
          hotListLeftHeight: hotListLeftHeightTemp,
          hotListRightHeight: hotListRightHeightTemp,
          col1: col1,
          col2: col2
        })  
      }
    },
    
    onLoad: function () {
      // 瀑布流计算
      wx.getSystemInfo({
        success: (res) => {
          let ww = res.windowWidth;
          let wh = res.windowHeight;
          let imgWidth = ww * 0.48;
          let scrollH = wh;

          this.setData({
            scrollH: scrollH,
            imgWidth: imgWidth
          });
        }
      })  
      this.getImageList() 
  },
  getUserInfo: function(e) {
    
  }
})
