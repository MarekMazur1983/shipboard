interface IPosition{
    X:number;
    Y:number;
    isHit? :boolean;
    shipId?:string;
}
class Ship{
    private shipLength:number;
    private shipPositions:Array<IPosition>;
    private board:Board;
    private shipId:string = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    constructor(board:Board,shipLength:number){
        this.board = board;
        this.shipLength = shipLength;
    }
    public AddShipPositions():boolean{
        var counter = 0;
        this.shipPositions = new Array<IPosition>();
        while(this.shipPositions.length < this.shipLength){
            var pos=this.getRandomPosition();
            var first = this.shipPositions.length ==0 ? true:false;
            var check = this.board.CheckIfCanAdd(pos,first);
            if(check==true){
                    this.addPosition(pos);
                    this.board.AddShip(pos);    
            }
            counter++;
            if(counter>100000)
            break;
        }
        if(this.shipPositions.length == this.shipLength)
            return true
        return false;
    }
    private addPosition(position:IPosition):void{
        this.shipPositions.push(position);
    }
    private getRandomPosition():IPosition{
        var pos = {
            X:Math.floor(Math.random() * this.board.GetX()) + 1 ,
            Y:Math.floor(Math.random() * this.board.GetY()) + 1 ,
            shipId:this.shipId ,
            isHit:false 
        }
        return pos;
    }
    public GetId():string{
        return this.shipId;
    }
}
class Game{
    private board:Board;
    private shipsConfigurator:number[];
    private ships:Array<Ship>;
    constructor (shipsConfigurator:number[]){
        this.shipsConfigurator = shipsConfigurator;
    }
    public Start(){
        
        this.board = new Board(20,20);
        this.addShipsToBoard();

    }
    private addShipsToBoard(){
        for(var i =0;i<this.shipsConfigurator.length;i++){
            var ship = new Ship(this.board,this.shipsConfigurator[i]);    
            ship.AddShipPositions();
            
        }
    }
}

