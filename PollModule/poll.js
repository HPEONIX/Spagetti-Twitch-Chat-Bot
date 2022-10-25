class PollHandler{
    constructor()
    {
        this.isPollActive=false
        this._maxVotedVal=0
        this.currentQuestion=null
        this.optionMap=new Map()
        this._totalCount=0
    }
    startPoll(question,optionsMapped)
    {
        if(this.isPollActive) return false
        this.isPollActive=true
        let optionMap  = new Map()
        for (const i in optionsMapped) {
            if (Object.hasOwnProperty.call(optionsMapped, i)) {
                const option = optionsMapped[i].trim();
                optionMap.set(i,{option,voters:new Set()})
            }
        }
        this.optionMap=optionMap
        this.currentQuestion=question
        return true
    }
    getPollInfo()
    {
        if(!this.isPollActive) return null
        var mappedOption={}
        for (const [key,val] of this.optionMap.entries()) {
            mappedOption[key]=val.option

        }
        return {quiz:this.currentQuestion,options:mappedOption}
    }
    castVote(option,voterName)
    {
        if(!this.isPollActive) return false
        let totalvote=0
        this.optionMap.forEach((value,key)=>{
            if(parseInt(key)===parseInt(option))
            {
                value.voters.add(voterName)
                if(this._maxVotedVal<value.voters.size)this._maxVotedVal=value.voters.size
            }
            else
            {
                value.voters.delete(voterName)
            }
            totalvote+=value.voters.size
        })
        this._totalCount=totalvote
        return true
    }
    getResult()
    {
        if(!this.isPollActive) return null
        let nameList=[]
        this.optionMap.forEach((value,key)=>{
            if(this._maxVotedVal===value.voters.size)
            {
                nameList=nameList.concat([value.option])
                
            }
        })
        const names  = nameList.join(",")
        return {value:this._maxVotedVal,name:names}
    }

    getAllResult()
    {
        if(!this.isPollActive) return null
        let voting={}
        this.optionMap.forEach((value,key)=>{
            voting[key]={id:value.option,votes:value.voters.size}
        })
        return voting
    }
    stopPoll()
    {
        this.isPollActive=false
        return this
    }
    getTotalCount()
    {
        return this._totalCount
    }
    resetPoll()
    {
        this.stopPoll()
        this._maxVotedVal=0
        this.optionMap=new Map()
        this._totalCount=0
        return this
    }
}

const managePoll= new PollHandler()

module.exports=managePoll