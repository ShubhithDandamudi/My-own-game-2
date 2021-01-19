class Form {

    constructor() {
      this.input = createInput("Name");
      this.button = createButton('Enter Name');
      this.greeting = createElement('h2');
      this.title = createElement('h1');
      this.enter = createButton('Play');

      this.malariaButton = createButton('Malaria');
      this.choleraButton = createButton('Cholera');
      this.covidButton = createButton('Covid');
     
      this.instructions = createElement('h3');
    }
    
    hide(){
      this.greeting.hide();
      this.button.hide();
      this.input.hide();
      this.title.hide();
      this.choleraButton.hide();
      this.malariaButton.hide();
      this.covidButton.hide();
      this.instructions.hide();
    }
   display(){
      this.title.html("The Chosen One");
      this.title.position(displayWidth/2 - 50, 0);
      
      this.input.position(displayWidth/2 - 50 , displayHeight/2 - 80);
      this.button.position(displayWidth/2, displayHeight/2);
    
      this.malariaButton.position(width/2-150,height/2+50);
      this.choleraButton.position(width/2,height/2+100);
      this.covidButton.position(width/2+150,height/2+100);


      this.instructions.html("Choose the virus to fight ........... etc")
       this.instructions.position(width/2 -50,height/2+50);


      this.button.mousePressed(()=>{
        this.input.hide();
        this.button.hide();
        var name = this.input.text();
        this.greeting.html("Welcome" + name);
        this.greeting.position(width/2,height/2);
      });


      this.choleraButton.mousePressed(()=>{
        gameState =1;
        level = 3;
      });
      

      this.covidButton.mousePressed(()=>{
        gameState =1;
        level = 3;
      });
      

      this.malariaButton.mousePressed(()=>{
        gameState =1;
        level = 1;
      });
      
      
     
  
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  