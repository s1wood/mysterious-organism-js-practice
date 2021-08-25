// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  

  const pAequorFactory = (num, bases) => {
    return { 
        specimenNum: num,
        dna: bases,
        
        mutate() {
          let index = Math.floor(Math.random() * this.dna.length)
          let randBase = returnRandBase()
  
          while(this.dna[index] === randBase) {
            randBase = returnRandBase()
          }
          this.dna[index] = randBase
          return this.dna
        },
  
      //Check DNA lengths are matching and if so calculates average DNA in common between the arrays
      compareDNA(otherDna) {
        let length = this.dna.length;
  
        if(length != otherDna.dna.length){
          console.log('Error: The two DNA sequences have different lengths.');
        }
  
        let pairs = 0;
        
        for(let i = 0; i < length; i++){
          if(this.dna[i] === otherDna.dna[i])
            pairs++;
        }
        
        let average = Math.floor(pairs / length * 100);
        console.log(`specimen #${this.specimenNum} and specimen #${otherDna.specimenNum} have ${average}% DNA in common'`);
        return average;
      },
  

      //If DNA has >60% C and G values then it will be more likely to survive
      willLikelySurvive() {
        const cAndG = Object.values(this.dna).filter(letter => letter === 'C' || letter === 'G');
  
        if (cAndG.length / this.dna.length > 0.6) {
          return true;
        } else {
          return false;
        }
      },
  
      //Returns new array with opposite base pairs for the DNA strand input
      complementStrand() {
        let newStrand = []
        for (let base of this.dna) {
          switch(base) {
            case 'A':
              newStrand.push('T');
              break;
            case 'T':
              newStrand.push('A');
              break;
            case 'C':
              newStrand.push('G');
              break;
            case 'G':
              newStrand.push('C');
              break;
          }
        }
        return newStrand
      }
    }
  }
  
  //Create 30 samples all passing the willLikelySurvive function and stored in a new array
  function generatePool() {
    let i = 1
    const sample = []
    
    while(i <= 30) {
       let generator = pAequorFactory(i,mockUpStrand())  
       if(generator.willLikelySurvive() === true) {
         sample.push(generator)
         i++
       }
    }
    return sample
  }
  
  
  const spec35 = pAequorFactory(65, mockUpStrand());
  const spec34 = pAequorFactory(64, mockUpStrand());
  console.log(spec34.dna);
  console.log(spec34.mutate());
  console.log(spec34.compareDNA(spec35));
  console.log(spec34.willLikelySurvive());
  console.log(spec34.complementStrand());
  //console.log(generatePool())
  