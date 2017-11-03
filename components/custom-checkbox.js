Component({
  properties:{
    title:{
      type:String,
      value:"default title",
    },
    name: {
      type:String,
      value:"default name",
    }
  },
  data:{},
  methods:{
    labeltap:function(res) {
      console.log("custom checkbox is clicked");
    }
  }
})