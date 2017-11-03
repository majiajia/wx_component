Component({
  properties:{
    title:{
      type:String
    },
    name: {
      type:String
    }
  },
  data:{},
  methods:{
    labeltap:function(res) {
      console.log("custom checkbox is clicked");
    }
  }
})