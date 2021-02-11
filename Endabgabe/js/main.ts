namespace silvester {
    
    console.log("main here, how're you doing?");
    export let crc2: CanvasRenderingContext2D;
    let form: HTMLFormElement;
    let url: string = "https://ikaja.herokuapp.com/"
    // let url: string = "http://localhost:5002";

    window.addEventListener("load", handleLoad);
    let canvas: HTMLCanvasElement;

    let fireworks: Firework [] = [];
    let savedArray: any [] = [];
    let fps: number = 100;

    async function handleLoad(_event: Event):Promise<void> {
        console.log("Load");

        form = <HTMLFormElement>document.querySelector("form");
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = canvas.getContext("2d");

        let btnSubmit: HTMLElement = <HTMLElement>document.getElementById("submit");

        canvas.addEventListener("click", handleCanvasClick);
        btnSubmit.addEventListener("click", sendFireWork);

        crc2.fillStyle = "black";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        crc2.fill

        window.setInterval(update, 1000/fps);
        
        getSelect();
    }
    
    function handleCanvasClick(_event: MouseEvent): void {

        let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);

    }
    export async function sendFireWork(_event: MouseEvent):Promise<void> {
        console.log("submit fire work");
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        savedArray.push(formData);
        alert(responseText);
    }
    async function getSelect(){
        console.log(savedArray.length);
        let select = <HTMLSelectElement>document.getElementById("save");
        for (let i: number = 0; i < savedArray.length; i++){
            let options = savedArray[i];
            let element = document.createElement("option");
            element.textContent = options.name;
            select.appendChild(element);
    
        }
        
    }
    
    
    function createFirework (tempPosition: Vector){
        console.log("create firework");

        let sound = <HTMLAudioElement>document.querySelector("audio");
        sound.play();

        let typeTarget: HTMLElement = <HTMLTextAreaElement>document.getElementById("type");
        let typeValue = typeTarget.value;

        let colorTarget: HTMLElement = <HTMLSelectElement>document.getElementById("colour");
        let colorValue = colorTarget.value;

        let radiusTarget: HTMLElement = <HTMLInputElement>document.getElementById("size");
        let radiusValue = radiusTarget.value; 

        let amountTarget: HTMLElement = <HTMLInputElement>document.getElementById("amount");
        let amountValue = amountTarget.value;

        let particleTarget: HTMLElement = <HTMLInputElement>document.getElementById("pSize");
        let particleValue = particleTarget.value;

        let lifeTimeTarget: HTMLElement = <HTMLInputElement>document.getElementById("lifetime");
        let lifeTimeValue = lifeTimeTarget.value;
        
        let firework: Firework = new Firework(tempPosition, typeValue, colorValue, radiusValue, amountValue, particleValue, lifeTimeValue*fps);
        fireworks.push(firework);
    }
    
    function update (){
        crc2.globalAlpha = 0.05;
        crc2.fillStyle = "black";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        crc2.fill
        crc2.globalAlpha = 1;
        

        for (let i: number = fireworks.length -1; i >= 0; i--){
            fireworks[i].draw();
            fireworks[i].update();
            if(!fireworks[i].isAlive()){
                fireworks.splice(i,1);
            }
        }
    }

}
