namespace silvester {

    interface Saved{
        fireworkname: string;
        fireworktype: string;
        fireworkcolor: string;
        fireworkspeed: string;
        fireworkamount: string;
        fireworkparticle: string;
        fireworklifetime: string;
    }
    
    console.log("main here, how're you doing?");
    export let crc2: CanvasRenderingContext2D;
    let form: HTMLFormElement;
    let url: string = "https://ikaja.herokuapp.com/";

    window.addEventListener("load", handleLoad);
    let canvas: HTMLCanvasElement;

    let fireworks: Firework [] = [];
    let savedArray: Saved [] = [];
    let fps: number = 100;

    //Load
    async function handleLoad(_event: Event):Promise<void> {
        console.log("Load");

        form = <HTMLFormElement>document.getElementById("form");
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let btnSubmit: HTMLElement = <HTMLElement>document.getElementById("submit");

        canvas.addEventListener("click", handleCanvasClick);
        btnSubmit.addEventListener("click", sendFireWork);

        crc2.fillStyle = "black";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        crc2.fill

        window.setInterval(update, 1000/fps);
        
        retrieveFireworks();
        createOptions();
        
    }
    //Canvas 
    function handleCanvasClick(_event: MouseEvent): void {

        let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);

    }
    function createFirework (tempPosition: Vector){
        console.log("create firework");

        let sound = <HTMLAudioElement>document.querySelector("audio");
        sound.play();

        let typeTarget: HTMLSelectElement = <HTMLSelectElement>document.getElementById("type");
        let typeValue: string = typeTarget.value;

        let colorTarget: HTMLSelectElement = <HTMLSelectElement>document.getElementById("colour");
        let colorValue: string = colorTarget.value;

        let speedTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("speed");
        let speedValue: any = speedTarget.value; 

        let amountTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("amount");
        let amountValue: any = amountTarget.value;

        let particleTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("pSize");
        let particleValue: any = particleTarget.value;

        let lifeTimeTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("lifetime");
        let lifeTimeValue: any = lifeTimeTarget.value;
        
        let firework: Firework = new Firework(tempPosition, typeValue, colorValue, speedValue, amountValue, particleValue, lifeTimeValue*fps);
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
    //Server & Database
    export async function sendFireWork(_event: MouseEvent):Promise<void> {
        console.log("submit fire work");
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);
    }
    async function retrieveFireworks(): Promise<void> {
        let response : Response = await fetch(url + "?" + "command=retrieve"); //url + "?" + "command=retrieve"
        savedArray.push(JSON.parse(await response.text()));
        console.log(savedArray.length);
        
    }
    async function createOptions(){
        let select = <HTMLSelectElement>document.getElementById("saved");
        for (let i: number = 0; i < savedArray.length; i++){
            let options = savedArray[i];
            let element = document.createElement("option");
            element.textContent = options.fireworkname;
            select.appendChild(element);
            element.addEventListener("click", recreateFirework);
        } 
    }
    function recreateFirework(_event: MouseEvent){
        let g: any = savedArray.keys();
        for (let key of g){
            savedArray[key]

            let nameTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
            nameTarget.value = g.fireworkname;
        
            let typeTarget: HTMLSelectElement = <HTMLSelectElement>document.getElementById("type");
            typeTarget.value = g.fireworktype;

            let colorTarget: HTMLSelectElement = <HTMLSelectElement>document.getElementById("colour");
            colorTarget.value = g.fireworkcolor;

            let speedTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("speed");
            speedTarget.value = g.fireworkspeed;

            let amountTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("amount");
            amountTarget.value = g.fireworkamount;

            let particleTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("pSize");
            particleTarget.value = g.fireworkparticle;

            let lifeTimeTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("lifetime");
            lifeTimeTarget.value = g.fireworklifetime;
        }
    }
}
