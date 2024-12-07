
interface state{
    exercise: string;
    sets: number[];
    sessionReps: {
        [key: number]: number;
    };
    sessionWeights: {
        [key: number]: number;
    };
}


export class ExerciseState{

    private exercise: string
    private sets: number[]
    private sessionReps: {[key: number]: number}
    private sessionWeights: {[key: number]: number}

    constructor(){
        this.exercise = ""
        this.sets = []
        this.sessionReps = {}
        this.sessionWeights = {}
        this.loadFromLocalStorage()
    }


    private loadFromLocalStorage(){
        const savedState = localStorage.getItem('exerciseState')
        if(savedState){
            this.setStates(JSON.parse(savedState))
        }
    }

    private setLocalStorage(){
        const state = {
            'exercise':this.exercise,
            'sets': this.sets,
            'sessionReps': this.sessionReps,
            'sessionWeights': this.sessionWeights
        }

        localStorage.setItem('exerciseState', JSON.stringify(state))
    }

    private setStates(savedState:state){
        this.exercise = savedState.exercise
        this.sets = savedState.sets
        this.sessionReps = savedState.sessionReps
        this.sessionWeights = savedState.sessionWeights
    }

    public setExercise(exercise:string){
        this.exercise = exercise
        this.setLocalStorage()
    }

    public setSets(sets:number[]){
        this.sets = sets
        this.setLocalStorage()
    }

    public setSessionReps(sessionReps:{[key: number]: number}){
        this.sessionReps = sessionReps
        this.setLocalStorage()
    }

    public setSessionWeights(sessionWeights:{[key: number]: number}){
        this.sessionWeights = sessionWeights
        this.setLocalStorage()
    }

}