class Genea{
    constructor(config){
        this.currentGeneration=0;
        this.fitnesses=[];
        this.populations=[];
        this.history=[];

        this.mutateProbability=config.mutateProbability;
        // this.doneFitness=config.doneFitness;

        this.generationSize=config.generationSize;
        this.populationSize=config.populationSize;
        this.geneLength=config.geneLength;
        this.getFitness=config.getFitness;

        this.onGeneration=config.onGeneration;
        // this.outOfGeneration=config.outOfGeneration;
        // this.done=config.done;
        
    }

    start(){
        this.initPopulations();
        this.makeFitnesses();
        this.select();
    }

    initPopulations(){
        this.currentGeneration=1;
        this.populations=[];
        for(let i=0;i<this.populationSize;++i){
            let gene=getRandomGene(this.geneLength);
            this.populations.push(gene);
        }
        this.onGeneration(this.currentGeneration,this.populations);
    }

    select(){
        if(this.currentGeneration>=this.generationSize) return this.outOfGeneration();
        let matches=this.getMatches();
        if(matches.length>0) {
            // console.log(matches);
            return this.done(matches);
        }
        this.getNextGeneration();
    }

    getMatches(){
        let bests=[];
        this.populations.forEach((individual,i)=>{
            let fitness=this.fitnesses[i];
            if(fitness>=this.doneFitness){
                bests.push({
                    gene:individual,
                    fitness:fitness,
                    pos:i
                })
            }
        });
        return bests;
    }
    
    getNextGeneration(){
        this.currentGeneration++;
        let oldPopulations=this.populations;
        let newPopulations=[];
        for(let i=0,len=oldPopulations.length;i<len;++i){
            let father=this.rotate();
            let mother=this.rotate();
            let child=this.crossOver(father,mother);
            child=this.mutate(child);
            newPopulations.push(child);
        }
        this.populations=newPopulations;
        this.makeFitnesses();
        this.onGeneration(this.currentGeneration,this.populations);
        // console.log(this.populations);
        this.select();
    }


    makeFitnesses(){
        this.fitnesses=[];
        this.totalFitness=0;
        this.populations.forEach((individual,i)=>{
            let fitness=this.getFitness(individual,this.populations);
            this.fitnesses[i]=fitness;
            this.totalFitness+=fitness;
        });
        // console.log(this.fitnesses);
    }

    crossOver(father,mother){
        let pos=Math.floor(Math.random()*father.length);
        let child1=father.substring(0,pos)+mother.substring(pos);
        let child2=mother.substring(0,pos)+father.substring(pos);
        return this.getFitness(child1)>this.getFitness(child2)?child1:child2;
    }

    rotate(){
        let soFar=0;
        let pos=Math.random();
        for(let i=0,len=this.fitnesses.length;i<len;++i){
            let fitness=this.fitnesses[i];
            soFar+=fitness;
            if(soFar/this.totalFitness>=pos){
                return this.populations[i];
            }
        }
    }

    mutate(child){
        let mutateProbability=Math.random();
        if(mutateProbability<this.mutateProbability) return child;
        let pos=Math.floor(Math.random()*this.geneLength);
        let arr=child.split("");
        arr[pos]=+child[pos]^1;
        return arr.join("");
    }

    done(){}

    onGeneration(){}

    outOfGeneration(){}

}
function getRandomGene(length) {
    let gene='';
    for(let i=0;i<length;++i){
        gene+=((Math.floor(Math.random()*100))%2===0)?"1":"0";
    }
    return gene;
}

var str="Stay foolish,stay naive";
const alphabetArr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ., ".split('');
const alphabet=(()=>{
    const alphabet={};
    alphabetArr.forEach((ch,i)=>{
        alphabet[ch]=i;
    });
    return alphabet;
})();
function getBinary(targetStr) {
    var binary='';
    for(let i=0,len=targetStr.length;i<len;++i){
        const ch=targetStr[i];
        const chIndex=alphabet[ch];
        binary+=paddingWithZero(Number(chIndex).toString(2));
    }
    return binary;
}
function paddingWithZero(num) {
    while(num.length<6){
        num="0"+num;
    }
    return num;
}
const target=getBinary(str);

const genea=new Genea({
    geneLength:target.length,
    mutateProbability:0.5,
    doneFitness:1,
    populationSize:20,
    generationSize:400,
    getFitness:function (gene) {
        let count=0;
        for(let i=0;i<gene.length;++i){
            if(gene[i]===target[i]) count++;
        }
        const likeness=count/target.length;
        return likeness;
    },
    onGeneration:function (generation,genes) {
        let max=0,index=0;
        this.fitnesses.forEach(function (fitness,i) {
            if(fitness>max){
                max=fitness;
                index=i;
            }
        });
        this.history.push(toChars(genes[index]));
        // console.log(this.history);
    }
});
function toChars(gene) {
    let str='';
    while(gene.length){
        let ch="00"+gene.substr(0,6);
        gene=gene.substr(6);
        let chIndex=parseInt(ch,2);
        if(chIndex>=alphabetArr.length){
            chIndex=Math.floor(Math.random()*(alphabetArr.length-1));
        }
        str+=alphabetArr[chIndex];
    }
    return str;
}
genea.start();
function display() {
    var random=document.getElementById("random");
    let history=genea.history;
    let step=20;
    let index=0;
    var timer=setInterval(toTarget,step);
    random.innerHTML=history[index];
    function toTarget() {
        clearInterval(timer);
        index+=1;
        step+=0.15;
        random.innerHTML=history[index];
        // console.log(index,history[index]);
        if(index<400&&history[index]!==str) timer=setInterval(toTarget,step);
    }
}
window.onload=function() {
    display();
};



