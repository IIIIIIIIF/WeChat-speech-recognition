// component/speech-recognition/speech-recognition.js
let manager;
Component({
  // 启用插槽
  options: {
    multipleSlots: true
  },
  externalClasses: ['voice-class'],
  pageLifetimes: {
    show: function() {
      // 页面被展示
      var plugin = requirePlugin("WechatSI")
      manager = plugin.getRecordRecognitionManager();
      manager.onStart = (res)=>{
        //  console.log("成功开始录音识别", res)
        }
        manager.onRecognize = (res) => {
               let text = res.result       
               this.setData({      
                 currentText: text,        
               })
        }
        manager.onStop = (res) => {
                wx.hideLoading()
               let text = res.result 
               if(text == '') {      
                 // 用户没有说话 
                  wx.showToast({
                    title: '没有听到声音',
                    icon:"none"
                  })   
                 return 
               }  
               this.setData({      
                 currentText: text,    
               })     
              this.triggerEvent("voiceText",{
                 currentText:text
              },{}) 
        }      
        manager.onError = function(res) {
             wx.showToast({
               title: '发生错误：'+res.msg,
               icon:"none"
             })
        }
    }
  },
  lifetimes: {
    created: function() {
      

    }
  },
  properties: {
    value:String
  },
  data: {
    currentText: '',
  },
  methods: {
    streamRecord: function(){
         manager.start({     
           lang: 'zh_CN',    
         }) 
        wx.showToast({
          title: '正在聆听...',
          icon:"none",
          duration:60000
        })  
    },   
    endStreamRecord: function(){
        wx.hideToast()
        wx.showLoading({
          title: '正在识别...',
        })
        manager.stop()
    }
  }
})
