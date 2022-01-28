import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef,HostListener } from '@angular/core';
import {Square} from './square';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: []
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  rect:any
  clientX = 0;
  clientY = 0;
  selectedX=0;
  selectedY=0;
  dragstartX=0;
  dragstartY=0;
  dragendX=0;
  dragendY=0;
  dragSel=false;
  testX=0;
  testY=0;
  testXs=String(this.testX);
  testYs=String(this.testY);


  shopFloor= new Array
  squareArray=[]
  itemName="Name";
  somethingSelected=false;
  grey=false;
  top1=20
  left1=20
  style1="position:relative; top:0px;left:0px;"
  divText=""

  styleConstruct(x:number,y:number){
    return("position:absolute; top:"+String(y)+"px;left:"+String(x)+"px;width:40px;height:40px;border: 15px solid green;justify-content:center;align-items:center;display: flex;")
  }


  constructor() { }
  ngOnInit(){

  }
  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    console.log('ctx values')
    console.log(this.ctx)
    console.log('checking')
    //this.ctx = this.canvas.nativeElement.getContext('2d');
    this.rect = this.canvas.nativeElement.getBoundingClientRect();
    console.log(this.rect)
    

  }

  length=0

  ready(){
    console.log('checking')
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.rect = this.canvas.nativeElement.getBoundingClientRect();
    console.log(this.rect)
  }

  addSquare(){
    var squareCreated = new Square(this.ctx);
    if (this.clientX){
      var sideA=20
      var xLeft=this.clientX-this.rect.left
      var yTop=this.clientY-this.rect.top
      //Calculating width other co-ordinate
      var xRigth=xLeft+sideA
      var yBottom=yTop+sideA
      squareCreated.draw(xLeft, yTop,40,this.itemName);

      this.squareArray.push(squareCreated)
      //console.log(this.squareArray)


    }
    //this.ctx.fillStyle="red"
    //this.ctx.fillRect(0,0,50,50)
    //this.ctx.fillStyle="white"
    //this.ctx.fillText("test",0,20)
    
  }
  onEvent(event: MouseEvent): void {
    console.log('This is a single click')
    console.log(event)
    this.clientX=event.clientX;
    this.clientY=event.clientY;
    console.log(this.clientY)

}

async onEventPin(event: MouseEvent){
  console.log('onEventPin')
  var index1 = this.squareArray.findIndex(p => p.sel == 2)
  this.grey=false;
  console.log("recording starting point of final position")
  this.dragendX=event.clientX-this.rect.left;
  this.dragendY=event.clientY-this.rect.top;
  //console.log(this.dragendX,this.dragendY)
  //this.squareArray[index1].clearSelected()
  await this.squareArray[index1].movedSelected(this.dragendX-20,this.dragendY-20,40)
  this.style1="position:absolute; top:0px;left:0px;"

}

selected(event: MouseEvent){
  if(!event.altKey){this.somethingSelected=!this.somethingSelected;
    console.log('It is a double click, selected activated')
    //is there a rectangle element here?
    this.selectedX=event.clientX-this.rect.left;
    this.selectedY=event.clientY-this.rect.top;
    for (var val of this.squareArray) {
      console.log('normal loop x::',val.x)
      if (this.selectedX>val.x && this.selectedX<(val.x+val.z)
        &&this.selectedY>val.y&&this.selectedY<(val.y+val.z)){
        console.log('yes it is')
        console.log(val)
        //val.redrawSelected()
      }
    }
    this.squareArray.forEach((ivalue,index)=>{
      console.log('checking each',index)
      if (this.selectedX>ivalue.x && this.selectedX<(ivalue.x+ivalue.z)
        &&this.selectedY>ivalue.y&&this.selectedY<(ivalue.y+ivalue.z)){
        console.log('evaluating selected square, if passed')
        console.log(this.selectedX,this.selectedY)
        console.log(ivalue.sel)
        ivalue.sel=1
        console.log(ivalue.sel)
        console.log(ivalue.ctx.fillStyle)
        if(ivalue.ctx.fillStyle=="#ffffff"){
          ivalue.redrawSelected('red')
        }
      }else{
        console.log('evaluating selected square, if failed')
        ivalue.sel=0
        console.log(ivalue.ctx.fillStyle)
        ivalue.redrawSelected('blue')
      }
  
    })
  }
}

async dragging(event:MouseEvent){
  if(event.altKey){
    console.log('dragging event')
    console.log(event.clientX)
    //where is starting the drag?
  
    console.log("recording starting point of drag")
    this.dragstartX=event.clientX-this.rect.left;
    this.dragstartY=event.clientY-this.rect.top;
    console.log(this.dragstartX,this.dragstartY)
      
    await this.squareArray.forEach((ivalue,index)=>{
      console.log('checking each',index)
      if (this.dragstartX>ivalue.x && this.dragstartX<(ivalue.x+ivalue.z)
          &&this.dragstartY>ivalue.y&&this.dragstartY<(ivalue.y+ivalue.z)){
          console.log('evaluating drag, if passed');
          ivalue.redrawSelected('grey')
          ivalue.sel=2
          this.grey=true;
          this.style1=this.styleConstruct(ivalue.x+this.rect.left,ivalue.y+this.rect.top)
  
      }else{
        ivalue.sel=0
      }
  
    })
  }


  




}


@HostListener('mousemove', ['$event']) async movement2(e:MouseEvent){
  
    //console.log(e)
    //console.log('wait',this.rect.left)
  if(this.grey){
  var index1 = this.squareArray.findIndex(p => p.sel == 2)
  await setTimeout(function(){}, 3000);
  this.selectedX=e.clientX-this.rect.left;
  this.selectedY=e.clientY-this.rect.top;
    //console.log('index1:::',index1,e.clientX,e.clientY,'waiting')
  this.squareArray[index1].clearSelected()
  this.squareArray[index1].movedSelected(this.selectedX,this.selectedY,40)
  this.squareArray.forEach((ivalue,index)=>{
    ivalue.clearSelected2()
    ivalue.redrawSelected('blue')

    })

  }

}

dropping(event:MouseEvent){
  if(this.grey){
    console.log('dropping')
    var index1 = this.squareArray.findIndex(p => p.sel == 2)
    this.grey=false;
    console.log("recording starting point of drag")
    this.dragendX=event.clientX-this.rect.left;
    this.dragendY=event.clientY-this.rect.top;
    console.log(this.dragendX,this.dragendY)
    this.squareArray[index1].clearSelected()
    this.squareArray[index1].movedSelected(this.dragendX,this.dragendY,40)


  }



}






  

}
