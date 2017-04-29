
$( document ).ready(function() {
 // var game = new Game([1,5,4,3,2,2]);
  $('button').click(function(){
    var statki = $('#statki').val(); 
    var arr = JSON.parse("[" + statki + "]"); 
    var game = new Game(arr)   ;
    game.Start();

  })
});
interface IState{
     own:number;
     enemy:number;
     empty:number;
}

class Board {
    private board:Array<Array<IPosition>>;
    private sizeX:number;
    private sizeY:number;
    private jqboard:JQuery =$('#board');

    constructor(boardSizeX:number,boardSizeY:number){
        this.sizeX = boardSizeX;
        this.sizeY = boardSizeY;
        this.createBoard();
    }
    public GetX():number{
        return this.sizeX;
    }
    public GetY():number{
        return this.sizeY;
    }  

    public AddShip(pos:IPosition){
         this.board[pos.X][pos.Y] = pos;
         $('.cell.X-'+pos.X+'.Y-'+pos.Y).addClass('ship');   
    }
    
    public HitShip(X:number,Y:number){

    }
    public CheckGameStatus(){

    }
    public CheckIfCanAdd(pos:IPosition,first:boolean):boolean{
        var state={
             own:0,
             enemy:0,
             empty:0
        }
        if(this.board[pos.X][pos.Y] ==null)
           state.empty =1;
        this.CheckClosePositions(pos.X-1,pos.Y-1,pos.shipId,state,true)
        this.CheckClosePositions(pos.X-1,pos.Y,pos.shipId,state,false)
        this.CheckClosePositions(pos.X-1,pos.Y+1,pos.shipId,state,true)
        this.CheckClosePositions(pos.X,pos.Y-1,pos.shipId,state,false)
        this.CheckClosePositions(pos.X,pos.Y+1,pos.shipId,state,false)
        this.CheckClosePositions(pos.X+1,pos.Y-1,pos.shipId,state,true)
        this.CheckClosePositions(pos.X+1,pos.Y,pos.shipId,state,false)
        this.CheckClosePositions(pos.X+1,pos.Y+1,pos.shipId,state,true)

        if(first==true && state.empty==1 && state.enemy ==0)
            return true;
        if(first==false && state.empty==1 && state.enemy ==0 && state.own >0)
            return true;    
        return false;    
    }
    private CheckClosePositions(X:number,Y:number,shipId:string,state:IState,bevel:boolean):FieldStatus{
        if(X >20 || X<1 || Y>20 || Y<1)
           return;
        if( this.board[X][Y] !==null  && this.board[X][Y].shipId == shipId && bevel ==false)
            state.own+=1;
        if( this.board[X][Y] !==null  && this.board[X][Y].shipId != shipId)
            state.enemy+=1;
    }
    private createBoard(): void {
        this.jqboard.html('');
        this.board = new Array();
        for (var i = 1; i <= this.sizeX; i++) {
            var row = new Array<IPosition>();
            for (var j = 1; j <= this.sizeY; j++) {
                row[j] = null;
                this.createCell(i,j);
            }
            this.board[i]=row;
        }
    }
    private createCell(X:number,Y:number):void{
        var cell = "<div class='cell X-"+X+" Y-"+Y+"'></div>";
        this.jqboard.append(cell);
    }
    
   
}
function addPanel(title:string,content:string){
    var html = '<div class="panel panel-primary">' +
        '<div class="panel-heading">' + title + '</div>' +
        '<div class="panel-body">' + content + '</div></div>';
    $('#placeholder').append(html);
}


enum FieldStatus{
    EMPTY=0,
    OWN=1,
    ENEMY=2
}

interface ICallback{
    callback:()=>void;
}
class TestEvent {
    public OnCheck:any[];

}