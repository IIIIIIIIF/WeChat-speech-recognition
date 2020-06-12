# WeChat-speech-recognition
微信小程序 语音识别组件 集成微信同声传译 

//组件示例
<w-speech-recognition
      voice-class="voicebtn"   //voice-class:自定义类名
      value="点我说"           //文字描述
      bind:voiceText="voiceText"  //自定义事件
      >
<image class="img" slot="voice" src=""></image>   //插槽决定是否显示图片
</w-speech-recognition>

//js
voiceText(res){
     console.log(res.detail.currentText) //识别结果
}
