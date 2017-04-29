$(document).ready(function(){
    var tt = new Test();
    tt.GetData().done(function(x:boolean){console.log(x)})
});

class Test{
    constructor(){
        $('#board').click();
    }
    public GetData():any{
        var dfr = $.Deferred<boolean>();
  
        setTimeout(function(){dfr.resolve(true)},5000);
        return dfr.promise();    


    }
   
    
    


}

