export class Square {
    x=null;
    y=null;
    ybottom;
    z=null;
    whatItem="Unknown";
    sel=0;
    drag=false;
    constructor(private ctx: CanvasRenderingContext2D) {
    }

    draw(x: number, y: number, z: number,itemName) {
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(x, y, z, z);
      this.ctx.fillStyle = "white";
      this.ybottom=y+z
      this.x=x;
      this.y=y;
      this.z=z;
      this.whatItem=itemName
      this.ctx.fillText(this.whatItem, x, (this.ybottom+y)/2);
    }

    redrawSelected(col){
      this.ctx.fillStyle = col;
      this.ctx.fillRect(this.x,this.y, this.z, this.z);
      this.ctx.fillStyle = "white";
      this.ctx.fillText(this.whatItem, this.x, (this.ybottom+this.y)/2);
    }

    clearSelected(){
      var xClear=this.x;
      var yClear=this.y;
      this.ctx.clearRect(xClear,yClear,42,42)
      this.x=null;
      this.y=null;
    }

    clearSelected2(){
      var xClear=this.x;
      var yClear=this.y;
      this.ctx.clearRect(xClear,yClear,42,42)
    }

    movedSelected(x: number, y: number, z: number){
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(x, y, z, z);
      this.ybottom=y+z
      this.x=x;
      this.y=y;
      this.z=z;
      this.ctx.fillStyle = "white";
      this.ctx.fillText(this.whatItem, this.x, (this.ybottom+this.y)/2);
    }
  
    print(){
        console.log(this.x,this.y,this.z)
    }
    




    ////////////
  }

